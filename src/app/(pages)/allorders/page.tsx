"use client";
import React, { useEffect, useState } from "react";
import { orders } from "@/interfaces";

export default function Allorders() {
  const [userOrders, setUserOrders] = useState<orders[]>([]);

  async function getUserOrders() {
    try {
      const response = await fetch(
        `https://ecommerce.routemisr.com/api/v1/orders/user/` +
          localStorage.getItem("userId")
      );
      const data = await response.json();
      setUserOrders(data);
      console.log("User Orders:", data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }

  useEffect(() => {
    getUserOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">My Orders</h2>

      {userOrders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
          {userOrders.map((order) => (
            <div key={order._id} className="mb-10">
              {/* Order Header */}
              <div className="flex justify-between items-center bg-gray-100 px-4 py-3 rounded-t-xl">
                <h3 className="font-semibold text-gray-800">
                  Order ID: {order._id}
                </h3>
                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* Table */}
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="p-3 text-gray-600">Image</th>
                    <th className="p-3 text-gray-600">Product</th>
                    <th className="p-3 text-gray-600">Category</th>
                    <th className="p-3 text-gray-600">Quantity</th>
                    <th className="p-3 text-gray-600">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.cartItems.map((item) => (
                    <tr key={item._id} className="border-b hover:bg-gray-50">
                      <td className="p-3">
                        <img
                          src={item.product.imageCover}
                          alt={item.product.title}
                          className="w-16 h-16 object-cover rounded-lg border"
                        />
                      </td>
                      <td className="p-3 font-medium text-gray-800">
                        {item.product.title}
                      </td>
                      <td className="p-3 text-gray-600">
                        {item.product.category?.name || "N/A"}
                      </td>
                      <td className="p-3 text-gray-600">{item.count}</td>
                      <td className="p-3 font-semibold text-gray-700">
                        ${item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Order Summary */}
              <div className="flex justify-between items-center px-4 py-3 bg-gray-50 rounded-b-xl">
                <p className="text-gray-600 text-sm">
                  Payment:{" "}
                  <span className="font-medium">
                    {order.paymentMethodType}
                  </span>
                </p>
                <p className="text-lg font-bold text-gray-900">
                  Total: ${order.totalOrderPrice}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
