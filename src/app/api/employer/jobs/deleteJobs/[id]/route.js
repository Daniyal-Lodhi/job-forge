import { NextResponse } from "next/server"
import Job from "@/app/lib/models/jobs";
import connectToMongo from "@/app/lib/db";


connectToMongo()

// DELETEING JOBS POSTED BY THE PARTICULAR EMPLOYER WHO POSTS IT
// just need to give the id of job to be deleted
export const DELETE = async(req,content)=>{
    var success;
    try {
        let job = await Job.findById(content.params.id);
        if(!job){
            success = false ;
            return NextResponse.json({success,message:"Job not found"},{status:404})
        }
        await job.deleteOne();
        success = true;
        return NextResponse.json({success,message:"Job deleted"},{status:200})
        
    } catch (error) {
        success = false ;
        console.log(error)
        return NextResponse.json({success,error:error.message},{status:error.statusCode||500})
    }
} 