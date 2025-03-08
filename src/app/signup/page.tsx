"use client";
import { useRef } from "react";
import { signup } from "@/utils/auth";
import { signIn } from "next-auth/react";
function page() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);
    async function handleSignup() {
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        const username = usernameRef.current?.value;
        const confirmPassword = confirmPasswordRef.current?.value;
        if (email && password && username && confirmPassword) {
            if (password === confirmPassword) {
                try {
                    const results = await signup(username, email, password);
                    const loginResults = await signIn("credentials", {
                        email,
                        password,
                        redirect: false,
                    })
                    if (loginResults) {
                        if (!loginResults.error) {
                            alert("Signup successful");
                        } else {
                            alert("Signup failed: " + loginResults.error);
                        }
                    } else {
                        alert("Signup failed: Unknown error");
                    }
                }catch(error:any){
                    alert("Signup failed: " + error.message);
                }
            } else {
                alert("Passwords do not match");
            }
        } else {
            alert("Please enter all fields");
        }
        console.log("Signup");
    }
    return (
        <>
            <div className="w-full flex flex-col justify-center items-center h-screen">
                <div className="flex flex-col items-start py-5 px-7 bg-white w-125 gap-2">
                    <div className="font-semibold text-xl">Welcome</div>
                    <div className="text-[#A9ABBD]">Sign up with email and username</div>
                    <div className="flex flex-col gap-4 mt-4 w-full">
                        <input ref={usernameRef} type="text" placeholder="Username" className="placeholder:text-[#A9ABBD] p-2 border-1 border-black w-" />
                        <input ref={emailRef} type="text" placeholder="Email" className="placeholder:text-[#A9ABBD] p-2 border-1 border-black w-" />
                        <input ref={passwordRef} type="password" placeholder="Password" className="placeholder:text-[#A9ABBD] p-2 border-1 border-black" />
                        <input ref={confirmPasswordRef} type="password" placeholder="Confirm password    " className="placeholder:text-[#A9ABBD] p-2 border-1 border-black" />
                    </div>
                    <div className="flex justify-between w-full text-[#A9ABBD]">
                        <div className="flex items-center gap-2">
                            <input className="size-5" type="checkbox" />
                            <div>Remember me</div>
                        </div>
                        <div className="font-semibold">Forgot password?</div>
                    </div>
                    <div className="flex justify-center w-full">
                        <button onClick={handleSignup} className="bg-black text-white p-2">Sign up</button>
                    </div>
                </div>
                <div className="w-full flex justify-center">
                    <div className="w-125 flex justify-center items-center gap-2">
                        <div className="text-[#A9ABBD]">Or create an <span className="font-semibold">account</span></div>
                    </div>


                </div>
            </div>
        </>
    )
}
export default page;