import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { ShoppingCart, UserIcon } from "lucide-react";
import ModeToggle from "./ui/ModeToggle";

export default function Header() {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex-between">
        <div className="flex-start">
          <Link href={"/"} className="flex-start">
            <Image
              src={"/images/logo.svg"}
              width={38}
              height={38}
              alt={`${APP_NAME} logo`}
              priority={true}
            />
            <span className="hidden lg:block font-bold text-2xl mr-3">
              {APP_NAME}
            </span>
          </Link>
        </div>
        <div className="space-x-2">
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
      </div>
    </header>
  );
}
