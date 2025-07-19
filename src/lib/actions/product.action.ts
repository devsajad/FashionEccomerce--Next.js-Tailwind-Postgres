"use server";
import { prisma } from "@/db/prisma";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { auth } from "../auth";
import { addToCartSchema } from "../validators";

export interface ItemToCartState {
  success: boolean;
  message: string;
}

export async function addItemToCart(
  productId: string,
  quantity: number
): Promise<ItemToCartState> {
  // 1. Input Validation
  const validatedFields = addToCartSchema.safeParse({ productId, quantity });
  if (!validatedFields.success) {
    return {
      success: false,
      message: "اطلاعات ورودی نامعتبر است.",
    };
  }

  try {
    // 2. Fetch the product first to check for existence and stock
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return { success: false, message: "محصول مورد نظر یافت نشد." };
    }

    const [session, sessionCartIdCookie] = await Promise.all([
      auth(),
      (await cookies()).get("sessionCartId"),
    ]);
    const sessionCartId = sessionCartIdCookie?.value;

    // 3. Find or create the cart
    const cart =
      (await prisma.cart.findFirst({
        where: {
          OR: [{ userId: session?.user?.id }, { sessionCartId: sessionCartId }],
        },
      })) ||
      (await prisma.cart.create({
        data: {
          userId: session?.user?.id,
          sessionCartId: session?.user ? undefined : sessionCartId,
        },
      }));

    // 4. Find the item *if it already exists* in the cart
    const cartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId: productId,
      },
    });

    //  5.check product stock to don't add more than exist stock
    const existingQuantity = cartItem?.quantity || 0;
    const newTotalQuantity = existingQuantity + quantity;

    if (newTotalQuantity > product.stock) {
      return {
        success: false,
        message: `شما نمی‌توانید بیشتر از موجودی انبار (${product.stock}) به سبد خرید اضافه کنید.`,
      };
    }

    // 6. If stock check passes, perform the upsert
    await prisma.cartItem.upsert({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId: productId,
        },
      },
      update: {
        quantity: {
          increment: quantity,
        },
      },
      create: {
        cartId: cart.id,
        productId: productId,
        quantity: quantity,
      },
    });

    // 7. Revalidate paths
    revalidatePath(`/product/${product.slug}`);

    return {
      success: true,
      message: `${product.name} به سبد خرید اضافه شد!`,
    };
  } catch (error) {
    console.error("addItemToCart action error:", error);
    return { success: false, message: "خطایی رخ داد. لطفا دوباره تلاش کنید." };
  }
}

export async function removeItemFromCart(
  productId: string,
  quantity: number
): Promise<ItemToCartState> {
  // Input Validation
  const validatedFields = addToCartSchema.safeParse({ productId, quantity });
  if (!validatedFields.success) {
    return {
      success: false,
      message: "اطلاعات ورودی نامعتبر است.",
    };
  }

  try {
    // Get Session and Cart
    const [session, sessionCartIdCookie] = await Promise.all([
      auth(),
      (await cookies()).get("sessionCartId"),
    ]);
    const sessionCartId = sessionCartIdCookie?.value;

    const cart = await prisma.cart.findFirst({
      where: {
        OR: [{ userId: session?.user?.id }, { sessionCartId: sessionCartId }],
      },
    });

    if (!cart) {
      return {
        success: false,
        message: "سبدخرید پیدا نشد!",
      };
    }

    // Find existing item
    const item = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId: productId,
        },
      },
      include: {
        Product: true,
      },
    });

    if (!item) {
      return {
        success: false,
        message: "محصول مورد نظر در سبد خرید شما پیدا نشد!",
      };
    }

    // Decrease quantity or delete item
    if (item.quantity > quantity) {
      // 2. Use Prisma's atomic 'decrement' for better performance and safety
      await prisma.cartItem.update({
        where: {
          cartId_productId: {
            cartId: cart.id,
            productId: productId,
          },
        },
        data: {
          quantity: {
            decrement: quantity,
          },
        },
      });
    } else {
      await prisma.cartItem.delete({
        where: {
          cartId_productId: {
            cartId: cart.id,
            productId: productId,
          },
        },
      });
    }

    // 3. Revalidate paths to update the UI
    revalidatePath(`/product/${item.Product.slug}`);

    return {
      success: true,
      message: "محصول با موفقیت از سبد حذف شد",
    };
  } catch (error) {
    console.error("removeItemFromCart action error:", error);
    return { success: false, message: "خطایی رخ داد. لطفا دوباره تلاش کنید." };
  }
}
