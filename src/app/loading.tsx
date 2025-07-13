import Image from "next/image";
import React from "react";
import loader from "@/assets/loader.gif";

export default function loading() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Image src={loader} width={70} height={70} alt="Loading..." />
    </div>
  );
}
