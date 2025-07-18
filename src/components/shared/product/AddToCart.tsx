"use client";

import { Button } from "@/components/ui/button";
import { addItemToCart } from "@/lib/actions/user.action";
import { AddToCartType } from "@/types";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AddToCart({ productId, quantity }: AddToCartType) {
  const router = useRouter();

  async function handleAddToCartClick() {
    const addToCartResult = await addItemToCart(productId, quantity);

    if (!addToCartResult.success) {
      return toast.error("محصول به سبد اضافه نشد !", {
        description: addToCartResult.message,
      });
    }

    toast("با موفقیت به سبد خرید اضافه شد", {
      description: "برای مشاهده و ادامه خرید کلیک کنید",
      action: {
        label: "سبد خرید",
        onClick: () => router.push("/cart"),
      },
    });
  }

  return (
    <Button className="w-full flex gap-0.5" onClick={handleAddToCartClick}>
      <Plus />
      <span> افزودن به سبد</span>
    </Button>
  );  
}
