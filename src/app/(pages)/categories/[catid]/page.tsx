import { ProductI } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HeartIcon } from "lucide-react";
import Addtocart from "@/components/AddToCart/Addtocart";
import Icons from "@/components/icons/icons";

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
  const products: ProductI[] = json?.data ?? [];

  return (
    <div className="px-6 py-10">
      {/* العنوان */}
      <div className="flex justify-center mb-8">
        <h1
          className="
            text-3xl font-bold text-center 
            border-2 border-black 
            px-6 py-3 rounded-lg 
            transition-colors duration-300 
            hover:bg-black hover:text-white
          "
        >
          Category Products
        </h1>
      </div>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <p className="text-4xl font-bold text-gray-800 mb-4">
            Sorry, no products found in this category.
          </p>
          <p className="text-lg text-gray-600 font-bold max-w-xl">
            Try exploring another category that offers more products.
          </p>

          <Image
            src="/3820798.jpg"
            alt="No products"
            width={400}
            height={400}
            className="mb-6 opacity-80"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <Card key={p._id} className="relative group">
              {/* زرار القلب */}
              <button className="absolute top-3 right-3 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition">
                <HeartIcon className="w-5 h-5 text-black-500" />
              </button>

              {/* صورة المنتج */}
              <Link href={"/products/" + p._id}>
                <div className="relative w-full h-52">
                  <Image
                    src={p.imageCover}
                    alt={p.title}
                    fill
                    className="object-contain p-3"
                  />
                </div>
              </Link>

              {/* تفاصيل */}
              <CardHeader className="items-center">
                <CardTitle className="text-base font-semibold line-clamp-2">
                  {p.title.split(" ", 2).join(" ")}
                </CardTitle>
                <CardDescription className="text-sm text-gray-500">
                  {p.category?.name}
                </CardDescription>
                <span className="text-xs font-bold text-gray-400">
                  {p.brand?.name}
                </span>
              </CardHeader>

              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="flex">
                    <Icons />
                    <p className="text-sm font-bold ml-1">{p.ratingsAverage}</p>
                  </div>
                  <p className="text-sm">
                    Price:{" "}
                    <span className="font-bold">{p.price} EGP</span>
                  </p>
                </div>
              </CardContent>

              {/* زرار إضافة للعربية */}
              <Addtocart productId={p._id} />
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
