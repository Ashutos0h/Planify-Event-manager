"use client";

import { SlidersHorizontal, ChevronDown, Star } from "lucide-react";

interface FilterSidebarProps {
    filters: {
        locations: string[];
        maxBudget: number;
        eventTypes: string[];
        minRating: number;
    };
    onFilterChange: (newFilters: FilterSidebarProps['filters']) => void;
    onReset: () => void;
}

export function FilterSidebar({ filters, onFilterChange, onReset }: FilterSidebarProps) {
    const handleLocationToggle = (location: string) => {
        const newLocations = filters.locations.includes(location)
            ? filters.locations.filter(l => l !== location)
            : [...filters.locations, location];
        onFilterChange({ ...filters, locations: newLocations });
    };

    const handleEventTypeToggle = (type: string) => {
        const newTypes = filters.eventTypes.includes(type)
            ? filters.eventTypes.filter(t => t !== type)
            : [...filters.eventTypes, type];
        onFilterChange({ ...filters, eventTypes: newTypes });
    };

    const handleBudgetChange = (value: number) => {
        onFilterChange({ ...filters, maxBudget: value });
    };

    const handleRatingChange = (rating: number) => {
        onFilterChange({ ...filters, minRating: rating });
    };

    return (
        <aside className="w-full lg:w-72 flex-shrink-0 space-y-8">
            <div className="glass rounded-xl p-5 border border-white/10">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="font-bold text-lg flex items-center gap-2">
                        <SlidersHorizontal className="w-5 h-5" /> Filters
                    </h2>
                    <button
                        onClick={onReset}
                        className="text-xs text-saffron font-medium hover:underline"
                    >
                        Reset
                    </button>
                </div>

                {/* Location Filter */}
                <div className="mb-6">
                    <h3 className="text-sm font-semibold mb-3 flex items-center justify-between">
                        Location <ChevronDown className="w-4 h-4 text-zinc-400" />
                    </h3>
                    <div className="space-y-2">
                        {["Mumbai", "Delhi NCR", "Jaipur", "Goa", "Bangalore"].map(loc => (
                            <label key={loc} className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={filters.locations.includes(loc)}
                                    onChange={() => handleLocationToggle(loc)}
                                    className="rounded border-zinc-300 text-saffron focus:ring-saffron"
                                />
                                {loc}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Budget Filter */}
                <div className="mb-6">
                    <h3 className="text-sm font-semibold mb-3">Max. Budget</h3>
                    <input
                        type="range"
                        min="50000"
                        max="2000000"
                        step="50000"
                        value={filters.maxBudget}
                        onChange={(e) => handleBudgetChange(Number(e.target.value))}
                        className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-saffron"
                    />
                    <div className="flex justify-between text-xs text-zinc-500 mt-2">
                        <span>₹50k</span>
                        <span className="font-medium text-foreground">₹{(filters.maxBudget / 1000).toFixed(0)}k</span>
                        <span>₹20L+</span>
                    </div>
                </div>

                {/* Event Type */}
                <div className="mb-6">
                    <h3 className="text-sm font-semibold mb-3">Event Type</h3>
                    <div className="flex flex-wrap gap-2">
                        {["Wedding", "Corporate", "Social", "Concert", "Traditional"].map(type => (
                            <button
                                key={type}
                                onClick={() => handleEventTypeToggle(type)}
                                className={`px-3 py-1 text-xs rounded-full border transition-colors ${filters.eventTypes.includes(type)
                                    ? "bg-saffron text-white border-saffron"
                                    : "border-zinc-200 dark:border-zinc-700 hover:border-saffron hover:text-saffron"
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Rating */}
                <div>
                    <h3 className="text-sm font-semibold mb-3">Min. Rating</h3>
                    <div className="space-y-1">
                        {[5, 4, 3, 2].map(num => (
                            <label key={num} className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50 p-1 rounded">
                                <input
                                    type="radio"
                                    name="rating"
                                    checked={filters.minRating === num}
                                    onChange={() => handleRatingChange(num)}
                                    className="text-saffron focus:ring-saffron"
                                />
                                <div className="flex text-gold">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-3 h-3 ${i < num ? "fill-current" : "text-zinc-300 dark:text-zinc-600"}`} />
                                    ))}
                                </div>
                                <span className="text-xs text-zinc-400">& Up</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    );
}
