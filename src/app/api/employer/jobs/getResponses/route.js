import fetchuser from "@/app/api/middleware/fetchuser";
import connectToMongo from "@/app/lib/db";
import AppliedJobs from "@/app/lib/models/appliedJobs";
import Seeker from "@/app/lib/models/seeker";
import { NextResponse } from "next/server";

connectToMongo() ;
// GET RESPONSES FROM APPLIED JOBS
// we just need to give the id of the job to see proposals
export const POST = async(req)=>{
    var success ;
    try {
        await fetchuser(req) ;
        const body = await req.json()
        const {jobId} = body ;
        const responses = await AppliedJobs.find({jobId}) ;
        var Responses = await Promise.all(responses.map(async (response)=>{
            var seeker ;
            if(response.resume){
                seeker = await Seeker.findById(response.seekerId).select('name email resume_Pid')
            }
            else{
                seeker = await Seeker.findById(response.seekerId).select('name email ')
            }
            var responseObj = {
                ...seeker.toObject(),
                proposal:response.proposal
            }
            return responseObj
        }))
        success = true ;
        return NextResponse.json({success,Responses})

    } catch (error) {
        success = false ;
        return NextResponse.json({success,error:error.message},{status:error.statusCode||500})

    }
}