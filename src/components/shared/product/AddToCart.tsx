"use client";

import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import {
  addItemToCart,
  removeItemFromCart,
} from "@/lib/actions/product.action";
import { AddToCartType } from "@/types";
import { Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export default function AddToCart({ productId, quantity }: AddToCartType) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleAddToCartClick() {
    startTransition(async () => {
      const addToCartResult = await addItemToCart(productId, 1);

      if (!addToCartResult.success) {
        toast.error("محصول به سبد اضافه نشد!", {
          description: addToCartResult.message,
        });
        return;
      }

      toast(addToCartResult.message, {
        description: "برای مشاهده و ادامه خرید کلیک کنید",
        action: {
          label: "سبد خرید",
          onClick: () => router.push("/cart"),
        },
      });
    });
  }

  function handleRemoveClick() {
    startTransition(async () => {
      const addToCartResult = await removeItemFromCart(productId, 1);

      if (!addToCartResult.success) {
        toast.error("محصول از سبد حذف نشد !", {
          description: addToCartResult.message,
        });
        return;
      }

      toast(addToCartResult.message, {
        description: "برای مشاهده و ادامه خرید کلیک کنید",
        action: {
          label: "سبد خرید",
          onClick: () => router.push("/cart"),
        },
      });
    });
  }

  if (quantity === 0)
    return (
      <Button
        className="w-full flex gap-1"
        onClick={handleAddToCartClick}
        disabled={isPending}
      >
        {isPending ? <Spinner size="mini" /> : <Plus />}
        <span>افزودن به سبد</span>
      </Button>
    );

  return isPending ? (
    <div className="w-full gap-1 flex justify-center items-center">
      <Spinner size="mini" />
      <span className="text-sm text-foreground/70">درحال بروزرسانی ...</span>
    </div>
  ) : (
    <div className="flex justify-between w-30 mx-auto items-center">
      <Button variant={"outline"} onClick={handleAddToCartClick}>
        <Plus className="w-4 h-4" />
      </Button>
      {quantity}
      <Button variant={"outline"} onClick={handleRemoveClick}>
        <Minus className="w-4 h-4" />
      </Button>
    </div>
  );
}
