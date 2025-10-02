import { NextResponse } from "next/server";


export async function GET() {

    return NextResponse.json({
        name:'ahmed',
        email:'eman12@gmail.com'
    })
    
}