
"use client"
import { CartResponse } from "@/interfaces";
import { createContext, ReactNode, useEffect, useState } from "react";


export const CartContext=createContext<
{
     cartData:CartResponse|null,
     setcartData:(value:CartResponse|null)=>void,
     isLoading:boolean,
     setisLoading:(value:boolean)=>void,
     getCart:() =>void,
    
}>({

      cartData:null,
     setcartData:()=>{},
     isLoading:false,
     setisLoading:()=>{},
     getCart() {},
    

});

export default function CartContextProvider({children}:{children:ReactNode}){
    const [cartData, setcartData] = useState<CartResponse|null>(null);
    const [isLoading, setisLoading] = useState<boolean>(true);
    const [userId, setuserId] = useState<string>('');


    async function getCart()
    {
        const response=await fetch('https://ecommerce.routemisr.com/api/v1/cart',

            {
        method:'Get',
        
        headers:{
        token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZDAzNDY0ZDYwNzI5YTkzNjc1ZTIyZSIsIm5hbWUiOiJFbW5tIHJlYWRhIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NTg0NzUzNjUsImV4cCI6MTc2NjI1MTM2NX0.KcqRqOjzpTaZe2R1ypTV_9FEzKOdN695t-bVjFITVec"
        }
      }
        )

        const data:CartResponse=await response.json();
        setcartData(data);
     
        if (cartData?.data.cartOwner) {

             localStorage.setItem('userId',cartData?.data.cartOwner)  
        }
        setisLoading(false)


    }
    useEffect(() => {
        getCart()
    
    }, [])

    return <CartContext.Provider value={{cartData, setcartData,isLoading, setisLoading ,getCart}}>
        {children}
    </CartContext.Provider>

}
