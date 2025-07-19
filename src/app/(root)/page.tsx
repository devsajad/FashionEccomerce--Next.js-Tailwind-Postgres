import ProductList from "@/components/shared/product/ProductList";
import { LATES_PRODUCTS_LIMIT } from "@/lib/constants";
import { getProducts } from "@/lib/data-service";
import { ClientSafeProduct } from "@/types";

export default async function page() {
  const data: ClientSafeProduct[] = await getProducts(LATES_PRODUCTS_LIMIT);

  return <ProductList title="جدیدترین محصولات" data={data} />;
}
