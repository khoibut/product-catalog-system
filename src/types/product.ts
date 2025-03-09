import { Id } from "../../convex/_generated/dataModel";
export type Product = {
    _id: Id<"products">;
    name: string;
    price: number;
    description: string;
    gender: string;
    image?: string;
    colors: string[];
    sizes: string[];
  };
  