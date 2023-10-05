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
    const res =await axios.post('/api/test')
    var data = res.data ;
    console.log(data)
   }
  

  //  testing avatar
  // const [file,setFile] = useState('')
  var avatar;
  const handleChange = (e)=>{
    const filee = e.target.files[0];
    const reader = new FileReader() ;
    reader.readAsDataURL(filee) ;
    reader.onloadend = ()=>{
      avatar = reader.result
    }
  }
  var avatar;
  const setavatar = async()=>{
    const res = await axios.post('/api/seeker/avatar',{avatar})
    const data = res.data ;
    
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
        <input type="file" onChange={handleChange}/>
        <button onClick={setavatar}>update avatar</button>
        <br />
        <button onClick={signup}>sign up</button>
          <br />
        <button onClick={logout}>logout</button>
        
    </div>
  )
}

export default page
