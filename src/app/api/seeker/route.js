import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import connectToMongo from '@/app/lib/db'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server';
import Seeker from '@/app/lib/models/seeker';
import uploadAvatar from '@/app/backendComponents/uploadAvatar';
import fetchuser from '../middleware/fetchuser';

connectToMongo();

// Seeker SIGNUP
export const POST = async (req, res) => {
    const body = await req.json();
    const { name, email, password, avatar } = body;
    var success;
    // if user login from google then manipulating google sub ID
    var { _id } = body;
    if (_id) {
        const idLength = _id.toString().length
        // fixing the length of google subId
        if (idLength !== 24) {
            const randomNumber = Math.random() * 10000000000000
            const randomRoundedNumber = Math.floor(randomNumber);   // Round down to an integer
            _id = _id.toString() + Date.now() + randomRoundedNumber
            _id = _id.substring(0, 24)
        }
    }
    try {

        let user = await Seeker.findOne({ email: email })
        if (user) {
            success = false;
            return NextResponse.json({ message: "Email already registered", success }, { status: 400 })
        }
        else {
            if (avatar) {
                var avatar_Pid = await uploadAvatar(avatar, name);
            }
            var salt = await bcrypt.genSaltSync(10);
            const hashedPass = await bcrypt.hash(password, salt)
            const userObj = {
                _id: _id,
                name: name,
                email: email,
                password: hashedPass,
                avatar_Pid: avatar_Pid
            }
            user = await Seeker.create(userObj);
            let data = {
                user: {
                    id: _id
                }
            }

            var authToken = jwt.sign(data, process.env.authSecret)
            // setting the auto login for a month if user check remember me
            const { rememberMe } = body
            const cookie = cookies();
            const token = cookie.set('authToken', authToken, {
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 10800
            })
            success = true;
            return NextResponse.json({ success, role:'seeker'}, {
                status: 200,
                headers: {
                    "set-cookie": token
                }
            })
        }
    } catch (error) {
        success = false;
        return NextResponse.json({ error, success }, { status: 500 })
    }
}
// GET SEEKER INFORMATION

export const GET = async (req) => {
    var success = true;
    try {
        await fetchuser(req)
        var seeker = await Seeker.findById({ _id:req.user.id})
        return NextResponse.json({ success, seeker }, { status: 200 })
    } catch (error) {
        success = false
        return NextResponse.json({success, error:error}, {status:error.statusCode || 500})
    }
}

// EDIT USER PROFILE

export const PUT = async(req)=>{
    var success ;
   try {
    await fetchuser(req);
    const body = await req.json() ;
    const {name , description} = body
    let seeker = await Seeker.findById({_id:req.user.id})
    seeker.name = name ; 
    seeker.description = description ;
    await seeker.save() ;
    success = true ;
    return NextResponse.json({success,message:"user edited"},{status:200})
   } catch (error) {
    success = false ;
    return NextResponse.json({success,error},{status:error.statusCode||500})
   }

}
 
