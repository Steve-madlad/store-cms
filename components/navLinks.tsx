"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";

export default function NavLinks() {
  const pathname = usePathname();
  const params = useParams();

  const links = [
    {
      title: "Overview",
      href: `/store/${params.storeId}`,
      active: pathname === `/store/${params.storeId}` ? true : false,
    },
    {
      title: "Settings",
      href: `/store/${params.storeId}/settings`,
      active: pathname === `/store/${params.storeId}/settings` ? true : false,
    },
    {
      title: "Categories",
      href: `/store/${params.storeId}/categories`,
      active: pathname === `/store/${params.storeId}/categories` ? true : false,
    },
    {
      title: "Billboards",
      href: `/store/${params.storeId}/billboards`,
      active: pathname === `/store/${params.storeId}/billboards` ? true : false,
    },
  ];

  return (
    <div className="flex-center gap-6">
      {links.map((link) => (
        <Link
          className={`${link.active ? "font-semibold" : "text-muted-foreground"} hover:text-foreground`}
          key={link.title}
          href={link.href}
        >
          {link.title}
        </Link>
      ))}
    </div>
  );
}
