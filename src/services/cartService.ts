import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useMutation } from "convex/react";
import { Id } from "../../convex/_generated/dataModel";

export function useCart(username: string) {
    return useQuery(api.functions.cart.getCartItemsByUsername, username ? { username } : "skip");
}

export function useAddToCart() {
    const addToCartMutation = useMutation(api.functions.cart.addToCartByUsername);
    return async (username: string, productId: string, quantity: number) => {
        await addToCartMutation({ username, productId: productId as Id<"products">, quantity });
    }
}

export function useRemoveFromCart() {
    const removeFromCartMutation = useMutation(api.functions.cart.deleteFromCartByUsername);
    return async (username: string, productId: string) => {
        await removeFromCartMutation({ username, productId: productId as Id<"products"> });
    }
}