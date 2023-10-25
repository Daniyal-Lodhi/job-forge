'use client'
import React, { useContext, useEffect, useState } from 'react'
import { PencilIcon } from '@heroicons/react/24/outline';
import ProfileImage from '@/components/ProfileImage';
import UserContext from '../context/seeker/UserContext';
const page = () => {
  const { getSeeker, seeker } = useContext(UserContext)
  const [user, setUser] = useState({})
  const [isEditing, setIsEditing] = useState(false)

//  setting the display of edit avatar on hover
  useEffect(()=>{
    const avatarEditContainer = document.querySelector('#avatarEditContainer') 
    avatarEditContainer.addEventListener('mouseover',()=>{
      const pencilIcon = document.querySelector('#PencilIcon')
      pencilIcon.style.color = 'black' ;
    })
    avatarEditContainer.addEventListener('mouseout',()=>{
      const pencilIcon = document.querySelector('#PencilIcon')
      pencilIcon.style.color = 'transparent' ;
    })
  },[])
  useEffect(() => {
    getSeeker()
  }, [])

  useEffect(() => {
    setUser(seeker)
    setEditUser(seeker)
  }, [seeker])
  // console.log(user)
  const [editUser, setEditUser] = useState({
    name: user.name?user.name:"Your name here",
    profession: user.profession?user.profession : "Your profession here" ,
    address: "your address here",
    country: user.country || "your country here",
    description: user.description || "your description here",
    skills: user.skills || []
  })

  // handle edit click function
  const handleEdit = () => {
    setIsEditing(true)
    console.log(isEditing)
    console.log(editUser)
  }
  const handleSave = () => {
    setIsEditing(false)
    console.log(editUser)


  }
  const handleEditChange = (e) => {
    const { name, value } = e.target
  
    setEditUser({
      ...editUser, [name]: value
    })
    console.log(editUser)
  }



  return (
    <div className="bg-gray-100 py-16 ">
      <div className="container mx-auto py-8 ">
        <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4 ">
          <div className="col-span-4 sm:col-span-3 h-full ">
            {/*  */}
            <div className="bg-white shadow rounded-lg p-6 h-full ">
              <div className="flex flex-col items-center flex-1">
                <div className='w-32 h-32 overflow-hidden  bg-gray-300 rounded-full mb-4  shrink-0 flex justify-center relative'>
                  <div className='w-full   h-10 mx-auto '>
                    <ProfileImage  profileImage={user.avatar_Pid} />
                  </div>
                  <label id='avatarEditContainer' htmlFor='avatar' className={` ${isEditing?'flex':'hidden'} absolute hover:backdrop-blur-sm rounded-full cursor-pointer justify-center items-center    h-full w-full`}>
                    <div  className='ml-2 inline align-middle overflow-hidden '>
                    <PencilIcon width={55} height={55} className='text-transparent' id='PencilIcon' />
                    </div>
                  </label>
                  <input type="file" onChange={handleEdit} className='hidden' id='avatar' name='avatar' accept='image/png, image/jpeg, image/jpg' />
                </div>

                {/* name  */}
                {user.name && <h1 className="text-xl   font-bold mx-auto">{isEditing  ? <input type='text' name='name' value={editUser.name}  onChange={handleEditChange} className='w-full mx-auto border outline-none px-2 text-center bg-slate-100 rounded-md py-1' /> : user.name }</h1>
}
                {/* profession */}
                <p className="text-gray-600 text-center mt-2 ">{isEditing  ? <input type='text' name='profession' value={editUser.profession}  onChange={handleEditChange} className='w-full mx-auto border outline-none px-2 text-center bg-slate-100 rounded-md py-1' /> : user.profession}</p>

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
              <div className="flex flex-col ">
                <span className="uppercase font-bold tracking-wider mb-2">Address</span>
                <ul>
                  {/* ADDRESS */}
           

                  <li className="mb-2 text-gray-600">{isEditing ? <input type='text' name='address' value={editUser.address} onChange={handleEditChange} className=' w-full mx-auto border outline-none px-2  bg-slate-100 rounded-md py-1' /> : user.address}</li>
                  {/* COUNTRY */}
                  <li className="mb-2 text-gray-600">{isEditing ? <input type='text' name='country' value={editUser.country} onChange={handleEditChange} className=' w-full mx-auto border outline-none px-2  bg-slate-100 rounded-md py-1' /> : user.country}</li>

                </ul>
              </div>

            </div>
          </div>
          <div className="col-span-4 sm:col-span-9  h-full">
            <div className="bg-white shadow rounded-lg p-6 h-full">
              {/* ABOUT ME */}
              <h2 className="text-xl font-bold mb-4">About Me</h2>
              <p className="text-gray-800">{isEditing ? <input type='text' name='description' value={editUser.description} onChange={handleEditChange} className=' w-full mx-auto border outline-none px-2  bg-slate-100 rounded-md py-1' /> : user.description}
              </p>


              {/* SKILLS */}

              <h2 className="text-xl font-bold mt-6 mb-4">Skills</h2>
              <div className={`flex ${isEditing ? 'inline-block' : 'hidden'}`}>
              <input type="text" name='skills ' className={`p-1 border-black border  rounded-md outline-none`} />
              <button onClick={handleSave} className={` bg-indigo-600 ml-2 mr-2 hover:bg-indigo-800 rounded-md text-white py-1 px-4 fontM `}>Add skill</button>

              </div>
              <div className="flex flex-col gap-y-5 h-40 border my-6 text-gray-600 font-bold flex-wrap gap-x-10 ">
                <li className='list-disc'>React js</li>
                <li className='list-disc'>React js</li>
                <li className='list-disc'>React js</li>
                <li className='list-disc'>React js</li>
                <li className='list-disc'>React js</li>
                <li className='list-disc'>React js</li>
              </div>



              <h2 className="text-xl font-bold mt-6 mb-4">Join date</h2>
              <p className="text-gray-800">{Date(user.date).substring(0, 15).replace(" ", ", ")}</p>
             
              {/* Edit - save button */}

              <div className='mt-8 flex justify-end space'>
                <button onClick={handleEdit} className={`${isEditing ? 'hidden' : 'inline-block'} bg-indigo-500 flex justify-center items-center space-x-2 hover:bg-indigo-600 rounded-md text-white py-1 px-4 mr-2`}>Edit
                  <PencilIcon color='white' width={15} height={15} className='ml-2 inline align-middle' />
                </button>
                <button onClick={handleSave} className={`${isEditing ? 'inline-block' : 'hidden'} bg-indigo-600 ml-2 mr-2 hover:bg-indigo-800 rounded-md text-white py-1 px-4 fontM `}>Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
