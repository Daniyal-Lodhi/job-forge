'use client'
import React, {  useState } from 'react'
import TokenContext from './tokenContext'
const TokenState = (props) => {
  var [token, setToken] = useState(localStorage.getItem('token')==='true'?true:false)
  var [role,SetRole] = useState(localStorage.getItem('role'))
    return (
      <TokenContext.Provider value={{token,setToken,role,SetRole}}>
        {props.children}
      </TokenContext.Provider>
    )
}

export default TokenState
