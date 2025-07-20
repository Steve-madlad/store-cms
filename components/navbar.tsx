import { SignedIn, UserButton } from "@clerk/nextjs";
import ThemeSwitch from "./themeSwitch";
import NavLinks from "./navLinks";
import { Options } from "@/models/components";
import db from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import StoreSelector from "./storeSelector";

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
      <div className="flex-center ml-auto">
        <SignedIn>
          <UserButton />
          <ThemeSwitch className="ml-2" />
        </SignedIn>
      </div>
    </div>
  );
}
