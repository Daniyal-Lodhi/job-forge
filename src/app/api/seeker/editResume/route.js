import {v2 as cloudinary} from 'cloudinary';
import fetchuser from '../../middleware/fetchuser';
import { NextResponse } from 'next/server';
import '../../../backendComponents/cloudinaryConfig.js'
import Seeker from '@/app/lib/models/seeker';

export const POST = async(req)=>{
    var success;
    try {
        await fetchuser(req) ;
        const body = await req.json();
        const {resume} = body
        const seeker = await Seeker.findById({_id:req.user.id})
        // checking if user exist
        if(!seeker){
            return NextResponse.json("User not found")
        }
        // checking if user has already a resume if yes then deleting that resume
        if(seeker.resume_Pid){
            await cloudinary.uploader.destroy(seeker.resume_Pid, function(error,result) { 
                if(error){
                    console.log(error)
                }
                console.log("old resume deleted") })
        }
        // finally updating the current resume
        var opt = {
            public_id: `${seeker.name}-${Date.now()}`,
            folder: 'jbfResume',
            resource_type:'auto',
            upload_preset:'jbf_preset'
        }
        await cloudinary.uploader.upload(resume,opt,(error,result)=>{
            if (error){
                console.log(error)
            }
            seeker.resume_Pid = result.public_id ;
            console.log("upload done" ,result.public_id)
        })
        await seeker.save()
        success = true
        return NextResponse.json({success, message:"resume updated",seeker}, { status: 200 })
        
    } catch (error) {
        success = false ;
        return NextResponse.json({success,error},{status:error.statusCode||500})
    }

}