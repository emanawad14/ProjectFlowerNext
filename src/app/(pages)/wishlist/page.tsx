"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { Loader, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZDAzNDY0ZDYwNzI5YTkzNjc1ZTIyZSIsIm5hbWUiOiJFbW5tIHJlYWRhIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NTg0NzUzNjUsImV4cCI6MTc2NjI1MTM2NX0.KcqRqOjzpTaZe2R1ypTV_9FEzKOdN695t-bVjFITVec";

interface WishProduct {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
}

export default function Wishlist() {
  const [wishlist, setWishlist] = useState<WishProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState<string | null>(null);
  const [clearing, setClearing] = useState(false);

  async function fetchWishlist() {
    try {
      setLoading(true);
      const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: { token: TOKEN },
      });
      const data = await res.json();
      if (data.status === "success") {
        setWishlist(data.data);
      } else {
        toast.error(data.message || "Failed to load wishlist");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  }

  async function removeItem(productId: string) {
    try {
      setRemoving(productId);
      const res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        {
          method: "DELETE",
          headers: { token: TOKEN },
        }
      );
      const data = await res.json();
      if (data.status === "success") {
        toast.success("Removed from wishlist");
        setWishlist((prev) => prev.filter((p) => p._id !== productId));
      } else {
        toast.error(data.message || "Failed to remove");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error");
    } finally {
      setRemoving(null);
    }
  }

  async function clearWishlist() {
    try {
      setClearing(true);
      const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
        method: "DELETE",
        headers: { token: TOKEN },
      });
      const data = await res.json();
      if (data.status === "success") {
        toast.success("Wishlist cleared");
        setWishlist([]);
      } else {
        toast.error(data.message || "Failed to clear wishlist");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error");
    } finally {
      setClearing(false);
    }
  }

  useEffect(() => {
    fetchWishlist();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader className="animate-spin w-10 h-10 text-gray-500" />
      </div>
    );
  }

  if (wishlist.length === 0) {
    return (
      <div className="py-6 px-4">
        <p className="text-muted-foreground font-bold text-4xl flex justify-center items-center mt-10">
          Your wishlist is empty 💔
        </p>
        <div className="mt-6 flex justify-center items-center">
          <Button asChild>
            <a href="/products">Browse Products</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6 px-4">
      <div className="flex justify-center mb-8">
        <h1
          className="
            text-3xl font-bold text-center 
            border-2 border-black 
            px-6 py-3 rounded-lg 
            transition-colors duration-300 
            hover:bg-black hover:text-white
            cursor-pointer
          "
        >
         Wishlist
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((p) => (
          <Card
            key={p._id}
            className="overflow-hidden hover:shadow-lg transition flex flex-col"
          >
            <CardHeader className="p-0">
              <Image
                src={p.imageCover}
                alt={p.title}
                width={400}
                height={250}
                className="w-full h-48 object-cover"
              />
            </CardHeader>

            <CardContent className="p-4 flex-1">
              <CardTitle className="line-clamp-2 text-lg">{p.title}</CardTitle>
              <p className="font-bold text-gray-900 mt-2">{p.price} EGP</p>
            </CardContent>

            <CardFooter className="p-4">
              <Button
                onClick={() => removeItem(p._id)}
                disabled={removing === p._id}
                
                className="w-full flex items-center justify-center gap-2"
              >
                {removing === p._id ? (
                  <Loader className="animate-spin w-4 h-4" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
                Remove
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

     
     
    </div>
  );
}
