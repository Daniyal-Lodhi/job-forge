import fetchuser from "@/app/api/middleware/fetchuser";
import connectToMongo from "@/app/lib/db";
import AppliedJobs from "@/app/lib/models/appliedJobs";
import Seeker from "@/app/lib/models/seeker";
import Employer from "@/app/lib/models/employer";
import { NextResponse } from "next/server";
import nodemailer from 'nodemailer'


connectToMongo();
// GET RESPONSES FROM APPLIED JOBS
// we just need to give the id of the job to see proposals
export const POST = async (req,content) => {
    var success;
    try {
        await fetchuser(req);
        const responses = await AppliedJobs.find({ jobId:content.params.id });
        if(req.user.id !== responses[0].employerId.toString()){
            success = false ;
            return NextResponse.json({success,message:"Unauthorized Request"},{status:401})
        }
        var Responses = await Promise.all(responses.map(async (response) => {
            var seeker;
            if (response.resume) {
                seeker = await Seeker.findById(response.seekerId).select('name email resume_Pid')
            }
            else {
                seeker = await Seeker.findById(response.seekerId).select('name email ')
            }
            var responseObj = {
                ...seeker.toObject(),
                proposal: response.proposal
            }
            return responseObj
        }))
        success = true;
        return NextResponse.json({ success, Responses })

    } catch (error) {
        success = false;
        return NextResponse.json({ success, error: error.message }, { status: error.statusCode || 500 })

    }
}
// sending the response to seeker we provide the id of applied job in body
export const PUT = async (req,content) => {
    var success;
    try {
        await fetchuser(req);
        const body = await req.json()
        const { response, email, subject, description ,senderName ,interviewDate } = body;
      

        let appliedJob = await AppliedJobs.findById(content.params.id)
          // Employer
        let employer = await Employer.findById(req.user.id)
        // Seeker
        let seeker = await Seeker.findById(appliedJob.seekerId)
        if(employer._id.toString() !== appliedJob.employerId.toString()){
            success = false ;
            return NextResponse.json({success,message:"Unauthorized Request"},{status:401})
        }
        if (response === 'reject') {
            appliedJob.status = "rejected"
            await appliedJob.save();
            success = true;
            return NextResponse.json({ success, appliedJob }, { status: 200 })
        }
        else if (response === 'approve') {
            if (email) {
                // sending email to seeker
                const transporter = nodemailer.createTransport({
                    service: "gmail",
                    host: 'smtp@gmail.com',
                    secure: true,
                    auth: {
                        user: process.env.NEXT_PUBLIC_email,
                        pass: process.env.NEXT_PUBLIC_emailPassword
                    }
                })

                const mailOptions = {
                    from: {
                        name: senderName?senderName: employer.companyName,
                        address: employer.email
                    },
                    to: seeker.email,
                    subject: subject,
                    text: description,
                }
                const sendmail = async (Transporter, MailOptions)=>{
                    try {
                        const res = await Transporter.sendMail(MailOptions)
                        console.log(res.response)
                    } catch (error) {
                        success = false;
                        return NextResponse.json({ success, error: error.message }, { status: error.statusCode || 500 })
                    }
                }
                sendmail(transporter,mailOptions) ;
            }
            appliedJob.status = "shortlisted"
            appliedJob.interviewDate = interviewDate ;
            await appliedJob.save();
            success = true;
            return NextResponse.json({ success, appliedJob }, { status: 200 })
        }
        // return NextResponse.json({success , appliedJob},{status:200})

    } catch (error) {
        success = false;
        return NextResponse.json({ success, error: error.message }, { status: error.statusCode || 500 })
    }
}