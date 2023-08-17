import Link from "next/link";
import Image from "next/image";

import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { PackagePlus } from "lucide-react";

export default function Home() {
  return (
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

        {/* Start Create Stardrop */}
        <Button asChild>
          <Link href="/create">
            <PackagePlus size={24} className="mr-2" />
            Create Stardrop
          </Link>
        </Button>
        {/* End Create stardrop */}
      </div>
      {/* End Navigation */}

      {/* Start hero */}
      <div className="flex flex-col w-100 mx-6 px-4 py-6 border border-white/20 rounded-xl">
        <div>
          <h1 className="text-2xl">
            Reward your users with NFTs, the easy way
          </h1>
          <p>
            Stardrop is a permissionless platform that allows you to reward
            others with special NFTs based on their on-chain activity
          </p>
        </div>
        <div>image</div>
      </div>
      {/* End hero */}
    </main>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
