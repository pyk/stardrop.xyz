import type { Metadata } from "next";

import NavigationMenuLogo from "@/components/navigation-menu-logo";
import { Providers } from "@/components/providers";
import { CreateForm } from "@/components/create-form";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignInButton } from "@/components/sign-in-button";
import { Session } from "@/lib/session";
import { CreatePage } from "@/components/create-page";

export const metadata: Metadata = {
  title: "Create Stardrop | Stardrop",
  description: `Stardrop is a permissionless platform that allows you to reward
  others with special NFTs based on their on-chain activity`,
};

export default function Create() {
  return (
    <Providers>
      <main className="bg-white text-black min-h-screen flex flex-col">
        {/* Start Navigation */}
        <div className="flex justify-between w-full px-4 sm:px-6 md:px-7 lg:px-8 py-5">
          <Link href="/">
            <Icons.logoBox />
          </Link>
          <SignInButton />
        </div>
        {/* End Navigation */}
        {/* Start content */}
        <CreatePage />
        {/* End content */}
      </main>
    </Providers>
  );
}
