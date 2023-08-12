import type { Metadata } from "next";

import { Providers } from "@/components/providers";
import { CreateForm } from "@/components/create-form";
import { Icons } from "@/components/icons";
import Link from "next/link";
import { SignInButton } from "@/components/sign-in-button";

export const metadata: Metadata = {
  title: "Create Stardrop | Stardrop",
  description: `Stardrop is a permissionless protocol to reward onchain activity with NFT. Powered by Zora`,
};

export default function Create() {
  return (
    <Providers>
      <main className="bg-white text-black min-h-screen flex flex-col">
        {/* Start Navigation */}
        <div className="flex justify-between w-full px-4 sm:px-6 md:px-7 lg:px-8 py-5">
          <Link href="/">
            <Icons.logoBox className="h-14 w-14" />
          </Link>
          <SignInButton size="jumbo" />
        </div>
        {/* End Navigation */}
        {/* Start content */}
        <CreateForm />
        {/* End content */}
      </main>
    </Providers>
  );
}
