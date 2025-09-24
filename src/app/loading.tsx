"use client";

import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-8">
        Shop Mart
      </h1>

      <svg
        className="animate-spin h-16 w-16 text-gray-900"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="2" 
        />
        <path
          className="opacity-90"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v3a5 5 0 00-5 5H4z"
        />
      </svg>

      <p className="mt-6 text-gray-600 text-sm tracking-wide">
    Loading.....
      </p>
    </div>
  );
}
