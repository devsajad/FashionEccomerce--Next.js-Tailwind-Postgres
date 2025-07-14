import { PrismaClient } from "@prisma/client";
import {
  brandsToCreate,
  categoriesToCreate,
  productsToCreate,
} from "./sample-data";

async function main() {
  const prisma = new PrismaClient();

  console.log("Start seeding...");
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.brand.deleteMany();
  console.log("Cleared previous data.");

  // Create brands
  await prisma.brand.createMany({
    data: brandsToCreate,
  });
  console.log("Created brands.");

  // Create categories
  await prisma.category.createMany({
    data: categoriesToCreate,
  });
  console.log("Created categories.");

  // Fetch the created brands and categories to get their IDs
  const brands = await prisma.brand.findMany();
  const categories = await prisma.category.findMany();

  const brandMap = new Map(brands.map((b) => [b.name, b.id]));
  const categoryMap = new Map(categories.map((c) => [c.name, c.id]));

  // Create products and link them to brands and categories
  for (const product of productsToCreate) {
    const { brandName, categoryName, ...productData } = product;

    const brandId = brandMap.get(brandName);
    const categoryId = categoryMap.get(categoryName);

    if (!brandId || !categoryId) {
      console.warn(
        `Skipping product "${product.name}" due to missing brand or category.`
      );
      continue;
    }

    await prisma.product.create({
      data: {
        ...productData,
        brandId: brandId,
        categoryId: categoryId,
      },
    });
  }
  console.log("Created products.");

  console.log("Seeding finished.");
}

main();
