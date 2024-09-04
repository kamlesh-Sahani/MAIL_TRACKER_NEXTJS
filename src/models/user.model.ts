import mongoose, { Model } from "mongoose";
import bcrypt from "bcryptjs";
interface UserSchemaType{
    name:string;
    email:string;
    role:string;
    password:string;
    isVerified:boolean;
    verificationToken:string;
    verficationTokenExpire:Date;
    campaigns:{
        trackingId:string;
        campaignName:string;
        createdAt:Date;
        recipients:Array<string>;
        opend:Array<string>;
    }[]
}
const userSchema = new mongoose.Schema<UserSchemaType>({
    name:{
        type:String,
        required:[true,"please enter the user name"]
    },
    email:{
        type:String,
        required:[true,"please enter the emails "],
        unique:true
    },
    role:{
        type:String,
        required:[true,"please enter the field "]
    },
    password:{
        type:String,
        select:false
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    verificationToken:String,
    verficationTokenExpire:Date,
    campaigns:[{
        trackingId:String,
        campaignName:String,
        createdAt:{
            type:Date,
        },
        recipients:{
            type:[String],
            default:[]
        },
        opend:{
            type:[String],
            default:[]
        }
    }]

},{timestamps:true});

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
       return next()
    }
    try {
        const hashPassword = await bcrypt.hash(this.password,10);
        this.password = hashPassword;
        next();
    } catch (error:any) {
        next(error);
    }
   

})
userSchema.methods.comparePassword = async function(password:string){
    return  await bcrypt.compare(password,this.password)
}

const UserModel = mongoose.models?.User as Model<UserSchemaType> || mongoose.model<UserSchemaType>("User",userSchema);

export default UserModel;