import { NextResponse } from "next/server"
import { cookies } from 'next/headers'

export const POST = async (req, res) => {
    try {
        cookies().get('authToken').value
        return NextResponse.json({success:true},{status:200})
        
    } catch (error) {
        // const err = new Error('undefined')
        return NextResponse.json({success : false, token:"undefined"})

    }
}

export const PUT = async (req) => {
    try {
        const data = await req.formData();
        const file = data.get('img')
        // console.log(file)
        const bytedata = await file.arrayBuffer();
        const bufImg =  Buffer.from(bytedata)
        return NextResponse.json({bufImg})
    } catch (error) {
        return NextResponse.json({ error:error.message })
    }
}