import { ProductI } from '@/interfaces';
import Image from 'next/image';
import React from 'react';

interface Props {
  params: {
    productid: string; 
  };
}

export default async function ProductDetails({ params }: Props) {
  const { productid } = params;

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products/${productid}`,
    { cache: 'no-store' }
  );

  
  
  const { data: product }: { data: ProductI } =
   await response.json();

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
       
        <div className="flex justify-center">
          <Image
            src={product.imageCover}
            alt={product.title}
            width={400}
            height={400}
            className="rounded-xl shadow-lg object-cover"
          />
        </div>

       
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-gray-600">{product.description}</p>

          <div className="flex items-center gap-4">
            <span className="text-2xl font-semibold text-green-600">
              {product.price} EGP
            </span>
            {product.ratingsAverage && (
              <span className="text-yellow-500 font-medium">
               {product.ratingsAverage}/5
              </span>
            )}
          </div>

          <button className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
