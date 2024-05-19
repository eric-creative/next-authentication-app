'use client'

import * as React from "react"
import { Button } from "../ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState} from "react";
import { toast } from "sonner"
import Loader from "@/components/Loader";

export function SignUp_Form() {

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('')

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        setLoading(true);
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: formData.get('username'),
                    email: formData.get('email'),
                    password: formData.get('password'),
                    verifyPassword: formData.get('verifyPassword'),
                })
            });

            const res = await response.json();

            if (res.error) {
                setLoading(false);
                toast.error(res.error, {
                    theme: "colored"
                })
            } else if (res.success) {
                setLoading(false);
                toast.success(res.success, {
                    theme: "colored"
                });
                router.push('/signIn')
            }

        } catch (e) {
            setLoading(false)
            toast.error('Error during registration', {
                theme: "colored"
            })
        }
    }

    return (
        <div className={`overflow-y-auto tracking-wider overflow-x-hidden fixed top-0 right-0 left-0 z-50 h-full items-center justify-center flex `}>
            <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                <div className="relative rounded-lg">
                    <div className="p-5">
                        <h3 className="text-2xl mb-0.5 font-medium dark:text-gray-300"></h3>
                        <p className="mb-4 text-sm font-normal text-gray-800 dark:text-gray-300"></p>

                        <div className="text-center">
                            <p className="mb-3 text-2xl font-semibold leading-5 text-gray-900 dark:text-gray-300">
                                Create an account
                            </p>
                        </div>

                        {/*<SocialButtons />*/}

                        <div className="flex w-full items-center gap-2 py-6 text-sm text-gray-600 dark:text-gray-300">
                            <div className="h-px w-full bg-gray-300 dark:bg-gray-600"></div>
                            OR
                            <div className="h-px w-full bg-gray-300 dark:bg-gray-600"></div>
                        </div>

                        <form onSubmit={handleSubmit} className="w-full">
                            <input
                                type="text"
                                placeholder="User name"
                                name="username"
                                className="w-full rounded-t-lg outline-none h-5 px-3 py-5 text-sm font-normal border dark:border-gray-500 border-gray-200 dark:text-gray-300 bg-transparent text-gray-400"
                            />
                            <input
                                type="email"
                                placeholder="Email address"
                                name="email"
                                className="w-full outline-none h-5 px-3 py-5 text-sm font-normal border border-t-0 dark:border-gray-500 border-gray-200 dark:text-gray-300 bg-transparent text-gray-400"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                className="w-full outline-none h-5 px-3 py-5 text-sm font-normal border border-t-0 dark:border-gray-500 border-gray-200 dark:text-gray-300 bg-transparent text-gray-400"
                            />
                            <input
                                type="password"
                                placeholder="Verify Password"
                                name="verifyPassword"
                                className="w-full rounded-b-lg outline-none h-5 px-3 py-5 text-sm font-normal border border-t-0 dark:border-gray-500 border-gray-200 dark:text-gray-300 bg-transparent text-gray-400"
                            />

                            <Button
                                className='w-full mt-5 dark:text-gray-300 bg-transparent text-gray-400'
                                variant="outline">
                                { loading ? <Loader className={' !h-4 !w-4 '}/> : 'Register'}
                            </Button>

                        </form>

                        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
                            Already have an account?
                            <Link href="/signIn" className="font-medium text-[#4285f4]"> Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
