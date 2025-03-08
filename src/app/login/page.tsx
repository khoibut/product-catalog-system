"use client";
import { login } from "@/utils/auth";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRef } from "react";
function page() {
    const router = useRouter();
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    function handleLogin() {
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        if (email && password) {
            try{
                const result = signIn("credentials", {
                    email,
                    password,
                    redirect: false,
                });
                router.push("/products");
            }catch(error:any){
                alert("Login failed: " + error.message);
            }
        }else{
            alert("Please enter email and password");
        }
    }
    return (
        <>
            <div className="w-full flex flex-col justify-center items-center h-screen">
                <div className="flex flex-col items-start py-5 px-7 bg-white w-125 gap-2">
                    <div className="font-semibold text-xl">Welcome Back</div>
                    <div className="text-[#A9ABBD]">Login with email</div>
                    <div className="flex flex-col gap-4 mt-4 w-full">
                        <input ref={emailRef} type="text" placeholder="Email" className="placeholder:text-[#A9ABBD] p-2 border-1 border-black w-" />
                        <input ref={passwordRef} type="password" placeholder="Password" className="placeholder:text-[#A9ABBD] p-2 border-1 border-black" />
                    </div>
                    <div className="flex justify-between w-full text-[#A9ABBD]">
                        <div className="flex items-center gap-2">
                            <input className="size-5" type="checkbox" />
                            <div>Remember me</div>
                        </div>
                        <div className="font-semibold">Forgot password?</div>
                    </div>
                    <div className="flex justify-center w-full">
                        <button onClick={handleLogin} className="bg-black text-white p-2">Login</button>
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