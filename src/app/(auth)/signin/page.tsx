import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";

export default function page() {
  return (
    <div className="w-90/100 max-w-md mx-auto">
      <Card>
        <CardHeader className="flex flex-col items-center">
          <Link href={"/"}>
            <Image
              src={"/images/logo.svg"}
              width={70}
              height={70}
              alt={`${APP_NAME} logo`}
            />
          </Link>
          <CardTitle className="font-bold text-xl md:text-2xl">ورود</CardTitle>

          <CardDescription>وارد حساب {APP_NAME} شوید</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="flex flex-col gap-1">
              <Label htmlFor="email" className="text-base font-medium">
                ایمیل
              </Label>
              <Input id="email" type="email" name="email" required dir="ltr" />
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="password" className="text-base font-medium">
                پسورد
              </Label>
              <Input
                id="password"
                type="password"
                name="password"
                required
                dir="ltr"
              />
            </div>

            <Button type="submit" className="w-full mt-2 h-10 cursor-pointer">
              وارد شوید
            </Button>
          </form>
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
