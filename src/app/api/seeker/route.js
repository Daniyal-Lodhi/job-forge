import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import connectToMongo from '@/app/lib/db'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server';
import User from '@/app/lib/models/user';

connectToMongo();
// Seeker SIGNUP
export const POST = async (req, res) => { 
    const body = await req.json();
    const { name, email, password } = body;
    var success;
    // if user login from google then manipulating google sub ID
    var { _id } = body;
    if (_id) {
        const idLength = _id.toString().length
        // fixing the length of google subId
        if (idLength !== 24) {
            const randomNumber = Math.random() * 1000000000
            const randomRoundedNumber = Math.floor(randomNumber);   // Round down to an integer
            _id = _id.toString() + Date.now() + randomRoundedNumber
            _id = _id.substring(0, 24)
        }
    }
    try {
        let user = await User.findOne({ email: email })
        if (user) {
            success = false;
            return NextResponse.json({ message: "Email already registered", success },{status:400})
        }
        else {
            var salt = await bcrypt.genSaltSync(10);
            const hashedPass = await bcrypt.hash(password, salt)
            const userObj = {
                _id: _id,
                name: name,
                email: email,
                password: hashedPass,
            }
            user = await User.create(userObj);
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
            return NextResponse.json({success,message:"user registered"}, { status:200,
                headers: {
                    "set-cookie": token
                }
            })
        }
    } catch (error) {
        success = false;
        return NextResponse.json({ error,success},{status:500})
        console.log(error)
    }
}


