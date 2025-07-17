import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOutUser } from "@/lib/actions/user.action";
import { auth } from "@/lib/auth";
import { UserIcon } from "lucide-react";
import Link from "next/link";

export default async function UserButton() {
  const session = await auth();

  return !session?.user ? (
    <Button asChild variant="default">
      <Link href={"/signin"}>
        <UserIcon />
        <span className="text-xs md:text-sm">ورود</span>
      </Link>
    </Button>
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          className="rounded-full w-10 h-10 mr-2 flex justify-center items-center bg-slate-200 dark:bg-slate-700 text-base"
        >
          {session.user.name?.at(0)}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="min-w-56" forceMount>
        <DropdownMenuLabel className="text-center">
          <div className="flex flex-col gap-1">
            <p className=" font-medium text-sm leading-none">
              {session.user.name}
            </p>
            <p className="text-xs font-light text-muted-foreground leading-none">
              {session.user.email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup className="mt-1">
          <DropdownMenuItem className="p-0">
            <Button
              className="w-full text-right py-4 px-2 h-4 justify-end font-light"
              variant={"ghost"}
              onClick={signOutUser}
            >
              خروج از حساب
            </Button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
