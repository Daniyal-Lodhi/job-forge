'use client'
import JobItem from '@/components/JobItem'
import SignUpLoader from '@/components/SignUpLoader'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import { useEffect, useState } from 'react'
export default function Home() {
  const [jobs, setJobs] = useState([])
  const [jobterm, setJobterm] = useState('')
  const [searchedjobs, setSearchedjobs] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getJobs()
  }, [])

  // Get Jobs function
  const getJobs = () => {
    setLoading(true)
    axios.get('/api/jobs').
      then(res => {
        setLoading(false )
        setJobs(res.data.jobs)
      }).catch(error => {
        setLoading(false)
        console.log(error)
      })
  }

  // search jobs
  const [searchloading,setSearchloading] = useState(false) ;
  const searchJob = () => {
    setSearchloading(true)
    axios.get(`/api/jobs/searchJobs/${jobterm?jobterm:"942349364394"}`).
      then(res => {
        setSearchloading(false)
        console.log(res.data)
        setSearchedjobs(res.data.jobs)
        const searchResult = document.getElementById('searchResult') ;
        searchResult.classList.remove('hidden') ;
        searchResult.classList.remove('block') ;
        if(res.data.jobs.length===0){
          let nojob = document.getElementById('nojobs') ;
          nojob.classList.remove('hidden')
          nojob.classList.add('block')
        }
      }).catch(error => {
        setSearchloading(false)
        console.log(error)
      })
  }

  // console.log(jobs)

  return (
    <div className='mx-5'>
      <div className="py-20">
        {/* Search btn */}
        <div className="relative flex items-center">
          <div className='flex absolute pl-2'>
            <MagnifyingGlassIcon color='black' className='w-7' />
          </div>
          <input name='searchTerm' onChange={(e) => {
            setJobterm(e.target.value)
          }} type="search" id="default-search" className="block outline-none w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
          <button onClick={searchJob} type="submit" className=" absolute text-white h-full w-24 right-0  bg-blue-700 hover:bg-blue-800 outline-none  font-medium rounded-lg text-sm px-4 py-2  "> {searchloading?"":"Search"}
          <SignUpLoader  color={'white'} loading={searchloading} size={20} />
          </button>
        </div>

        {/* displaying Searched Jobs */}
        <div className='my-5 flex justify-start  gap-3  flex-wrap'>
        <div className={`text-2xl w-full hidden`} id='searchResult'  >Search results:</div>
        <div id='nojobs' className='hidden mx-auto text-center font-bold'>No jobs found   </div>
          {
            searchedjobs && searchedjobs.map((job) => {
              return (
                <JobItem job={job} key={job._id} />
              )
            })
          }
        </div>
        <SignUpLoader color={'black'} size={30} loading={loading}  />
        {/* displaying Jobs */}
        <div className='my-5 flex justify-start  gap-3  flex-wrap'>
          {
            jobs && jobs.map((job) => {
              return (
                <JobItem job={job} key={job._id} />
              )
            })
          }
        </div>

      </div>
    </div>
  )
}
