import { NextResponse } from "next/server"
import fetchuser from "../../middleware/fetchuser"
import '../../../backendComponents/cloudinaryConfig.js'
import { v2 as cloudinary } from 'cloudinary'
import Seeker from "@/app/lib/models/seeker";
import connectToMongo from "@/app/lib/db";

connectToMongo();
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
});
export const POST = async(req)=>{
    await fetchuser(req) ;
    const body = await req.json() ;
    const {avatar} = body ;
    var success ;
    try {
        var seeker = await Seeker.findById({_id:req.user.id})
        if(!seeker){
            return NextResponse.json("User not found")
        }
        if(seeker.avatar_Pid){
            await cloudinary.uploader.destroy(seeker.avatar_Pid, function(error,result) { 
                if(error){
                    console.log(error)
                }
                console.log("old avatar deleted") })
        }
        var opt = {
            public_id: `${seeker.name.replace(" ","-")}-${Date.now()}`,
            folder: 'jbfAvatar',
            resource_type:'auto',
            upload_preset:'jbf_preset'
        }
        await cloudinary.uploader.upload(avatar,opt,(error,result)=>{
            if (error){
                console.log(error)
            }
            seeker.avatar_Pid = result.public_id ;
            console.log("upload done" ,result.public_id)
        })
        await seeker.save() 

        success = true
        return NextResponse.json({success, message:"avatar updated"}, { status: 200 })
        
    } catch (error) {
        success = false
        console.log(error)
        return NextResponse.json({success,error:error.message}, { status: 500 })
    }

}