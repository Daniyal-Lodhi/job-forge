import connectToMongo from "@/app/lib/db";
import Jobs from "@/app/lib/models/jobs"
import { NextResponse } from "next/server";

connectToMongo();
// GET ALL JOBS
export const GET = async(req)=>{
    var success;
    try {
        let jobs = await Jobs.find({status:'active'})

        success = true;
        return NextResponse.json({success,jobs},{status:200})
    } catch (error) {
        success = false ;
        console.log(error)
        return NextResponse.json({success,error},{status:error.statusCode||500})
    }
}