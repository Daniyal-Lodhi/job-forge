
import AppliedJob from "@/app/lib/models/appliedJobs";
import fetchuser from "../../middleware/fetchuser";
import { NextResponse } from "next/server";
import connectToMongo from "@/app/lib/db";


connectToMongo()

// GETTING APPLIED JOBS

export const GET = async(req)=>{
    var success ;
    try {
        await fetchuser(req) ;
        let appliedJobs = await AppliedJob.find({seekerId:req.user.id})
        success = true ;
        return NextResponse.json({success,appliedJobs},{status:200})

    } catch (error) {
        success = false ;
        console.log(error)
        return NextResponse.json({success,error:error.message},{status:error.statusCode||500})       
    }
}