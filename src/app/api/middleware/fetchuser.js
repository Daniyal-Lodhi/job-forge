import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server';

const fetchuser = async(req,res,next)=>{
    const cookiesStore = cookies() ;
    try{
    var authToken = cookiesStore.get('authToken') 
    if(!authToken){
        return NextResponse.json("Please use a valid authentication token",{status:400})
    }
    authToken = authToken.value
        const data = jwt.verify(authToken,process.env.authSecret)
        req.user = data.user
    }catch(error){
        console.log(error)
    }
}

export default fetchuser ;