import { ProductI } from '@/interfaces/product';
import React from 'react';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { HeartIcon, ShoppingCartIcon } from 'lucide-react';
import Icons from '@/components/icons/icons';
import next from 'next';
import Link from 'next/link';

export default async function Product() {
  const response = await fetch('https://ecommerce.routemisr.com/api/v1/products' ,
  
    {
        next:{
      revalidate:10*60
    }
    }
  );
  const data = await response.json();
  const products: ProductI[] = data.data; 

  return (
    <div className=" px-4 py-6">
     
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product._id} className="relative group">
            
            
            <button className="absolute top-3 right-3 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition">
              <HeartIcon className="w-5 h-5 text-red-500" />
            </button>

           
          
          <Link href={'/products/'+product._id}>
          
            <div className="relative w-full h-50">
              <Image
                src={product.imageCover}
                alt={product.title}
                fill
                className="object-contain p-3"
              />
            </div>
          </Link>

            <CardHeader className='items-center'>
              <CardTitle className="text-base font-semibold line-clamp-2">
                {product.title.split(' ', 2).join(' ')}
              </CardTitle>
              <CardDescription className="text-sm text-gray-500">
                {product.category.name}
              </CardDescription>
              <CardAction className="text-xs text-gray-400">
                {product.brand.name}
              </CardAction>
            </CardHeader>

            <CardContent>
              <div className="flex justify-between items-center">
               
               <div className='flex'>
                 <Icons />
                <p className="text-sm font-bold">{product.ratingsAverage} 
  
                </p>
               </div>
                 <p className=" text-sm">
                Price : <span className="font-bold">{product.price} EGP</span>
              </p>
              </div>
             
             
            </CardContent>

            <CardFooter className="gap-3">
              <Button className="grow flex items-center gap-2">
                <ShoppingCartIcon className="w-4 h-4" />
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
