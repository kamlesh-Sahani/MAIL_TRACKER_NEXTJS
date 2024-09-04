import mongoose from "mongoose";

const connection:{
    isConnected?:number
}={};


async function dbConnect(){
    if(connection.isConnected){
        console.log("database is alreay connected");
        return;
    }
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI!,{dbName:"mail-sender"});
        connection.isConnected=conn.connection.readyState;                                 ;
        console.log("database connection successuly",conn.connection.host);
    } catch (error) {
        console.log("database connection error",error);
    }
}
export default dbConnect;