import NextAuth, { CredentialsSignin } from "next-auth"
import credentialProvider from "next-auth/providers/credentials";
import UserModel from "./models/user.model";
import dbConnect from "./utils/dbConnect";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    credentialProvider({
      name: "credentials",
      authorize:async(credentails)=>{
        try {
          const email= credentails?.email as string;
          const password = credentails?.password as string;
          if(!email || !password){
            throw new CredentialsSignin({cause:"please provide of credentials"});
          }
          await dbConnect();
          const user = await UserModel.findOne({email}).select("+password");
          if(!user){
            throw new CredentialsSignin({cause:"Invalid email or password"});
          } 
  
          const isPasswordMacth = await  user.comparePassword(password);
  
          if(!isPasswordMacth){
            throw new CredentialsSignin ("Email or password is wrong");
          }
          return user;
        } catch (error:any) {
          throw new CredentialsSignin(error.message);
        }
       
      }
    })
  ],
  pages:{
    signIn:"/login"
  }
})