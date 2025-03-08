import { query } from "../_generated/server";
import {v} from "convex/values";

export const getProducts = query(async ({ db }) => {
  return await db.query("products").collect();
});
export const getProduct = query({
  args: { productId: v.id("products") },
  handler: async ({ db }, { productId }) => {
    // Call db.get with the productId only.
    const product = await db.get(productId);
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  },
});