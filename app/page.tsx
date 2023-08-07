import Link from "next/link";
import Image from "next/image";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationLogoTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Plus, Globe, Star, Twitter } from "lucide-react";

export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen">
      {/* Start Navigation */}
      <div className="flex justify-between w-full px-2 py-4">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationLogoTrigger className="flex flex-row space-x-2">
                <Icons.logo className="h-6 w-6 fill-white stroke-white" />
                <span>Stardrop</span>
              </NavigationLogoTrigger>
              <NavigationMenuContent className="bg-white min-w-[320px] min-h-max px-2 py-6 rounded-lg flex flex-col space-y-4">
                <div>
                  <h3 className="text-slate-400 px-4">Navigation</h3>
                  <ul>
                    <li>
                      <Link
                        className="flex flex-row items-center space-x-2 text-slate-900 px-4 py-1 hover:bg-slate-100 rounded-md"
                        href="/"
                      >
                        <Plus size={16} />
                        <span>Create Stardrop</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="flex flex-row items-center space-x-2 text-slate-900 px-4 py-1 hover:bg-slate-100 rounded-md"
                        href="/"
                      >
                        <Globe size={16} />
                        <span>Explore Stardrop</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="flex flex-row items-center space-x-2 text-slate-900 px-4 py-1 hover:bg-slate-100 rounded-md"
                        href="/"
                      >
                        <Star size={16} />
                        <span>About</span>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-slate-400 px-4">Community</h3>
                  <ul>
                    <li>
                      <Link
                        className="flex flex-row items-center space-x-2 text-slate-900 px-4 py-1 hover:bg-slate-100 rounded-md"
                        href="/"
                      >
                        <Twitter size={16} />
                        <span>Follow Twitter</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="flex flex-row items-center space-x-2 text-slate-900 px-4 py-1 hover:bg-slate-100 rounded-md"
                        href="/"
                      >
                        <Icons.discord className="h-4 w-4 fill-black" />
                        <span>Join Discord</span>
                      </Link>
                    </li>
                    {/* <li>Subscribe Mirror</li>
                    <li>Join Zealy</li> */}
                  </ul>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <Button variant="ghost" asChild>
          <Link href="https://discord.gg/">
            <Icons.discord className="h-4 w-4 fill-white mr-2" />
            Join discord
          </Link>
        </Button>
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
