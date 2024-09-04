import Link from 'next/link'
import Image from 'next/image';
import React from 'react';
import profilePic from "@/assets/aiIcon.png"
import { auth, signOut } from "@/auth";
const Navbar = async () => {
  const session = await auth();
  return (
    <header className="w-full py-6 ">
      <nav className="container mx-auto flex justify-between items-center  max-sm:p-4">
        <Link href={"/"}>
          <div className="text-3xl font-bold text-blue-700 cursor-pointer">Inbox<span className='text-white'>AI</span></div>
        </Link>
        <div>


          {session?.user?.email ?
            <Link href={"/profile"} >
             
            <Image
            src={profilePic}
            alt="Profile Picture"
            className="w-[40px] h-[40px] rounded-full border-4 border-gray-700"
          />
          


              </Link>
            : <Link href="/login" className="bg-blue-700 text-black w-[170px] h-[40px] flex justify-center items-center rounded hover:bg-blue-500 font-semibold transition">Login
            </Link>

          }



        </div>
      </nav>
    </header>
  )
}

export default Navbar