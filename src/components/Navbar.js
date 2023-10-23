'use client'
import React, { useEffect, useState } from 'react'
import { ArrowUpTrayIcon , ArrowRightOnRectangleIcon} from '@heroicons/react/24/outline'
import profile  from '../../public/assets/profile.jpg'
import Image from 'next/image'
import checkToken from './checkToken'
import axios from 'axios'
import Link from 'next/link'
import { usePathname , useRouter } from 'next/navigation'
const Navbar = () => {
  // 
  const [showMenu,setShowMenu] = useState('hidden')
  const showmenu = ()=>{
    setShowMenu(showMenu==='hidden'?'block':'hidden');
  }
  const router = useRouter();
  var path = usePathname() ;
  // console.log(path) 
  // 
  var isToken = checkToken()
  
  const logOut = ()=>{
      axios.post('/api/logout').then(()=>{
        location.reload()
        router.push('/login')
      })
  }
  return (
    <div>

      <nav className="bg-transparent border-gray-200 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 pr-2 md:p-3 md:pr-1">
          <a href="https://flowbite.com/" className="flex items-center">
            
            <span className="self-center text-xl font-bold fontM whitespace-nowrap text-blue-800">Job-Forge</span>
          </a>
          <div className={`items-center flex md:order-2 justify-center text-base `}>
            <div className={` ${isToken===true?'flex':'hidden'}   items-center space-x-2 sm:space-x-5 fontM mr-3`} >
            <div onClick={logOut}  className='cursor-pointer fontM md:flex space-x-2 hover:bg-sky-800 text-white bg-blue-500 py-1 px-3 rounded-md hidden '>
            <button >Log out</button>
            <ArrowRightOnRectangleIcon width={18} />
            </div>
            
            <button className='fontM hover:bg-sky-800 text-white bg-blue-500 py-1 px-3 rounded-md'>Profile</button>
              <Image className={`w-9 h-9 rounded-full object-cover ${isToken===true?'inline-block':'hidden'}`} src={profile} alt="user photo" />
            </div>
            {/* if logout */}

            <div className={` ${isToken===false?'flex':'hidden'}   items-center space-x-2 sm:space-x-5 fontM md:mr-3`} >
            <div className='cursor-pointer fontM flex space-x-2 hover:bg-indigo-600 text-white bg-indigo-700 py-1 px-3 rounded-md  '>
            <Link href='/login'>Login</Link>
            {/* <ArrowRightOnRectangleIcon width={18} /> */}
            </div>
            <div  className='cursor-pointer fontM flex space-x-2 hover:bg-indigo-600 text-white bg-indigo-700 py-1 px-3 rounded-md  '>
            <button onClick={()=>{router.push('/signup')}}>Signup</button>
            {/* <ArrowRightOnRectangleIcon width={18} /> */}
            </div>
            
      
            </div>

            <button data-collapse-toggle="navbar-user" type="button" onClick={showmenu}   className={` ${isToken===true?'flex':'hidden'} inline-flex items-center p-2  w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600`} aria-controls="navbar-user" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className={`w-5 h-5 ${isToken===true?'inline-block':'hidden'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>
          <div className={`items-center justify-between ${showMenu} w-full md:flex md:w-auto md:order-1`} id="navbar-user">
            <ul className={`fontM  ${isToken===true?'flex':'hidden'}  flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-16 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 text-center`}>
              <li>
                <Link href="/" className={`block py-2 pl-3 pr-4 text-gray-900 ${path==='/'?"md:text-blue-500 md:bg-transparent text-white bg-blue-500 ":""} text rounded   md:p-0 `} aria-current="page">Home</Link>
              </li>
              <li>
                <Link href="/jobs" className={`block ${path==='/jobs'?"md:text-blue-500 md:bg-transparent text-white bg-blue-500 ":""}  py-2 pl-3 pr-4 text-gray-900 rounded  md:hover:bg-transparent md:p-0  dark:border-gray-700`}>Jobs</Link>
              </li>
              <li>
                <Link href="/responses" className={`block py-2 pl-3 pr-4 text-gray-900 rounded md:hover:bg-transparent md:p-0  md:dark:hover:text-blue-500 ${path==='/responses'?"md:text-blue-500 md:bg-transparent text-white bg-blue-500 ":""}`}>Responses</Link>
              </li>

              <li className=' cursor-pointer hover:text-blue-600 flex space-x-2  justify-center items-center'>
                <Link href="/resume" className={`${path==='/resume'?"md:text-blue-500   md:bg-transparent text-white bg-blue-500 ":""} w-full rounded-md  block py-2 sm:pl-3  sm:pr-4 text-gray-900  md:p-0`}>Resume
                <ArrowUpTrayIcon width={18} className='ml-2 hidden md:inline-block'/></Link>
                
              </li>
              <li onClick={logOut} className='md:hidden cursor-pointer hover:text-blue-600 flex space-x-2  justify-center items-center'>
                <Link href={'/login'} className=" flex block py-2 sm:pl-3  sm:pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Log out
                <ArrowRightOnRectangleIcon width={18} className='ml-2 hidden md:inline-block'/></Link>
                
              </li>
            </ul>
          </div>
        </div>
      </nav>

    </div>
  )
}

export default Navbar
