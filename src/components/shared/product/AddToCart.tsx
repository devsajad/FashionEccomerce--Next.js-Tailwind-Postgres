"use client";

import { Button } from "@/components/ui/button";
import { addItemToCart } from "@/lib/actions/user.action";
import { AddToCartType } from "@/types";
import { Loader2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export default function AddToCart({ productId, quantity }: AddToCartType) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleAddToCartClick() {
    startTransition(async () => {
      const addToCartResult = await addItemToCart(productId, quantity);

      if (!addToCartResult.success) {
        toast.error("محصول به سبد اضافه نشد!", {
          description: addToCartResult.message,
        });
        return;
      }

      toast("با موفقیت به سبد خرید اضافه شد", {
        description: "برای مشاهده و ادامه خرید کلیک کنید",
        action: {
          label: "سبد خرید",
          onClick: () => router.push("/cart"),
        },
      });
    });
  }

  return (
    <Button
      className="w-full flex gap-0.5"
      onClick={handleAddToCartClick}
      disabled={isPending}
    >
      {isPending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          <span> در حال افزودن ... </span>
        </>
      ) : (
        <>
          <Plus />
          <span>افزودن به سبد</span>
        </>
      )}
    </Button>
  );
}
