"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import Spinner from "./Spinner";
import { Button } from "./ui/button";

export default function FormSubmitBtn({
  children,
}: {
  children: React.ReactNode;
}) {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
      type="submit"
      className="w-full mt-2 h-10 cursor-pointer"
    >
      {pending ? <Spinner size="mini" /> : <span>{children}</span>}
    </Button>
  );
}
