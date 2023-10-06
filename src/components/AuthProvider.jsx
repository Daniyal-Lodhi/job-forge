'use client'
import React from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google';

const AuthProvider = ({children}) => {
  return (
      <GoogleOAuthProvider clientId= {process.env.NEXT_PUBLIC_g_clientId}>
        {children}
      </GoogleOAuthProvider>
      

  )
}

export default AuthProvider
