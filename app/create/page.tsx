import type { Metadata } from "next";

import { ButtonSignIn } from "@/components/button-sign-in";
import NavigationMenuLogo from "@/components/navigation-menu-logo";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "Create Stardrop | Stardrop",
  description: `Stardrop is a permissionless platform that allows you to reward
  others with special NFTs based on their on-chain activity`,
};

export default function Create() {
  return (
    <Providers>
      <main className="bg-black text-white min-h-screen">
        {/* Start Navigation */}
        <div className="flex justify-between w-full px-2 py-4">
          <NavigationMenuLogo />
          <ButtonSignIn />
        </div>
        {/* End Navigation */}
        {/* Start content */}
        content here
        {/* End content */}
      </main>
    </Providers>
  );
}
