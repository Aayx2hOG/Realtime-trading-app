"use client";

import { FooterLink } from "@/components/forms/footerLink";
import { InputField } from "@/components/forms/inputField";
import { SelectField } from "@/components/forms/selectField";
import { Button } from "@/components/ui/button";
import CountryRegionPicker from "@/components/ui/CountryRegionPicker";
import { signUpWithEmail } from "@/lib/actions/auth_actions";
import { INVESTMENT_GOALS, PREFERRED_INDUSTRIES, RISK_TOLERANCE_OPTIONS } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const Signup = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting }
    } = useForm<SignUpFormData>({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            country: 'India',
            investmentGoals: 'Growth',
            riskTolerance: 'Medium',
            preferredIndustry: 'Technology',
        }, mode: 'onBlur'
    })
    const [country, setCountry] = useState("");
    const [region, setRegion] = useState("");

    const onSubmit = async (data: SignUpFormData) => {
        try {
            const result = await signUpWithEmail(data);
            if (result.success) {
                router.push("/");
            }
        } catch (e) {
            toast.error("Sign up failed. Please try again.", {
                description: e instanceof Error ? e.message : "An error occurred during sign up.",
            });
        }
    }

    return (
        <>
            <h1 className="form-title">Sign Up</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <InputField
                    name="fullName"
                    label="Full Name"
                    placeholder="Enter your full name"
                    register={register}
                    error={errors.fullName}
                    validation={{ required: "Full Name is required", minLength: { value: 2, message: "Full Name must be at least 2 characters long" } }}
                />

                <InputField
                    name="email"
                    label="Email"
                    placeholder="Enter your email"
                    register={register}
                    error={errors.email}
                    validation={{ required: "Email is required", pattern: { value: /^\S+@\S+$/, message: "Email is invalid" } }}
                />

                <CountryRegionPicker
                    country={country}
                    region={region}
                    onCountryChangeAction={(c) => setCountry(c)}
                    onRegionChangeAction={(r) => setRegion(r)}
                />

                <InputField
                    name="password"
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    register={register}
                    error={errors.password}
                    validation={{ required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters long" } }}
                />

                <SelectField
                    name="investmentGoals"
                    label="Investment Goals"
                    placeholder="Select your investment goals"
                    options={INVESTMENT_GOALS}
                    control={control}
                    error={errors.investmentGoals}
                    required
                />

                <SelectField
                    name="riskTolerance"
                    label="Risk Tolerance"
                    placeholder="Select your risk tolerance"
                    options={RISK_TOLERANCE_OPTIONS}
                    control={control}
                    error={errors.riskTolerance}
                    required
                />

                <SelectField
                    name="preferredIndustry"
                    label="Preferred Industry"
                    placeholder="Select your preferred industry"
                    options={PREFERRED_INDUSTRIES}
                    control={control}
                    error={errors.preferredIndustry}
                    required
                />

                <Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
                    {isSubmitting ? 'Creating Account...' : 'Start Investing'}
                </Button>

                <FooterLink text="Already have an account?" linkText="Sign In" href="/sign-in" />
            </form >
        </>
    )
}
export default Signup;