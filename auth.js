import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import {connectMongoDB} from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";


export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                const { email, password } = credentials;
                try {
                    await connectMongoDB();
                    const user = await  User.findOne({email});
                    if (!user) {
                        return null;
                    } else {
                        const match = await bcrypt.compare(password, user.password);
                        if (match) {
                            return user;
                        } else {
                            return null;
                        }
                    }
                } catch (e) {
                    return null;
                }
            },
        }),
    ],
    pages: {
        signIn: '/signIn'
    }
})