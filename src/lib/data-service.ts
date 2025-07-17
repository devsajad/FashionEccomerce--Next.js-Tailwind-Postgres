import { convertToPlainObject } from "./utils";
import { prisma } from "@/db/prisma";

export async function getProducts(limit: number) {
  const products = await prisma.product.findMany({
    take: limit,
    orderBy: { createdAt: "desc" },
    include: {
      brand: true,
      category: true,
    },
  });

  return convertToPlainObject(products);
}

export async function getProduct(productSlug: string) {
  const product = await prisma.product.findUnique({
    where: {
      slug: productSlug,
    },
    include: {
      brand: true,
      category: true,
    },
  });

  return convertToPlainObject(product);
}
