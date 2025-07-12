import ProductList from "@/components/shared/product/ProductList";
import { getProducts } from "@/lib/data-service";

export default async function page() {
  const data = await getProducts();
  return <ProductList title="جدیدترین محصولات" data={data} limit={4} />;
}
