import Seeker from "@/app/lib/models/seeker";
import Job from "@/app/lib/models/jobs";
import AppliedJob from "@/app/lib/models/appliedJobs";
import fetchuser from "../../middleware/fetchuser";
import { NextResponse } from "next/server";
import connectToMongo from "@/app/lib/db";


connectToMongo()
// APPLYING FOR JOBS
export const POST = async(req)=>{ 
    var success ;
    try {
        await fetchuser(req);
        const body = await req.json() ;
        const { proposal, resume , jobId } = body ;
        let seeker;
            seeker = await Seeker.findById(req.user.id).select("_id")
        // getting the id of job and its poster (employer)
        let job = await Job.findById(jobId).select('_id employerId status');
        
        // creating the entry
        let appliedJobObj = {
            jobId: job._id,
            employerId : job.employerId,
            jobStatus: job.status,
            seekerId : seeker._id,
            resume : resume,
            proposal : proposal,
        }
        // checking if user hasa already applied for the job
        let previousApplication = await AppliedJob.find({jobId:job._id,seekerId:seeker._id});
        if(previousApplication[0]){
        success = false ;
        return NextResponse.json({success,message:"You have already applied for this job"},{status:400})
        }
        let appliedJob = await AppliedJob.create(appliedJobObj) 

        success = true ;
        return NextResponse.json({success,appliedJob},{status:200})

    } catch (error) {
        success = false ;
        console.log(error)
        return NextResponse.json({success,error:error.message},{status:error.statusCode||500})
    }
}

// GETING APPLIED JOBS

export const GET = async()=>{
    var success ;
    try {
        await fetchuser(req) ;
    } catch (error) {
        success = false ;
        console.log(error)
        return NextResponse.json({success,error:error.message},{status:error.statusCode||500})       
    }
}