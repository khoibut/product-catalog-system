import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { create } from "domain";

export default defineSchema({
    users: defineTable({
        name: v.string(),
        email: v.string(),
        password: v.string(),
    })
        .index("by_email", ["email"])
        .index("by_name", ["name"]),
    products: defineTable({
        name: v.string(),
        price: v.number(),
        description: v.string(),
        gender: v.string(),
        image: v.optional(v.string()),
        colors: v.array(v.string()),
        sizes: v.array(v.string()),
    }),
    carts: defineTable({
        userId: v.id("users"),
        items: v.array(v.id("cartItems")),
    }). index("by_user", ["userId"]),
    cartItems: defineTable({
        cartId: v.id("carts"),
        productId: v.id("products"),
        quantity: v.number(),
    }),
});
