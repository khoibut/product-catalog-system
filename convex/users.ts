import { mutation } from "./_generated/server";
import { v } from "convex/values";
import bcrypt from "bcryptjs";

export const signup = mutation({
    args: { name: v.string(), email: v.string(), password: v.string() },
    handler: async (ctx, args) => {
        // Check if email already exists
        const existingEmail = await ctx.db
            .query("users")
            .withIndex("by_email", (q) => q.eq("email", args.email))
            .unique();

        if (existingEmail) {
            throw new Error("Email already in use");
        }

        // Check if name already exists
        const existingName = await ctx.db
            .query("users")
            .withIndex("by_name", (q) => q.eq("name", args.name))
            .unique();

        if (existingName) {
            throw new Error("Username already taken");
        }

        // Hash password before storing
        const hashedPassword = bcrypt.hashSync(args.password, 10);

        // Insert new user
        const userId = await ctx.db.insert("users", {
            name: args.name,
            email: args.email,
            password: hashedPassword,
        });

        return { userId, name: args.name, email: args.email };
    },
});

export const login = mutation({
    args: { email: v.string(), password: v.string() },
    handler: async (ctx, args) => {
        // Find user by email
        const user = await ctx.db
            .query("users")
            .withIndex("by_email", (q) => q.eq("email", args.email))
            .unique();

        // If user doesn't exist or password is incorrect
        if (!user || !(await bcrypt.compareSync(args.password, user.password))) {
            throw new Error("Invalid email or password");
        }

        return { userId: user._id, name: user.name, email: user.email };
    },
});

