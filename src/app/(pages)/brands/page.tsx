import { CategoryI } from '@/interfaces';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function Brands() {
  const response = await fetch(`https://ecommerce.routemisr.com/api/v1/brands`);
  const { data } = await response.json();
  const categories: CategoryI[] = data;

  return (
    <div className=" px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-8">Our Brands</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
        {categories.map((c) => (
          <div
            key={c._id}
            className="flex flex-col items-center text-center group"
          >
            {/* Avatar with effects */}
            <Avatar className="w-30 h-30 border-2 border-black-500 shadow-md group-hover:scale-110 group-hover:shadow-xl transition-all duration-300">
              <AvatarImage src={c.image} alt={c.name} className="object-contain cursor-pointer p-2" />
              <AvatarFallback className="bg-gradient-to-br from-black to-red-500 text-white font-bold text-lg">
                {c.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            {/* Brand name */}
            <h2 className="mt-3 text-sm font-semibold cursor-pointer group-hover:text-red-600 transition-colors">
              {c.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}
