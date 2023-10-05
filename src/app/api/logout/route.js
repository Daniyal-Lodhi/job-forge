import { cookies } from "next/headers"
import { NextResponse } from "next/server";

export const POST = async ()=>{
    var success =true ;
    try {
        const cookiesStore = cookies()
    cookiesStore.delete('authToken')
    return NextResponse.json({success},{status:200})
    } catch (error) {
        console.log(error)
    }
    
}