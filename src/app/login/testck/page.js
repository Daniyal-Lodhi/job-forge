'use client'
import Avatar from '@/components/Avatar'
import Img from '@/components/Avatar'
import axios from 'axios'

const page = async () => {
   const ck = async()=>{
    const res =await axios.post('/api/seeker/login',{
      name : "daniyal",
        email : "daniyal@gmail.com",
          password : "daniyal123",
          _id : 1123131
    
          
    })
    var data = res.data ;
    console.log(data)
   }

   const tst = async()=>{
    const res =await axios.post('/api/test')
    var data = res.data ;
    console.log(data)
   }
  

  //  testing avatar
  // const [file,setFile] = useState('')
  var file;
  const handleChange = (e)=>{
    const filee = e.target.files[0];
    const reader = new FileReader() ;
    reader.readAsDataURL(filee) ;
    reader.onloadend = ()=>{
      file = reader.result
    }
  }
  var avatar;
  const setavatar = async()=>{
    const res = await axios.post('/api/seeker/avatar',{file})
    const data = res.data ;
  }
  
  return (
    <div>
        <button onClick={ck}>cookie</button>
        <br />
        <button onClick={tst}>test</button>
        <br />
        <input type="file" onChange={handleChange}/>
        <button onClick={setavatar}>update avatar</button>
    </div>
  )
}

export default page
