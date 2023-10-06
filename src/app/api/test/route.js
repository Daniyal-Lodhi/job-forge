import { NextResponse } from "next/server"
import { cookies } from 'next/headers'

export const POST = async (req,res)=>{
    try{
    console.log(cookies().get('authToken').value)
    return NextResponse.json('headers collected')
    }catch(error){
        console.log('undefined')
        const err = new Error('undefined') 
        return NextResponse.json({error:err.message},{status:400})

    }
}