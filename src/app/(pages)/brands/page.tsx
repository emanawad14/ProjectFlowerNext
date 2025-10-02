import { CategoryI } from '@/interfaces';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export default async function Brands() {
  const response = await fetch(`https://ecommerce.routemisr.com/api/v1/brands`);
  const { data } = await response.json();
  const categories: CategoryI[] = data;

  return (
    <div className="px-4 py-8">
      <h2 className="text-5xl font-bold text-center  mb-8">Our Brands</h2>
      <p className="text-2xl font-bold text-center  mb-8">All the brands you love in one place</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
        {categories.map((c) => (
          <Link href={`/brands/${c._id}`} key={c._id}>
            <div className="flex flex-col items-center text-center group cursor-pointer">
              <Avatar className="w-28 h-28 border-2 border-gray-200 shadow-md group-hover:scale-110 group-hover:shadow-xl transition-all duration-300">
                <AvatarImage
                  src={c.image}
                  alt={c.name}
                  className="object-contain p-2 grayscale group-hover:grayscale-0 transition-all duration-300"
                />
                <AvatarFallback className="bg-gray-200 text-gray-800 font-bold text-lg">
                  {c.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <h2 className="mt-3 text-sm font-semibold group-hover:text-black transition-colors">
                {c.name}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

