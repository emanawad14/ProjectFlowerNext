import React, { useRef } from 'react'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DialogClose } from '@radix-ui/react-dialog'
import { Loader } from 'lucide-react'

export default function CheckOut({cartId}:{cartId:string}) {

    let cityInput=useRef<HTMLInputElement|null>(null)
    let detailsInput=useRef<HTMLInputElement|null>(null)
    let phoneInput=useRef<HTMLInputElement|null>(null)






     async function checkoutSessions() {
    const shippingAddress={
      details:detailsInput.current?.value,
      city:cityInput.current?.value,

      phone:phoneInput.current?.value
    }

    const response=await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
      {
         
          method: "POST",
          body: JSON.stringify({ shippingAddress }),
          headers: {
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZDAzNDY0ZDYwNzI5YTkzNjc1ZTIyZSIsIm5hbWUiOiJFbW5tIHJlYWRhIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NTg0NzUzNjUsImV4cCI6MTc2NjI1MTM2NX0.KcqRqOjzpTaZe2R1ypTV_9FEzKOdN695t-bVjFITVec",
            "Content-Type": "application/json",
          
        }
      }
    )

    const data =await response.json();
    console.log(data);
    if (data.status =='success') {
        location.href=data.session.url
        
    }
    

    
  }


  return (
   
    

   
   <>
   
      

    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className='w-full cursor-pointer'>Proceed to Checkout</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Shipping Address</DialogTitle>
            <DialogDescription>
             
             please Add Shipping Address 
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">



             <div className="grid gap-3">
              <Label htmlFor="city">City</Label>
              <Input ref={cityInput} id="city" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="details">Details</Label>
              <Input ref={detailsInput} id="details" />
            </div>
           
           
            <div className="grid gap-3">
              <Label htmlFor="phone">Phone</Label>
              <Input ref={phoneInput} id="phone" />
            </div>
           
           
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Cash</Button>
            <Button onClick={checkoutSessions} className='cursor-pointer' type="submit">Visa <Loader className='animate-spin'/></Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
   </>
  )
}





