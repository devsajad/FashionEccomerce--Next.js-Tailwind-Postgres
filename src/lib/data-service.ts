import { cookies } from "next/headers";
import { auth } from "./auth";
import { convertToPlainObject } from "./utils";
import { prisma } from "@/db/prisma";
import { notFound } from "next/navigation";

export async function getProducts(limit: number) {
  const products = await prisma.product.findMany({
    take: limit,
    orderBy: { createdAt: "desc" },
    include: {
      brand: true,
      category: true,
    },
  });

  return convertToPlainObject(products);
}

export async function getProduct(productSlug: string) {
  const product = await prisma.product.findUnique({
    where: {
      slug: productSlug,
    },
    include: {
      brand: true,
      category: true,
    },
  });

  if (!product) {
    notFound();
  }

  return convertToPlainObject(product);
}

export async function getCartItem(productId: string) {
  const [session, sessionCartIdCookie] = await Promise.all([
    auth(),
    (await cookies()).get("sessionCartId"),
  ]);

  if (!session && !sessionCartIdCookie) return null;

  const sessionCartId = sessionCartIdCookie?.value;

  const cart = await prisma.cart.findFirst({
    where: {
      OR: [{ userId: session?.user?.id }, { sessionCartId: sessionCartId }],
    },
  });

  if (!cart) return null;

  const cartItem = await prisma.cartItem.findFirst({
    where: {
      cartId: cart.id,
      productId: productId,
    },
  });

  return cartItem;
}
