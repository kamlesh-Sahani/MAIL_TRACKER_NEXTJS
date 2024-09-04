import "next-auth";

declare module "next-auth"{
    interface User{
        _id?:string;
        name?:string;
        email?:string;
        role?:string;
        campaigns?:Array<{
        campaignName:string;
        createdAt:Date;
        recipients:Array<string>;
        opend:Array<string>;
    }>
    }
}