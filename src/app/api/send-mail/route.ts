import dbConnect from '@/utils/dbConnect';
import { sendMail } from '@/utils/sendMail';
import {NextResponse,NextRequest} from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import UserModel from '@/models/user.model';
dbConnect();
import { marked } from 'marked';

export async function POST(req:NextRequest){
    try {
        const reqBody = await req.json();
        const {emails,message,subject,userEmail}:{emails:string,message:string,subject:string,userEmail:string} = reqBody;
        if(!emails || !message || !subject || !userEmail){
            return NextResponse.json({
                success:false,
                message:"please fill the all fields"
            },{status:400})
        }
        const user = await UserModel.findOne({email:userEmail});
        if(!user){
            return NextResponse.json({
                success:false,
                message:"user is not found"
            },{status:400})
        }
        const trackingId = uuidv4();
        sendMail(emails.trim().split(","),subject,marked(message),trackingId);

        user.campaigns.push({
            trackingId,
            campaignName:subject,
            createdAt:new Date(),
            recipients:emails.trim().split(",")
        })

        await user.save();
        return NextResponse.json({
            success:true,
            message:"emails sent successfuly"
        },{status:200})
    } catch (error:any) {
          return NextResponse.json({
            success:false,
            message:`faild to send mail : ${error.message}`
          },{status:500})
    }
}