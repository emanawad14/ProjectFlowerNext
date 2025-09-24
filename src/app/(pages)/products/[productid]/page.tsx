
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
import {
  Heart,
  Share,
  ShoppingBasketIcon,
  ShieldCheck,
  RefreshCw,
  Clock,
} from "lucide-react";
import Icons from "@/components/icons/icons";

export default async function ProductDetails({ params }: { params: Params }) {
  const { productid } = params;
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products/${productid}`,
    { cache: "no-store" }
  );

  const { data: product }: { data: ProductI } = await response.json();

  return (
    <div className="py-8 px-4">
      <div className="text-center max-w-3xl mx-auto mb-10">
  <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
    Product Details
  </h1>
  <p className="text-base md:text-lg text-gray-600 leading-relaxed">
    Experience the future of shopping with
    <span className="font-semibold text-gray-800">AI-powered recommendations</span>,
    holographic product previews, and
    <span className="font-semibold text-gray-800">Quantum-Fast delivery</span>.
  </p>
</div>


      <Card className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-start p-6 shadow-md">
        
        <div className="col-span-1 md:col-span-1 lg:col-span-2 w-full">
          <ProductCarousel images={product.images} title={product.title} />
        </div>

        
        <div className="col-span-1 md:col-span-1 lg:col-span-2 w-full space-y-6">
          <CardHeader>
            <CardTitle>
              <div className="flex justify-between items-center gap-4">
                <p className="text-3xl md:text-5xl font-bold text-gray-900">
                  {product?.price} EGP
                </p>
                <p className="text-lg flex items-center md:text-xl font-medium text-gray-700">
                  
                  <Icons/>
                  <Icons/>
                  <Icons/>
                  <Icons/>
                  {product?.ratingsQuantity}
                </p>
              </div>
            </CardTitle>
            <CardDescription>
              <p className="text-sm md:text-base text-gray-600 mt-2">
                <span className="font-semibold">{product?.category?.name}</span>
              </p>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              {product?.description}
            </p>
          </CardContent>

          
          <Addtocart productId={product.id} />

          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="flex items-center justify-center gap-2 bg-gray-100 border border-gray-300 hover:bg-black hover:text-white transition text-gray-800 font-medium py-2 px-6 rounded-full w-full sm:w-auto">
              <Heart className="w-5 h-5" /> Wishlist
            </button>
            <button className="flex items-center justify-center gap-2 bg-gray-100 border border-gray-300 hover:bg-black hover:text-white transition text-gray-800 font-medium py-2 px-6 rounded-full w-full sm:w-auto">
              <Share className="w-5 h-5" /> Share
            </button>
          </div>

         
          <div className="grid grid-cols-2 gap-4 pt-6">
            <div className="p-4 border rounded-xl flex items-start gap-3 shadow-sm bg-white">
              <ShoppingBasketIcon className="text-black w-6 h-6 mt-1" />
              <div className="text-left">
                <p className="font-medium">Free Shipping</p>
                <span className="text-sm text-gray-500">On orders above 500 EGP</span>
              </div>
            </div>

            <div className="p-4 border rounded-xl flex items-start gap-3 shadow-sm bg-white">
              <ShieldCheck className="text-black w-6 h-6 mt-1" />
              <div className="text-left">
                <p className="font-medium">Secure Payment</p>
                <span className="text-sm text-gray-500">100% protected checkout</span>
              </div>
            </div>

            <div className="p-4 border rounded-xl flex items-start gap-3 shadow-sm bg-white">
              <RefreshCw className="text-black w-6 h-6 mt-1" />
              <div className="text-left">
                <p className="font-medium">Easy Returns</p>
                <span className="text-sm text-gray-500">Return within 14 days</span>
              </div>
            </div>

            <div className="p-4 border rounded-xl flex items-start gap-3 shadow-sm bg-white">
              <Clock className="text-black w-6 h-6 mt-1" />
              <div className="text-left">
                <p className="font-medium">24/7 Support</p>
                <span className="text-sm text-gray-500">We’re here to help</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
