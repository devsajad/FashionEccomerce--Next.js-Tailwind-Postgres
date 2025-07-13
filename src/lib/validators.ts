import { z } from "zod";

export const InsertProductSchema = z.object({
  name: z.string().min(3, "نام محصول باید حداقل ۳ کاراکتر باشد"),
  slug: z.string().min(3, "اسلاگ باید حداقل ۳ کاراکتر باشد"),
  category: z.string().min(3, "دسته‌بندی باید حداقل ۳ کاراکتر باشد"),
  brand: z.string().min(3, "برند باید حداقل ۳ کاراکتر باشد"),
  description: z.string().min(3, "توضیحات باید حداقل ۳ کاراکتر باشد"),
  stock: z.coerce.number(),
  images: z.array(z.string()).min(1, "محصول باید حداقل یک تصویر داشته باشد"),
  isFeatured: z.boolean().default(false),
  banner: z.string().nullable(),
  price: z.number().min(1000, "قیمت باید حداقل ۱,۰۰۰ تومان باشد"),
});
