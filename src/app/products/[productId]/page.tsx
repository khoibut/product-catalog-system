"use client";

import { useQuery, useMutation } from "convex/react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useProduct } from "@/services/productService";
import { memo } from "react";
import { Product } from "@/types/product";

const ColorOption = memo(function ColorOption({ color }: { color: string }) {
    return (
        <div
            key={color}
            style={{ backgroundColor: color }}
            className={`size-13 border border-black rounded-full`}
            role="button"
            aria-label={`Select ${color} color`}
            tabIndex={0}
        />
    );
});

const SizeOption = memo(function SizeOption({ size }: { size: string; }) {
    return (
        <div
            key={size}
            className={`size-13 border-2 font-semibold text-lg border-black flex justify-center items-center`}
            role="button"
            aria-label={`Select ${size} size`}
            tabIndex={0}
        >
            {size}
        </div>
    );
});

const ProductDetails = memo(function ProductDetails({ product }: { product: Product }) {
    return (
        <>
            <div className="flex items-center gap-5">
                <div className="font-semibold text-4xl">{product.name}</div>
                <img src="/Favorites.svg" alt="Favorites" />
                <img src="/Frame.svg" alt="Frame" />
            </div>
            <div className="text-lg flex gap-4 items-center">
                <div className="text-lg">{"$" + product.price}</div>
                <div className="text-sm border border-[#C4C4C4] p-1 px-3">
                    or 4 interest-free payments of ${((product.price / 4).toFixed(2))}. Learn more
                </div>
            </div>
            <div className="text-lg w-90 mt-4">{product.description}</div>
        </>
    );
});

function ProductPage() {
    const [quantity, setQuantity] = useState(1);
    const params = useParams();
    const { data: session } = useSession();
    const username = session?.user?.name ?? "";
    const convexProductId = params.productId as Id<"products">;
    const product = useProduct(convexProductId);
    const addToCart = useMutation(api.functions.cart.addToCartByUsername);
    if (!product) return null;
    function handleAddToCart() {
        addToCart({ username, productId: convexProductId, quantity });
    }
    function handleIncrement() {
        setQuantity((prev) => prev + 1);
    }
    function handleDecrement() {
        setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
    }

    return (
        <>
            <div className="mt-15 py-15 w-full flex justify-center gap-10">
                <div className="w-1/3 bg-[#C4C4C4]">
                </div>
                <div>
                    <ProductDetails product={product} />
                    <div className="mt-3">
                        <div className="text-lg font-semibold text-[#A9ABBD]">Color</div>
                        <div>
                            <div className="flex gap-2">
                                {product.colors.map((color) => (
                                    <ColorOption key={color} color={color} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="mt-3">
                        <div className="text-lg font-semibold text-[#A9ABBD]">Sizes</div>
                        <div>
                            <div className="flex gap-2 flex-wrap w-110">
                                {product.sizes.map((size) => (
                                    <SizeOption key={size} size={size} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-5 mt-5">
                        <button
                            onClick={handleAddToCart}
                            className="bg-black text-white px-30 py-3 hover:cursor-pointer"
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
