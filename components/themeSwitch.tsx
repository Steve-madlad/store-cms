"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Button } from "./ui/custom/button";
import { useUser } from "@clerk/nextjs";

export default function ThemeSwitch({ className }: { className?: string }) {
  const { setTheme } = useTheme();
  const { isSignedIn } = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn(className)} asChild>
        <Button
          className={`w-${isSignedIn ? "7" : "8"} h-${isSignedIn ? "7" : "8"} rounded-full focus-visible:ring-4`}
        >
          <Moon className="hidden dark:block" />
          <Sun className="dark:hidden" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
