import { Inter } from 'next/font/google'
import { ToastContainer } from 'react-toastify';
import Image from 'next/image';
// import twitterIcon from "../../public/images/twitter-icon.svg";
import 'react-toastify/dist/ReactToastify.css';
import './globals.css'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ position: 'relative' }}>
        {children}
        <ToastContainer />
        <div
         id='global-loader-id' 
         style={{ position: 'absolute', top: '38%', right: '46%', display: 'none' }} >
         <Image alt="Loader" src='./loader.svg' height={100} width={100} />
        </div>
      </body>
    </html>
  )
}
