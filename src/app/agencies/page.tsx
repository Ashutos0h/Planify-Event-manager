"use client";

import { AgencyCard } from "@/components/AgencyCard";
import { Navbar } from "@/components/Navbar";
import { FilterSidebar } from "@/components/FilterSidebar";
import { Search } from "lucide-react";
import { useState, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";

// Define the shape of our Agency data from the API
interface Agency {
    id: string;
    name: string;
    location: string;
    rating: number;
    reviewCount: number;
    tags: string[];
    smartMatchScore: number;
    priceRangeMax: number; // mapped from budget/priceRangeMax
    imageUrl: string;
    portfolio: string[];
}

const INITIAL_FILTERS = {
    locations: [] as string[],
    maxBudget: 2000000,
    eventTypes: [] as string[],
    minRating: 0
};

function AgenciesContent() {
    const searchParams = useSearchParams();

    // Data State
    const [agencies, setAgencies] = useState<Agency[]>([]);
    const [loading, setLoading] = useState(true);

    // Filter State
    const [searchQuery, setSearchQuery] = useState(() => searchParams.get("q") || "");
    const [filters, setFilters] = useState(() => {
        const loc = searchParams.get("location");
        return {
            ...INITIAL_FILTERS,
            locations: loc ? [loc] : []
        };
    });

    // Fetch Agencies from API
    useEffect(() => {
        const fetchAgencies = async () => {
            try {
                const res = await fetch('/api/agencies');
                if (!res.ok) throw new Error('Failed to fetch');
                const data = await res.json();
                setAgencies(data);
            } catch (error) {
                console.error("Error loading agencies:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAgencies();
    }, []);

    // Update state if URL changes (e.g. back/forward navigation)
    useEffect(() => {
        const q = searchParams.get("q");
        const loc = searchParams.get("location");

        if (q !== null) setSearchQuery(q);
        if (loc !== null) {
            setFilters(prev => ({
                ...prev,
                locations: [loc]
            }));
        }
    }, [searchParams]);

    const filteredAgencies = agencies.filter(agency => {
        const term = searchQuery.toLowerCase().trim();

        // Search check
        const matchesSearch = !term ||
            agency.name.toLowerCase().includes(term) ||
            agency.location.toLowerCase().includes(term) ||
            agency.tags.some(tag => tag.toLowerCase().includes(term));

        // Location check
        const matchesLocation = filters.locations.length === 0 ||
            filters.locations.some(loc => agency.location.toLowerCase().includes(loc.toLowerCase()));

        // Budget check (Using priceRangeMax as proxy for budget)
        const matchesBudget = agency.priceRangeMax <= filters.maxBudget;

        // Event type check
        const matchesEventType = filters.eventTypes.length === 0 ||
            agency.tags.some(tag => filters.eventTypes.includes(tag));

        // Rating check
        const matchesRating = agency.rating >= filters.minRating;

        return matchesSearch && matchesLocation && matchesBudget && matchesEventType && matchesRating;
    });

    return (
        <div className="min-h-screen bg-background text-foreground font-sans">
            {/* Navbar Header */}
            <Navbar />
            <div className="pt-16"></div>

            <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 py-8 flex flex-col lg:flex-row gap-8">
                {/* Sidebar */}
                <FilterSidebar
                    filters={filters}
                    onFilterChange={setFilters}
                    onReset={() => {
                        setFilters(INITIAL_FILTERS);
                        setSearchQuery("");
                    }}
                />

                {/* Main Content */}
                <main className="flex-1">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-2xl font-bold">Browse Agencies</h1>
                            <p className="text-zinc-500 text-sm">
                                {loading ? "Loading..." : `Showing ${filteredAgencies.length} results based on your preferences`}
                            </p>
                        </div>
                        <select className="bg-zinc-100 dark:bg-zinc-800 border-none rounded-lg text-sm px-3 py-2 cursor-pointer outline-none focus:ring-1 focus:ring-saffron">
                            <option>Sort by: Recommended</option>
                            <option>Price: Low to High</option>
                            <option>Rating: High to Low</option>
                        </select>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <div key={i} className="h-96 rounded-xl bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredAgencies.map((agency) => (
                                <AgencyCard
                                    key={agency.id}
                                    {...agency}
                                />
                            ))}
                        </div>
                    )}

                    {!loading && filteredAgencies.length === 0 && (
                        <div className="py-20 text-center glass rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800">
                            <p className="text-zinc-500 text-lg">No agencies found matching your current filters.</p>
                            <button
                                onClick={() => {
                                    setFilters(INITIAL_FILTERS);
                                    setSearchQuery("");
                                }}
                                className="mt-4 text-saffron font-bold hover:underline"
                            >
                                Clear All Filters
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default function AgenciesPage() {
    return (
        <Suspense fallback={<div className="min-h-screen grid place-items-center">Loading...</div>}>
            <AgenciesContent />
        </Suspense>
    );
}
