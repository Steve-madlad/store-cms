import db from "@/lib/prisma";
import { Options } from "@/models/components";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import NavLinks from "./navLinks";
import StoreSelector from "./storeSelector";
import ThemeSwitch from "./themeSwitch";
import Sidebar from "./ui/custom/sidebar";

export default async function Navbar() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const stores = await db.store.findMany({
    where: {
      userId,
    },
  });

  const storeOptions: Options[] = stores.map((store) => ({
    value: store.id,
    label: store.name,
  }));

  return (
    <div className="flex-center gap-6 border-b px-6 py-2">
      <StoreSelector storeOptions={storeOptions} />

      <NavLinks />
      <div className="flex-center ml-auto space-x-2">
        <SignedIn>
          <UserButton />
          <ThemeSwitch />
          <Sidebar />
        </SignedIn>
      </div>
    </div>
  );
}
