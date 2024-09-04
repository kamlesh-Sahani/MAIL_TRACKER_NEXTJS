import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport(
    {
        secure:true,
        host:"smtp.gmail.com",
        port:465,
        auth:{
            user:process.env.NODEMAILER_AUTH_USER,
            pass:process.env.NODEMAILER_AUTH_PASS
        }
    }
);
export function sendMail(emails:string[]|string,subject:string,message:any,trackingId?:string){
    try {
        transporter.sendMail({
            to:emails,
            subject,
            html:trackingId?`<div>${message}
            <img src="${process.env.DOMAIN}/api/track-mail?trackingId=${trackingId}" alt=""  style="display:none;"/>
            </div>`:`<div>${message}</div>`
        },(error,info)=>{
            if (error) {
                return NextResponse.json({
                    success:false,
                    message:`error to sending mail ${error}`
                })
            } else {

                return NextResponse.json({
                    success:false,
                    message:`error to sending mail ${info.response}`
                })
            }
        }
    )
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:`error to sending mail ${error}`
        })
    }
   
}