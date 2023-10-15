import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from "react"
const checkToken = () => {

const [token, setToken] = useState(false)
useEffect(()=>{
    axios.post('/api/test').
    then((res)=>{
        if(res.data.success){
            // console.log(res.data.success)
            setToken(true)
        }
    }).catch((err)=>{
        setToken(false)
        // console.log(err.response.data)
    })
},[])

useEffect(()=>{
    console.log(token)
},[token])

  return token
}

export default checkToken
