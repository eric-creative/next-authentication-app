import {NextResponse} from "next/server";
import bcrypt, {hash} from "bcrypt";
import {checkUser, createUser} from "@/actions/dbActions";

export async function POST(request) {
    try {
        const {username, email, password, verifyPassword} = await request.json();

        if (!username || !email || !password || !verifyPassword) {
            return NextResponse.json({error: "Username or password is required"});
        } else if (!verifyPassword) {
            return NextResponse.json({error: "Password verification is required"});
        } else if (password !== verifyPassword) {
            return NextResponse.json({error: "Passwords do not match"});
        } else {
            const hashedPass = await hash(password, 12);
            try {
                const user = await checkUser({ email });

                const userRes = await user.json();
                if (userRes.success === null) {
                    try {
                        const response = await createUser({ username, email, hashedPass });
                        if (response.success) {
                            return NextResponse.json({ success: 'User created successfully', status: 201 });
                        } else {
                            return NextResponse.json({ server_error: 'server error', status: 500 })
                        }
                    } catch (e) {
                        return NextResponse.json({ error: 'Unable to create user', e, status: 400 });
                    }
                } else {
                    return NextResponse.json({ error: 'Email address is taken', status: 400 })
                }
            } catch (e) {
                return NextResponse.json({ error: 'Unable to get existing user', e, status: 400 })
            }
        }

    } catch (error) {
        return NextResponse.json({error: error});
    }
}