"use client";

import { ProductI } from "@/interfaces/product";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { HeartIcon } from "lucide-react";
import Icons from "@/components/icons/icons";
import Link from "next/link";
import Addtocart from "@/components/AddToCart/Addtocart";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ProductPage() {
  const [products, setProducts] = useState<ProductI[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("default");

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch("https://ecommerce.routemisr.com/api/v1/products");
      const data = await response.json();
      setProducts(data.data);
    }
    fetchProducts();
  }, []);

  // 🔎 Apply search + filter + sort
  const filteredProducts = products
    .filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((p) => {
      if (filter === "priceUnder500") return p.price < 500;
      if (filter === "highRating") return p.ratingsAverage >= 4;
      return true;
    })
    .sort((a, b) => {
      if (sort === "priceAsc") return a.price - b.price;
      if (sort === "priceDesc") return b.price - a.price;
      if (sort === "rating") return b.ratingsAverage - a.ratingsAverage;
      return 0;
    });

  return (
    <div className="px-6 py-8">
      {/* 🔧 Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between items-center">
        <Input
          type="search"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="sm:w-1/3"
        />

        <div className="flex gap-4">
          {/* Filter */}
          <Select onValueChange={(val) => setFilter(val)} defaultValue="all">
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Products</SelectItem>
              <SelectItem value="priceUnder500">Price &lt; 500</SelectItem>
              <SelectItem value="highRating">Rating ≥ 4</SelectItem>
            </SelectContent>
          </Select>

          {/* Sort */}
          <Select onValueChange={(val) => setSort(val)} defaultValue="default">
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="priceAsc">Price: Low → High</SelectItem>
              <SelectItem value="priceDesc">Price: High → Low</SelectItem>
              <SelectItem value="rating">Best Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 🛒 Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product._id} className="relative group">
            <button className="absolute top-3 right-3 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition">
              <HeartIcon className="w-5 h-5 text-black-500" />
            </button>

            <Link href={"/products/" + product._id}>
              <div className="relative w-full h-52">
                <Image
                  src={product.imageCover}
                  alt={product.title}
                  fill
                  className="object-contain p-3"
                />
              </div>
            </Link>

            <CardHeader className="items-center">
              <CardTitle className="text-base font-semibold line-clamp-2">
                {product.title.split(" ", 2).join(" ")}
              </CardTitle>
              <CardDescription className="text-sm text-gray-500">
                {product.category?.name}
              </CardDescription>
              <CardAction className="text-xs font-bold text-gray-400">
                {product.brand?.name}
              </CardAction>
            </CardHeader>

            <CardContent>
              <div className="flex justify-between items-center">
                <div className="flex">
                  <Icons />
                  <p className="text-sm font-bold ml-1">
                    {product.ratingsAverage}
                  </p>
                </div>
                <p className="text-sm">
                  Price:{" "}
                  <span className="font-bold">{product.price} EGP</span>
                </p>
              </div>
            </CardContent>

            <Addtocart productId={product._id} />
          </Card>
        ))}
      </div>
    </div>
  );
}
