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
                            Passwort
                        </Label>
                        <Input onKeyDown={(e)=>{
                            if(e.key === "Enter"){
                                auth.handleEmailSignIn(email, password)
                            }
                        }} type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                    </div>
                    <Button className="w-full mt-6" onClick={()=>{auth.handleEmailSignIn(email, password)}}>
                        Anmelden
                    </Button>
                </>
            }
        </div>
    )
}