"use client";

import Product from "@/components/Product";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useAllProducts } from "@/services/productService";
export default function Products() {
    const products = useAllProducts();
    console.log(products);
    return (
        <>
            <div className="mt-15 font-body">
                <div className="bg-black text-white px-30 py-10">
                    <h1 className="text-4xl font-semibold">
                        Shop Men's
                    </h1>
                    <br></br>
                    <p className="w-125 text-lg">
                        Revamp your style with the latest designer trends in men’s clothing or achieve a perfectly curated wardrobe thanks to our line-up of timeless pieces.
                    </p>
                </div>
                <div className="flex gap-10 px-30 py-10">
                    <div className="w-1/4">
                        Filters
                    </div>
                    <div className="w-3/4">
                        <div className="grid grid-cols-[repeat(auto-fit,_minmax(16rem,_1fr))] gap-10">
                            {products && products.map((product) => (
                                <Product
                                    key={product._id}
                                    id={product._id}
                                    name={product.name}
                                    gender={product.gender}
                                    price={product.price}
                                    image={product.image ?? null}/>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}