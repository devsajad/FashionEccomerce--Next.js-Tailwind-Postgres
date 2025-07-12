import { PrismaClient } from "../../generated/prisma";
import { convertToPlainObject } from "./utils";

const prisma = new PrismaClient();

export async function getProducts() {
  const products = await prisma.product.findMany();
  return convertToPlainObject(products);
}
