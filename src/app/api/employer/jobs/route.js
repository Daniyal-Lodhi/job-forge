import Employer from "@/app/lib/models/employer"
import { NextResponse } from "next/server"
import fetchuser from "../../middleware/fetchuser";
import Job from "@/app/lib/models/jobs";


// POST JOBS
export const POST = async(req)=>{
    var success ;
    try{
        await fetchuser(req)
    const body = await req.json()
        const {jobTitle,jobDescription,companyName,education,skillsrequire,location,contactInfo,contractType,workType,response} = body
        var user = await Employer.exists({_id:req.user.id})
        if(!user){
            success = false
            return NextResponse.json({success,message:"user not found"},{status:404})
        }
        var employer = await Employer.findById({_id:req.user.id}).select('companyName')
        var jobObj = {
            employerId : employer._id,
            jobTitle,
            jobDescription,
            companyName: companyName || employer.companyName,
            education,
            skillsrequire,
            location,
            contactInfo,
            contractType,
            workType,
            response
        }
        var job = await Job.create(jobObj)
        return NextResponse.json({success,job},{status:200})
    }catch(error){
        success = false ;
        return NextResponse.json({success,error:error.message},{status:error.statusCode||500})
    }
} 

// GET THE JOBS POSTED BY PARTICULAR EMPLOYER WHO POSTS IT 

export const GET = async(req)=>{
    var success ;
    try {
        await fetchuser(req) ;
        const jobs = await Job.find({employerId:req.user.id}) ;
        success = true ;
        return NextResponse.json({success,jobs},{status:200})

    } catch (error) {
        success = false ;
        return NextResponse.json({success,error:error.message},{status:error.statusCode||500})
    }
}

// JOB STATUS CHANGING 
// just need to give the id of job to update its status
export const PUT = async(req)=>{
    var success ;
    try {
        fetchuser(req) ;
        const body = await req.json()
        const {jobId} = body ;
        let job = await Job.findById(jobId) ;
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
        return NextResponse.json({success,error:error.message},{status:error.statusCode||500})
    }
}


// DELETEING JOBS POSTED BY THE PARTICULAR EMPLOYER WHO POSTS IT
// just need to give the id of job to be deleted
export const DELETE = async(req)=>{
    var success;
    try {
        const body = await req.json();
        let postedJob = await Jobs
        const {id} = body ;
        let job = await Job.findById(id);
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
        return NextResponse.json({success,error},{status:error.statusCode||500})
    }
} 

