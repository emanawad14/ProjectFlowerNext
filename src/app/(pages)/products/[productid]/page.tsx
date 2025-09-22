// "use client";

// import { ProductI } from "@/interfaces";
// import Image from "next/image";
// import React, { useState, useEffect } from "react";

// export default function ProductDetails({
//   params,
// }: {
//   params: Promise<{ productid: string }>;
// }) {
//   // ✅ نفك params باستخدام React.use()
//   const { productid } = React.use(params);

//   const [product, setProduct] = useState<ProductI | null>(null);
//   const [mainImage, setMainImage] = useState<string>("");

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await fetch(
//           `https://ecommerce.routemisr.com/api/v1/products/${productid}`,
//           { cache: "no-store" }
//         );
//         const { data } = await response.json();
//         setProduct(data);
//         setMainImage(data.imageCover); // أول صورة تبقى الأساسية
//       } catch (error) {
//         console.error("Error fetching product:", error);
//       }
//     };

//     fetchProduct();
//   }, [productid]);

//   if (!product) {
//     return <p className="text-center py-10">Loading...</p>;
//   }

//   return (
//     <div className="container mx-auto px-6 py-10">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
//         {/* ===== Left: Images ===== */}
//         <div>
//           {/* Main Image */}
//           <div className="flex justify-center mb-6">
//             <Image
//               src={mainImage}
//               alt={product.title}
//               width={400}
//               height={400}
//               className="rounded-xl shadow-lg object-cover"
//             />
//           </div>

//           {/* Thumbnails */}
//           <div className="flex justify-center gap-3">
//             {product.images?.map((img, index) => (
//               <Image
//                 key={index}
//                 src={img}
//                 alt={`${product.title}-${index}`}
//                 width={80}
//                 height={80}
//                 onClick={() => setMainImage(img)} // ✅ يغير الصورة الكبيرة
//                 className={`rounded-lg border cursor-pointer hover:scale-105 transition
//                   ${mainImage === img ? "ring-2 ring-blue-500" : ""}`}
//               />
//             ))}
//           </div>
//         </div>

//         {/* ===== Right: Details ===== */}
//         <div className="space-y-6">
//           {/* Title */}
//           <h1 className="text-3xl font-bold">{product.title}</h1>

//           {/* Description */}
//           <p className="text-gray-600">{product.description}</p>

//           {/* Price + Discount */}
//           <div className="flex items-center gap-4">
//             <span className="text-2xl font-semibold text-green-600">
//               {product.priceAfterDiscount
//                 ? `${product.priceAfterDiscount} EGP`
//                 : `${product.price} EGP`}
//             </span>
//             {product.priceAfterDiscount && (
//               <span className="line-through text-gray-500 text-lg">
//                 {product.price} EGP
//               </span>
//             )}
//           </div>

//           {/* Rating */}
//           <div className="flex items-center gap-2">
//             <span className="text-yellow-500 font-medium">
//               ⭐ {product.ratingsAverage}/5
//             </span>
//             <span className="text-sm text-gray-500">
//               ({product.ratingsQuantity} reviews)
//             </span>
//           </div>

//           {/* Add to Cart */}
//           <button className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition">
//             Add to Cart
//           </button>

//           {/* Extra Features */}
//           <div className="grid grid-cols-2 gap-4 pt-6">
//             <div className="p-4 border rounded-xl text-center shadow-sm">
//               <p className="font-medium">🚚 Free Shipping</p>
//               <span className="text-sm text-gray-500">
//                 Free shipping on orders over 500 EGP
//               </span>
//             </div>
//             <div className="p-4 border rounded-xl text-center shadow-sm">
//               <p className="font-medium">↩️ Easy Returns</p>
//               <span className="text-sm text-gray-500">
//                 Return within 7 days
//               </span>
//             </div>
//             <div className="p-4 border rounded-xl text-center shadow-sm">
//               <p className="font-medium">🛡️ Warranty</p>
//               <span className="text-sm text-gray-500">1-year coverage</span>
//             </div>
//             <div className="p-4 border rounded-xl text-center shadow-sm">
//               <p className="font-medium">📞 Support</p>
//               <span className="text-sm text-gray-500">24/7 support</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { ProductI } from "@/interfaces";
import { Params } from "next/dist/server/request/params";
import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Addtocart from "@/components/AddToCart/Addtocart";

import ProductCarousel from "@/components/EmanCarsoul/EmanCar";

export default async function ProductDetails({ params }: { params: Params }) {
  const { productid } = params;
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products/${productid}`
  );

  const { data: product }: { data: ProductI } = await response.json();

  return (
    <div className="py-8 px-4">
      <h2 className="text-xl md:text-2xl font-semibold mb-6 text-center md:text-left">
        Product Details
      </h2>

      <Card className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
        
        <div className="col-span-1 md:col-span-1 lg:col-span-2 w-full">
          <ProductCarousel images={product.images} title={product.title} />
        </div>

        {/* التفاصيل */}
        <div className="col-span-1 md:col-span-1 lg:col-span-2 w-full space-y-4 p-4 bg-red-200 rounded-lg">
          <CardHeader>
            <CardTitle>
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                <p className="text-lg md:text-xl font-bold text-gray-800">
                  {product?.price} EGP
                </p>
                <p className="text-base md:text-lg text-gray-700">
                  {product?.title}
                </p>
              </div>
            </CardTitle>
            <CardDescription>
              <div className="flex flex-col sm:flex-row justify-between gap-3 text-gray-600">
                <p>{product?.category?.name}</p>
              </div>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              {product?.description}
            </p>
          </CardContent>

          <Addtocart productId={product.id} />

          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-full w-full sm:w-auto">
              WishList
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-full w-full sm:w-auto">
              WishList
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
