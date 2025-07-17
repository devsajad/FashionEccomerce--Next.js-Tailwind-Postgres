import { hashSync } from "bcrypt-ts-edge";
import { Role } from "@prisma/client";

export const brandsToCreate = [
  { name: "Polo" },
  { name: "Brooks Brothers" },
  { name: "Tommy Hilfiger" },
  { name: "Calvin Klein" },
];

export const categoriesToCreate = [
  { name: "پیراهن رسمی مردانه" },
  { name: "هودی و سویشرت مردانه" },
];

export const productsToCreate = [
  {
    name: "پیراهن مردانه کشی پولو",
    slug: "polo-sporting-stretch-shirt",
    description: "استایل کلاسیک پولو با راحتی مدرن",
    images: [
      "/images/sample-products/p1-1.jpg",
      "/images/sample-products/p1-2.jpg",
    ],
    price: 1850000,
    rating: 4.5,
    numReviews: 12,
    stock: 5,
    isFeatured: true,
    banner: "/images/banners/banner-1.jpg",
    brandName: "Polo",
    categoryName: "پیراهن رسمی مردانه",
  },
  {
    name: "پیراهن آستین بلند Brooks Brothers",
    slug: "brooks-brothers-long-sleeved-shirt",
    description: "استایلی ماندگار و راحتی بی‌نظیر",
    images: [
      "/images/sample-products/p2-1.jpg",
      "/images/sample-products/p2-2.jpg",
    ],
    price: 2500000,
    rating: 4.2,
    numReviews: 8,
    stock: 10,
    isFeatured: true,
    banner: "/images/banners/banner-2.jpg",
    brandName: "Brooks Brothers",
    categoryName: "پیراهن رسمی مردانه",
  },
  {
    name: "پیراهن کلاسیک Tommy Hilfiger",
    slug: "tommy-hilfiger-classic-fit-dress-shirt",
    description: "ترکیبی عالی از زیبایی و راحتی",
    images: [
      "/images/sample-products/p3-1.jpg",
      "/images/sample-products/p3-2.jpg",
    ],
    price: 3200000,
    rating: 4.9,
    numReviews: 25,
    stock: 0,
    isFeatured: false,
    banner: null,
    brandName: "Tommy Hilfiger",
    categoryName: "پیراهن رسمی مردانه",
  },
  {
    name: "پیراهن اسلیم فیت Calvin Klein",
    slug: "calvin-klein-slim-fit-stretch-shirt",
    description: "طراحی مدرن با پارچه کشی و انعطاف‌پذیر",
    images: [
      "/images/sample-products/p4-1.jpg",
      "/images/sample-products/p4-2.jpg",
    ],
    price: 1500000,
    rating: 3.6,
    numReviews: 5,
    stock: 15,
    isFeatured: false,
    banner: null,
    brandName: "Calvin Klein",
    categoryName: "پیراهن رسمی مردانه",
  },
  {
    name: "پیراهن آکسفورد رالف لورن",
    slug: "polo-ralph-lauren-oxford-shirt",
    description: "طراحی نمادین پولو با پارچه آکسفورد باکیفیت",
    images: [
      "/images/sample-products/p5-1.jpg",
      "/images/sample-products/p5-2.jpg",
    ],
    price: 2800000,
    rating: 4.7,
    numReviews: 18,
    stock: 6,
    isFeatured: false,
    banner: null,
    brandName: "Polo",
    categoryName: "پیراهن رسمی مردانه",
  },
  {
    name: "هودی کلاسیک صورتی پولو",
    slug: "polo-classic-pink-hoodie",
    description: "نرم، شیک و عالی برای روزهای کژوال",
    images: [
      "/images/sample-products/p6-1.jpg",
      "/images/sample-products/p6-2.jpg",
    ],
    price: 3500000,
    rating: 4.6,
    numReviews: 12,
    stock: 8,
    isFeatured: true,
    banner: null,
    brandName: "Polo",
    categoryName: "هودی و سویشرت مردانه",
  },
];

export const usersToCreate = [
  {
    name: "admin",
    email: "admin@mail.com",
    password: hashSync("123456", 10),
    role: Role.ADMIN,
  },
  {
    name: "user",
    email: "user@mail.com",
    password: hashSync("123456", 10),
    role: Role.USER,
  },
];
