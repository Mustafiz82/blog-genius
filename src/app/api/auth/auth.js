import { getSession } from "next-auth/react";

// A simple helper function to get the current session
export async function auth() {
    const session = await getSession();
    return session; // This will be null if the user is not authenticated
}
