import { NextResponse } from "next/server"
import Job from "@/app/lib/models/jobs";
import connectToMongo from "@/app/lib/db";
import Employer from "@/app/lib/models/employer";


connectToMongo()

export const GET = async(req,content)=>{
    var success;
    try {
        let job = await Job.findById(content.params.id);
        if(!job){
            success = false ;
            return NextResponse.json({success,message:"Job not found"},{status:404})
        }
        let jobPoster = await Employer.findById({_id:job.employerId}).select('name') 
        const jobWithPoster = {
            ...job.toObject(),
            postedBy : jobPoster.name,
        }
       
        
        success = true;
        return NextResponse.json({success,job:jobWithPoster},{status:200})
        
    } catch (error) {
        success = false ;
        console.log(error)
        return NextResponse.json({success,error:error.message},{status:error.statusCode||500})
    }
} 