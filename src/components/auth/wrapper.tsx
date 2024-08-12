import { useState } from "react"
import { DialogContent } from "../ui/dialog"
import { LoginUi } from "./login"
import { RegisterUi } from "./register"
import { Button } from "../ui/button"
import { useAuth } from "@/contexts/auth"

export const AuthWrapper = () => {
    const [authMode, setAuthMode] = useState("signin")
    const auth = useAuth();

    return (
        <DialogContent>

            <p className="text-2xl font-bold">Hey there!</p>

            {authMode === "signin" && <LoginUi />}
            {authMode === "signup" && <RegisterUi />}

            {!auth.isLoading &&
                <>
                    {authMode === "signin" && 
                        <Button variant={"link"} onClick={()=>{setAuthMode("signup")}}>
                            No Account yet?
                        </Button>
                    }
                    {authMode === "signup" && 
                        <Button variant={"link"} onClick={()=>{setAuthMode("signin")}}>
                            Sign in here
                        </Button>
                    }
                </>
            }
        </DialogContent>
    )
}