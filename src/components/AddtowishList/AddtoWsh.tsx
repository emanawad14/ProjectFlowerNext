"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZDAzNDY0ZDYwNzI5YTkzNjc1ZTIyZSIsIm5hbWUiOiJFbW5tIHJlYWRhIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NTg0NzUzNjUsImV4cCI6MTc2NjI1MTM2NX0.KcqRqOjzpTaZe2R1ypTV_9FEzKOdN695t-bVjFITVec";

export default function AddtoWsh({ productId }: { productId: string }) {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [loading, setLoading] = useState(false);

  async function toggleWishlist() {
    setLoading(true);
    try {
      if (!isInWishlist) {
       
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
          method: "POST",
          body: JSON.stringify({ productId }),
          headers: {
            
            
            token: TOKEN,
            "Content-Type": "application/json",
          },
          
          
        });

        const data = await res.json();

        if (res.ok && data.status === "success") {
          setIsInWishlist(true);
          toast.success("Added Product Successfuly to wishlist ");
        } else {
          toast.error(data.message || "Failed to add");
        }
      } else {
        
        const res = await fetch(
          `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
          {
            method: "DELETE",
            headers: {
              token: TOKEN,
            },
          }
        );

        const data = await res.json();

        if (res.ok && data.status === "success") {
          setIsInWishlist(false);
          toast.success("Removed from wishlist ");
        } else {
          toast.error(data.message || "Failed to remove");
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error");
    }
    setLoading(false);
  }

  return (
    <button
      onClick={toggleWishlist}
      disabled={loading}
      className="absolute top-3 right-3 z-10 bg-white/80 cursor-pointer hover:bg-white p-2 rounded-full transition"
    >
      <Heart
        className={`w-5 h-5 transition ${
          isInWishlist ? "fill-black text-black" : "text-gray-900"
        }`}
      />
    </button>
  );
}
