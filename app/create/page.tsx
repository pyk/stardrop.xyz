import type { Metadata } from "next";

import { Providers } from "@/components/providers";
import { CreateForm } from "@/components/create-form";
import { Icons } from "@/components/icons";
import Link from "next/link";
import { SignInButton } from "@/components/sign-in-button";

export const metadata: Metadata = {
  title: "Create Stardrop",
  description: `Stardrop is a permissionless protocol to reward onchain activity with NFT. Powered by Zora`,
};

export default function Create() {
  return (
    <Providers>
      <main className="bg-black text-white min-h-screen flex flex-col antialiased">
        {/* Start Navigation */}
        <div className="flex flex-row justify-between w-full px-4 sm:px-6 md:px-7 lg:px-8 py-5 space-x-2">
          <Link className="p-2" href={"/"}>
            <Icons.logo className="h-6 w-6 fill-white stroke-white" />
          </Link>

          <SignInButton />
        </div>
        {/* End Navigation */}
        {/* Start content */}
        <CreateForm />
        {/* End content */}

        {/* Start footer */}
        <div className="flex flex-col items-center w-full px-4 sm:px-6 md:px-7 lg:px-8 py-20 space-y-1">
          <div className="text-center text-base text-white/60">
            Stardrop is a permissionless protocol for rewarding onchain
            activity with NFT
          </div>
          <div className="flex flex-col space-y-2">
            <div className="text-base text-white/60">Powered by</div>
            <Link href="https://zora.co" target="blank">
              <Icons.zoraText className="w-25" />
            </Link>
          </div>
        </div>
        {/* End footer */}
      </main>
    </Providers>
  );
}
