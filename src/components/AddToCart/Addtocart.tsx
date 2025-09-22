
"use client"
import React, { useContext, useState } from 'react'
import { Button } from '../ui/button'
import { Loader, ShoppingCartIcon } from 'lucide-react'
import { CardFooter } from '../ui/card'
import toast from 'react-hot-toast'
import { CartContext } from '../Context/CartContext'

export default function Addtocart({productId}: {productId:string}) {

  const [isLoading, setisLoading] = useState(false);
 
  

   const {getCart}= useContext(CartContext)
  async function addProductToCart() {
    setisLoading(true);

    const response=await fetch('https://ecommerce.routemisr.com/api/v1/cart',
      {
        method:'Post',
        body:JSON.stringify({productId}),
        headers:{
        token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZDAzNDY0ZDYwNzI5YTkzNjc1ZTIyZSIsIm5hbWUiOiJFbW5tIHJlYWRhIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NTg0NzUzNjUsImV4cCI6MTc2NjI1MTM2NX0.KcqRqOjzpTaZe2R1ypTV_9FEzKOdN695t-bVjFITVec",
        

        "Content-Type":"application/json"
        }
      }
    );
    const data=await response.json();
    await getCart()
    data.status=='success'&&toast.success(data.message)
    setisLoading(false);

    console.log(data);
    
    
  }


  return (
    <div>
         <CardFooter className="gap-3">
              <Button
              disabled={isLoading}
              onClick={addProductToCart} className="grow cursor-pointer flex items-center gap-2">
                
                
                {isLoading?<Loader className='animate-spin'/>:<ShoppingCartIcon className="w-4 h-4" />}
                Add to Cart
              </Button>
            </CardFooter>
      
    </div>
  )
}
