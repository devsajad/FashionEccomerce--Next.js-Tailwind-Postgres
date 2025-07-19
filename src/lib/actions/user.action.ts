"use server";
import { prisma } from "@/db/prisma";
import { hashSync } from "bcrypt-ts-edge";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { signIn, signOut } from "../auth";
import { SignInUserSchema, SignUpUserSchema } from "../validators";

export interface SigninFormState {
  success: boolean;
  message: string;
  errors?: {
    email?: string[];
    password?: string[];
  };
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
