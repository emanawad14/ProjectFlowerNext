import { CategoryI } from "./category"

export interface ProductI {
  sold?: number
   imageCover: string
  images: string[]
  subcategory: CategoryI[]
  ratingsQuantity: number
  _id: string
  title: string
  slug: string
  description: string
  quantity: number
  price: number
 
  
  category: CategoryI
  brand: CategoryI
  ratingsAverage: number
  createdAt: string
  updatedAt: string
  id: string
  priceAfterDiscount?: number
  availableColors?: any[]
}





