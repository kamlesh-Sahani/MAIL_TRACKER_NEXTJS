import UserModel from "@/models/user.model";
import dbConnect from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";

dbConnect();
export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { userId, token, type } = reqBody;
        if(!userId || !token || !type ){
            return NextResponse.json({
                success: false,
                message: "please fill the all fields "
            }, { status: 400 })
        }
        const user = await UserModel.findById(userId);
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "invaild user id "
            }, { status: 401 })
        }


      
            if (user.verficationTokenExpire < new Date()) {
                return NextResponse.json({
                    success: false,
                    message: "token is expired"
                }, { status: 400 })
            }
            if (user.verificationToken !== token) {
                return NextResponse.json({
                    success: false,
                    message: "invalid token"
                }, { status: 400 })
            }

            if (type === "reject") {
                user.verificationToken = "";
                user.isVerified = false;
                user.verficationTokenExpire = new Date();
                await user.save();
                return NextResponse.json({
                    success: true,
                    message: "user is rejected"
                }, { status: 200 })
            } else{
                user.isVerified = true;
                await user.save();
                return NextResponse.json({
                    success: true,
                    message: "user is verified"
                }, { status: 200 })
            }

            
        


    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: `faild to varifing email: ${error.message}`
        }, { status: 500 })
    }
}