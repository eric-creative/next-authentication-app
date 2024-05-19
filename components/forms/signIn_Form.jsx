'use client'

import {Button} from "@/components/ui/button";
import Link from "next/link";
import {signInAction} from "@/actions/authActions";
import {toast} from "sonner";

export function SignIn_Form() {

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const error = await signInAction(formData);
        if (error) {
            toast.error(error)
        }
    }

    return (
        <div
            className={`overflow-y-auto tracking-wider overflow-x-hidden fixed top-0 right-0 left-0 z-50 h-full items-center justify-center flex `}>
            <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                <div className="relative rounded-lg">
                    <div className="p-5">
                        <h3 className="text-2xl mb-0.5 font-medium dark:text-gray-300"></h3>
                        <p className="mb-4 text-sm font-normal text-gray-800 dark:text-gray-300"></p>

                        <div className="text-center">
                            <p className="mb-3 text-2xl font-semibold leading-5 text-gray-900 dark:text-gray-300">
                                Login
                            </p>
                        </div>

                        {/*<SocialButtons/>*/}

                        <div className="flex w-full items-center gap-2 py-6 text-sm text-gray-600 dark:text-gray-300">
                            <div className="h-px w-full bg-gray-300 dark:bg-gray-600"></div>
                            OR
                            <div className="h-px w-full bg-gray-300 dark:bg-gray-600"></div>
                        </div>

                        <form onSubmit={handleSubmit} className="w-full">
                            <input
                                type="email"
                                name='email'
                                placeholder="Email address"
                                autoComplete="email"
                                className="w-full rounded-t-lg outline-none h-5 px-3 py-5 text-sm font-normal border dark:border-gray-500 border-gray-200 dark:text-gray-300 bg-transparent text-gray-400"
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="w-full rounded-b-lg outline-none h-5 px-3 py-5 text-sm font-normal border border-t-0 dark:border-gray-500 border-gray-200 dark:text-gray-300 bg-transparent text-gray-400"
                            />

                            <Button
                                className='w-full mt-5 dark:text-gray-300 bg-transparent text-gray-400'
                                variant="outline">
                                Continue
                            </Button>

                        </form>

                        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
                            Don't have an account?
                            <Link href="/register" className="font-medium text-[#4285f4]"> Register now</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}