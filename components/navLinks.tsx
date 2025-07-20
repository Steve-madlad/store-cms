"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";

export default function NavLinks() {
  const pathname = usePathname();
  const params = useParams();

  const links = [
    {
      title: "Settings",
      href: "/settings",
      active: pathname === `/${params.storeId}/settings` ? true : false,
    },
  ];

  return (
    <div>
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
