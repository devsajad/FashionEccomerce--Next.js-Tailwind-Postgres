import ModeToggle from "@/components/ui/ModeToggle";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, ShoppingCart, UserIcon } from "lucide-react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "../../ui/sheet";

export default function Menu() {
  return (
    <div className="flex gap-3">
      <nav className="hidden md:flex w-full max-w-xs gap-2">
        <ModeToggle />

        <Button asChild variant="ghost">
          <Link href={"/sign-in"}>
            <ShoppingCart />
            <span className="text-xs md:text-sm">سبدخرید</span>
          </Link>
        </Button>

        <Button asChild variant="default">
          <Link href={"/sign-in"}>
            <UserIcon />
            <span className="text-xs md:text-sm">ورود</span>
          </Link>
        </Button>
      </nav>

      <nav className="md:hidden">
        <Sheet>
          <SheetTrigger className="align-middle">
            <EllipsisVertical />
          </SheetTrigger>

          <SheetContent className="flex flex-col items-start">
            <div className="w-full justify-end flex gap-2 mt-2 pl-2">
              <ModeToggle />

              <Button asChild variant="ghost">
                <Link href={"/sign-in"}>
                  <ShoppingCart />
                  <span className="text-xs md:text-sm">سبدخرید</span>
                </Link>
              </Button>

              <Button asChild variant="default">
                <Link href={"/sign-in"}>
                  <UserIcon />
                  <span className="text-xs md:text-sm">ورود</span>
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
}
