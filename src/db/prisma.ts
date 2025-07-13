import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient().$extends({
  result: {
    product: {
      rating: {
        compute(product) {
          return product.rating.toString();
        },
      },
    },
  },
});
