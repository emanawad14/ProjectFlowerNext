import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Page() {
  return (
    <>
      <div className="relative h-screen w-full flex items-center bg-amber-700 justify-center text-center">
        <Image
          src={"/unsplash_Q-72wa9-7Dg.png"}
          alt="Shopping background"
          fill
          className="object-contain -z-10"
        />

        <div className="absolute inset-0 bg-black/40 -z-10" />

        <div className="max-w-2xl px-6 text-white">
          <h1 className="text-4xl font-bold mb-4 ">Welcome to Shop Mart</h1>
          <h2 className="text-lg mb-6">
            Discover the latest{" "}
            <span className="font-semibold">technology</span>,{" "}
            <span className="font-semibold">fashion</span>, and lifestyle
            products. Quality guaranteed with fast shipping and excellent
            customer service.
          </h2>

          <div className="flex gap-4 justify-center">
            <Button className="px-14 rounded-full ">Shopping Now</Button>
            <Button
              variant="outline"
              className="text-black border-white px-10 rounded-full "
            >
              Browse Categories
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
