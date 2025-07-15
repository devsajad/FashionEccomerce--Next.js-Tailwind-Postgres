"use client";
import React from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";
import Spinner from "./Spinner";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
      type="submit"
      className="w-full mt-2 h-10 cursor-pointer"
    >
      {pending ? <Spinner size="mini" /> : <span>وارد شوید</span>}
    </Button>
  );
}
