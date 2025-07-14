import { Category } from "./../../node_modules/.pnpm/@prisma+client@6.11.1_prism_0533ca5add9f1bf9a332f3f7e28e4e73/node_modules/.prisma/client/index.d";
import { InsertProductSchema } from "./../lib/validators";
import z from "zod";

export type Product = z.infer<typeof InsertProductSchema> & {
  id: string;
  rating: string;
  createdAt: Date;
  brand: { id: number; name: string };
  category: { id: number; name: string };
};
