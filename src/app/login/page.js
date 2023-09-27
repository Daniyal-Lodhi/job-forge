'use client'
import axios from 'axios'
import React, { useState } from 'react'

const page = () => {
  const [file,setFile] = useState('')
  const handleChange = async(e)=>{
    const filee = e.target.files[0];
    setFile(filee)
    const reader = new FileReader();
    reader.readAsDataURL(filee)
    reader.onloadend = ()=>{
      setFile(reader.result)
    }
  }

  const body = {
    _id:'111121113111111f11111312',
    name:'Daniyal1212',
    email:'danicya1fsfwewfefew2el@gmail.com',
    password : '123123123',
    avatar:file
  }
// 
  const Upload = async ()=>{
      const response = await axios.post('http://localhost:3000/api/userlogin',body)
      const data = response.data ;
      console.log(data)
  }
  
  
  return (
    <div>
      <input type="file" onChange={handleChange}  />
      <button className="px-2 py-1 m-2 bg-pink-500 rounded-md" onClick={Upload}>Upload</button>
    </div>
  )
}
 

export default page
