import ProductList from "@/components/shared/product/ProductList";
import { LATES_PRODUCTS_LIMIT } from "@/lib/constants";
import { getProducts } from "@/lib/data-service";
import { Product } from "@/types";

export default async function page() {
  const data: Product[] = await getProducts(LATES_PRODUCTS_LIMIT);

  console.log(data);
  return <ProductList title="جدیدترین محصولات" data={data} />;
}
