import connectToMongo from "@/app/lib/db";
import Employer from "@/app/lib/models/employer";
import Jobs from "@/app/lib/models/jobs"
import { NextResponse } from "next/server";
 
connectToMongo();
// GET ALL JOBS
export const GET = async(req)=>{
    var success;
    try {
        let jobs = await Jobs.find({status:'active'})
        const listedJobs = await Promise.all(jobs.map(async(job)=>{
            const jobPoster = await Employer.findById({_id:job.employerId}).select('name') ;
            const jobsWithPoster = {
                ...job.toObject(),
                postedBy : jobPoster.name,
            }
            return jobsWithPoster
        }))

        success = true;
        return NextResponse.json({success,jobs:listedJobs},{status:200})
    } catch (error) {
        success = false ;
        console.log(error)
        return NextResponse.json({success,error},{status:error.statusCode||500})
    }
}