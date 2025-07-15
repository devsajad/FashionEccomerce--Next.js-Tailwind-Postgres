"use server";
import { redirect } from "next/navigation";
import { signIn, signOut } from "../auth";
import { signInUserSchema } from "../validators";

export interface SigninFormState {
  success: boolean;
  message: string;
  errors?: {
    email?: string[];
    password?: string[];
  };
}

export async function signInWithCredential(
  _prevState: SigninFormState,
  formData: FormData
): Promise<SigninFormState> {
  // 1. Input validation
  const validatedFields = signInUserSchema.safeParse({
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
      redirect: false,
    });

    redirect("/");
  } catch (error) {
    return {
      success: false,
      message: "ایمیل یا رمز عبور نامعتبر است.",
    };
  }
}

export async function signOutUser() {
  await signOut();
}
