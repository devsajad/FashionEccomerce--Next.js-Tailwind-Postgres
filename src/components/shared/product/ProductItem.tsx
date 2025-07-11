import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function ProductItem({ product }: { product: any }) {
  return (
    <Card className="w-[250px] md:w-full mx-auto py-0">
      <CardHeader className="p-0 items-center">
        <Link href={`/product/${product.slug}`}>
          <div className="relative w-full h-65 rounded-xl">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              priority={true}
              className="object-cover object-top rounded-xl"
            />
          </div>
        </Link>
      </CardHeader>

      <CardContent className="p-4 grid gap-4 ">
        <div className="text-xs">برند {product.brand}</div>
        <Link href={`/product/${product.slug}`}>
          <h2 className="text-sm font-medium">{product.name}</h2>
        </Link>
        <div className="flex-between gap-4">
          <p>{product.rating} امتیاز</p>
          {product.stock > 0 ? (
            <p className="font-bold">{product.price} تومان</p>
          ) : (
            <p className="text-destructive">اتمام موجودی</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
