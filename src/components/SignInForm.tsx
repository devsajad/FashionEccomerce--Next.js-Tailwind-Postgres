"use client";

import SubmitButton from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  SigninFormState,
  signInWithCredential,
} from "@/lib/actions/user.action";
import { useActionState } from "react";
import ErrorForm from "./ErrorForm";

const initialState: SigninFormState = {
  success: false,
  message: "",
};

export default function SignInForm() {
  
  const [state, action] = useActionState(signInWithCredential, initialState);

  return (
    <form className="space-y-4" action={action}>
      <div className="flex flex-col gap-1">
        <Label htmlFor="email" className="text-base font-medium">
          ایمیل
        </Label>
        <Input
          autoComplete="email"
          id="email"
          type="text"
          name="email"
          required
          dir="ltr"
        />
        {state.errors?.email && (
          <div className="space-y-1">
            {state.errors.email.map((errorMessage, i) => (
              <ErrorForm key={i}>{errorMessage}</ErrorForm>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="password" className="text-base font-medium">
          پسورد
        </Label>
        <Input
          autoComplete="current-password"
          id="password"
          type="password"
          name="password"
          required
          dir="ltr"
        />
        <div className="space-y-1">
          {state.errors?.password && (
            <div className="space-y-1">
              {state.errors.password.map((errorMessage, i) => (
                <ErrorForm key={i}>{errorMessage}</ErrorForm>
              ))}
            </div>
          )}
        </div>
      </div>
      <SubmitButton />

      <div className="text-center">
        {state.message && !state.success && (
          <ErrorForm>{state.message}</ErrorForm>
        )}
      </div>
    </form>
  );
}
