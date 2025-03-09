"use node";
import { action } from "../_generated/server";
import { v } from "convex/values";
import bcrypt from "bcryptjs";

export const hashPassword = action({
  args: { password: v.string() },
  handler: async (_, args) => {
    return await bcrypt.hash(args.password, 10);
  },
});

export const comparePasswords = action({
  args: { password: v.string(), hashedPassword: v.string() },
  handler: async (_, args) => {
    return await bcrypt.compare(args.password, args.hashedPassword);
  },
});