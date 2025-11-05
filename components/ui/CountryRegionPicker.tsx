"use client";

import { useEffect, useState } from "react";
import * as CountryRegionSelector from "react-country-region-selector";
import ReactCountryFlag from "react-country-flag";
// @ts-ignore
import { getCode, getData } from "country-list";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const countries = (getData() as { name: string; code: string }[]).sort((a, b) =>
    a.name.localeCompare(b.name)
);

function sanitizeCountryLabel(name: string) {
    if (!name) return name;
    let out = name.replace(/\s*\([^)]*\)\s*/g, "");
    if (/,\s*The$/i.test(out)) {
        const base = out.replace(/,\s*The$/i, "");
        out = `The ${base}`;
    } else if (/,\s*the\b/i.test(out)) {
        out = out.replace(/,\s*the\b[\s\S]*$/i, "");
    }
    return out.trim();
}

function getCodeFromName(name?: string | null) {
    if (!name) return null;
    const direct = getCode(name as string);
    if (direct) return direct;
    const lower = name.toLowerCase().trim();
    const found = countries.find((c) => sanitizeCountryLabel(c.name).toLowerCase() === lower);
    return found ? found.code : null;
}

const { RegionDropdown } = CountryRegionSelector as any;

export default function CountryRegionPicker({
    country,
    region,
    onCountryChangeAction,
    onRegionChangeAction,
    countryId = "country",
    regionId = "region",
    className = "",
    countryLabel = "Country",
    regionLabel = "State / Region",
}: CountryProps) {
    const initialCode = country ? getCodeFromName(country) : null;
    const initialCanonicalName = initialCode
        ? countries.find((c) => c.code === initialCode)?.name ?? country
        : country ?? "";

    const [localCountryName, setLocalCountryName] = useState(initialCanonicalName);
    const [localCountryCode, setLocalCountryCode] = useState<string | null>(initialCode);
    const [localRegion, setLocalRegion] = useState(region ?? "");

    useEffect(() => {
        if (country !== undefined) {
            const code = getCodeFromName(country);
            const canonical = code ? countries.find((c) => c.code === code)?.name ?? country : country;
            setLocalCountryName(canonical);
            setLocalCountryCode(code);
        }
    }, [country]);

    useEffect(() => {
        if (region !== undefined) setLocalRegion(region);
    }, [region]);

    const handleCountryChange = (val: string) => {
        const found = countries.find((c) => c.code === val);
        const name = found ? found.name : val;
        setLocalCountryCode(val || null);
        setLocalCountryName(name);
        setLocalRegion("");
        onCountryChangeAction?.(sanitizeCountryLabel(name));
        onRegionChangeAction?.("");
    };

    const handleRegionChange = (val: string) => {
        setLocalRegion(val);
        onRegionChangeAction?.(val);
    };

    return (
        <div className={className}>
            <label htmlFor={countryId} className="form-label">
                {countryLabel}
            </label>
            <Select value={localCountryCode || ""} onValueChange={handleCountryChange}>
                <SelectTrigger className="select-trigger country-select-trigger w-full mb-3 mt-1">
                    <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 text-white border-gray-600">
                    {countries.map((c) => (
                        <SelectItem key={c.code} value={c.code} className="country-select-item">
                            <div className="flex items-center gap-3">
                                <ReactCountryFlag countryCode={c.code} svg style={{ width: 20, height: 14 }} />
                                <span>{sanitizeCountryLabel(c.name)}</span>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <label htmlFor={regionId} className="form-label mt-4">
                {regionLabel}
            </label>

            {(() => {
                const code = (localCountryCode || "").toUpperCase();
                if (code) {
                    return (
                        <RegionDropdown
                            id={regionId}
                            country={code}
                            countryValueType="short"
                            value={localRegion}
                            onChange={handleRegionChange}
                            className="country-select-trigger w-full"
                        />
                    );
                }

                return (
                    <RegionDropdown
                        id={regionId}
                        country={localCountryName}
                        value={localRegion}
                        onChange={handleRegionChange}
                        className="country-select-trigger w-full"
                    />
                );
            })()}
        </div>
    );
}
