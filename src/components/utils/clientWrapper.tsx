"use client"

import { AuthProvider } from "@/contexts/auth"
import { Navbar } from "../navigation/navbar"
import { Footer } from "../navigation/footer"

export const ClientProviders = ({children}:{children:any}) => {
    return(
        <AuthProvider>
            <Navbar/>
            {children}
            <Footer/>
        </AuthProvider>
    )
}