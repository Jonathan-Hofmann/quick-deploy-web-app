
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useMemo, useState } from "react";
import { BsExclamationTriangle } from "react-icons/bs"

import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Spinner } from "../utils/spinner";
import { useAuth } from "@/contexts/auth";

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
        const resp = await auth.handleEmailSignIn({ email: email, password: password });

        if (resp.error === true) {
            setError(resp);
            setLoading(false)
            return
        }
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
            {/* <NextSeo
                title={"Willkommen in der ArtSlide | App"}
                description={"Melde Dich an, um die ArtSlide App zu öffnen und Dein volles künstlerisches Potential zu entfalten."}
                canonical={"https://www.artslide.co/app"}
                openGraph={{
                    url: "https://www.artslide.co/app",
                    title: "Willkommen in der ArtSlide | App",
                    description: "Melde Dich an, um die ArtSlide App zu öffnen und Dein volles künstlerisches Potential zu entfalten.",
                    site_name: 'ArtSlide | App',
                }}
            /> */}
            <div className="grid lg:grid-cols-2">
                <div className="hidden lg:block relative bg-zinc-100 dark:bg-zinc-950 h-screen">
                    <Image
                        alt={'Login Image'}
                        src={''}
                        layout='fill'
                        objectFit='cover'
                    />
                </div>
                <div className="h-screen relative flex flex-col justify-center">
                    <div className="w-[90vw] sm:w-[50vw] lg:w-[40vw] lg:max-w-[600px] mb:bg-red-500 mx-auto">
                        <div className="absolute top-8 left-8">
                            <Image
                                alt={'Logo'}
                                src={'/media/logo/logo_white.svg'}
                                height={40}
                                width={163}
                                className="hidden dark:block mb-16"
                            />
                            
                            <Image
                                alt={'Logo'}
                                src={'/media/logo/logo_black.svg'}
                                height={40}
                                width={163}
                                className="block dark:hidden"
                            />
                        </div>
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
                                <Button onClick={()=>handleBasicSignIn()} disabled={email.length === 0 || password.length === 0} className="w-full mb-4">
                                    Sign In
                                </Button>
                            </>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}