import { useState } from "react"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useAuth } from "@/contexts/auth"
import { Button } from "../ui/button"
import { Spinner } from "../utils/spinner"

export const RegisterUi = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")

    const auth = useAuth()

    return (
        <div>
            {auth.isLoading ?
                <>
                    <Spinner className="py-6" />
                </>
                :
                <>
                    <div>
                        <Label>
                            Name
                        </Label>
                        <Input value={name} onChange={(e) => { setName(e.target.value) }} />
                    </div>
                    <div className="mt-4">
                        <Label>
                            Email
                        </Label>
                        <Input value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    </div>
                    <div className="mt-4">
                        <Label>
                            Password
                        </Label>
                        <Input onKeyDown={(e) => {
                            if (e.key === "enter") {
                                auth.handleEmailSignUp(email, password, name)
                            }
                        }} value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    </div>
                    <Button className="w-full mt-6" onClick={() => { auth.handleEmailSignUp(email, password, name) }}>
                        Sign Up
                    </Button>
                </>
            }

        </div>
    )
}