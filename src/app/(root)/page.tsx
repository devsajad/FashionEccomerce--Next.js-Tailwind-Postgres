import ProductList from "@/components/shared/product/ProductList";
import sampleData from "@/data/sample-data";

export default async function page() {
  return <ProductList title="جدیدترین محصولات" data={sampleData.products} />;
}
