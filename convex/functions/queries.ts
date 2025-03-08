import { query } from "../_generated/server";

export const getProducts = query(async ({ db }) => {
  return await db.query("products").collect();
});
