import React from "react";
import { SignupFormState } from "@/lib/actions/user.action";
import { Label } from "./ui/label";
import FormError from "./FormError";

interface FormRowProps {
  children?: React.ReactNode;
  state: SignupFormState;
  label?: string;
  fieldName: keyof NonNullable<SignupFormState["errors"]>;
}

export default function FormRow({
  children,
  state,
  label,
  fieldName,
}: FormRowProps) {
  const fieldErrors = state.errors?.[fieldName];

  return (
    <div className="flex flex-col mb-2">
      {label && (
        <Label htmlFor={fieldName} className="text-sm font-medium mb-1">
          {label}
        </Label>
      )}

      {children}

      {fieldErrors && (
        <div className="space-y-1">
          {fieldErrors.map((errorMessage, i) => (
            <FormError key={i}>{errorMessage}</FormError>
          ))}
        </div>
      )}
    </div>
  );
}
