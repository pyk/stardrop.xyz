import type { Metadata } from "next";

import { Providers } from "@/components/providers";
import { CreateForm } from "@/components/create-form";
import { Icons } from "@/components/icons";
import Link from "next/link";
import { SignInButton } from "@/components/sign-in-button";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Create Stardrop",
  description: `Stardrop is a permissionless protocol to reward onchain activity with NFT. Powered by Zora`,
};

export default function Create() {
  return (
    <Providers>
      <main className="bg-black text-white min-h-screen">
        {/* Start Navigation */}
        <div className="flex justify-between items-center w-full px-6 py-5 md:px-7 lg:px-8">
          {/* Start logo */}
          <Button variant="ghost" size="icon" asChild>
            <Link href="/" className="px-2 py-2">
              <Icons.logo className="h-6 w-6 fill-white" />
            </Link>
          </Button>
          {/* End logo */}

          {/* Start Sign in */}
          <SignInButton />
          {/* End Sign in */}
        </div>
        {/* End Navigation */}

        {/* End Navigation */}
        {/* Start content */}
        <CreateForm />
        {/* End content */}

        {/* Start Footer */}
        <div className="flex w-full px-6 py-10 mt-40 md:px-7 lg:px-8">
          <p className="text-sm font-medium mx-auto text-slate-400">
            &copy; 2023 Yan Brothers
          </p>
        </div>
        {/* End footer */}
      </main>
    </Providers>
  );
}
