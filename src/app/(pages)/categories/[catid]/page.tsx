import { CategoryI } from '@/interfaces';
import React from 'react';

interface Props {
  params: { catid: string }; 
}

export default async function CategoriesDetails({ params }: Props) {
  const { catid } = params;

  const response = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${catid}`, {
    cache: "no-store", 
  });

  if (!response.ok) {
    return <h2 className="text-red-500">Error fetching category</h2>;
  }

  const { data } = await response.json();
  const category: CategoryI = data;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Category Details</h2>
      <img src={category.image} alt={category.name} className="w-40 h-40 object-contain mb-4" />
      <h2 className="text-lg">{category.name}</h2>
      <p className="text-gray-500">{category.slug}</p>
    </div>
  );
}
