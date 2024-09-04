// pages/index.tsx
import Link from 'next/link'
export default function Home() {
  return (
    <>
      <main className="flex flex-col items-center justify-center bg-black text-white">
        <section className="flex flex-col items-center justify-center  w-[80%] text-center px-4 py-16 max-sm:w-full">
          <h1 className="text-6xl font-bold mb-4 leading-tight drop-shadow-sm max-sm:text-4xl">
            Elevate Your Email Campaigns with <span className='text-blue-500'>AI-Powered</span>  Customization
          </h1>
          <p className="text-xl mb-8 max-w-2xl">
            Send personalized bulk emails with messages crafted by our <span className='text-blue-500'>AI, track open rates</span>, and optimize your campaigns for maximum impact. Our platform makes email marketing <span className='text-blue-500'>smarter and more efficient.</span> 
          </p>


          <Link href="/campaign" className="bg-blue-700 text-black w-[300px] h-[50px] justify-center items-center flex rounded text-lg hover:bg-blue-400 transition font-semibold">Get Started
          </Link>
        </section>


        
      </main>
    </>
  )
}
