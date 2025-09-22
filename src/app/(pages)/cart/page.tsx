"use client";

import Loading from "@/app/loading";
import { CartContext } from "@/components/Context/CartContext";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/Helpers/formatCurrency";
import { CartResponse } from "@/interfaces";
import { Loader, Trash2 } from "lucide-react";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";

export default function Cart() {
  const { cartData, isLoading, setcartData } = useContext(CartContext);

  
  const [removing, setRemoving] = useState<string | null>(null);

  
  const [updating, setUpdating] = useState<string | null>(null);

  
  const [clearing, setClearing] = useState<boolean>(false);

  async function removeCartItem(productId: string) {
    try {
      setRemoving(productId);
      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/cart/" + productId,
        {
          method: "DELETE",
          headers: {
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZDAzNDY0ZDYwNzI5YTkzNjc1ZTIyZSIsIm5hbWUiOiJFbW5tIHJlYWRhIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NTg0NzUzNjUsImV4cCI6MTc2NjI1MTM2NX0.KcqRqOjzpTaZe2R1ypTV_9FEzKOdN695t-bVjFITVec",
          },
        }
      );
      const data: CartResponse = await response.json();

      if (data.status === "success") {
        toast.success("Product removed successfully");
        setcartData(data);
      } else {
        toast.error(data.message || "Failed to remove product");
      }
    } catch (err) {
      toast.error("Network error");
      console.error(err);
    } finally {
      setRemoving(null);
    }
  }

  async function updatedCartItemCount(productId: string, count: number) {
    try {
      setUpdating(productId);

      if (count === 0) {
       
        await removeCartItem(productId);
        return;
      }

      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/cart/" + productId,
        {
          method: "PUT",
          body: JSON.stringify({ count }),
          headers: {
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZDAzNDY0ZDYwNzI5YTkzNjc1ZTIyZSIsIm5hbWUiOiJFbW5tIHJlYWRhIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NTg0NzUzNjUsImV4cCI6MTc2NjI1MTM2NX0.KcqRqOjzpTaZe2R1ypTV_9FEzKOdN695t-bVjFITVec",
            "Content-Type": "application/json",
          },
        }
      );

      const data: CartResponse = await response.json();

      if (data.status === "success") {
        toast.success("Product updated successfully");
        setcartData(data);
      } else {
        toast.error(data.message || "Failed to update product");
      }
    } catch (err) {
      toast.error("Network error");
      console.error(err);
    } finally {
      setUpdating(null);
    }
  }

  async function clearingCartItem() {
    try {
      setClearing(true);
      const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart/", {
        method: "DELETE",
        headers: {
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZDAzNDY0ZDYwNzI5YTkzNjc1ZTIyZSIsIm5hbWUiOiJFbW5tIHJlYWRhIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NTg0NzUzNjUsImV4cCI6MTc2NjI1MTM2NX0.KcqRqOjzpTaZe2R1ypTV_9FEzKOdN695t-bVjFITVec",
        },
      });

      const data: CartResponse = await response.json();

      // some endpoints use 'status', others 'message' — we check both defensively
      if (data.status === "success" || data.message === "success") {
        toast.success("Cart cleared successfully");
        setcartData(data);
      } else {
        toast.error(data.message || "Failed to clear cart");
      }
    } catch (err) {
      toast.error("Network error");
      console.error(err);
    } finally {
      setClearing(false);
    }
  }

  
  if (isLoading) {
    return <Loading />;
  }

  const itemsCount = cartData?.numOfCartItems ?? 0;

  if (!itemsCount) {
    return (
      <div className="py-6 px-4">
        
        <p className="text-muted-foreground font-bold text-6xl
        min-h-[60px]
        flex justify-center items-center mt-2">Your cart is empty.</p>
      
        <div className="mt-6 flex justify-center items-center ">
          <Button asChild>
            <a href="/products">Add to Products</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6 px-4">
      <h1 className="font-bold tracking-tight text-xl">Shopping Cart</h1>
      <p className="text-muted-foreground mt-2">{itemsCount} item(s) in cart</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:items-start mt-6">
      
        <div className="lg:col-span-2 space-y-4">
          {cartData?.data.products.map((product) => {
            
            const pid = String(product.product.id ?? product._id);
            return (
              <div
                key={product._id}
                className="flex gap-4 rounded-2xl border shadow-sm bg-card p-4"
              >
                <img
                  src={product.product.imageCover}
                  alt={product.product.title || "product image"}
                  className="w-24 h-24 rounded-lg object-cover md:w-28 md:h-28"
                />

                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="font-semibold text-base md:text-lg line-clamp-2">
                        {product.product.title}
                      </h3>
                      <p className="text-muted-foreground mt-1 text-sm">
                        {product.product.brand.name} · {product.product.category.name}
                      </p>
                    </div>

                    <div className="text-right shrink-0 font-semibold">
                      {formatCurrency(product.price)}
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updatedCartItemCount(String(product.product.id), product.count - 1)
                        }
                        aria-label="decrease"
                        disabled={!!updating}
                        className="size-8 rounded-lg border hover:bg-accent flex items-center justify-center"
                      >
                        -
                      </button>

                      <span className="w-6 text-center font-bold">
                        {updating === pid ? <Loader className="animate-spin" /> : product.count}
                      </span>

                      <button
                        onClick={() =>
                          updatedCartItemCount(String(product.product.id), product.count + 1)
                        }
                        aria-label="increase"
                        disabled={!!updating}
                        className="size-8 rounded-lg border hover:bg-accent flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>

                    <button
                      disabled={removing === pid}
                      onClick={() => removeCartItem(String(product.product.id))}
                      aria-label="remove"
                      className="text-black cursor-pointer text-sm flex gap-2 items-center"
                    >
                      {removing === pid && <Loader className="animate-spin" />}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1 sticky top-20">
          <div className="rounded-xl border p-5 shadow-sm bg-card">
            <h2 className="text-lg font-bold">Order Summary</h2>

            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  SubTotal ({cartData?.numOfCartItems} items)
                </span>
                <span className="font-semibold">
                  {formatCurrency(cartData?.data.totalCartPrice!)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Shipping</span>
                <span className="text-emerald-600 font-semibold">Free</span>
              </div>

              <hr className="my-2" />

              <div className="flex justify-between items-center">
                <h2 className="font-medium">Total</h2>
                <span className="font-semibold">
                  {formatCurrency(cartData?.data.totalCartPrice!)}
                </span>
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <Button className="w-full">Proceed to Checkout</Button>
                <Button variant="outline" className="w-full">
                  Continue Shopping
                </Button>
              </div>
            </div>
          </div>

          <Button
            onClick={clearingCartItem}
            disabled={clearing}
            className="mt-5 w-full flex items-center justify-center gap-2"
            variant="destructive"
          >
            {clearing ? <Loader className="animate-spin" /> : <Trash2 />}
            Clear All
          </Button>
        </div>
      </div>
    </div>
  );
}
