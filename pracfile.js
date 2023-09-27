'use client'
import connectToMongo from '@/app/api/db'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Home() {
  const [File, setFile] = useState('')
  const [img, setImg] = useState('')

  const handleChange = async (e) => {
    const file = e.target.files[0]
    var bb = new Blob([file], { type: file.type });
    setFile(bb)
  }
  const handleUpload = async () => {
    console.log(File)
    // window.open(File)
  }
  const downloadFile = (blob, fileName) => {
    const link = document.createElement('a');
    // create a blobURI pointing to our Blob
    link.href = URL.createObjectURL(blob);

    link.download = fileName;
    // some browser needs the anchor to be in the doc
    document.body.append(link);
    link.click();
    link.remove();
    // in case the Blob uses a lot of memory
    setTimeout(() => URL.revokeObjectURL(link.href), 7000);
    console.log(File)
  };
  useEffect(()=>{
    console.log('hello')
  },[])
  const showImage = (blob)  =>{
    const i = document.getElementById('image')
    // var urlCreator = window.URL || window.webkitURL;
    const url = URL.createObjectURL(blob)
    // const url = 'http://localhost:3000/0512c88b-1abf-4fa4-b71b-4fa9f6d778e1'
    i.src = url 
    console.log(url)
    setTimeout(()=>{URL.revokeObjectURL(url)},30000)
  }
  
  
  return (
    <div>
      <input type="file" onChange={handleChange} />
      <button className='px-2 py-1 bg-pink-400 text-white' onClick={()=>{downloadFile(File,File.type)}}>Upload</button>
      <br />
      <button className='px-2 py-1 bg-pink-400 text-white' onClick={()=>{showImage(File,File.type)}}>Show</button>
      <img src='' alt="" id='image' />
    </div>
  )
}
