'use client'
import Avatar from '@/components/Avatar'
import axios from 'axios'
import React, { useState } from 'react'
import { GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
import connectToMongo from '../lib/db';
connectToMongo() ;





const page = () => {

  const [file, setFile] = useState('')
  const [av, setav] = useState(null)
  const handleChange = async (e) => {
    const filee = e.target.files[0];
    setFile(filee)
    const reader = new FileReader();
    reader.readAsDataURL(filee)
    reader.onloadend = () => {
      setFile(reader.result)

    }
  }

  const body = {
    // _id:'121212123212556212121266',
    name: 'Daniyald1212',
    email: 'daniddg@gmail.com',
    password: '123123123',
    avatar: file
  }
  
  // 
  const Upload = async () => {
    const response = await axios.post('http://localhost:3000/api/userlogin', body)
    const data = response.data;
    console.log({ pid: data.User.avatar_Pid })
    const ee = await data.User.avatar_Pid
    // setFile(ee)
    const file = `jbfAvatar/${ee}`
    setav('')
    setTimeout(() => {
      setav(file)
      console.log(av)
    }, 5000)

  }

  return (

    <div>
      <input type="file" onChange={handleChange} />
      <button className="px-2 py-1 m-2 bg-pink-500 rounded-md" onClick={Upload} >Upload</button>
      {av === '' ? <div>Loading</div> : <Avatar avatar={av} />}
      <a href="https://res.cloudinary.com/dpbbbeutj/jbfResume/transcript_4404587.pdf" target='_blank'>pdf</a>
      <GoogleLogin
        onSuccess={credentialResponse => {
          console.log(jwtDecode(credentialResponse.credential));
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </div>
  )
}


export default page
