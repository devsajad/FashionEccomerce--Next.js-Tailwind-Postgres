import { SigninFormState } from "@/lib/actions/user.action";
import React from "react";
import FormError from "./FormError";
import FormSubmitBtn from "./FormSubmitBtn";

interface FormProps {
  children: React.ReactNode;
  action: (payload: FormData) => void;
  state: SigninFormState;
  submitText: string;
}

export default function Form({
  children,
  action,
  state,
  submitText,
}: FormProps) {
  return (
    <form className="" action={action}>
      {children}

      <FormSubmitBtn>{submitText}</FormSubmitBtn>

      <div className="text-center">
        {state.message && !state.success && (
          <FormError>{state.message}</FormError>
        )}
      </div>
    </form>
  );
}
