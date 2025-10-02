"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { sendLogin } from "../../../services/authServices";
import { schemaLogin } from "../../../Schema/schemaLogin";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitted, touchedFields },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schemaLogin),
    mode: "onBlur",
  });

  const router = useRouter();

  async function onSubmit(userData: any) {
    setLoading(true);
    setApiError(null);

    try {
      const response = await sendLogin(userData);

      if (response.message === "success") {
        // حفظ التوكن
        localStorage.setItem("userToken", response.token);

        // إعادة توجيه
        router.push("/");
      } else {
        setApiError(response.message || "Login failed");
      }
    } catch (err) {
      setApiError("Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Welcome Back 👋
          </CardTitle>
          <CardDescription className="text-center">
            Sign in to your account and continue shopping
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            {/* Email */}
            <div>
              <Input
                placeholder="Email"
                type="email"
                {...register("email")}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (touchedFields.email || isSubmitted) && (
                <p className="mt-1 text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <Input
                placeholder="Password"
                type="password"
                {...register("password")}
                className={errors.password ? "border-red-500" : ""}
              />
              {errors.password && (touchedFields.password || isSubmitted) && (
                <p className="mt-1 text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Signing in..." : "Sign In"}
            </Button>

            {/* Sign up link */}
            <div className="text-center text-sm mt-2">
              Don’t have an account?{" "}
              <Link href="/register" className="text-blue-600 font-semibold">
                Sign Up
              </Link>
            </div>

            {/* API Error */}
            {apiError && (
              <p className="mt-2 text-center font-bold text-sm bg-red-100 text-red-700 px-3 py-2 rounded">
                {apiError}
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
