"use client";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export default function Navbar() {
  return (
    <div className="max-w-[2000px] mx-auto">
      <NavigationMenu>
        <Link href="/teacher" className="text-bold">
          SMKN 1RL
        </Link>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/teacher" legacyBehavior passHref>
              <NavigationMenuLink>Documentation</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
