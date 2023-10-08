'use client'
import Avatar from '@/components/Avatar'
import Img from '@/components/Avatar'
import axios from 'axios'

const page = async () => {
    // lOGIN REQUEST
   const login = async()=>{
    try{
    const res =await axios.post('/api/employer/login',{
      name : "daniyal employer",
        email : "daniyal@gmail.com",
          password : "daniyal123",
          _id : 1123131
    })
    var data = res.data ;
    console.log(data)
    }catch(error){
        console.log(error.response.data)
    }
   }
   //  SIGNUP REQUEST
   const signup = async()=>{
    const res =await axios.post('/api/employer',{
      name : "daniyal ",
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
  const getuser = async()=>{
   axios.get('/api/employer').
   then((res)=>{
    console.log(res.data)
  }).catch((error)=>{
    console.log(error.response.data)
   })
  }
  // edit user
  const edituser = async()=>{
    const editObj = {
      name : "daniyal employer",
      description :"My name is daniyal lodhi",
      companyName:"Lodhi Tech"
    }
    try {
      const res = await axios.put('/api/employer',editObj)
      console.log(res.data)
    } catch (error) {
      console.log(error.response.data)
    }
  }
  

  var avatar;
  const handleChange = (e)=>{
    const filee = e.target.files[0];
    const reader = new FileReader() ;
    reader.readAsDataURL(filee) ;
    reader.onloadend = ()=>{
      avatar = reader.result
    }
  }
//   setting avatar
  var avatar;
  const setavatar = async()=>{
    try{
    const res = await axios.post('/api/employer/editAvatar',{avatar})
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
        <button onClick={signup}>sign up</button>
        <br />
        <button onClick={edituser}>Edit User</button>
        <br />
        <button onClick={logout}>logout</button>
        <br />
        </div>
  )
}

export default page
