"use server";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { auth, signIn, signOut } from "../auth";
import {
  addToCartSchema,
  SignInUserSchema,
  SignUpUserSchema,
} from "../validators";
import { prisma } from "@/db/prisma";
import { hashSync } from "bcrypt-ts-edge";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export interface SigninFormState {
  success: boolean;
  message: string;
  errors?: {
    email?: string[];
    password?: string[];
  };
}

export interface AddItemToCartState {
  success: boolean;
  message: string;
}

export interface SignupFormState {
  success: boolean;
  message: string;
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
}

// --------- AUTH ACTIONS ---------------------

export async function signInWithCredential(
  _prevState: SigninFormState,
  formData: FormData
): Promise<SigninFormState> {
  // 1. Input validation
  const validatedFields = SignInUserSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // 2. If validation fails, return the errors
  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten().fieldErrors;

    return {
      success: false,
      message: "خطا در اعتبارسنجی. لطفا ورودی‌های خود را بررسی کنید.",
      errors: {
        email: fieldErrors.email,
        password: fieldErrors.password,
      },
    };
  }

  // 3. If validation succeeds, proceed with your logic
  try {
    // Authentication and check user email and password
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
    });

    return {
      success: true,
      message: "ورود با موفقیت انجام شد!",
    };
  } catch (error) {
    // signIn will call authorize function and if user authorize , redirect page to callbackUrl
    // redirect throw error that we should not catch it so we use :
    if (isRedirectError(error)) throw error;

    return {
      success: false,
      message: "ایمیل یا رمز عبور نامعتبر است.",
    };
  }
}

export async function signUpUser(
  _prevState: SignupFormState,
  formData: FormData
) {
  // 1. Get formData
  const rawFormData = Object.fromEntries(formData.entries());

  // 2. validation with zod
  const validatedFields = SignUpUserSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten().fieldErrors;

    return {
      success: false,
      message: "خطا در اعتبارسنجی. لطفا ورودی‌های خود را بررسی کنید.",
      errors: {
        name: fieldErrors.name,
        email: fieldErrors.email,
        password: fieldErrors.password,
        confirmPassword: fieldErrors.confirmPassword,
      },
    };
  }

  // 3. If validation succeeds, proceed with your logic
  const { name, email, password } = validatedFields.data;

  try {
    // 4. check user already exist and if yes return error
    const isUserExist = await prisma.user.findUnique({
      where: { email },
    });
    if (isUserExist)
      return {
        success: false,
        message: "این ایمیل قبلاً استفاده شده است. لطفا وارد شوید",
      };

    // 5. if user not exist and validate => add to database
    // hash password
    const hashedPassword = hashSync(password, 10);
    // add user to db
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  } catch (error) {
    console.error("Error during user creation:", error);
    return {
      success: false,
      message: "خطایی در هنگام ثبت‌نام رخ داد. لطفا دوباره تلاش کنید.",
    };
  }

  // 6. signIn user after added to DB
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/", // Redirect to the homepage after sign-in
    });

    return { success: true, message: "ثبت‌نام و ورود با موفقیت انجام شد." };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    // Every error in Auth.js is an AuthError
    return {
      success: false,
      message: "خطایی در هنگام ورود خودکار رخ داد.",
    };
  }
}

export async function signOutUser() {
  await signOut();
}

// ------------  CART ACTIONS ----------------
export async function addItemToCart(
  productId: string,
  quantity: number
): Promise<AddItemToCartState> {
  // 1. Input Validation
  const validatedFields = addToCartSchema.safeParse({ productId, quantity });
  if (!validatedFields.success) {
    return {
      success: false,
      message: "اطلاعات ورودی نامعتبر است.",
    };
  }

  try {
    const session = await auth();
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;

    // 2. Find the correct cart
    const cart = await prisma.cart.findFirst({
      where: {
        // Find the cart if it belongs to the logged-in user OR if it's the guest cart
        OR: [{ userId: session?.user?.id }, { sessionCartId: sessionCartId }],
      },
    });

    // 3. If no cart exists at all, create one
    const cartToUpdate =
      cart ||
      (await prisma.cart.create({
        data: {
          userId: session?.user?.id,
          sessionCartId: session?.user ? undefined : sessionCartId,
        },
      }));

    // 4. Use `upsert`
    // `upsert` will CREATE a new item if it doesn't exist, or UPDATE it if it does.
    await prisma.cartItem.upsert({
      where: {
        // Unique identifier for the cart item
        cartId_productId: {
          cartId: cartToUpdate.id,
          productId: productId,
        },
      },
      // What to do if it exists
      update: {
        quantity: {
          increment: quantity, // Atomically increment the quantity
        },
      },
      // What to do if it's new
      create: {
        cartId: cartToUpdate.id,
        productId: productId,
        quantity: quantity,
      },
    });

    return { success: true, message: "محصول به سبد خرید اضافه شد!" };
  } catch (error) {
    console.error("addItemToCart action error:", error);
    return { success: false, message: "خطایی رخ داد. لطفا دوباره تلاش کنید." };
  }
}
