"use client"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useMemo, useState } from "react";
import { BsExclamationTriangle } from "react-icons/bs"

import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { useAuth } from "@/contexts/auth";
import { Spinner } from "../utils/spinner";
import { Navbar } from "../navigation/navbar";
import { Footer } from "../navigation/footer";

export interface NotLoggedInProps {
    setMode?: Function
}

export const NotLoggedIn: React.FC<NotLoggedInProps> = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState({ error: false, message: "" });

    const [showPasswordReset, setPasswordReset] = useState(false);

    const auth = useAuth()

    const router = useRouter();

    const handleBasicSignIn = async () => {
        setError({ error: false, message: "" })
        setLoading(true);
        await auth.handleEmailSignIn(email, password );

        setLoading(false)
    }

    // const handlePasswordReset = async () => {
    //     setError({ error: false, message: "" })
    //     setLoading(true)
    //     const resp = await auth.(email);

    //     if (resp.error) {
    //         setError(resp);
    //     }

    //     setLoading(false)
    // }

    // const handleGoogleSignIn = async () => {
    //     setError({ error: false, message: "" })
    //     setLoading(true)
    //     const resp = await auth.signInWithGoogle();

    //     // console.log(resp)

    //     if (resp.error === true) {
    //         setError(resp);
    //     }

    //     setLoading(false)
    // }

    return (
        <div>
            <Navbar/>
            <div className="grid lg:grid-cols-2 h-[calc(100vh_-_60px)]">
                <div className="hidden lg:block relative bg-zinc-100 dark:bg-zinc-950 ">
                    <img
                        alt={'Login Image'}
                        src={'https://images.unsplash.com/photo-1715331999602-fc92b7eb975e?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                        className=" object-cover w-full max-h-[calc(100vh_-_60px)]"
                    />
                </div>
                <div className="relative flex flex-col justify-center">
                    <div className="w-[90vw] sm:w-[50vw] lg:w-[40vw] lg:max-w-[600px] mb:bg-red-500 mx-auto">
                        {error.error===true &&
                            <Alert className="mb-6">
                                <BsExclamationTriangle className="h-4 w-4" />
                                <AlertTitle className="text-md">Sign In failed.</AlertTitle>
                                <AlertDescription>
                                    {error.message}
                                </AlertDescription>
                            </Alert>
                        }
                        
                        <h1 className="text-4xl mb-3 font-bold">Hey there!</h1>
                        <p className="mb-6 text-lg">Please sign in to continue</p>
                        
                        {isLoading ?
                            <div className="pt-8">
                                <Spinner/>
                            </div>
                        :
                            <>

                                <div className="flex flex-col lg:flex-row gap-4 mb-8">
                                    <Input type="email" value={email} onChange={(e) => setEmail(e.currentTarget.value)} placeholder="max.mustermann@mail.com" />
                                    <Input type="password" value={password} onChange={(e) => setPassword(e.currentTarget.value)} placeholder={"Your password here"} />
                                </div>
                                <Button onClick={()=>handleBasicSignIn()} className="w-full mb-4">
                                    Sign In
                                </Button>
                            </>
                        }

                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}