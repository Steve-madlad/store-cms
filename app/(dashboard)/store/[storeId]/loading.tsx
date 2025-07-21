import Navbar from "@/components/navbar";
import React from "react";

export default function loading() {
  return (
    <div>
      <Navbar />
      <div className="bg-muted h-61 w-112.5 animate-pulse"></div>
    </div>
  );
}
