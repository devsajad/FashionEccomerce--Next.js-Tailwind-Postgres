import { APP_NAME } from "@/lib/constants";
import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t">
      <div className="p-5 flex-center text-xs">
        {currentYear} {APP_NAME} | تمام حقوق این وبسایت محفوظ است
      </div>
    </footer>
  );
}
