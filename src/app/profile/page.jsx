'use client'
import React, { useContext, useEffect, useState } from 'react'
import { PencilIcon } from '@heroicons/react/24/outline';
import { TrashIcon } from '@heroicons/react/24/outline';
import ProfileImage from '@/components/ProfileImage';
import UserContext from '../context/seeker/UserContext';
import axios from 'axios';
import SignUpLoader from '@/components/SignUpLoader';
import TokenContext from '../context/token/tokenContext';
const page = () => {
  const { getSeeker, seeker, employer, getEmployer } = useContext(UserContext)
  const { role } = useContext(TokenContext)
  const [user, setUser] = useState({})
  const [isEditing, setIsEditing] = useState(false)

  //  setting the display of edit avatar on hover
  useEffect(() => {
    const avatarEditContainer = document.querySelector('#avatarEditContainer')
    avatarEditContainer.addEventListener('mouseover', () => {
      const pencilIcon = document.querySelector('#PencilIcon')
      pencilIcon.style.color = 'black';
    })
    avatarEditContainer.addEventListener('mouseout', () => {
      const pencilIcon = document.querySelector('#PencilIcon')
      pencilIcon.style.color = 'transparent';
    })
  }, [])
  // getting the user data
  useEffect(() => {
    if(role==='seeker'){
      getSeeker()
    }
    else if(role==='employer'){
      getEmployer()
    }
    else{
      console.log("this the role of user",role)
      
    }
  }, [])
  // Initializing edit user 
  const [editUser, setEditUser] = useState({})
  // setting the user and edit user to seeker data from seeker
  useEffect(() => {
    if (role === 'seeker'){
      setUser(seeker)
      setEditUser({
        name: seeker.name,
        description: seeker.description,
        address: seeker.address,
        country: seeker.country,
        skills: seeker.skills,
        profession: seeker.profession,

      })
    }
    else if (role === 'employer'){
      setUser(employer)
      // console.log("employer is",employer)
      setEditUser({
        name: employer.name,
        description: employer.description,
        companyName: employer.companyName,
        profession:employer.profession,
        companyAddress:employer.companyAddress,
      })
    }
    else{
      console.log("this the role of user",role)
    }

   
  }, [seeker,employer])
  // console.log(user)



  // handle edit click function
  const handleEdit = () => {
    console.log(editUser.companyName)
    setIsEditing(true)
    // console.log("is editing : ", isEditing)

    // console.log(editUser)
  }

  // handling add skill data 
  const handleEditSkill = (e) => {
    const inputSkill = document.getElementById('inputSkill')
    setUser({
      ...user, [user.skills]: user.skills.push(inputSkill.value)
    })
    setEditUser({
      ...editUser, skills: user.skills
    })
    // console.log(editUser)
  }

  const handleDelSkill = (itemName) => {
    setUser({
      ...user,
      skills: user.skills.filter(item => item !== itemName)
    });
    setEditUser({
      ...editUser, skills: editUser.skills.filter(item => item !== itemName)
    })
    // console.log(editUser)

  }

  // handling save
  const handleSave = () => {
    setConfirmEdit({
      ...confirmEdit, visibility: true
    })
  }
  const [isLoading, setIsLoading] = useState(false)
  const handleEditSave = () => {
    setIsLoading(true)
    axios.put(`/api/${role}`, editUser).
      then(res => {
        // console.log(res.data)
        // updating the edited profile data after the saving it
        if(role==='seeker')
        getSeeker();
        else
        getEmployer() ; 

        setIsLoading(false)
        setConfirmEdit({ visibility: false })
        setIsEditing(false)
      }).
      catch(error => {
        console.log(error)
        setIsLoading(false)

      })
  }




  const handleEditChange = (e) => {
    const { name, value, type, files } = e.target
    // transforming the avatar for backend 
    if (type === "file") {
      const reader = new FileReader();
      if (files[0]) {
        reader.readAsDataURL(files[0])
        reader.onloadend = () => {
          setEditUser({
            ...editUser, [name]: reader.result
          })
          // console.log(reader.result)
          document.getElementById('avatarPreview').src = reader.result
        }
      }
    }

    setEditUser({
      ...editUser, [name]: value
    })


    // console.log(editUser)
  }
  // setting the vars for confirming edit change 
  const [confirmEdit, setConfirmEdit] = useState({
    visibility: false,
  })



  return (
    <div className="bg-gray-100 py-16  ">
      <div className={`absolute h-[130%]  w-full items-center backdrop-blur-sm ${confirmEdit.visibility ? 'flex' : 'hidden'}`}>
        <div className='mx-auto flex'>
          <div className={`flex items-center mx-auto ${!isLoading ? 'hidden' : 'flex-col'}`}>
            <SignUpLoader loading={true} color={'black'} />
          </div>
          <div className={`${isLoading ? 'hidden' : 'flex-col'} shadow-md bg-gray-100 w-full rounded-lg  items-center justify-center px-20 py-8 space-y-10`}>
            <h1 className='font-bold fontM text-gray-600'>You sure to save the changes?</h1>
            <div className='flex w-full justify-center '>
              <button
                onClick={() => {
                  setConfirmEdit({ visibility: false })
                  setIsEditing(false)
                }}
                className=' bg-red-600 ml-2 mr-2 hover:bg-red-800 rounded-md text-white py-1 px-4 fontM'>Cancel</button>
              <button onClick={handleEditSave} className=' bg-indigo-600 ml-2 mr-2 hover:bg-indigo-800 rounded-md text-white py-1 px-4 fontM'>Save</button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8 ">
        <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4 ">
          <div className="col-span-4 sm:col-span-3 h-full ">
            {/* Avatar */}
            <div className="bg-white shadow rounded-lg p-6 h-full ">
              <div className="flex flex-col items-center flex-1">
                <div className='w-32 h-32 overflow-hidden  bg-gray-300 rounded-full mb-4  shrink-0 flex justify-center '>
                  <div className='w-full   h-10 mx-auto '>
                    {editUser.avatar ? <img id='avatarPreview' src={""} /> : <ProfileImage profileImage={user.avatar_Pid} />}

                  </div>
                  <label id='avatarEditContainer' htmlFor='avatar' className={` ${isEditing ? 'flex' : 'hidden'} absolute hover:backdrop-blur-sm rounded-full cursor-pointer justify-center items-center w-32 h-32 border `}>
                    <div className='ml-2 inline align-middle overflow-hidden '>
                      <PencilIcon width={55} height={55} className='text-transparent' id='PencilIcon' />
                    </div>
                  </label>
                  <input type="file" onChange={handleEditChange} className='hidden' id='avatar' name='avatar' accept='image/png, image/jpeg, image/jpg' />
                </div>

                {/* name  */}
                {user.name && <h1 className="text-xl   font-bold mx-auto">{isEditing ? <input type='text' name='name' placeholder='Your name here' value={editUser.name} onChange={handleEditChange} className='w-full mx-auto border outline-none px-2 text-center bg-slate-100 rounded-md py-1' /> : user.name}</h1>
                }
                {/* profession */}
                <p className="text-gray-600 text-center mt-2 ">{isEditing ? <input type='text' name='profession' placeholder='Your profession here' value={editUser.profession} onChange={handleEditChange} className='w-full mx-auto border outline-none px-2 text-center bg-slate-100 rounded-md py-1' /> : user.profession}</p>
                <div className="mt-6 flex flex-wrap gap-4 justify-center">
                  <a href={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_cloud_name}/${user.resume_Pid
                    + '.pdf'}`} target='_blank' className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded">Resume</a>
                </div>
              </div>
              <hr className="my-6 border-t border-gray-300 " />
              <div className="flex flex-col ">
                {/* EMAIL */}
                <span className="uppercase font-bold tracking-wider mb-2 ">EMAIL</span>
                <ul>
                  <li className="mb-2 text-gray-600 whitespace-normal">{user.email}</li>
                </ul>
              </div>
              <div className={`flex flex-col ${role==='seeker'?'block':'hidden'}`}>
                <span className="uppercase font-bold tracking-wider mb-2">Address</span>
                <ul>
                  {/* ADDRESS */}

                  

                  <li className={`mb-2 text-gray-600 `} >{isEditing ? <input placeholder='Your address here' type='text' name='address' value={editUser.address} onChange={handleEditChange} className=' w-full mx-auto border outline-none px-2  bg-slate-100 rounded-md py-1' /> : user.address}</li>
                  {/* COUNTRY */}
                  <li className={`mb-2 text-gray-600  `}>{isEditing ? <input placeholder='Your country here' type='text' name='country' value={editUser.country} onChange={handleEditChange} className=' w-full mx-auto border outline-none px-2  bg-slate-100 rounded-md py-1' /> : user.country}</li>

                </ul>
              </div>

            </div>
          </div>
          <div className="col-span-4 sm:col-span-9  h-full">
            <div className="bg-white shadow rounded-lg p-6 h-full">
              {/* ABOUT ME */}
              <h2 className="text-xl font-bold mb-4">About Me</h2>
              <p className="text-gray-800">{isEditing ? <textarea type='desc' placeholder='Your description here' name='description' value={editUser.description} onChange={handleEditChange} className=' w-full mx-auto border h-auto outline-none px-2  bg-slate-100 rounded-md py-1' /> : user.description}
              </p>


              {/* SKILLS */}
            <div className={`${role==='seeker'?'block':'hidden'}`}>
              <h2 className="text-xl font-bold mt-6 mb-4">Skills</h2>
              <div className={`flex ${isEditing ? 'inline-block' : 'hidden'}`}>
                <input placeholder='Add Skill' type="text" id='inputSkill' name='skills' className={`p-1 border-black border  rounded-md outline-none`} />
                <button onClick={handleEditSkill} className={` bg-indigo-600 ml-2 mr-2 hover:bg-indigo-800 rounded-md text-white py-1 px-4 fontM `}>Add skill</button>
              </div>
              <div className="flex flex-col gap-y-5 h-40  my-6 text-gray-600 font-bold flex-wrap gap-x-10 ">
                {user.skills && user.skills.map((item) => {
                  return (
                    <div className={`items-center flex space-x-3`}>
                      <li className='list-disc w-full' key={item}>{item}</li>
                      <button key={item + Date.now()} onClick={() => { handleDelSkill(item) }} className={`${isEditing ? 'inline' : 'hidden'} bg-red-600 border p-1 rounded-md`}><TrashIcon key={Date.now()} color='white' width={15} height={15} /></button>
                    </div>
                  )
                })}
              </div>
              </div>

              <div className={`${role==='employer'?'block':'hidden'}`}>
              <h2 className="text-xl font-bold mt-6 mb-4">Company name</h2>
              {user.companyName && <h1 className="text-gray-800">{isEditing ? <input type='text' name='companyName' placeholder='Company Name here' value={editUser.companyName} onChange={handleEditChange} className='w-full font-semibold mx-auto border outline-none px-2  bg-slate-100 rounded-md py-1' /> : user.companyName}</h1>
                }

                {/*employer's company address */}
                <div className='flex items-center  space-x-2 font-semibold my-1 text-base'>
                <h1>Address : </h1>
                <li className="text-gray-600 list-none flex items-center">{isEditing ? <input placeholder='Your company address here' type='text' name='companyAddress' value={editUser.companyAddress} onChange={handleEditChange} className='align-middle  w-full mx-auto outline-none px-2  bg-slate-100 rounded-md py-1' /> : user.companyAddress}</li>
                </div>
              </div>



              <h2 className="text-xl font-bold mt-6 mb-4">Join date</h2>
              <p className="text-gray-800">{Date(user.date).substring(0, 15).replace(" ", ", ")}</p>

              {/* Edit - save button */}

              <div className='mt-8 flex justify-end space'>
                <button onClick={handleEdit} className={`${isEditing ? 'hidden' : 'inline-block'} bg-indigo-600 flex justify-center items-center space-x-2 hover:bg-indigo-700 rounded-md text-white py-1 px-4 mr-2`}>Edit
                  <PencilIcon color='white' width={15} height={15} className='ml-2 inline align-middle' />
                </button>
                <button onClick={handleSave} className={`${isEditing ? 'inline-block' : 'hidden'} bg-indigo-600 ml-2 mr-2 hover:bg-indigo-800 rounded-md text-white py-1 px-4 fontM `}>Save</button>
                <button onClick={() => {
                  if (role === 'seeker'){
                    setUser(seeker)
                    setEditUser({
                      name: seeker.name,
                      description: seeker.description,
                      address: seeker.address,
                      country: seeker.country,
                      skills: seeker.skills,
                      profession: seeker.profession
                    })
                  }
                  else if (role === 'employer'){
                    setUser(employer)
                    setEditUser({
                      name: employer.name,
                      description: employer.description,
                      address: employer.address,
                      country: employer.country,
                      skills: employer.skills,
                      profession: employer.profession,
                      companyName: employer.companyName,
                      companyAddress:employer.companyAddress
                    })
                  }
                  setIsEditing(false)
                }} className={`${isEditing ? 'inline-block' : 'hidden'} bg-indigo-600 ml-2 mr-2 hover:bg-indigo-800 rounded-md text-white py-1 px-4 fontM`}>Cancel</button>
              <button onClick={()=>{console.log(user)
              console.log(editUser)}}>print user</button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
