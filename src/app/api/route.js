import connectToMongo from "@/app/api/db"
import { NextResponse } from "next/server"

export const GET =()=>{
    if(connectToMongo){
        return NextResponse.json({message:"hello from the next Api"})
    }
    else{
        return NextResponse.json({message:"false"})
    }
} 