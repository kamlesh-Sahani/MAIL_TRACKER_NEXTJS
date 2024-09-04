"use client";
import {useSearchParams,useRouter} from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
export default function VerifyMail() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const userId = searchParams.get("userid");
  const router = useRouter();
  const verifyHandler =async(type:string)=>{
    try {
      const {data} = await axios.post(`/api/verify-mail`,{token,userId,type});
      if(data.success){
        toast.success(data.message)
        router.push("/login");
      }
     
    } catch (error:any) {
      toast.error(error.response?.data?.message || "something went wrong")
    }
    
  }

  const rejectHandler = ()=>{
    toast.success("verification Rejected!");
    router.push("/");
  }
  return (
    <div className="flex justify-center items-center ">
      <div className="rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <h2 className="text-xl font-semibold text-gray-100 mb-4">
          {/* Display verification status */}
          Verification Required
        </h2>
        <p className="text-gray-400 mb-6">
          Please verify your email to continue using our services. If you didn't request this, you can reject the verification.
        </p>
        <div className="flex flex-col gap-3 w-full">
          <button
            className="bg-blue-700 hover:bg-blue-600 text-black py-2 px-4  font-bold rounded "
            onClick={()=>verifyHandler("verify")}
          >
            Verify
          </button>
          <button
            className="bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded "
            onClick={()=>verifyHandler("reject")}
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}
