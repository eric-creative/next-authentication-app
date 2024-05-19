'use server'

import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs"


export async function createUser({ username, email, password}) {
    const hashedPass = await bcrypt.hash(password, 10);
    try {
        await connectMongoDB();
        const response = await  User.create({ username, email, password: hashedPass})
        if (response.email === email){
            return {
                success: 'User created'
            }
        } else {
            return {
                error: 'Something went wrong during creating user'
            }
        }
    } catch (error) {
        return error;
    }
}

export async function checkUser({ email }) {
    try {
        await connectMongoDB();
        const existingUser = await  User.findOne({email}).select('_id');
        return { success: existingUser };

    } catch (error) {
        console.log(error)
    }
}
