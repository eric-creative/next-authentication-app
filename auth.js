import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import {getUser} from "@/actions/dbActions";


export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                try {
                    return await getUser({credentials})
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