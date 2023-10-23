'use client'

import axios from 'axios'
import React, { useState } from 'react'
import SeekerContext from './seekerContext'
import checkToken from '@/components/checkToken'

const SeekerState = (props) => {
    const [seeker,setSeeker] = useState({})
    const getSeeker = ()=>{
        if(checkToken){
        axios.get('/api/seeker').
        then(res=>{
            setSeeker(res.data.seeker)
            console.log(true)
        }).
        catch(error=>{
            return false
            // console.log(error)
        })
    }       
    else{
        console.log("Sign in required")
        }
    }
  return (
    <SeekerContext.Provider value={{getSeeker,seeker}} >
        {props.children}
    </SeekerContext.Provider>
  )
}

export default SeekerState
