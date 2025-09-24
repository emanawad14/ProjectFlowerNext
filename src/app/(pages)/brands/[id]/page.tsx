"use client";
import { ProductI } from "@/interfaces";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function BrandDetails() {
  const { id } = useParams();
  const [products, setProducts] = useState<ProductI[]>([]);

  async function getBrandProducts() {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products?brand=${id}`
    );
    const { data } = await response.json();
    setProducts(data);
  }

  useEffect(() => {
    getBrandProducts();
  }, [id]);

  return (
    <div className="px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Brand Products</h1>

      {products.length === 0 ? (
        <p className="text-gray-600 text-center">No products found for this brand.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
            >
              <img
                src={p.imageCover}
                alt={p.title}
                className="w-full h-48 object-contain rounded-md mb-4"
              />
              <h2 className="font-semibold text-gray-800 text-lg">{p.title}</h2>
              <p className="text-gray-600 text-sm mb-2">{p.category?.name}</p>
              <p className="font-bold text-gray-900">${p.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
