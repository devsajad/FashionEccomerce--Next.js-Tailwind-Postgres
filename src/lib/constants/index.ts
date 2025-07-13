export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "storeName";

export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  "A modern store built with Next.js";

export const LATES_PRODUCTS_LIMIT =
  Number(process.env.LATES_PRODUCTS_LIMIT) || 4;

export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
