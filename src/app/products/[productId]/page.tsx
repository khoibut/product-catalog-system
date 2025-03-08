"use client";

import { useQuery, useMutation } from "convex/react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
function ProductPage() {
    // Always call hooks at the top.
    const [quantity, setQuantity] = useState(1);
    const params = useParams();
    const { data: session } = useSession();
    const addToCart = useMutation(api.functions.cart.addToCartByUsername);

    // Extract the productId from params.
    const productIdStr = Array.isArray(params.productId)
        ? params.productId[0]
        : params.productId;

    // Convert productId string to a Convex Id (cast for now).
    const convexProductId = productIdStr ? (productIdStr as Id<"products">) : undefined;


    // Use query only if productId is available.
    const product = useQuery(
        api.functions.queries.getProduct,
        convexProductId ? { productId: convexProductId } : "skip"
    );

    // Get user id from session.
    const username = session?.user?.name;

    // Loading states.
    if (!productIdStr) {
        return <div>Loading...</div>;
    }
    if (!product) {
        return <div>Loading product details...</div>;
    }

    // Handlers.
    function handleIncrement() {
        setQuantity((prev) => prev + 1);
    }
    function handleDecrement() {
        setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
    }
    async function handleAddToCart() {
        if (!username) {
            alert("Please log in to add items to your cart.");
            return;
        }
        try {
            const result = await addToCart({
                username,
                productId: convexProductId!,
                quantity,
            });
            console.log("Added to cart:", result);
            alert("Added to cart successfully.");
        } catch (error: any) {
            console.error("Error adding to cart:", error);
            alert("Failed to add to cart.");
        }
    }

    return (
        <>
            <div className="mt-15 py-15 w-full flex justify-center gap-10">
                <div className="w-1/3 bg-[#C4C4C4]">
                    {/* Product image placeholder */}
                </div>
                <div>
                    <div className="flex items-center gap-5">
                        <div className="font-semibold text-4xl">{product.name}</div>
                        <img src="/Favorites.svg" alt="Favorites" />
                        <img src="/Frame.svg" alt="Frame" />
                    </div>
                    <div className="text-lg flex gap-4 items-center">
                        <div className="text-lg">{"$" + product.price}</div>
                        <div className="text-sm border border-[#C4C4C4] p-1 px-3">
                            or 4 interest-free payments of $25.00. Learn more
                        </div>
                    </div>
                    <div className="text-lg w-90 mt-4">{product.description}</div>
                    <div className="mt-3">
                        <div className="text-lg font-semibold text-[#A9ABBD]">Color</div>
                        <div>
                            <div className="flex gap-2">
                                {product.colors.map((color) => (
                                    <div
                                        key={color}
                                        style={{ backgroundColor: color }}
                                        className="size-13 border border-black rounded-full"
                                    ></div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="mt-3">
                        <div className="text-lg font-semibold text-[#A9ABBD]">Sizes</div>
                        <div>
                            <div className="flex gap-2 flex-wrap w-110">
                                {product.sizes.map((size) => (
                                    <div
                                        key={size}
                                        className="size-13 border-2 font-semibold text-lg border-black flex justify-center items-center"
                                    >
                                        {size}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-5 mt-5">
                        <button
                            onClick={handleAddToCart}
                            className="bg-black text-white px-30 py-3"
                        >
                            Add to cart - {"$" + product.price}
                        </button>
                        <div className="flex items-center gap-4 border border-black justify-center px-3">
                            <div
                                onClick={handleDecrement}
                                className="text-2xl text-[#A9ABBD] hover:cursor-pointer select-none"
                            >
                                -
                            </div>
                            <div className="text-xl select-none">{quantity}</div>
                            <div
                                onClick={handleIncrement}
                                className="text-2xl text-[#A9ABBD] hover:cursor-pointer select-none"
                            >
                                +
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductPage;
