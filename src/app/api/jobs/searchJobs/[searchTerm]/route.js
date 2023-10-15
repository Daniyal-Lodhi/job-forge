import Jobs from "@/app/lib/models/jobs";
import { NextResponse } from "next/server";


export const GET = async(req,content)=>{
    var success ;
    try {
        var searchTerm = content.params.searchTerm ;
        const regexSearchTerm = new RegExp(searchTerm,"i") 
        let jobs = await Jobs.find({jobTitle:regexSearchTerm})

        
        success = true ;
        return NextResponse.json({success ,jobs} , {status:200})
    } catch (error) {
        success = false
        return NextResponse.json({success , error:error.message} , {status:500})

    } 
}