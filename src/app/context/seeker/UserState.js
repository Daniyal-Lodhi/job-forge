'use client'

import axios from 'axios'
import React, { useContext, useState } from 'react'
import UserContext from './UserContext'
import TokenContext from '../token/tokenContext'
const UserState = (props) => {
    const { token } = useContext(TokenContext)
    const [seeker, setSeeker] = useState({})
    const [employer, setEmployer] = useState({})
   
    const getSeeker = () => {
        if (token) {
            axios.get('/api/seeker').
                then(res => {
                    setSeeker(res.data.seeker)
                }).
                catch(error => {
                    console.log(error)
                    return false
                })
        }
        else {
            console.log("Sign in required")
        }
    }

    const getEmployer = () => {
        if (token) {
            axios.get('/api/employer').
                then(res => {
                    setEmployer(res.data.employer)
                    // console.log(res.data.employer)
                }).
                catch(error => {
                    console.log(error)
                    return false
                })
        }
        else {
            console.log("Sign in required")
        }
    }
   
    return (
        <UserContext.Provider value={{ getSeeker, seeker ,employer,getEmployer }} >
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState
