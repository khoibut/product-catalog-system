"use client";

import CartItem from "@/components/CartItem";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useSession } from "next-auth/react";
export default function cart() {
    // const { data: session } = useSession();
    // const username = session?.user?.name ?? "";
    // const cartItems = useQuery(api.functions.cart.getCartItemsByUsername, { username });
    // const products = (cartItems ?? [])
    //     .filter((item): item is NonNullable<typeof item> => item != null)
    //     .map((item) =>
    //         useQuery(api.functions.queries.getProduct, { productId: item.productId })
    //     );
    // console.log(products);
    return (
        <>
            <div className="mt-15 font-body py-10 px-30 flex flex-col gap-5">
                <h1 className="text-4xl font-semibold">Your cart</h1>
                <div className="flex justify-between">
                    <div>
                        Not ready to checkout yet? Continue shopping
                        <CartItem />
                    </div>
                    <div className="flex gap-5 flex-col">
                        <div className="text-2xl font-semibold">
                            Order summary
                        </div>
                        <input type="text" placeholder="Enter coupon code here" className="border-1 border-black p-2 w-100" />
                        <div className="flex justify-between">
                            <div>Subtotal</div>
                            <div>$200</div>
                        </div>
                        <div className="flex justify-between border-black">
                            <div>Shipping</div>
                            <div className="text-[#0D0D0D]">Calculated at the next step</div>
                        </div>
                        <hr className="h-9 bg-black" />
                        <div className="flex justify-between">
                            <div>Total</div>
                            <div>$200</div>
                        </div>
                        <button className="bg-black text-white py-4">Continue to checkout</button>
                    </div>
                </div>
            </div>
        </>
    )
}