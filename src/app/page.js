'use client'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
export default function Home() {
  const router = useRouter()
  const [jobs, setJobs] = useState([])
  useEffect(() => {
    getJobs()
  }, [])

  // Get Jobs function
  const getJobs = () => {
    axios.get('/api/jobs').
      then(res => {
        setJobs(res.data.jobs)
      }).catch(error => {
        console.log(error)
      })
  }
  console.log(jobs)

  return (
    <div className='mx-5'>
      <div className="py-20">
        {/* Search btn */}
        <div className="relative flex items-center">
          <div className='flex absolute pl-2'>
            <MagnifyingGlassIcon color='black' className='w-7' />
          </div>
          <input type="search" id="default-search" className="block outline-none w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
          <button type="submit" className=" absolute text-white  right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
        </div>

        {/* displaying Jobs */}
        <div className='my-5 flex justify-start  gap-3  flex-wrap'>
          {
            jobs && jobs.map((job) => {
              return (

                <div key={job._id} className="w-[99%] sm:w-[48%] md:w-[32%] p-6  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <h5 className=" mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{job.jobTitle}</h5>
                    <p className="h-auto sm:h-32 mb-3 font-normal text-gray-700 dark:text-gray-400">{job.jobDescription.substring(0,150)+'...'}</p>

                    <p className=" mb-3 font-normal text-gray-700 dark:text-gray-400"><span className='font-bold' >Posted by: </span>{job.postedBy}</p>
                  <Link href={`/${job._id}}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Go to Job
                    <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                  </Link>
                </div>

              )
            })
          }
        </div>

      </div>
    </div>
  )
}
