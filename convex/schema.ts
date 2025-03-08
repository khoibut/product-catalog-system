import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { create } from "domain";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    password: v.string(),
    createdAt: v.number(),
  }),
  products: defineTable({
    name: v.string(),
    price: v.number(),
    description: v.string(),
    gender: v.string(),
    image: v.optional(v.string()),
    colors: v.array(v.string()),
    sizes: v.array(v.string()),
  })
});
