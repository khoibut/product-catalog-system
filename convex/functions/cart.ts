// convex/cartByUsername.ts
import { v } from "convex/values";
import { query } from "../_generated/server";
import { mutation } from "../_generated/server";
export const getCartItemsByUsername = query({
    args: { username: v.string() },
    handler: async ({ db }, { username }) => {
        const user = await db.query("users")
            .withIndex("by_name", q => q.eq("name", username))
            .unique();

        if (!user) {
            return [];
        }

        const cart = await db.query("carts")
            .withIndex("by_user", q => q.eq("userId", user._id))
            .unique();

        if (!cart) return [];

        const items = await db.query("cartItems")
            .filter(q => q.eq(q.field("cartId"), cart._id))
            .collect();

        return items;
    },
});

export const getCartItemsWithProducts = query({
    args: { username: v.string() },
    handler: async ({ db }, { username }) => {
        const user = await db.query("users")
            .withIndex("by_name", q => q.eq("name", username))
            .unique();

        if (!user) {
            return [];
        }

        const cart = await db.query("carts")
            .withIndex("by_user", q => q.eq("userId", user._id))
            .unique();

        if (!cart) return [];

        const cartItems = await db.query("cartItems")
            .filter(q => q.eq(q.field("cartId"), cart._id))
            .collect();

        if (cartItems.length === 0) return [];

        const productIds = [...new Set(cartItems.map(item => item.productId))];

        const products = await Promise.all(
            productIds.map(id => db.get(id))
        );

        const productMap = new Map();
        products.forEach(product => {
            if (product) productMap.set(product._id, product);
        });

        return cartItems.map(item => ({
            ...item,
            product: productMap.get(item.productId) || null
        }));
    }
});
export const addToCartByUsername = mutation({
    args: {
        username: v.string(),
        productId: v.id("products"),
        quantity: v.number(),
    },
    handler: async ({ db }, { username, productId, quantity }) => {
        const user = await db.query("users")
            .withIndex("by_name", q => q.eq("name", username))
            .unique();
        if (!user) {
            throw new Error("User not found");
        }
        let cart = await db.query("carts")
            .withIndex("by_user", q => q.eq("userId", user._id))
            .unique();

        if (!cart) {
            const cartId = await db.insert("carts", { userId: user._id, items: [] });
            cart = { _id: cartId, _creationTime: Date.now(), userId: user._id, items: [] };
        }

        let existingCartItemId: string | null = null;
        for (const cartItemId of cart.items) {
            const item = await db.get(cartItemId);
            if (item && item.productId === productId) {
                existingCartItemId = cartItemId;
                break;
            }
        }

        if (existingCartItemId) {
            const normalizedCartItemId = db.normalizeId("cartItems", existingCartItemId);
            if (!normalizedCartItemId) {
                throw new Error("Invalid cart item ID");
            }
            const existingItem = await db.get(normalizedCartItemId);
            if (!existingItem) {
                throw new Error("Cart item not found");
            }
            const newQuantity = existingItem.quantity + quantity;
            await db.patch(normalizedCartItemId, { quantity: newQuantity });
            return { updated: true, cartItemId: existingCartItemId };
        } else {
            const cartItemId = await db.insert("cartItems", {
                cartId: cart._id,
                productId,
                quantity,
            });
            await db.patch(cart._id, { items: cart.items.concat(cartItemId) });
            return { added: true, cartItemId };
        }
    },
});

export const deleteFromCartByUsername = mutation({
    args: {
        username: v.string(),
        productId: v.id("products"),
    },
    handler: async ({ db }, { username, productId }) => {
        const user = await db.query("users")
            .withIndex("by_name", q => q.eq("name", username))
            .unique();
        if (!user) {
            throw new Error("User not found");
        }
        const cart = await db.query("carts")
            .withIndex("by_user", q => q.eq("userId", user._id))
            .unique();
        if (!cart) {
            throw new Error("Cart not found");
        }
        let cartItemIdToDelete: string | null = null;
        for (const cartItemId of cart.items) {
            const item = await db.get(cartItemId);
            if (item && item.productId === productId) {
                cartItemIdToDelete = cartItemId;
                break;
            }
        }
        if (!cartItemIdToDelete) {
            throw new Error("Product not found in cart");
        }
        const normalizedCartItemId = db.normalizeId("cartItems", cartItemIdToDelete);
        if (!normalizedCartItemId) {
            throw new Error("Invalid cart item ID");
        }
        await db.delete(normalizedCartItemId);
        const updatedItems = cart.items.filter(id => id !== cartItemIdToDelete);
        await db.patch(cart._id, { items: updatedItems });
        return { deleted: true, cartItemId: cartItemIdToDelete };
    },
});