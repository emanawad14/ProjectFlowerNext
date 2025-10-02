"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { sendRegister } from "../../../services/authServices";
import { schema } from "../../../Schema/schemaRegister";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitted, touchedFields },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const router = useRouter();

  async function signUp(userData: any) {
    setLoading(true);
    setApiError(null);

    try {
      const response = await sendRegister(userData);

      if (response.message === "success") {
        // حفظ اسم المستخدم
        localStorage.setItem("userName", userData.name);

        // تحويل لصفحة تسجيل الدخول
        router.push("/login");
      } else {
        setApiError(response.message || "Registration failed");
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
            Create Your Account
          </CardTitle>
          <CardDescription className="text-center">
            Join us and start your shopping journey 🚀
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(signUp)} className="flex flex-col gap-5">
            {/* Name */}
            <div>
              <Input
                placeholder="Name"
                {...register("name")}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (touchedFields.name || isSubmitted) && (
                <p className="mt-1 text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                  {errors.name.message}
                </p>
              )}
            </div>

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

            {/* Confirm Password */}
            <div>
              <Input
                placeholder="Confirm Password"
                type="password"
                {...register("rePassword")}
                className={errors.rePassword ? "border-red-500" : ""}
              />
              {errors.rePassword &&
                (touchedFields.rePassword || isSubmitted) && (
                  <p className="mt-1 text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                    {errors.rePassword.message}
                  </p>
                )}
            </div>

            {/* Phone */}
            <div>
              <Input
                placeholder="Phone"
                type="tel"
                {...register("phone")}
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && (touchedFields.phone || isSubmitted) && (
                <p className="mt-1 text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Registering..." : "Register"}
            </Button>

            {/* Link to login */}
            <div className="text-center text-sm mt-2">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 font-semibold">
                Sign In
              </Link>
            </div>

            {/* API Error */}
            {apiError && (
              <p className="mt-2 text-center text-sm bg-red-100 text-red-700 px-3 py-2 rounded">
                {apiError}
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
