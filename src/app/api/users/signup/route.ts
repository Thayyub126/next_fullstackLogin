import {connect} from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';



connect();

export async function POST(request:NextRequest){
    try{
        const reqBody = await request.json();
        const {userName,email,password} = reqBody;

        //check if user already exists
         const user = await User.findOne({email})
            if (user){
                return NextResponse.json({error:"user Already Exists"}, {status:400})
            }
        
        // hashed passwaord
        
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt);

        // creating new user

        const newUser = new User({
            userName,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser)

        return NextResponse.json({
            
            message:"user created successfully",
            success :true,
            savedUser
    
    })

    }catch(error:any){
        return NextResponse.json({error: error.message}, {status:500})
    }
}
