"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
            <p className="text-zinc-500 mb-6 max-w-md">
                We encountered an error loading this agency profile. It might be due to missing data or a temporary glitch.
            </p>
            <div className="p-4 bg-zinc-100 rounded-lg mb-6 text-left font-mono text-xs max-w-lg overflow-auto">
                {error.message || "Unknown error"}
            </div>
            <Button onClick={() => reset()}>Try again</Button>
        </div>
    );
}
