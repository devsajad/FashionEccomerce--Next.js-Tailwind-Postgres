import Image from "next/image";
import { APP_NAME } from "@/lib/constants/index.ts";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <Image
        priority={true}
        src="/images/logo.svg"
        width={48}
        height={48}
        alt={`${APP_NAME} logo`}
      />
      <div className="p-6 rounded-lg shadow-md text-center">
        <h1 className="text-xl md:text-3xl font-bold mb-4">اشتباه اومدی !</h1>
        <p className="text-sm md:text-lg text-destructive">
          صفحه درخواستی مورد نظرت پیدا نشد
        </p>
        <Button variant="outline" className="mt-4 ml-2">
          <Link href={"/"}>بازگشت به خانه</Link>
        </Button>
      </div>
    </div>
  );
}

export default NotFound;
