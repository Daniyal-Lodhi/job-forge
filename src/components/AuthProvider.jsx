'use client'
import React from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google';

const AuthProvider = ({children}) => {
  return (
      <GoogleOAuthProvider clientId= {process.env.g_clientId}>
        {children}
      </GoogleOAuthProvider>
      

  )
}

export default AuthProvider
