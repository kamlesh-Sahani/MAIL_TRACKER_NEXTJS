"use server";
import { signIn, signOut } from "@/auth";
import UserModel from "@/models/user.model";
import dbConnect from "@/utils/dbConnect";
import { sendMail } from "@/utils/sendMail";
import { v4 as uuidv4 } from 'uuid';
export const loginAction = async({email,password}:{email:string,password:string})=>{
    try {
   const response=await signIn("credentials",{
    email,
    password,
  })
 
  return response;
    } catch (error:any) {
        return error.message;
    }
} 
export const signUpAction = async(formData:FormData)=>{
    try {
        const email = formData.get("email");
        const password = formData.get("password");
        const role = formData.get("role");
        const name = formData.get("name");
        if(!email || !password || !role || !name){
            return {
                success:false,
                message:"please fill the all fields"
            }
        };
        await dbConnect();
        const isUser = await UserModel.findOne({email});
        if(isUser){
            return{
                success:false,
                message:"user is already exists"
            }
        }
        
        const token = uuidv4();
        
        const user = await UserModel.create({
            name,
            password,
            role,
            email,
            verificationToken:token,
            verficationTokenExpire:new Date(Date.now() + 30 * 60 * 1000) // 30 minute
         })
         if(!user){
            return{
                success:false,
                message:"failed to sign up"
            }
         }
         
         const message=` <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2 style="color: #333;">Hello, ${name}!</h2>
      <p>Thank you for registering on our platform. Please click the link below to verify your email address:</p>
      <a 
        href="${process.env.DOMAIN}/verify-mail?token=${token}&userid=${user._id}" 
        style="display: inline-block; padding: 10px 20px; color: white; background-color: #007BFF; text-decoration: none; border-radius: 5px;">
        Verify Email
      </a>
      <h3>Link expire within 30 minutes</h3>
      <p style="color: #555;">If you did not create an account, please ignore this email.</p>
      <p>Thank you,<br/>The Team</p>
    </div>`;
       const subject="Verifing the user";
          sendMail(email.toString(),subject,message)
         return {
            success:true,
            message:"successfuly signup",
            user
         }
    } catch (error:any) {
        return {
            success:false,
            message:`something went wrong: ${error.message}` 
        }
    }
}






