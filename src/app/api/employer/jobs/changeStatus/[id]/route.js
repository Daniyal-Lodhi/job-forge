import { NextResponse } from "next/server"
import Job from "@/app/lib/models/jobs";
import fetchuser from "@/app/api/middleware/fetchuser";
import connectToMongo from "@/app/lib/db";

connectToMongo()
// JOB STATUS CHANGING 
// just need to give the id of job to update its status
export const PUT = async(req,content)=>{
    var success ;
    try {
        fetchuser(req) ;
        let job = await Job.findById(content.params.id) ;
        if(req.user.id !== job.employerId.toString()){
            success = false ;
            return NextResponse.json({success,message:"Unauthorized Request"},{status:401})
        }
        job.status = job.status === 'active' ? 'inactive':'active' ;
        await job.save() ;
        success = true ;
        return NextResponse.json({success , job } ,{status:200})
    } catch (error) {
        success = false ;
        console.log(error)
        return NextResponse.json({success,error:error.message},{status:error.statusCode||500})
    }
}
