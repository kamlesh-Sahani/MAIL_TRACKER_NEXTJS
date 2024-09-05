import NextAuth, { CredentialsSignin } from "next-auth"
import credentialProvider from "next-auth/providers/credentials";
import UserModel from "./models/user.model";
import dbConnect from "./utils/dbConnect";
import { authConfig } from "./auth.config";
import bcrypt from "bcryptjs";
export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    credentialProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentails) => {
        try {
          const email = credentails?.email as string | undefined;
          const password = credentails?.password as string |undefined;
          if (!email || !password) {
            throw new CredentialsSignin({ cause: "please provide of credentials" });
          }
          await dbConnect();
          const user = await UserModel.findOne({ email }).select("+password");
          if (!user) {
            throw new CredentialsSignin({ cause: "Invalid email or password" });
          }

          const isPasswordMacth =  await bcrypt.compare(password,user.password)

          if (!isPasswordMacth) {
            throw new CredentialsSignin("Email or password is wrong");
          }
          return user as any;
        } catch (error: any) {
          throw new CredentialsSignin(error.message);
        }

      }
    })
  ],
  pages: {
    signIn: "/login"
  }
})