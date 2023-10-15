import connectToMongo from '@/app/lib/db';
import User from '@/app/lib/models/seeker';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server';

connectToMongo();
// SEEKER LOGIN
export const POST = async (req) => {
    var success;
    const body = await req.json();
    const { email, password, rememberMe } = body;
    try {
        // Finding the user
        let user = await User.findOne({ email })
        
        // User not found
        if (!user){
            success = false;
            return NextResponse.json({  success,error :"Invalid Credentials" }, { status: 400 })
        }
        const passCompare = await bcrypt.compare(password,user.password)
        // Password did not match
        if(!passCompare){
            return NextResponse.json({  success,error :"Invalid Credentials" }, { status: 400 })
        }
        let data = {
            user:{
                id:user._id
            }
        }
        var authToken = jwt.sign(data,process.env.authSecret)
        const cookie = cookies() ;
        const token = cookie.set('authToken',authToken,{
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 10800
        })
        success = true;
        return NextResponse.json({success,role:'seeker'},{status:200,headers:{
            "set-cookie": token
        }})

    } catch (error) {
        success = false;
        return NextResponse.json({  success,error }, { status: 500 })
    }
}