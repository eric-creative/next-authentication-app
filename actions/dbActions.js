'use server'

import {NextResponse} from "next/server";
import {connectMongoDB} from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcrypt";


export async function createUser({ username, email, hashedPass}) {
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
        return NextResponse.json({ success: existingUser });

    } catch (error) {
        console.log(error)
    }
}

export async function getUser({ credentials }) {
    console.log(credentials)
    const { email, password } = credentials;
    try {
        await connectMongoDB();
        const user = await  User.findOne({email});
        if (!user) {
            return null;
        }
        await bcrypt.compare(password, user.password, function(err, res) {
            if (err) {
                return null;
            } else if (res) {
                return user;
            } else {
                return 'passwords do not match';
            }
        })
    } catch (error) {
        throw error
    }
}