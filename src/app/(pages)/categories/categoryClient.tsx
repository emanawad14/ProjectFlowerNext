"use client";

import React, { useState } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { HeartIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Addtocart from "@/components/AddToCart/Addtocart";
import { CategoryI } from "@/interfaces";
import AddtoWsh from "@/components/AddtowishList/AddtoWsh";

interface Props {
  products: CategoryI[];
}

export default function CategoriesClient({ products }: Props) {
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="px-4 py-6">
      <Input
        value={search}
        type="search"
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
        className="mb-6 mx-auto w-[50%]"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product._id} className="relative group">
           
           <AddtoWsh/>

            {/* 👇 link to category details */}
            <Link href={`/categories/${product._id}`}>
              <div className="relative w-full h-48">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-3"
                />
              </div>
            </Link>

            <CardHeader className="items-center">
              <CardTitle className="text-base font-semibold line-clamp-2">
                {product.name}
              </CardTitle>
              <CardDescription className="text-sm text-gray-500">
                {product.slug}
              </CardDescription>
            </CardHeader>
            
          </Card>
        ))}
      </div>
    </div>
  );
}
