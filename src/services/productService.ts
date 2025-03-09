import { useQuery } from "convex/react";
import { Id } from "../../convex/_generated/dataModel";
import { api } from "../../convex/_generated/api";
export function useProduct(productId?: Id<"products">) {
    return useQuery(api.functions.products.getProduct, productId ? {productId} : "skip");
}

export function useAllProducts() {
    return useQuery(api.functions.products.getProducts);
}
