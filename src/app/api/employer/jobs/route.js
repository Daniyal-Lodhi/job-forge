import Employer from "@/app/lib/models/employer"
import { NextResponse } from "next/server"
import fetchuser from "../../middleware/fetchuser";
import Job from "@/app/lib/models/jobs";
import connectToMongo from "@/app/lib/db";

connectToMongo()
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





