import { PrismaClient } from "../../generated/prisma";
import { convertToPlainObject } from "./utils";
import { prisma } from "@/db/prisma";

export async function getProducts(limit: number) {
  const products = await prisma.product.findMany({
    take: limit,
    orderBy: { createdAt: "desc" },
  });

  return convertToPlainObject(products);
}
