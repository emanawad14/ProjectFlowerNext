"use client";

import React, { useContext } from "react";
import Link from "next/link";
import { ShoppingCart, UserIcon, Menu, Loader } from "lucide-react";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"; 
import { CartContext } from "../Context/CartContext";

export default function Navbar() {

 const {isLoading , cartData} =useContext(CartContext)
  return (
    <nav className="sticky top-0 z-50 bg-gray-50 shadow py-2 text-lg font-semibold">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
         
          <h1 className="text-2xl font-bold">
            <Link href={"/"}>ShopMart</Link>
          </h1>

         
          <div className="hidden md:block">
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
          </div>

         
          <div className="flex items-center gap-4">
          
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-0">
                <UserIcon className="w-6 h-6" />
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

           
           
           <Link href={'/cart'}>
            <div className="relative p-2">
              <ShoppingCart className="w-6 h-6" />
              <Badge className="h-5 min-w-5 flex items-center justify-center rounded-full px-1 absolute -top-1 -end-1">
                {isLoading ?<Loader/> : cartData?.numOfCartItems}
              </Badge>
            </div>

           </Link>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger>
                  <Menu className="w-7 h-7" />
                </SheetTrigger>
                <SheetContent side="left" className="p-4">
                  <nav className="flex flex-col gap-4 text-lg">
                    <Link href="/products">Products</Link>
                    <Link href="/categories">Categories</Link>
                    <Link href="/brands">Brands</Link>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
