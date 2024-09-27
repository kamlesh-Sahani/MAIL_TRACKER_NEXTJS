import {NextRequest, NextResponse} from "next/server"
import { authConfig } from "./auth.config";
import NextAuth from "next-auth";
const  {auth} =  NextAuth(authConfig);
export const middleware = async (req:NextRequest)=>{
    const session:any  = await auth();
    const isLogin = !!session?.user?.email;
    console.log(session.user,"user")
    console.log(req.nextUrl.pathname,"pathname/middleware ")
    const protectedRoute = req.nextUrl.pathname==="/campaign" || req.nextUrl.pathname==="/profile" || req.nextUrl.pathname==="/api/me" || req.nextUrl.pathname==="/api/send-mail";

    console.log(protectedRoute,isLogin)
    const withoutLoginRoute = req.nextUrl.pathname === "/login" || req.nextUrl.pathname==="/register"
    if(isLogin && withoutLoginRoute){
        return  NextResponse.redirect(new URL('/', req.url))
    }
    if(protectedRoute && !isLogin){
        return NextResponse.redirect(new URL("/login",req.url))
    }
}

export const config = {
    matcher:["/campaign","/login","/register","/api/:path*","/profile","/verify-mail/:path*"]
}