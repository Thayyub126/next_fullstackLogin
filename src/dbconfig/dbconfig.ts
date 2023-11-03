import mongoose from "mongoose";

export async function connect(){
    try{
        mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;
        connection.on('connected',()=>{
            console.log('MongoDB connected Successfully');
        })
        connection.on('error', (err)=>{
            console.log("Mongodb connection error,Please sure check DB is connected" + err);
            process.exit();
        })
    }catch(error){
        console.log("somthing goes wrong");
        console.log(error)
    }
}