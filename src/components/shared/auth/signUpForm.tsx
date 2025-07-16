"use client";

import Form from "@/components/Form";
import FormRow from "@/components/FormRow";
import { Input } from "@/components/ui/input";
import { SigninFormState, signUpUser } from "@/lib/actions/user.action";
import { useActionState } from "react";

const initialState: SigninFormState = {
  success: false,
  message: "",
};

export default function SignUpForm() {
  const [state, action] = useActionState(signUpUser, initialState);

  return (
    <Form action={action} submitText="ثبت نام" state={state}>
      <FormRow state={state} label="نام" fieldName="name">
        <Input
          autoComplete="name"
          id="name"
          type="text"
          name="name"
          required
          dir="rtl"
        />
      </FormRow>
      <FormRow state={state} label="ایمیل" fieldName="email">
        <Input
          autoComplete="email"
          id="email"
          type="text"
          name="email"
          required
          dir="ltr"
        />
      </FormRow>

      <FormRow state={state} label="پسورد" fieldName="password">
        <Input
          autoComplete="current-password"
          id="password"
          type="password"
          name="password"
          required
          dir="ltr"
        />
      </FormRow>
      <FormRow state={state} label="تکرار پسورد" fieldName="confirmPassword">
        <Input
          autoComplete="current-password"
          id="password"
          type="password"
          name="confirmPassword"
          required
          dir="ltr"
        />
      </FormRow>
    </Form>
  );
}
