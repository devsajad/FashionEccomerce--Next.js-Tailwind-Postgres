import { Prisma } from "@prisma/client";
import z from "zod";
import { addToCartSchema } from "./../lib/validators";

// not BEST PRACITE => single source of truth rule
// export type Product = z.infer<typeof InsertProductSchema> & {
//   id: string;
//   rating: string;
//   createdAt: Date;
//   brand: { id: number; name: string };
//   category: { id: number; name: string };
// };

export type Product = Prisma.ProductGetPayload<{
  include: {
    brand: true;
    category: true;
  };
}>;

export type ClientSafeProduct = Omit<Product, "rating"> & {
  rating: string;
};

export type AddToCartType = z.infer<typeof addToCartSchema>;
