'use client'
import Avatar from '@/components/Avatar'
import Img from '@/components/Avatar'
import axios from 'axios'

const page = async () => {
  // lOGIN REQUEST
  const login = async () => {
    const res = await axios.post('/api/seeker/login', {
      name: "daniyal",
      email: "daniyal@gmail.com",
      password: "daniyal123",
      _id: 1123131
    })
    var data = res.data;
    console.log(data)
  }
  //  SIGNUP REQUEST
  const signup = async () => {
    const res = await axios.post('/api/seeker', {
      name: "daniyal",
      email: "daniyal1@gmail.com",
      password: "daniyal123",
      _id: 4315281,
      avatar: avatar
    })
    var data = res.data;
    console.log(data)
  }

  const tst = async () => {
    try {
      const res = await axios.post('/api/test')
      var data = res.data;
      console.log(data)
    } catch (err) {
      console.log(err.response.data)
    }
  }
  //  get user request
  var resume_Pid;
  const getuser = async () => {
    axios.get('/api/seeker').
      then((res) => {
        console.log(res.data)
        resume_Pid = res.data.seeker.resume_Pid
        var address = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_cloud_name}/${resume_Pid}.pdf`
        const resume = document.getElementById('resume');
        resume.href = address
      }).catch((error) => {
        console.log(error.response.data)
      })
  }
  // edit user
  const edituser = async () => {
    const editObj = {
      name: "daniyal",
      description: "My name is daniyal lodhi"
    }
    try {
      const res = await axios.put('/api/seeker', editObj)
      console.log(res.data)
    } catch (error) {
      console.log(error.response.data)
    }
  }


  var avatar, resume;
  const handleChange = (e) => {
    const filee = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(filee);
    reader.onloadend = () => {
      avatar = reader.result
      resume = reader.result
    }
  }
  var avatar;
  const setavatar = async () => {
    try {
      const res = await axios.post('/api/seeker/editAvatar', { avatar })
      const data = res.data;
      console.log(data)
    } catch (error) {
      console.log(error.response.data)
    }

  }
  const logout = async () => {
    const res = await axios.post('/api/logout', {})
    console.log(res.data)
  }
  const setresume = async () => {
    const res = await axios.post('/api/seeker/editResume', { resume })
    const data = res.data;
    console.log(data)
  }
  var datetime;
  const setdatetime = (e) => {
    datetime = e.target.value
  }
  const displaydate = () => {
    console.log(datetime)
  }
  var file;
  const setFile = (e) => {
    file = e.target.files[0]


  }
  const uploadFile = async () => {
    try {
      var dataa = new FormData();
      dataa.set('img', file)
      const res = await axios.put('/api/test', dataa)
      let data = res.data;
      let bufImg = data.bufImg
      let x = document.getElementById('img1')
      var base64String = btoa(String.fromCharCode.apply(null, bufImg.data));
      x.src = 'data:image/jpeg;base64,' +base64String;
 

      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className='mt-20'>
      <button onClick={login}>login</button>
      <br />
      <button onClick={tst}>test</button>
      <br />
      <button onClick={getuser}>Get user</button>
      <br />
      <input type="file" onChange={handleChange} />
      <button onClick={setavatar}>update avatar</button>
      <br />
      <input type="file" onChange={handleChange} />
      <button onClick={setresume}>update resume</button>
      <br />
      <button onClick={signup}>sign up</button>
      <br />
      <button onClick={edituser}>Edit User</button>
      <br />
      <button onClick={logout}>logout</button>
      <br />
      <a href={`#`} id='resume' target='_blank'>download resume</a>
      <br />
      <input type="datetime-local" onChange={setdatetime} />
      <br />
      <button onClick={displaydate}>display date</button>
      <br />
      <br />
      <input type="file" onChange={setFile} />
      <button onClick={uploadFile}>upload</button>
      <br />
      <br />
      <img src="dad" alt="" id="img1" />
      </div>
  )
}

export default page
