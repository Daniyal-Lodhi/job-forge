'use client'
import React, { useEffect, useState } from 'react'
import TokenContext from './tokenContext'
const TokenState = (props) => {
        var [token, setToken] = useState(localStorage.getItem('token')==='true'?true:false)
    return (
      <TokenContext.Provider value={{token,setToken}}>
        {props.children}
      </TokenContext.Provider>
    )
}

export default TokenState
