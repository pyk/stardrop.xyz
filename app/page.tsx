import Link from "next/link";
import Image from "next/image";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen">
      <div className="flex justify-between w-full px-2 py-4">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent hover:bg-white/20 hover:text-white data-[state=open]:bg-white/20 flex flex-row space-x-2 focus:bg-transparent focus:text-white focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-500">
                <Image
                  className=""
                  src="/stardrop.svg"
                  alt="Stardrop Logo"
                  width={24}
                  height={24}
                  priority
                />
                <span>Stardrop</span>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink>Link</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <button>discord</button>
      </div>
    </main>
  );
}
