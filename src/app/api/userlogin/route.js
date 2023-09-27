// const User = require('@/app/lib/models/user.js');
import User from '@/app/lib/models/user.js'
import { NextResponse } from "next/server";
import connectToMongo from '../db';
import { fetchUser } from '../Middleware';
import {v2 as cloudinary} from 'cloudinary';
import jwt from 'jsonwebtoken'          
import bcrypt from 'bcryptjs'

cloudinary.config({ 
  cloud_name: 'dpbbbeutj', 
  api_key: '766768915921557', 
  api_secret: 'stSYHxk0ZJcPFk7Q8zxDq-fDXUU' 
});

connectToMongo();


export const POST = async(req,res)=>{
  const body = await req.json();
  const {name,email,password,description,resume,avatar,_id} = body ;

  if(body.avatar){
    var Avatar = `${name}-avatar-${Date.now()}` ;
    cloudinary.uploader.upload(avatar,
  { public_id: Avatar,
    upload_preset : 'unsigned_preset'
  }, 
  function(error, result) {
    if(error){
      console.log(error)
    }
    Avatar  = result
   }); 
  } 
  if(body.resume){
    var Resume = `${name}-resume-${Date.now()}` ;
    cloudinary.uploader.upload(resume,
  { public_id: Resume,
    upload_preset : 'unsigned_preset'
  }, 
  function(error, result) {
    if(error){
      console.log(error)
    }
    console.log(result);  
   });
  } 
  
  try {
    const user = await User.create({
      _id:_id,
      name: name,
      email:email,
      password : password, 
      description:description||null,
      avatar_Pid : Avatar || null,
      resume_Pid : Resume || null,
    })
    return NextResponse.json({User:user})
  } catch (error) {
    // return NextResponse.json({error})
    console.log(error)
  }

}




// export const POST = async (req,res) => { 
//   const body = await req.json()
//   const {name,_id,email,password} = body;
//   fetchUser(req) ;
// 
//   try {    
//     const user = await User.create({
//       _id: _id,
//       name: name, 
//       email: email,  
//       password: password,
//       date:Date.now(),
//       // resume_id:resume_id+Date.now(),
//     });
 
//     return NextResponse.json({ message: "User Created",resume}, { status: 200 });
//   } catch (error) {
//     console.log(error)
//     return NextResponse.json({message:error})
//   }
// };

