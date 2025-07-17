import { z } from "zod";

export const InsertProductSchema = z.object({
  name: z.string().min(3, "نام محصول باید حداقل ۳ کاراکتر باشد"),
  slug: z.string().min(3, "اسلاگ باید حداقل ۳ کاراکتر باشد"),
  categoryId: z.coerce
    .number("انتخاب دسته‌بندی الزامی است.")
    .int()
    .positive("شناسه دسته‌بندی نامعتبر است."),

  brandId: z.coerce
    .number("انتخاب برند الزامی است.")
    .int()
    .positive("شناسه برند نامعتبر است."),

  description: z.string().min(3, "توضیحات باید حداقل ۳ کاراکتر باشد"),
  stock: z.coerce.number(),
  images: z.array(z.string()).min(1, "محصول باید حداقل یک تصویر داشته باشد"),
  isFeatured: z.boolean().default(false),
  banner: z.string().nullable(),
  price: z.number().min(1000, "قیمت باید حداقل ۱,۰۰۰ تومان باشد"),
});

export const SignInUserSchema = z.object({
  email: z.email("لطفا یک ایمیل معتبر وارد کنید."),

  password: z
    .string()
    .min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد.")
    .regex(/^(?=.*[a-zA-Z])(?=.*\d).+$/, {
      message: "رمز عبور باید ترکیبی از حروف و اعداد باشد.",
    }),
});

export const SignUpUserSchema = z
  .object({
    name: z
      .string()
      .min(3, "نام باید حداقل ۳ کاراکتر باشد.")
      .max(30, "نام نمی‌تواند بیشتر از ۳۰ کاراکتر باشد."),

    email: z.email("لطفا یک ایمیل معتبر وارد کنید."),

    password: z
      .string()
      .min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد.")
      .regex(/^(?=.*[a-zA-Z])(?=.*\d).+$/, {
        message: "رمز عبور باید ترکیبی از حروف و اعداد باشد.",
      }),
    confirmPassword: z.string().min(1, "تکرار رمز عبور الزامی است."),
  })
  .refine((data) => data.confirmPassword === data.password, {
    error: "رمزهای عبور با یکدیگر مطابقت ندارند.",
    path: ["confirmPassword"],
  });

export const addToCartSchema = z.object({
  productId: z
    .uuid({ message: "فرمت شناسه محصول نامعتبر است." })
    .min(1, "شناسه محصول الزامی است"),

  quantity: z.coerce
    .number("تعداد باید به صورت عدد وارد شود.")
    .int({ message: "تعداد باید یک عدد صحیح باشد." })
    .min(1, { message: "تعداد محصول الزامی است " }),
});

export const CartSchema = z.object({
  userId: z.cuid("شناسه کاربر نامعتبر است "),
  sessionCartId: z.string("session نامعتبر است"),
});
