'use client'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/navigation';
import SignUpLoader from '@/components/SignUpLoader';
import TokenContext from '../context/token/tokenContext';



const page = () => {
  const router = useRouter();

  const {setToken,SetRole} = useContext(TokenContext)
  // console.log(token)
  // loading vars
  const [loading, setLoading] = useState(false);
  // display password 
  const [showPassword, setShowPassword] = useState('password')
  const showpassword = () => {
    setShowPassword(showPassword === 'password' ? 'text' : 'password')
  }

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


  const [formData, setFormdata] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })

  // handle Change Function
  const handleChange = (e) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      let x = document.getElementById('checkbox')
      if (x.checked) {
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
    // console.log(formData)
  }

  var formErrors = {}
  const [credentialsErr, setCredentialsErr] = useState({})

  const [valErrs, setValErrs] = useState({})
  
  const signin = (e) => {
    e.preventDefault()
    setLoading(true)

    // FormValidation
    if (!formData.email) {
      formErrors.email = "Email is required"
      setValErrs(formErrors)
    }
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      formErrors.email = "Please enter a valid email"
      setValErrs(formErrors)

    }
    if (!formData.password) {
      formErrors.password = "Password is required"
      setValErrs(formErrors)
    }
    else {
    }

    if (Object.keys(formErrors).length !== 0) {
      console.log('plz fill up the form properly')
      setLoading(false)
    }
    else {
      setValErrs({})
      axios.post(`/api/${role}/login`, formData).
        then(res => {
          setLoading(false)
          console.log(res.data)
          setToken(true)
          // role from token context
          SetRole(role)
          //saving the role in local storage so it wont get refresh
          localStorage.setItem('role',role)
          localStorage.setItem('token',true)
          router.push('/profile')
        }).
        catch(error => {
          setLoading(false)
          console.log(error)
          setCredentialsErr(error.response.data)
        })

    }
  }







  return (
    <div>
      {/* <!-- component --> */}
      <div className="h-full bg-gradient-to-tl from-green-400 to-indigo-400 w-full py-16 px-4">

        <div className="flex flex-col items-center justify-center">



          <div className="bg-white shadow rounded lg:w-1/3  md:w-1/2 w-full p-10 mt-16">
            <p tabIndex="0" className="focus:outline-none text-2xl font-extrabold leading-6 text-gray-800">Login to your account</p>
            <p tabIndex="0" className="focus:outline-none text-sm mt-4 font-medium leading-none text-gray-500">Dont have account? <span className="hover:text-gray-500 focus:text-gray-500 focus:outline-none focus:underline hover:underline text-sm font-medium leading-none  text-gray-800 cursor-pointer" onClick={() => { router.push('/signup') }} > Sign up here</span></p>


            <div className='flex-col items-center text-center justify-center my-5 '>
              <p className='mx-auto font-semibold text-xl fontM '>Sign in as</p>
              <div className='space-x-5 flex justify-center mt-5'>
                <button onClick={handleRole} name='seeker' className={` ${role === 'seeker' ? 'bg-indigo-700' : 'bg-gray-300'} px-2 py-1 text-white rounded-md fontM`} >Seeker</button>
                <button onClick={handleRole} className={` ${role === 'employer' ? 'bg-indigo-700' : 'bg-gray-300'} px-2 py-1 text-white rounded-md fontM`} name='employer'>Employer</button>
              </div>
            </div>
            <div>
              <label id="email" autoComplete="newpassword" className="text-sm font-medium leading-none text-gray-800">
                Email
              </label>
              <span className='text-red-600 text-sm ml-2'>{valErrs.email ? "( " + valErrs.email + " )" : ""}</span>
              <input aria-labelledby="email" type="email" onChange={handleChange} className="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" name='email' />
            </div>
            <div className="mt-6  w-full">
              <label htmlFor="pass" className="text-sm font-medium leading-none text-gray-800" >
                Password
              </label>
              <span className='text-red-600 text-sm ml-2'>{valErrs.password ? valErrs.password : ""}</span>

              <div className="relative flex items-center justify-center">
                <input onChange={handleChange} id="pass" type={showPassword} className="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" name='password' />
                <div className="absolute right-0 mt-2 mr-3 cursor-pointer">
                  <svg onClick={showpassword} width="16" height="16" id='eye' viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.99978 2C11.5944 2 14.5851 4.58667 15.2124 8C14.5858 11.4133 11.5944 14 7.99978 14C4.40511 14 1.41444 11.4133 0.787109 8C1.41378 4.58667 4.40511 2 7.99978 2ZM7.99978 12.6667C9.35942 12.6664 10.6787 12.2045 11.7417 11.3568C12.8047 10.509 13.5484 9.32552 13.8511 8C13.5473 6.67554 12.8031 5.49334 11.7402 4.64668C10.6773 3.80003 9.35864 3.33902 7.99978 3.33902C6.64091 3.33902 5.32224 3.80003 4.25936 4.64668C3.19648 5.49334 2.45229 6.67554 2.14844 8C2.45117 9.32552 3.19489 10.509 4.25787 11.3568C5.32085 12.2045 6.64013 12.6664 7.99978 12.6667ZM7.99978 11C7.20413 11 6.44106 10.6839 5.87846 10.1213C5.31585 9.55871 4.99978 8.79565 4.99978 8C4.99978 7.20435 5.31585 6.44129 5.87846 5.87868C6.44106 5.31607 7.20413 5 7.99978 5C8.79543 5 9.55849 5.31607 10.1211 5.87868C10.6837 6.44129 10.9998 7.20435 10.9998 8C10.9998 8.79565 10.6837 9.55871 10.1211 10.1213C9.55849 10.6839 8.79543 11 7.99978 11ZM7.99978 9.66667C8.4418 9.66667 8.86573 9.49107 9.17829 9.17851C9.49085 8.86595 9.66644 8.44203 9.66644 8C9.66644 7.55797 9.49085 7.13405 9.17829 6.82149C8.86573 6.50893 8.4418 6.33333 7.99978 6.33333C7.55775 6.33333 7.13383 6.50893 6.82126 6.82149C6.5087 7.13405 6.33311 7.55797 6.33311 8C6.33311 8.44203 6.5087 8.86595 6.82126 9.17851C7.13383 9.49107 7.55775 9.66667 7.99978 9.66667Z" fill="#71717A" />
                  </svg>

                </div>
              </div>
            </div>
            <div className="mt-8">
              <button onClick={signin} id='signinBtn' className=" disabled:bg-slate-500 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 h-11 w-full"> {loading ? <SignUpLoader loading={true} /> : 'Sign in'} </button>
              <span className='mt-2 text-center mx-auto flex justify-center items-center text-red-600 font-semibold '>{credentialsErr.error ? credentialsErr.error + "!" : ""}</span>
              <div className="flex items-start mb-6">
                <div className="flex items-center h-5">
                  <input id="checkbox" name='rememberMe' onChange={handleChange} type="checkbox" value="" className="w-4 h-4 border border-gray-300 cursor-pointer rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
                </div>
                <label htmlFor="checkbox" className="ml-2 cursor-pointer text-sm font-medium text-gray-900 dark:text-gray-300"  >Remember me</label>
              </div>

              {/* <div className="w-full flex items-center justify-between py-5">
                  <hr className="w-full bg-gray-400" />
                  <p className="text-base font-medium leading-4 px-2.5 text-gray-400">OR</p>
                  <hr className="w-full bg-gray-400  " />
                </div> */}
              {/* <div className='w-full  flex justify-center'>
                  <GoogleLogin width={'300'} native_callback={(id,password)=>{console.log(password)}}
                    onSuccess={credentialResponse => {
                      console.log(jwtDecode(credentialResponse.credential));
                    }}
                    onError={() => {
                      console.log('Login Failed');
                    }}
                  />
                </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
