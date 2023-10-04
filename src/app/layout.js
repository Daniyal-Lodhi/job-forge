import AuthProvider from '../components/AuthProvider'
import './globals.css'



export const metadata = {
  title: 'Job Forge',
  description: 'Online platform to seek and provide valuable jobs for potential candidates ',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
      <AuthProvider>   
        {children}
        </AuthProvider>
      </body>
    </html>
  )
}
