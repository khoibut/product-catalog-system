function page() {
    return (
        <>
            <div className="w-full flex flex-col justify-center items-center h-screen">
                <div className="flex flex-col items-start py-5 px-7 bg-white w-125 gap-2">
                    <div className="font-semibold text-xl">Welcome Back</div>
                    <div className="text-[#A9ABBD]">Login with email</div>
                    <div className="flex flex-col gap-4 mt-4 w-full">
                        <input type="text" placeholder="Email" className="placeholder:text-[#A9ABBD] p-2 border-1 border-black w-" />
                        <input type="password" placeholder="Password" className="placeholder:text-[#A9ABBD] p-2 border-1 border-black" />
                    </div>
                    <div className="flex justify-between w-full text-[#A9ABBD]">
                        <div className="flex items-center gap-2">
                            <input className="size-5" type="checkbox" />
                            <div>Remember me</div>
                        </div>
                        <div className="font-semibold">Forgot password?</div>
                    </div>
                    <div className="flex justify-center w-full">
                        <button className="bg-black text-white p-2">Login</button>
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