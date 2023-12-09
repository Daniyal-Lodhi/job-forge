import Link from 'next/link'
import React from 'react'
const JobItem = ({job}) => {
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
}

export default JobItem
