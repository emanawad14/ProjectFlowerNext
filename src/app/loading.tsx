"use client";

import React from "react";
import { Loader2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        className="mb-6"
      >
        <Loader2 className="w-16 h-16 text-indigo-400" />
      </motion.div>

     
      <motion.h1
        className="text-4xl font-bold flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
      >
        Loading
        <Sparkles className="w-7 h-7 text-yellow-400 animate-pulse" />
      </motion.h1>

      
      <p className="mt-4 text-gray-400">Please wait while we prepare everything 🚀</p>
    </div>
  );
}
