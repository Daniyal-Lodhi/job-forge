'use client'
import SignUpLoader from '@/components/SignUpLoader';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
const page = ({ params }) => {
    const { jobId } = params
    const [job, setJob] = useState({});
    useEffect(() => {
        getJob()
    }, [])
    // get job request
    const getJob = () => {
        axios.get(`/api/jobs/getJob/${jobId.substring(0, 24)}`).
            then(res => {
                setJob(res.data.job);
                // console.log(res.data)
            }).catch(error => {
                console.log(error)
            })
    }
    // console.log(job)
    const [proposal, setProposal] = useState(undefined);
    const handleChange = (e) => {
        setProposal(e.target.value)
    }

    const [loading, setLoading] = useState(false)
    const handleApply = () => {
        setLoading(true)
        const resumeCb = document.getElementById('resumeCb');
        let resume = resumeCb.checked ? true : false
        axios.post(`/api/seeker/jobs/applyJob/${job._id}`, { proposal, resume }).
            then(res => {
                // console.log(res.data)
                setLoading(false)
                let formdiv = document.getElementById('applyForm')
                let h = formdiv.offsetHeight;
                formdiv.style.fontWeight = 'bold'
                formdiv.style.alignItems = 'center'
                formdiv.style.height = h.toString() + 'px';
                formdiv.innerHTML = "Response from recruiter: " + res.data.message.response
            }).catch(error => {
                // console.log(error.response.data.message)
                setLoading(false)
                let formdiv = document.getElementById('applyForm')
                let h = formdiv.offsetHeight;

                formdiv.style.fontWeight = 'bold'
                formdiv.style.justifyContent = 'center'
                formdiv.style.alignItems = 'center'
                formdiv.style.height = h.toString() + 'px';

                formdiv.innerHTML = error.response.data.message
            })
    }

    return (
        <div className="bg-gray-100 py-20  ">
            <div className='mx-5 h-full bg-white rounded-lg px-5 py-5 text-gray-700 md:flex md:flex-row flex-col  md:space-x-2 md:space-y-0 space-x-0 space-y-5 justify-between'>
                <div className='w-[100%] md:w-[80%]'>
                    <div className='flex flex-col'>
                        {/* author */}
                        <h1 className='text-xl'>Job by: {job.postedBy}</h1>
                        <h1 className='text-xl'>{job.companyName}</h1>
                        {/* time */}
                        {job.date && <p className='text-sm'>Posted at {new Date(job.date).toLocaleString()}</p>}

                        <hr className='w-[90%] text-gray-900 border-1 mt-3' />

                        {/* title*/}
                        <h1 className='text-2xl font-semibold mt-3'>{job.jobTitle}</h1>

                        {/* description */}
                        <p>{job.jobDescription}</p>

                        {/* require to do */}
                        <h1 className=' mt-2 font-bold'>Requirements</h1>
                        <p>{job.requireTodo}</p>

                        {/* educatio required */}
                        {job.education && <div className='mt-2 flex items-center space-x-1' >
                            <h1 className='font-bold'>Education required: </h1>
                            <p>{job.education}</p>
                        </div>
                        }

                        {/* skills required */}
                        {job.skillsrequire && <div className='mt-2 flex items-center space-x-1' >
                            <h1 className='font-bold'>Skills required: </h1>
                            <p>{job.skillsrequire}</p>
                        </div>}

                        {/* contract type */}
                        {job.contractType && <div className='mt-2 flex items-center space-x-1' >
                            <h1 className='font-bold'>Contract type: </h1>
                            <p>{job.contractType}</p>
                        </div>}

                        {/* work type */}
                        {job.workType && <div className='mt-2 flex items-center space-x-1' >
                            <h1 className='font-bold'>Work type: </h1>
                            <p>{job.workType}</p>
                        </div>}

                        {/* contact Info */}
                        {job.contactInfo && <div className='mt-2 flex items-center space-x-1' >
                            <h1 className='font-bold'>Contact: </h1>
                            <p>{job.contactInfo}</p>
                        </div>}

                        {/* Location */}
                        {job.location && <div className='mt-2 flex items-center space-x-1' >
                            <h1 className='font-bold'>Location: </h1>
                            <p>{job.location}</p>
                        </div>}

                    </div>
                </div>
                {job.jobTitle && <div id='applyForm' className='p-3  md:w-[50%] md:min-w-[30%] w-full h-max flex items-start rounded-lg bg-indigo-500 text-white'>

                    <div className='my-3'>
                        <h1 className='text-2xl'>Submit Your Proposal for the Job</h1>
                        <textarea onChange={handleChange} className='text-black h-48 rounded-md px-2 py-1 w-full mt-3 outline-none' placeholder='Type your proposal here' />

                        {/* checkbox for resume */}
                        <div className="flex items-start mt-2">
                            <div className="flex items-center h-5 ">
                                <input id="resumeCb" name='resumeCb' type="checkbox" value="" className="w-4 h-4 border border-gray-300 cursor-pointer rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
                            </div>
                            <label htmlFor="resumeCb" className="ml-2 cursor-pointer text-sm font-medium text-dark:text-gray"  >Send resume along proposal</label>
                        </div>
                        <small className='block'>If you have not uploaded your resume, Your resume won't be send.</small>
                        {/* submit btn */}
                        <div className='mt-3'>
                            <button className='px-2 py-1 w-32 shadow-md bg-yellow-200 hover:bg-yellow-300 rounded-md text-gray-700 fontM' onClick={handleApply}>{loading ? <SignUpLoader loading={true} color={'black'} size={25} /> : 'Apply for Job'} </button>
                        </div>

                        <div className='mt-5'>
                            <h1 className='font-semibold'>Kindly read the requirements and apply only if you are egligible for the job.</h1>
                        </div>

                    </div>
                </div>}
            </div>
        </div>
    )
}

export default page
