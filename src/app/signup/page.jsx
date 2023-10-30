'use client'
import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { UserIcon } from '@heroicons/react/24/outline'
import SignUpLoader from '@/components/SignUpLoader';
import TokenContext from '../context/token/tokenContext';



const page = () => {
  const router = useRouter();
  // getting token and setToken from the token context
  const {setToken , SetRole} = useContext(TokenContext)

  // loading vars
  const [loading, setLoading] = useState(false);

  // <display password> 
  const [showPassword, setShowPassword] = useState('password')
  const [showCPassword, setShowCPassword] = useState('password')
  const showpassword = () => {
    setShowPassword(showPassword === 'password' ? 'text' : 'password')
  }
  const showCpassword = () => {
    setShowCPassword(showCPassword === 'password' ? 'text' : 'password')
  }
  // <display password /> 

  // < setting Roles> 
  const [role, setRole] = useState('seeker')
  const handleRole = (e) => {
    const { name } = e.target
    if (name === 'seeker') {
      setRole('seeker')
    }
    else if (name === 'employer') {
      setRole('employer')
    }
    console.log(role)
  }
  // </ setting Roles> 



  const [formData, setFormdata] = useState({
    name: '',
    email: '',
    companyName: '',
    password: '',
    rememberMe: false,
    avatar: ''
  })

  // handle Change Function
  const handleChange = (e) => {
    const { name, value, type, files } = e.target
    if (type === 'file') {
      const reader = new FileReader()
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        let avatarImg = document.getElementById('avatarImg')
        // console.log(reader.result)
        avatarImg.src = reader.result
        setFormdata({
          ...formData, [name]: reader.result
        })
      }
    }
    else if (type === 'checkbox') {
      let checkbox = document.getElementById('checkbox')
      if (checkbox.checked) {
        setFormdata({
          ...formData, [name]: true
        })
      }
      else {
        setFormdata({
          ...formData, [name]: false
        })
      }

    }
    else {
      setFormdata({
        ...formData, [name]: value
      })
    }
    console.log(formData)

  }

  var formErrors = {}
  const [credentialsErr, setCredentialsErr] = useState(null)

  const [valErrs, setValErrs] = useState({})
  const signup = (e) => {
    setLoading(true)
    // FormValidation
    if (!formData.name) {
      formErrors.name = "Username is required"
      setValErrs(formErrors)

    }

    else if (formData.name.length < 3) {
      formErrors.name = "Minimum Length for username is 3"
      setValErrs(formErrors)
    }
    if (!formData.email) {
      formErrors.email = "Email is required"
      setValErrs(formErrors)
    }
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      formErrors.email = "Please enter a valid email"
      setValErrs(formErrors)

    }
    if (role === 'employer') {
      if (!formData.companyName) {
        formErrors.companyName = "Company Name is required"
        setValErrs(formErrors)
      }
    }

    if (!formData.password) {
      formErrors.password = "Password is required"
      setValErrs(formErrors)
    }
    else if (formData.password.length < 8) {
      formErrors.password = "Minimum length for password is 8"
      setValErrs(formErrors)
    }
    const cpass = document.getElementById('cpass')
    if (formData.password !== cpass.value) {
      formErrors.cpass = "Password did not match"
      setValErrs(formErrors)
    }


    if (Object.keys(formErrors).length !== 0) {
      setLoading(false)
      console.log('plz fill up the form properly')
    }
    else {
      setValErrs({})
      axios.post(`/api/${role}`, formData).
        then(res => {
          setLoading(false)
          console.log(res.data)
          setToken(true)
           // role from token context
           SetRole(role)
           //saving the role in local storage so it wont get refresh
           localStorage.setItem('role',role)
          localStorage.setItem('token', true)
        })
        .then(()=>{
          router.push('/profile')
        }).

        catch(error => {
          setLoading(false)
          console.log(error.response.data)
          setCredentialsErr(error.response.data.message)
        })

    }
  }







  return (
    <div>
      {/* <!-- component --> */}
      <div className="h-full bg-gradient-to-tl from-green-400 to-indigo-400 w-full py-16 px-4">

        <div className="flex flex-col items-center justify-center">



          <div className="bg-white shadow rounded lg:w-1/3  md:w-1/2 w-full p-10 mt-16">
            <p tabIndex="0" className="focus:outline-none text-2xl text-center mx-auto font-extrabold leading-6 text-gray-800">Create account</p>

            <div className='flex-col items-center text-center justify-center my-5 '>
              <p className='mx-auto font-extrabold text-xl  text-gray-800'>As</p>
              <div className='space-x-5 flex justify-center mt-5'>
                <button onClick={handleRole} name='seeker' className={` ${role === 'seeker' ? 'bg-indigo-700' : 'bg-gray-300'} px-2 py-1 text-white rounded-md fontM`} >Seeker</button>
                <button onClick={handleRole} className={` ${role === 'employer' ? 'bg-indigo-700' : 'bg-gray-300'} px-2 py-1 text-white rounded-md fontM`} name='employer'>Employer</button>
              </div>
            </div>
            {/* Avatar */}
            <div className='mx-auto mt-2 text-center' >
              <input title='Add image' accept="image/png, image/jpg, image/jpeg" aria-labelledby="avatar" type="file" onChange={handleChange} className="border  mb-1  rounded-3  text-transparent hidden mx-auto text-center  leading-none text-gray-800 py-3 w-full pl-3 mt-2" name='avatar' id='avatar' />
              <label htmlFor='avatar' className="text-sm cursor-pointer mx-auto inline-block font-medium leading-none text-gray-800 bg-slate-400 border rounded-full w-20 h-20">
                <UserIcon width={40} height={40} color={'white'} className={`${formData.avatar ? 'hidden' : 'inline-block'} w-16 h-16 m-auto mt-2 `} />
                <img src={''} id='avatarImg' className={`${!formData.avatar ? 'hidden' : 'flex'} w-20 h-20 object-cover overflow-hidden rounded-full `} alt="" />
              </label>
              <div>
                Profile picture
              </div>


            </div>
            {/* Username */}
            <div >
              <label id="name" className="text-sm  font-medium leading-none text-gray-800">
                Username
              </label>
              <span className='text-red-600 text-sm ml-2'>{valErrs.name ? "( " + valErrs.name + " )" : ""}</span>
              <input aria-labelledby="name" type="text" onChange={handleChange} className="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" name='name' />
            </div>
            {/* Email */}
            <div className='mt-4'>
              <label id="email" className="text-sm font-medium leading-none text-gray-800">
                Email
              </label>
              <span className='text-red-600 text-sm ml-2'>{valErrs.email ? "( " + valErrs.email + " )" : ""}</span>
              <input aria-labelledby="email" type="email" onChange={handleChange} className="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" name='email' />
            </div>
            {/* Company Name */}
            <div className={`mt-4 ${role === 'employer' ? 'block' : 'hidden'}`}>
              <label id="compnayName" className="text-sm font-medium leading-none text-gray-800">
                Company name
              </label>
              <span className='text-red-600 text-sm ml-2'>{valErrs.companyName ? "( " + valErrs.companyName + " )" : ""}</span>
              <input aria-labelledby="companyName" type="text" onChange={handleChange} className="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" name='companyName' />
            </div>
            {/* Password */}
            <div className="mt-6  w-full">
              <label htmlFor="pass" className="text-sm font-medium leading-none text-gray-800" >
                Password
              </label>
              <span className='text-red-600 text-sm ml-2'>{valErrs.password ? "( " + valErrs.password + " )" : ""}</span>

              <div className="relative flex items-center justify-center">
                <input onChange={handleChange} id="pass" type={showPassword} className="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" name='password' />
                <div className="absolute right-0 mt-2 mr-3 cursor-pointer">
                  <svg onClick={showpassword} width="16" height="16" id='eye' viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.99978 2C11.5944 2 14.5851 4.58667 15.2124 8C14.5858 11.4133 11.5944 14 7.99978 14C4.40511 14 1.41444 11.4133 0.787109 8C1.41378 4.58667 4.40511 2 7.99978 2ZM7.99978 12.6667C9.35942 12.6664 10.6787 12.2045 11.7417 11.3568C12.8047 10.509 13.5484 9.32552 13.8511 8C13.5473 6.67554 12.8031 5.49334 11.7402 4.64668C10.6773 3.80003 9.35864 3.33902 7.99978 3.33902C6.64091 3.33902 5.32224 3.80003 4.25936 4.64668C3.19648 5.49334 2.45229 6.67554 2.14844 8C2.45117 9.32552 3.19489 10.509 4.25787 11.3568C5.32085 12.2045 6.64013 12.6664 7.99978 12.6667ZM7.99978 11C7.20413 11 6.44106 10.6839 5.87846 10.1213C5.31585 9.55871 4.99978 8.79565 4.99978 8C4.99978 7.20435 5.31585 6.44129 5.87846 5.87868C6.44106 5.31607 7.20413 5 7.99978 5C8.79543 5 9.55849 5.31607 10.1211 5.87868C10.6837 6.44129 10.9998 7.20435 10.9998 8C10.9998 8.79565 10.6837 9.55871 10.1211 10.1213C9.55849 10.6839 8.79543 11 7.99978 11ZM7.99978 9.66667C8.4418 9.66667 8.86573 9.49107 9.17829 9.17851C9.49085 8.86595 9.66644 8.44203 9.66644 8C9.66644 7.55797 9.49085 7.13405 9.17829 6.82149C8.86573 6.50893 8.4418 6.33333 7.99978 6.33333C7.55775 6.33333 7.13383 6.50893 6.82126 6.82149C6.5087 7.13405 6.33311 7.55797 6.33311 8C6.33311 8.44203 6.5087 8.86595 6.82126 9.17851C7.13383 9.49107 7.55775 9.66667 7.99978 9.66667Z" fill="#71717A" />
                  </svg>
                </div>
              </div>
            </div>
            {/* Confirm Password */}
            <div className="mt-6  w-full">
              <label htmlFor="cpass" className="text-sm font-medium leading-none text-gray-800" >
                Confirm password
              </label>
              <span className='text-red-600 text-sm ml-2'>{valErrs.cpass ? "( " + valErrs.cpass + " )" : ""}</span>

              <div className="relative flex items-center justify-center">
                <input id="cpass" type={showCPassword} className="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" name='cpassword' />
                <div className="absolute right-0 mt-2 mr-3 cursor-pointer">
                  <svg onClick={showCpassword} width="16" height="16" id='eye' viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.99978 2C11.5944 2 14.5851 4.58667 15.2124 8C14.5858 11.4133 11.5944 14 7.99978 14C4.40511 14 1.41444 11.4133 0.787109 8C1.41378 4.58667 4.40511 2 7.99978 2ZM7.99978 12.6667C9.35942 12.6664 10.6787 12.2045 11.7417 11.3568C12.8047 10.509 13.5484 9.32552 13.8511 8C13.5473 6.67554 12.8031 5.49334 11.7402 4.64668C10.6773 3.80003 9.35864 3.33902 7.99978 3.33902C6.64091 3.33902 5.32224 3.80003 4.25936 4.64668C3.19648 5.49334 2.45229 6.67554 2.14844 8C2.45117 9.32552 3.19489 10.509 4.25787 11.3568C5.32085 12.2045 6.64013 12.6664 7.99978 12.6667ZM7.99978 11C7.20413 11 6.44106 10.6839 5.87846 10.1213C5.31585 9.55871 4.99978 8.79565 4.99978 8C4.99978 7.20435 5.31585 6.44129 5.87846 5.87868C6.44106 5.31607 7.20413 5 7.99978 5C8.79543 5 9.55849 5.31607 10.1211 5.87868C10.6837 6.44129 10.9998 7.20435 10.9998 8C10.9998 8.79565 10.6837 9.55871 10.1211 10.1213C9.55849 10.6839 8.79543 11 7.99978 11ZM7.99978 9.66667C8.4418 9.66667 8.86573 9.49107 9.17829 9.17851C9.49085 8.86595 9.66644 8.44203 9.66644 8C9.66644 7.55797 9.49085 7.13405 9.17829 6.82149C8.86573 6.50893 8.4418 6.33333 7.99978 6.33333C7.55775 6.33333 7.13383 6.50893 6.82126 6.82149C6.5087 7.13405 6.33311 7.55797 6.33311 8C6.33311 8.44203 6.5087 8.86595 6.82126 9.17851C7.13383 9.49107 7.55775 9.66667 7.99978 9.66667Z" fill="#71717A" />
                  </svg>
                </div>
              </div>
            </div>
            {/* Sign up Button */}
            <div className="mt-8">

              <button onClick={signup} id='signupBtn' className=" disabled:bg-slate-500 focus:ring-2 focus:ring-offset-2  focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600  h-11 w-full box-content "> {loading ? <SignUpLoader loading={true} /> : 'Create account'} </button>
              <span className='mt-2 text-center mx-auto flex justify-center items-center text-red-600 font-semibold '>{credentialsErr ? credentialsErr + "!" : ""}</span>

              {/* Remember Me button */}
              <div className="flex items-start mb-6 mt-4 md:mt-0">
                <div className="flex items-center h-5">
                  <input id="checkbox" name='rememberMe' onChange={handleChange} type="checkbox" value="" className="w-4 h-4 border border-gray-300 cursor-pointer rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
                </div>
                <label htmlFor="checkbox" className="cursor-pointer ml-2  text-sm font-medium text-gray-900 dark:text-gray-300"  >Remember me</label>
              </div>



            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
