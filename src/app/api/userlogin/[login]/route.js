import { NextResponse } from "next/server"
import User from "@/app/lib/models/user"
export const GET = async (req,content)=>{
    const id = await content.params.login
    // const {_id} = await req.query();
    try{ 
    const user = await  User.findById(id)
    return NextResponse.json({user})
    }catch(error){
      return NextResponse.json({error})
      
    }
} 

export const SET = async (req,content)=>{
  const id = await content.params.login
  // const {_id} = await req.query();
  try{ 
  const user = await  User.findById(id)
  return NextResponse.json({user})
  }catch(error){
    return NextResponse.json({error})
    
  }
} 
 