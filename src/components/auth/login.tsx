import { useState } from "react"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useAuth } from "@/contexts/auth"
import { Button } from "../ui/button"
import { Spinner } from "../utils/spinner"

export const LoginUi = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const auth = useAuth()

    return(
        <div>
            {auth.isLoading ?
                <>
                    <Spinner className="py-6"/>
                </>
            :
                <>
                    <div>
                        <Label>
                            E-Mail
                        </Label>
                        <Input autoFocus placeholder="max.mustermann@email.com" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                    </div>
                    <div className="mt-4">
                        <Label>
                            Password
                        </Label>
                        <Input onKeyDown={async (e)=>{
                            if(e.key === "Enter"){
                                await auth.handleEmailSignIn(email, password)
                                auth.toggleAuthUi(false)
                            }
                        }} type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                    </div>
                    <Button className="w-full mt-6" onClick={async()=>{
                        await auth.handleEmailSignIn(email, password)
                        auth.toggleAuthUi(false)
                    }}>
                        Sign In
                    </Button>
                </>
            }
        </div>
    )
}