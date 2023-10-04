import { NextResponse } from "next/server"
import fetchuser from "../../middleware/fetchuser"
import User from "@/app/lib/models/user";
import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({ 
    cloud_name: process.env.cloud_name, 
    api_key: process.env.api_key, 
    api_secret: process.env.api_secret
  });

export const POST = async(req,res)=>{
    fetchuser(req) ;
    const body = await req.json() ;
    const {file} = body ;
    var success ;
    try {
        var user = await User.findById({_id:req.user.id})
        if(!user){
            return NextResponse.json("User not found")
        }
        if(user.avatar_Pid){
            await cloudinary.uploader.destroy(user.avatar_Pid, function(error,result) { 
                if(error){
                    console.log(error)
                }
                console.log("old avatar deleted") })
        }
        var opt = {
            public_id: `${user.name}-${Date.now()}`,
            folder: 'jbfAvatar',
            resource_type:'auto'
        }
        await cloudinary.uploader.upload(file,opt,(error,result)=>{
            if (error){
                console.log(error)
            }
            user.avatar_Pid = result.public_id ;
            console.log("upload done" ,result)
        })
        await user.save()

        success = true
        return NextResponse.json({success, user}, { status: 200 })
        
    } catch (error) {
        success = false
        console.log(error)
        // return NextResponse.json({success})
    }

}