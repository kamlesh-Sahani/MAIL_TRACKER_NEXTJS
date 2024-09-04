"use client";

import { signUpAction } from "@/app/actions/authAction";
import Link from "next/link";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
const RegisterForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const registerHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      const form = e.currentTarget;
      const formData = new FormData(form);

      const response = await signUpAction(formData);
      if (response.success) {
        toast.success(response.message);
        router.push("/verify-mail/message?id=42342342fdfgdfg435dfgdfgdfg34");
        form.reset();
       
      } else {
        toast.error(response.message);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
     
    }


  }

  return (
    <>

      <form onSubmit={registerHandler} >
        <div className="mb-4">
          <label htmlFor="name" className="block text-white text-sm font-semibold mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="eg. Kamlesh "
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 cursor-pointer"

          />
        </div>
        <div className="mb-4">
          <label htmlFor="role" className="block text-white text-sm font-semibold mb-1">
            Job Profile/Role
          </label>
          <input
            type="text"
            id="role"
            name="role"
            placeholder="eg. Full stack developer"
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 cursor-pointer"

          />
        </div>


        <div className="mb-4">
          <label htmlFor="email" className="block text-white text-sm font-semibold mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="eg. kamleshbca2005@gmail.com"
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 cursor-pointer"

          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-white text-sm font-semibold mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 cursor-pointer"

          />
        </div>
        <div className='mb-1 flex justify-end'>
          <Link href={"/login"} className='text-[#525252] font-semibold -mt-3 underline' >For login click me</Link>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-black font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {
            loading ? "Loading..." : "Sign up"
          }

        </button>
        

      </form>

    </>

  )
}

export default RegisterForm