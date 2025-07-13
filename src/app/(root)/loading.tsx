import Image from "next/image";
import React from "react";
import loader from "@/assets/loader.gif";

export default function loading() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Image src={loader} width={70} height={70} alt="Loading..." />
    </div>
  );
}
