import { Id } from "../../convex/_generated/dataModel";

export type Cart = {
  _id: Id<"carts">;
  userId: Id<"users">;
  items: Id<"cartItems">[];
};

export type CartItem = {
  _id: Id<"cartItems">;
  cartId: Id<"carts">;
  productId: Id<"products">;
  quantity: number;
};
