import UserModel from '@/models/user.model';
import dbConnect from '@/utils/dbConnect';
import {NextRequest, NextResponse} from 'next/server';

dbConnect();

export async function GET(req:NextRequest){
    try {
         const params = req.nextUrl.searchParams;
         const trackingId = params.get("trackingId");
         const campaigns = await UserModel.findOne({
            "campaigns.trackingId":trackingId
        }).select("campaigns");

        if(!campaigns){
            return NextResponse.json({
                success:false,
                message:"invalid tracking id"
            })
        }
        const ipAddress = 
            req.headers.get("cf-connecting-ip") || 
            req.headers.get("x-real-ip") || 
            req.headers.get("x-forwarded-for")?.split(',')[0].trim();
        for(let i=0;i<campaigns.campaigns.length;i++){
            if(campaigns.campaigns[i].trackingId===trackingId){
                if(campaigns.campaigns[i].opend.includes(ipAddress)){
                    return NextResponse.json({
                        success:false,
                        message:"already client is opened",
                        ipAddress
                    })
                }else{
                    campaigns.campaigns[i].opend.push(ipAddress);
                    await campaigns.save();
                    return NextResponse.json({
                        success:true,
                        message:"opend by client",
                    })
                }
                
            }
        }

        return NextResponse.json({
            success:false,
            message:"tracking id is not found",
            ipAddress
        })

      

    } catch (error:any) {
        return NextResponse.json({
            success:false,
            message:`failed to tracking mail: ${error.message}`
        })
    }
}