import ImageGallary from "@/components/ImageGallary";
import AddToCart from "@/components/shared/product/AddToCart";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { getCartItem, getProduct } from "@/lib/data-service";
import { formatPrice } from "@/lib/utils";

async function page({ params }: { params: Promise<{ productSlug: string }> }) {
  const { productSlug } = await params;

  const product = await getProduct(productSlug);
  const cartItem = await getCartItem(product.id);

  const quantity = cartItem?.quantity || 0;

  const {
    id,
    name,
    category,
    description,
    images,
    price,
    brand,
    rating,
    numReviews,
    stock,
  } = product;

  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-y-12 md:gap-y-0">
        {/* Image container */}
        <div className="md:col-span-2">
          <ImageGallary images={images} alt={name} />
        </div>

        {/* Detail column */}
        <div className="col-span-2">
          <div className="flex flex-col gap-6 items-start">
            <div className="space-y-2">
              <p className="text-sm md:text-md font-light">
                {brand.name} | {category.name}
              </p>
              <h1 className="h3-bold">{name} kz</h1>
            </div>

            <div className="space-y-2">
              <p className="text-sm md:text-md">
                {rating} از {numReviews} بازخورد
              </p>
            </div>

            <p className="font-bold bg-green-100 text-green-700 rounded-full p-2">
              {formatPrice(price)}
              <span className="align-super text-xs font-light"> تومان </span>
            </p>
          </div>

          <div className="space-y-2 mt-8">
            <p className="text-sm md:text-md font-bold"> توضیحات :</p>
            <p> {description}</p>
          </div>
        </div>

        {/* action column */}
        <div>
          <Card className="w-90/100 sm:w-70/100 mx-auto md:w-full h-43">
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <p>قیمت</p>
                <p>
                  {formatPrice(price)}{" "}
                  <span className="text-xs font-light">تومان</span>
                </p>
              </div>

              <div className="flex justify-between">
                <p>وضعیت</p>
                <p>
                  {stock > 0 ? (
                    <Badge className="px-4 rounded-full" variant={"outline"}>
                      موجود
                    </Badge>
                  ) : (
                    <Badge
                      className="px-4 rounded-full"
                      variant={"destructive"}
                    >
                      ناموجود
                    </Badge>
                  )}
                </p>
              </div>
            </CardContent>
            {stock > 0 && (
              <CardFooter>
                <AddToCart productId={id} quantity={quantity} />
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
}

export default page;
