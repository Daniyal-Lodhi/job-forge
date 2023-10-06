'use client'
import Avatar from '@/components/Avatar'
import Img from '@/components/Avatar'
import axios from 'axios'

const page = async () => {
    // lOGIN REQUEST
   const login = async()=>{
    const res =await axios.post('/api/seeker/login',{
      name : "daniyal",
        email : "daniyal@gmail.com",
          password : "daniyal123",
          _id : 1123131
    })
    var data = res.data ;
    console.log(data)
   }
   //  SIGNUP REQUEST
   const signup = async()=>{
    const res =await axios.post('/api/seeker',{
      name : "daniyal",
        email : "daniyal1@gmail.com",
          password : "daniyal123",
          _id : 4315281,
          avatar:avatar
    })
    var data = res.data ;
    console.log(data)
   }

   const tst = async()=>{
    try{
    const res =await axios.post('/api/test')
    var data = res.data ;
    console.log(data)
    }catch(err){
      console.log(err.response.data)
    }
   }
  //  get user request
  var resume_Pid;
  const getuser = async()=>{
   axios.get('/api/seeker').
   then((res)=>{
    console.log(res.data)
    resume_Pid = res.data.seeker.resume_Pid
    var address = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_cloud_name}/${resume_Pid}.pdf`
    const resume = document.getElementById('resume');
    resume.href = address
  }).catch((error)=>{
    console.log(error.response.data)
   })
  }
  

  var avatar, resume;
  const handleChange = (e)=>{
    const filee = e.target.files[0];
    const reader = new FileReader() ;
    reader.readAsDataURL(filee) ;
    reader.onloadend = ()=>{
      avatar = reader.result
      resume = reader.result
    }
  }
  var avatar;
  const setavatar = async()=>{
    try{
    const res = await axios.post('/api/seeker/editAvatar',{avatar})
    const data = res.data ;
    console.log(data)
    }catch(error){
      console.log(error.response.data)
    }
    
  }
  const logout = async()=>{
      const res = await axios.post('/api/logout',{})
      console.log(res.data)
  }
  const setresume = async()=>{
    const res = await axios.post('/api/seeker/editResume',{resume})
    const data = res.data ;
    console.log(data)
  }
  
  return (
    <div>
        <button onClick={login}>login</button>
        <br />
        <button onClick={tst}>test</button>
        <br />
        <button onClick={getuser}>Get user</button>
        <br />
        <input type="file" onChange={handleChange}/>
        <button onClick={setavatar}>update avatar</button>
        <br />
        <input type="file" onChange={handleChange}/>
        <button onClick={setresume}>update resume</button>
        <br />
        <button onClick={signup}>sign up</button>
          <br />
        <button onClick={logout}>logout</button>
        <br />
        <a href={`#`} id='resume' target='_blank'>download resume</a>
    </div>
  )
}

export default page
