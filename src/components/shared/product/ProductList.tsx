import React from "react";
import ProductItem from "./ProductItem";
import { ProductType } from "@/types";

export default function ProductList({
  title,
  data,
  limit,
}: {
  title?: string;
  data: ProductType[];
  limit?: number;
}) {
  const limitedData = limit ? data.slice(0, limit) : data;
  return (
    <div className="my-10">
      <h2 className="h2-bold mb-5">{title}</h2>
      {limitedData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {limitedData.map((product: ProductType) => (
            <ProductItem key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <div>
          <p>هیچ محصولی پیدا نشد</p>
        </div>
      )}
    </div>
  );
}
