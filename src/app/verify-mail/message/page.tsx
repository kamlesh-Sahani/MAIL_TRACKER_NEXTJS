"use client";
import {useSearchParams,useRouter} from 'next/navigation'
const VerifyMailMessage = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const router = useRouter();
    if(id!=="42342342fdfgdfg435dfgdfgdfg34"){
        return router.push("/register");
    }
    return (
        <div className="flex justify-center items-center pt-10">
            <div className=" rounded-lg shadow-lg p-8 max-w-md w-full text-center">
                <div className="mb-4">
                    <svg
                        className="w-16 h-16 mx-auto text-blue-400 animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 4.354a9 9 0 110 15.292M12 2v4m0 12v4m4.354-16.354l-1.415 1.415M6.061 18.939l-1.415-1.415M16.95 19.061l-1.414 1.415M6.061 5.061l-1.415 1.414"
                        />
                    </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-100">Check Your Email</h2>
                <p className="text-gray-400 mt-2">
                    A verification link has been sent to your email. Please check your inbox and click on the link to verify your account.
                </p>
            </div>
        </div>
    )
}

export default VerifyMailMessage