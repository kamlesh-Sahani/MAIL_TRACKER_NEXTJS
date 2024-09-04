"use client";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineElectricBolt } from "react-icons/md";
import run from "@/utils/gemini";
import {marked} from "marked";
import { useSession } from "next-auth/react"
const Page = () => {
  const {data:session}  = useSession();
  const [messagePlaceholder]=useState(`Hi [Manager's Name],
I hope you're doing well.
I wanted to take a moment to express how much I’ve enjoyed working at [Company Name] over the past [X months/years]. The projects we’ve tackled and the progress we’ve made as a team have been incredibly rewarding. I’m especially proud of my contributions to [mention a specific project or achievement], which [describe the impact or results].`);

const [mailData,setMailData]= useState<{subject:string,emails:string,message:any,userEmail:string}>({subject:"",emails:"",message:"",userEmail:""});
const[isLoading,setIsLoading]= useState<boolean>(false);
const [prompt,setPrompt] = useState<string>();
const [aiPrompt]=useState(`Generate a complete, well-formatted, and professional email based on the topic: {topic}. The email should include an appropriate greeting, a structured body with a logical flow, and a polite closing with a professional sign-off. Ensure proper spacing, formatting, and a respectful tone throughout. Do not include a subject line.
`);

const[aiLoading,setAiLoading] = useState<boolean>(false);
const setValueHanlder = (e:React.FormEvent)=>{
  const {name,value}:any= e.target;
  setMailData((prev)=>({...prev,
    [name]:value
  }))
}

const mailSubmitHandler = (e:React.FormEvent)=>{
  setIsLoading(true);
  e.preventDefault();
   axios.post(`/api/send-mail`,{...mailData,userEmail:session?.user?.email!}).then(({data})=>{
    if(data.success){
      toast.success(data.message); 
      setMailData({
        message:"",
        subject:"",
        emails:"",
        userEmail:""
      })
    }
    setIsLoading(false);
   }).catch((error)=>{toast.error("Something went wrong");  setIsLoading(false);} )
 
}

const promptHanlder = async()=>{
  if(!prompt){
    toast.error("please enter the prompt first");
    return
  }
  setAiLoading(true);
  const result = await run(aiPrompt.replace("{topic}",prompt));
  const markedResult = marked(result);

  setMailData((prev) => ({
    ...prev,
    message: markedResult,
  }));
  setAiLoading(false);
} 
  return (
    <div className="flex-1 flex justify-center ">
      <form onSubmit={mailSubmitHandler} className=" w-[60%] max-md:w-[97%]  flex flex-col gap-6   rounded-lg shadow-lg">
     
        <div className="flex flex-col gap-2">
          <label className="text-xl text-gray-300 font-semibold" htmlFor="subject">
            Email Subject
          </label>
          <input
            type="text"
            id="subject"
            className="h-[40px] rounded pl-4 bg-black text-white border-2 border-gray-600 focus:border-blue-500 focus:outline-none transition cursor-pointer"
            placeholder="e.g. Developer Vacancy"
            name="subject"
            onChange={(e)=>setValueHanlder(e)}
            value={mailData.subject}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xl text-gray-300 font-semibold" htmlFor="recipients">
            Recipients
          </label>
          <textarea
            id="recipients"
            className="h-[120px] pt-4 rounded pl-4 bg-black text-white border-2 border-gray-600 focus:border-blue-500 focus:outline-none transition cursor-pointer resize-none"
            placeholder="e.g. kamlesh@example.com, johndoe@example.com"
            name="emails"
            onChange={(e)=>setValueHanlder(e)}
            value={mailData.emails}
            required
          ></textarea>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xl text-gray-300 font-semibold" htmlFor="content">
          Generate message  With AI 
    </label>
          <div className="flex gap-3 max-sm:flex-col">
            <input
              type="text"
              id="content"
              className=" w-full h-[40px] rounded pl-4 bg-black text-white border-2 border-gray-600 focus:border-blue-500 focus:outline-none transition cursor-pointer"
              placeholder="Explain the content..."
              onChange={(e)=>setPrompt(e.target.value)}
              
            />
            <button
              type="button"
              className="flex  gap-2 bg-blue-500 text-black w-[140px] h-[40px] max-sm:w-full justify-center items-center rounded-md font-semibold transition hover:bg-blue-600"
              onClick={promptHanlder}
            >
              <MdOutlineElectricBolt />
              {
                aiLoading ? "Boosting..":"  Generate"
              }
            </button>
          </div>
        </div>
        <div className="flex w-full justify-center items-center">
          <div className="w-[45%] bg-[#6b6b6b] h-[1px]"></div>
          <p className="m-auto">or</p>
          <div className="w-[48%] bg-[#6b6b6b] h-[1px]"></div>
        </div>
        

        <div className="flex -mt-2">
          <div className="w-[100%] flex flex-col gap-2">
            <label className="text-xl text-gray-300 font-semibold">
              Messaeg to send
            </label>
            <textarea
              className="h-[450px] pt-4 w-full rounded pl-4 bg-black text-white border-2 border-gray-600 focus:border-blue-500 focus:outline-none transition cursor-pointer resize-none"
              placeholder={`eg .\n${messagePlaceholder}`}
              name="message"
              value={aiLoading?"loading":mailData.message}
              onChange={(e)=>setValueHanlder(e)}
              required
            ></textarea>
          </div>

        </div>
        <div className="flex flex-col gap-2">
  <h1 className="text-2xl font-bold text-white">Preview Message</h1>
  <div className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 p-6 rounded-lg border border-gray-500 shadow-lg">
    <div className="bg-gray-800 p-5 rounded-md shadow-inner text-white">
      <div dangerouslySetInnerHTML={{ __html: mailData.message }}></div>
    </div>
  </div>
</div>



        <button
          type="submit"
          className="h-[40px] bg-blue-500 text-gray-900 font-semibold rounded-md cursor-pointer transition hover:bg-blue-600"
        >
          {
            isLoading ? "Boosting 😎...": "Boost Mail 😃"
          }
       
        </button>
      </form>
    </div>
  );
};

export default Page;
