"use client";

import { useEffect, useState } from "react";
import { AgencyCard } from "@/components/AgencyCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Agency {
    id: string;
    name: string;
    location: string;
    rating: number;
    reviewCount: number;
    tags: string[];
    smartMatchScore: number;
    priceRangeMax: number;
    imageUrl: string;
    portfolio: string[];
}

export function FeaturedAgencies() {
    const [agencies, setAgencies] = useState<Agency[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAgencies = async () => {
            try {
                const res = await fetch('/api/agencies');
                if (res.ok) {
                    const data = await res.json();
                    // Take top 4 sorted by rating (API already sorts)
                    setAgencies(data.slice(0, 4));
                }
            } catch (error) {
                console.error("Failed to fetch featured agencies", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAgencies();
    }, []);

    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-[400px] rounded-xl bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
                ))}
            </div>
        );
    }

    if (agencies.length === 0) {
        return null; // Or show empty state
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {agencies.map((agency) => (
                <AgencyCard
                    key={agency.id}
                    {...agency}
                />
            ))}
        </div>
    );
}
