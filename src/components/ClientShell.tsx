"use client";

import dynamic from "next/dynamic";

// Lazy load non-critical components to reduce TBT and LCP interference
const BudgetBuddy = dynamic(() => import("@/components/BudgetBuddy").then(mod => mod.BudgetBuddy), { ssr: false });
const Toaster = dynamic(() => import("@/components/ui/toaster").then(mod => mod.Toaster), { ssr: false });

export function ClientShell() {
    return (
        <>
            <BudgetBuddy />
            <Toaster />
        </>
    );
}
