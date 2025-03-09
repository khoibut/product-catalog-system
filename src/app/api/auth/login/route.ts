import { api } from "../../../../../convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export const POST = async (req: Request) => {
    try {
        const { email, password } = await req.json();
        
        // Check if all required fields are provided
        if (!email || !password) {
            return new Response(
                JSON.stringify({ error: "Email and password are required" }),
                { status: 400 }
            );
        }
        
        const response = await convex.mutation(api.functions.users.login, { email, password });
        return new Response(JSON.stringify(response), { status: 200 });
    } catch (error: any) {
        console.error("Login error:", error);
        
        // More robust error message checking - check if it contains the text
        if (error.message && error.message.includes("Invalid email or password")) {
            return new Response(
                JSON.stringify({ error: "Invalid email or password" }),
                { status: 401 }  // Unauthorized status for authentication failures
            );
        }
        
        // Other server errors get 500 status
        const errorMessage = error.message || "Login failed";
        return new Response(
            JSON.stringify({ error: errorMessage }),
            { status: 500 }
        );
    }
};