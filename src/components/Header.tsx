"use client";
interface HeaderProps {
    username: string | null;
    inverted?: boolean;
}
import { useRouter } from "next/navigation";
function Header({ username, inverted }: HeaderProps) {
    const navigate = useRouter();
    return (
        <header className={`font-inter bg-black text-white py-4 text-lg px-30 flex fixed top-0 left-0 w-full border-b-1 border-b-white justify-between items-center ${inverted ? 'invert' : ''}`}>
            <div className="flex gap-10">
                <div onClick={() => {
                    navigate.push("/products");
                }} className="font-bold text-xl">Ecommerce</div>
                <div>Shop</div>
                <div>Stories</div>
                <div>About</div>
                <div className="flex gap-4 items-center">
                    <img src="/search.svg" alt="search" className="size-4" />
                    <input type="text" placeholder="Search" className="bg-black text-white outline-none" />
                </div>
            </div>
            <div className="flex items-center gap-10">
                <div className="flex gap-2 items-center">
                    <img src="/Cart.svg" alt="cart" className="size-6" />
                    <div>3</div>
                </div>
                {username ? (
                    <div>{username}</div>
                ) : (
                    <>
                        <div>Login</div>
                        <div>Sign up</div>
                    </>
                )}
            </div>
        </header>
    )
}
export default Header;