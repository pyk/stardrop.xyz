import Link from "next/link";
import Image from "next/image";

import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  PackagePlus,
  ArrowRightLeft,
  Rainbow,
  Vote,
  RefreshCcw,
  MoreHorizontal,
} from "lucide-react";

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
      <div
        className={cn(
          // Shape
          "flex flex-col w-100 mx-6 my-6 md:mx-7 md:my-7 lg:mx-8 lg:my-8 px-6 py-16 sm:py-20 md:py-28 lg:py-44 space-y-4 sm:space-y-6 md:space-y-8",
          // Styles
          "ring-1 ring-white/10 rounded-2xl bg-[url('/hero-bg-checker.svg')] bg-cover bg-center"
        )}
      >
        <div className="text-center">
          <span className="text-sm md:text-base font-medium py-2 px-4 rounded-full bg-white/5 ring-2 ring-white/10 text-center">
            Boost Onchain Participation
          </span>
        </div>
        <div>
          <h1 className="text-3xl font-medium sm:text-5xl md:text-6xl text-center max-w-2xl mx-auto">
            Reward Any Smart Contract Interaction with NFTs
          </h1>
        </div>

        <div className="flex flex-row space-x-2 flex-wrap justify-center md:hidden">
          <Button variant="ghost" size="icon" className="ring-1 ring-white/10">
            <ArrowRightLeft size={24} />
          </Button>
          <Button variant="ghost" size="icon" className="ring-1 ring-white/10">
            <Rainbow size={24} />
          </Button>
          <Button variant="ghost" size="icon" className="ring-1 ring-white/10">
            <Vote size={24} />
          </Button>
          <Button variant="ghost" size="icon" className="ring-1 ring-white/10">
            <RefreshCcw size={24} />
          </Button>
          <Button variant="ghost" size="icon" className="ring-1 ring-white/10">
            <MoreHorizontal size={24} />
          </Button>
        </div>

        <div className="hidden md:flex flex-row space-x-2 flex-wrap justify-center">
          <Button variant={"ghost"} className="ring-1 ring-white/10">
            <ArrowRightLeft size={24} className="mr-2" />
            Transfer
          </Button>
          <Button variant={"ghost"} className="ring-1 ring-white/10">
            <Rainbow size={24} className="mr-2" />
            Bridge
          </Button>
          <Button variant={"ghost"} className="ring-1 ring-white/10">
            <Vote size={24} className="mr-2" />
            Vote
          </Button>
          <Button variant={"ghost"} className="ring-1 ring-white/10">
            <RefreshCcw size={24} className="mr-2" />
            Swap
          </Button>
          <Button variant={"ghost"} className="ring-1 ring-white/10">
            <MoreHorizontal size={24} className="mr-2" />
            More
          </Button>
        </div>
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
