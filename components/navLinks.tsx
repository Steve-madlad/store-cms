"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

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
      title: "Billboards",
      href: `/store/${params.storeId}/billboards`,
      active: pathname === `/store/${params.storeId}/billboards` ? true : false,
    },
    {
      title: "Categories",
      href: `/store/${params.storeId}/categories`,
      active: pathname === `/store/${params.storeId}/categories` ? true : false,
    },
    {
      title: "Sizes",
      href: `/store/${params.storeId}/sizes`,
      active: pathname === `/store/${params.storeId}/sizes` ? true : false,
    },
    {
      title: "Colors",
      href: `/store/${params.storeId}/colors`,
      active: pathname === `/store/${params.storeId}/colors` ? true : false,
    },
    {
      title: "Products",
      href: `/store/${params.storeId}/products`,
      active: pathname === `/store/${params.storeId}/products` ? true : false,
    },
    {
      title: "Orders",
      href: `/store/${params.storeId}/orders`,
      active: pathname === `/store/${params.storeId}/orders` ? true : false,
    },
    {
      title: "Settings",
      href: `/store/${params.storeId}/settings`,
      active: pathname === `/store/${params.storeId}/settings` ? true : false,
    },
  ];

  return (
    <div className="xy-center hidden gap-6 lg:flex">
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
