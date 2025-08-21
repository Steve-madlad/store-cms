"use client";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../button";
import { useParams, usePathname } from "next/navigation";
import { ThemeSwitcher } from "../shadcn-io/theme-switcher";

export default function Sidebar() {
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const params = useParams();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isMobile) setSidebarOpen(false);
  }, [isMobile]);

  const links = [
    {
      title: "Home",
      href: `/`,
      active: pathname === `/` ? true : false,
    },
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
    <Sheet open={sidebarOpen} onOpenChange={(value) => setSidebarOpen(value)}>
      <SheetTrigger
        onClick={() => setSidebarOpen(true)}
        asChild
        className={`${isMobile ? "flex-center" : "hidden"} cursor size-7 rounded-full p-0`}
      >
        <Button>
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-xl font-semibold">STORE</SheetTitle>
        </SheetHeader>

        <div className="col gap-3 px-4">
          {links.map((link) => (
            <Button
              variant={"link"}
              key={link.title}
              className={`block text-start ${link.active ? "font-bold" : "font-normal"}`}
              asChild
            >
              <Link onClick={() => setSidebarOpen(false)} href={link.href}>
                {link.title}
              </Link>
            </Button>
          ))}
        </div>

        <SheetFooter>
          <ThemeSwitcher className="w-fit" />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
