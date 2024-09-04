import UserModel from "@/models/user.model";
import dbConnect from "@/utils/dbConnect";
import {NextResponse,NextRequest} from "next/server";

dbConnect();

export const POST= async(req:NextRequest)=>{
    try {
        const {email} = await req.json();
        if(!email){
            return NextResponse.json({
                success:false,
                message:"where is my email man?"
            },{status:401})
        }
        const user = await UserModel.findOne({email});
        if(!user){
            return NextResponse.json({
                success:false,
                message:"that is invalid email"
            },{status:400})
        }
        return NextResponse.json({
            success:true,
            message:"waw you got a me :)",
            user
        },{status:200})
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:"faild to get me "
        },{status:500})
    }
}