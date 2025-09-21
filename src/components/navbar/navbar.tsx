import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Badge, ShoppingCartIcon, UserIcon } from "lucide-react";

export default function Navbar() {
  return (
    <>
      <nav className="py-2 bg-gray-50 shadow text-2xl font-semibold">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <h1>
              <Link href={"/"}>ShopMart</Link>
            </h1>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/products">Products</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/categories">Categories</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/brands">Brands</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <div className="flex gap-6">
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-0">
                  <UserIcon />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <Link href={"/profile"}>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                  </Link>
                  <Link href={"/login"}>
                    <DropdownMenuItem>Login</DropdownMenuItem>
                  </Link>
                  <Link href={"/register"}>
                    <DropdownMenuItem>Register</DropdownMenuItem>
                  </Link>

                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="relative p-3">
                <ShoppingCartIcon />
                <Badge className="h-5 min-w-3 rounded-full px-1 absolute top-0 end-0">4</Badge>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
