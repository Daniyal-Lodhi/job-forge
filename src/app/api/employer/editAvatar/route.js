import { NextResponse } from "next/server"
import fetchuser from "../../middleware/fetchuser"
import '../../../backendComponents/cloudinaryConfig.js'
import { v2 as cloudinary } from 'cloudinary'
import Employer from "@/app/lib/models/employer";

export const POST = async(req,res)=>{
    await fetchuser(req) ;
    const body = await req.json() ;
    const {avatar} = body ;
    var success ;
    try {
        var employer = await Employer.findById({_id:req.user.id})
        if(!employer){
            return NextResponse.json("User not found")
        }
        if(employer.avatar_Pid){
            await cloudinary.uploader.destroy(employer.avatar_Pid, function(error,result) { 
                if(error){
                    console.log(error)
                }
                console.log("old avatar deleted") })
        }
        var opt = {
            public_id: `${employer.name.substring(0,16).replace(" ","-")}-${Date.now()}`,
            folder: 'jbfAvatar',
            resource_type:'auto',
            upload_preset:'jbf_preset'
        }
        await cloudinary.uploader.upload(avatar,opt,(error,result)=>{
            if (error){
                console.log(error)
            }
            employer.avatar_Pid = result.public_id ;
            console.log("upload done" ,result.public_id)
        })
        await employer.save()

        success = true
        return NextResponse.json({success, message:"avatar updated"}, { status: 200 })
        
    } catch (error) {
        success = false
        console.log(error)
        return NextResponse.json({success,error}, { status: 500 })
        // return NextResponse.json({success})
    }

}