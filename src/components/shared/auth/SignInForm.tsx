"use client";

import Form from "@/components/Form";
import FormRow from "@/components/FormRow";
import { Input } from "@/components/ui/input";
import {
  SigninFormState,
  signInWithCredential,
} from "@/lib/actions/user.action";
import { useActionState } from "react";

const initialState: SigninFormState = {
  success: false,
  message: "",
};

export default function SignInForm() {
  const [state, action] = useActionState(signInWithCredential, initialState);

  return (
    <Form action={action} submitText="ورود به سایت" state={state}>
      <FormRow state={state} label="ایمیل" fieldName="email">
        <Input
          defaultValue={"admin@mail.com"}
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
          defaultValue={123456}
          autoComplete="current-password"
          id="password"
          type="password"
          name="password"
          required
          dir="ltr"
        />
      </FormRow>
    </Form>
  );
}
