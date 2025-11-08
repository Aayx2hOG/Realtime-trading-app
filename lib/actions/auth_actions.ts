'use server';

import { headers } from "next/headers";
import { auth } from "../authentication/auth";
import { inngest } from "../client";

export const signUpWithEmail = async ({ email, password, fullName, country, investmentGoals, riskTolerance, preferredIndustry }: SignUpFormData) => {
    try {
        const response = await auth.api.signUpEmail({
            body: {
                email,
                password,
                name: fullName
            }
        })

        if (response) {
            await inngest.send({
                name: "app/user.created",
                data: {
                    email,
                    name: fullName,
                    country,
                    investmentGoals,
                    riskTolerance,
                    preferredIndustry,
                }
            })
        }
        return { success: true, data: response };

    } catch (e) {
        console.log('Sign up Failed', e)
        return { success: false, error: 'Sign up failed. Please try again.' };
    }
}

export const signInWithEmail = async ({ email, password }: SignInFormData) => {
    try {
        const response = await auth.api.signInEmail({
            body: {
                email,
                password,
            }
        })
        return { success: true, data: response };

    } catch (e) {
        console.log('Sign in Failed', e)
        return { success: false, error: 'Sign in failed. Please try again.' };
    }
}

export const signOut = async () => {
    try {
        const signOutResponse = await auth.api.signOut({ headers: await headers() });
    } catch (e) {
        console.log('Sign out failed', e);
        return { success: false, error: 'Sign out failed. Please try again.' }
    }
}