"use client";

import { Check, Star, Zap } from "lucide-react";
import { cn } from "@/lib/utils"; // We'll need to create this util

interface PackageSelectionProps {
    onSelect: (pkg: string, price: number) => void;
    selectedPackage: string | null;
    basePrice: number;
}

export function PackageSelection({ onSelect, selectedPackage, basePrice }: PackageSelectionProps) {
    const packages = [
        {
            id: "BASIC",
            name: "Basic",
            multiplier: 1,
            features: ["Standard Decor", "DJ & Sound System", "Buffet Dinner (300 Pax)", "Basic Photography"],
            icon: Check,
            color: "bg-zinc-100 dark:bg-zinc-800",
            accent: "text-zinc-500",
        },
        {
            id: "STANDARD",
            name: "Standard",
            multiplier: 1.5,
            features: ["Premium Decor & Flowers", "Live Band + DJ", "Gourmet Buffet (500 Pax)", "Drone + Candid Photography", "Dedicated Event Manager"],
            icon: Star,
            color: "bg-blue-50 dark:bg-blue-900/20",
            accent: "text-blue-600",
            popular: true,
        },
        {
            id: "PREMIUM",
            name: "Premium",
            multiplier: 2.5,
            features: ["Luxury Theme Decor", "Celebrity Performance", "Royal Feast (Unlimited)", "Cinematic Film & Drone", "Bridal/Groom Luxury Entry", "Helicopter Entry (Optional)"],
            icon: Zap,
            color: "bg-orange-50 dark:bg-orange-900/20",
            accent: "text-saffron",
        },
    ];

    return (
        <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold">Select Your Package</h2>
                <p className="text-zinc-500">Choose the experience that fits your vision</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {packages.map((pkg) => {
                    const price = basePrice * pkg.multiplier;
                    return (
                        <div
                            key={pkg.id}
                            onClick={() => onSelect(pkg.id, price)}
                            className={cn(
                                "relative cursor-pointer rounded-2xl border-2 p-6 transition-all hover:scale-105",
                                selectedPackage === pkg.id
                                    ? "border-saffron bg-saffron/5 shadow-xl shadow-saffron/10"
                                    : "border-transparent bg-white dark:bg-zinc-900 hover:border-zinc-200 dark:hover:border-zinc-700 shadow-lg"
                            )}
                        >
                            {pkg.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                                    Most Popular
                                </div>
                            )}

                            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4", pkg.color)}>
                                <pkg.icon className={cn("w-6 h-6", pkg.accent)} />
                            </div>

                            <h3 className="text-xl font-bold">{pkg.name}</h3>
                            <div className="text-2xl font-bold my-2 text-foreground">
                                ₹{(price / 100000).toFixed(2)} Lakhs
                            </div>
                            <p className="text-xs text-zinc-500 mb-6">Estimated cost</p>

                            <ul className="space-y-3">
                                {pkg.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                                        <Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <div className={cn(
                                "w-6 h-6 rounded-full border-2 absolute top-6 right-6 flex items-center justify-center transition-colors",
                                selectedPackage === pkg.id ? "border-saffron bg-saffron text-white" : "border-zinc-300"
                            )}>
                                {selectedPackage === pkg.id && <Check className="w-3 h-3" />}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
