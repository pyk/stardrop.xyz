import Link from "next/link";
import { Icons } from "./icons";
import {
  NavigationLogoTrigger,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
} from "./ui/navigation-menu";
import { Globe, Plus, Star, Twitter } from "lucide-react";

export default function NavigationMenuLogo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationLogoTrigger className="flex flex-row space-x-2">
            <Icons.logo className="h-6 w-6 fill-white stroke-white" />
            <span>Stardrop</span>
          </NavigationLogoTrigger>
          <NavigationMenuContent className="bg-white min-w-[320px] min-h-max px-4 py-6 rounded-xl flex flex-col space-y-4">
            <div>
              <h3 className="text-slate-400 px-4 mb-2">Navigation</h3>
              <ul className="flex flex-col space-y-1">
                <li>
                  <Link
                    className="flex flex-row items-center space-x-2 text-slate-900 px-4 py-2 hover:bg-slate-100 rounded-md button-focus-visible"
                    href="/"
                  >
                    <Plus size={16} />
                    <span>Create Stardrop</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="flex flex-row items-center space-x-2 text-slate-900 px-4 py-2 hover:bg-slate-100 rounded-md button-focus-visible"
                    href="/"
                  >
                    <Globe size={16} />
                    <span>Explore Stardrop</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="flex flex-row items-center space-x-2 text-slate-900 px-4 py-2 hover:bg-slate-100 rounded-md button-focus-visible"
                    href="/"
                  >
                    <Star size={16} />
                    <span>About</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-slate-400 px-4 mb-2">Community</h3>
              <ul className="flex flex-col space-y-1">
                <li>
                  <Link
                    className="flex flex-row items-center space-x-2 text-slate-900 px-4 py-2 hover:bg-slate-100 rounded-md button-focus-visible"
                    href="/"
                  >
                    <Twitter size={16} />
                    <span>Follow Twitter</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="flex flex-row items-center space-x-2 text-slate-900 px-4 py-2 hover:bg-slate-100 rounded-md button-focus-visible"
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
  );
}
