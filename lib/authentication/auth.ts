import { betterAuth } from "better-auth";

let authInstance: ReturnType<typeof betterAuth> | null = null;

export const getAuth = () => {
    if (authInstance) return authInstance;

    authInstance = betterAuth({
    })
}