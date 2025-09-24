import { ProductI } from "@/interfaces";
import Image from "next/image";

interface Props {
  params: { catid: string };
}

export default async function CategoryDetails({ params }: Props) {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?category=${params.catid}`,
    {
      next: { revalidate: 10 * 60 }, // ISR
    }
  );

  const json = await response.json();
  const products: ProductI[] = json?.data ?? []; // fallback array

  return (
    <div className="px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Category Products</h1>

      {products.length === 0 ? (
        <p className="text-gray-600 text-center">
          No products found in this category.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
            >
              <Image
                src={p.imageCover}
                alt={p.title}
                width={300}
                height={200}
                className="w-full h-48 object-contain rounded-md mb-4"
              />
              <h2 className="font-semibold text-gray-800 text-lg">
                {p.title}
              </h2>
              <p className="text-gray-600 text-sm mb-2">
                {p.category?.name}
              </p>
              <p className="font-bold text-gray-900">${p.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
