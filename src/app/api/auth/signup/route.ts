import { api } from "../../../../../convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export const POST = async (req: Request) => {
    try {
        const { name, email, password } = await req.json();
        
        // Check if all required fields are provided
        if (!name || !email || !password) {
            return new Response(
                JSON.stringify({ error: "Name, email, and password are required" }),
                { status: 400 }
            );
        }
        
        const response = await convex.mutation(api.users.signup, { name, email, password });
        return new Response(JSON.stringify(response), { status: 200 });
    } catch (error: any) {
        console.error("Signup error:", error);
        
        // Return the actual error message
        const errorMessage = error.message || "Signup failed";
        return new Response(
            JSON.stringify({ error: errorMessage }),
            { status: 500 }
        );
    }
};
