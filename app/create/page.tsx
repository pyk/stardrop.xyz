import { Icons } from "@/components/icons";
import NavigationMenuLogo from "@/components/navigation-menu-logo";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Create Stardrop | Stardrop",
  description: `Stardrop is a permissionless platform that allows you to reward
  others with special NFTs based on their on-chain activity`,
};

export default function Create() {
  return (
    <main className="bg-black text-white min-h-screen">
      {/* Start Navigation */}
      <div className="flex justify-between w-full px-2 py-4">
        <NavigationMenuLogo />

        <Button variant="ghost" asChild>
          <Link href="https://discord.gg/">
            <Icons.discord className="h-4 w-4 fill-white mr-2" />
            Join discord
          </Link>
        </Button>
      </div>
      {/* End Navigation */}
      {/* Start content */}
      content here
      {/* End content */}
    </main>
  );
}
