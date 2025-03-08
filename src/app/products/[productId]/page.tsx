"use client";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

function ProductPage() {
    const [quantity, setQuantity] = useState(1);
    const params = useParams();
    let productIdStr: string | undefined;
    if (typeof params.productId === "string") {
        productIdStr = params.productId;
    } else if (Array.isArray(params.productId)) {
        productIdStr = params.productId[0];
    }

    if (!productIdStr) return <div>Loading...</div>;
    const convexProductId = productIdStr as Id<"products">;
    const product = useQuery(api.functions.queries.getProduct, { productId: convexProductId });
    if (!product) return <div></div>;
    function handleIncrement() {
        setQuantity(quantity + 1);
    }
    function handleDecrement() {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }
    return (
        <>
            <div className="mt-15 py-15 w-full flex justify-center gap-10">
                <div className="w-1/3 bg-red-500">

                </div>
                <div>
                    <div className="flex items-center gap-5">
                        <div className="font-semibold text-4xl">
                            {product.name}
                        </div>
                        <img src="/Favorites.svg" />
                        <img src="/Frame.svg" />
                    </div>
                    <div className="text-lg flex gap-4 items-center">
                        <div className="text-lg">
                            {"$" + product.price}
                        </div>
                        <div className="text-sm border-1 border-[#C4C4C4] p-1 px-3">
                            or 4 interest-free payments of $25.00. Learn more
                        </div>
                    </div>
                    <div className="text-lg w-90 mt-4">
                        {product.description}
                    </div>
                    <div className="mt-3">
                        <div className="text-lg font-semibold text-[#A9ABBD]">
                            Color
                        </div>
                        <div>
                            <div className="flex gap-2">
                                {product.colors.map((color) => (
                                    <div key={color} style={{ backgroundColor: color }} className="size-13 border-1 border-black rounded-full"></div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="mt-3">
                        <div className="text-lg font-semibold text-[#A9ABBD]">
                            Sizes
                        </div>
                        <div>
                            <div className="flex gap-2 flex-wrap w-110">
                                {product.sizes.map((size) => (
                                    <div key={size} className="size-13 border-2 font-semibold text-lg border-black flex justify-center items-center">{size}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-5 mt-5">
                        <button className="bg-black text-white px-30 py-3">Add to cart - {"$" + product.price}</button>
                        <div className="flex items-center gap-4 border-1 border-black justify-center px-3">
                            <div onClick={handleDecrement} className="text-2xl text-[#A9ABBD] hover:cursor-pointer select-none">-</div>
                            <div className="text-xl select-none">{quantity}</div>
                            <div onClick={handleIncrement} className="text-2xl text-[#A9ABBD] hover:cursor-pointer select-none">+</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ProductPage;