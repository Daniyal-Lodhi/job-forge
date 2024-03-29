import Navbar from '@/components/Navbar'
import AuthProvider from '../components/AuthProvider'
import './globals.css'
import TokenState from './context/token/TokenState'
import UserState from './context/seeker/UserState'




export const metadata = {
  title: 'Job Forge',
  description: 'Online platform to seek and provide valuable jobs for potential candidates ',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.8.1/flowbite.min.js"></script>

      </head>

      <body suppressHydrationWarning >
        <TokenState>
        <UserState>
      <AuthProvider>   
        <div className='absolute w-full top-0'>
        <Navbar/>
        </div> 
        {children}
        </AuthProvider>
        </UserState>
        </TokenState>












{/* Flowbite scripts */}

        </body>
    </html>
  )
}
