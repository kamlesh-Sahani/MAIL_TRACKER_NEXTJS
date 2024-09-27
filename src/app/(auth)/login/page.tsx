"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import { loginAction } from '../../actions/authAction';
import toast from 'react-hot-toast';
import {useRouter} from "next/navigation"
 const LoginForm = () => {
  const [loginData, setLoginData] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: ""
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [guestLoading, setGuestLoading] = useState<boolean>(false)
  const router =useRouter();
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await loginAction({ email: loginData.email, password: loginData.password });
      if(response === "NEXT_REDIRECT"){
        toast.success("sign in successfuly");
        router.push("/campaign");
        return router.refresh();
      }
      toast.error("check email of password");
      setLoading(false);
    } catch (error: any) {
      toast.error("check email of password");
      setLoading(false);
    }

  }

  const guestHandler = async()=>{
    try {
      setGuestLoading(true);
      const response = await loginAction({ email:process.env.NEXT_PUBLIC_GUEST_EMAIL!, password:process.env.NEXT_PUBLIC_GUEST_PASSWORD! });
      if(response === "NEXT_REDIRECT"){
        toast.success("login successfuly");
        router.push("/campaign");
        return router.refresh();
      }
      toast.error("check email of password");
      setGuestLoading(false);
    } catch (error: any) {
      toast.error("check email of password");
      setGuestLoading(false);
    }
  }
  return (
    <div className="flex  justify-center h-full ">
      <div className="w-[610px] rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-blue-500 mb-6">Login</h2>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-white text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 cursor-pointer"
              onChange={(e) => setLoginData((prev) => ({ ...prev, email: e.target.value }))}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="block text-white text-sm font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 cursor-pointer"
              onChange={(e) => setLoginData((prev) => ({ ...prev, password: e.target.value }))}
            />
          </div>
          <div className='mb-2 flex justify-end'>
            <Link href={"/register"} className='text-[#525252] font-semibold underline'>For Register Cick me</Link>

          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-black font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {
              loading ? "Loading..." : "Login"
            }

          </button>
          <p className='text-center mt-4'>OR</p>
          <button
            type="button"
            className="w-full py-3 bg-gray-800 mt-6 text-white font-semibold rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 "
            onClick={guestHandler}
          >
            
            {
              guestLoading ? "अतिथि देवो भव ..." : "Guest"
            }

          </button>

        </form>
      </div>
    </div>
  );
};

export default LoginForm;
