import Employer from "@/app/lib/models/employer";
import Jobs from "@/app/lib/models/jobs";
import { NextResponse } from "next/server";


export const GET = async(req,content)=>{ 
    var success ;
    try {
        var searchTerm = content.params.searchTerm ;
        const regexSearchTerm = new RegExp(searchTerm,"i") 
        let jobs = await Jobs.find({jobTitle:regexSearchTerm})
        const listedJobs = await Promise.all(jobs.map(async(job)=>{
            const jobPoster = await Employer.findById({_id:job.employerId}).select('name') ;
            const jobsWithPoster = {
                ...job.toObject(),
                postedBy : jobPoster.name,
            }
            return jobsWithPoster
        }))

        
        success = true ;
        return NextResponse.json({success ,jobs:listedJobs} , {status:200})
    } catch (error) {
        success = false
        return NextResponse.json({success , error:error.message} , {status:500})

    } 
}