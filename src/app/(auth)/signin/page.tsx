import SignInForm from "@/components/shared/auth/SignInForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl: string }>;
}) {
  const session = await auth();
  const { callbackUrl } = await searchParams;

  if (session?.user) redirect(callbackUrl || "/");

  return (
    <div className="w-90/100 max-w-md mx-auto">
      <Card className="gap-0">
        <CardHeader className="flex flex-col items-center">
          <Link href={"/"}>
            <Image
              src={"/images/logo.svg"}
              width={70}
              height={70}
              alt={`${APP_NAME} logo`}
              priority
            />
          </Link>
          <CardTitle className="font-bold text-xl md:text-2xl">ورود</CardTitle>

          <CardDescription>وارد حساب {APP_NAME} شوید</CardDescription>
        </CardHeader>
        <CardContent>
          <SignInForm />
        </CardContent>

        <CardFooter className="justify-center mt-2">
          <p className="text-sm text-muted-foreground font-base">
            حساب‌ کاربری ندارید ؟
            <span className="text-foreground font-base">
              <Link href={"/signup"} target="_self" className="link">
                {" "}
                ثبت‌نام کنید{" "}
              </Link>
            </span>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
