import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import connectToMongo from '@/app/lib/db'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server';
import Seeker from '@/app/lib/models/seeker';
import uploadAvatar from '@/app/backendComponents/uploadAvatar';
import fetchuser from '../middleware/fetchuser';
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
});
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
                    id: user._id
                }
            } 

            var authToken = jwt.sign(data, process.env.authSecret)
            // setting the auto login for a month if user check remember me
            const { rememberMe } = body
            const cookie = cookies();
            const token = cookie.set('authToken', authToken, {
                httpOnly: true,
                sameSite: 'strict',
            maxAge: rememberMe?10800:0
            })
            success = true;
           return NextResponse.json({success,role:'seeker'},{status:200,headers:{
            "set-cookie": token
        }})
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
        var seeker = await Seeker.findById({ _id:req.user.id}).select('-password')
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
    const {name , description,address,country,skills,profession,avatar} = body
    let seeker = await Seeker.findById({_id:req.user.id}) ;
    if(avatar){
    // coding avatar edit
    if(seeker.avatar_Pid){
        await cloudinary.uploader.destroy(seeker.avatar_Pid, function(error,result) { 
            if(error){
                console.log(error)
            }
            console.log("old avatar deleted") })
    }
    // Image upload options 
    var opt = {
        public_id: `${seeker.name.replace(" ","-")}-${Date.now()}`,
        folder: 'jbfAvatar',
        resource_type:'auto',
        upload_preset:'jbf_preset'
    }
    await cloudinary.uploader.upload(avatar,opt,(error,result)=>{
        if (error){
            console.log(error)
        }
        seeker.avatar_Pid = result.public_id ;
        console.log("upload done" ,result.public_id)
    })
}
    // editing further profile attributes     
    name ?seeker.name = name: "" ;
    seeker.description = description ;
    seeker.country = country ;
    seeker.address = address
    seeker.skills = skills
    seeker.profession = profession
    await seeker.save() ;
    success = true ;
    return NextResponse.json({success,message:"user edited"},{status:200})
   } catch (error) {
    success = false ;
    return NextResponse.json({success,error:error.message},{status:error.statusCode||500})
   }

}
 
