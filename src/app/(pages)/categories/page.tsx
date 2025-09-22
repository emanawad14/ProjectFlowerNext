import { CategoryI } from "@/interfaces";
import CategoriesClient from "./categoryClient";

export default async function Categories() {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/categories",
    {
      next: {
        revalidate: 10 * 60,
      },
    }
  );
  const data = await response.json();
  const products: CategoryI[] = data.data;

  
  return <CategoriesClient products={products} />;
}
