"use client";

import { Calendar, MapPin, Search, ArrowRight, Sparkles, Filter } from "lucide-react";
import { useState } from "react";

const FESTIVALS = [
    {
        id: "diwali",
        name: "Diwali Gala 2024",
        date: "Oct 24 - Oct 28",
        location: "New Delhi, India",
        image: "https://images.unsplash.com/photo-1606929253611-64c1b5e2e6f1?w=800&h=1000&fit=crop",
        category: "Religious",
        description: "Experience the festival of lights with premium event packages, including traditional decor and fireworks shows.",
        status: "Upcoming",
        theme: "Saffron"
    },
    {
        id: "holi",
        name: "Holi Celebration Mumbai",
        date: "Mar 14, 2025",
        location: "Mumbai, Maharashtra",
        image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=1000&fit=crop",
        category: "Culture",
        description: "A vibrant celebration of colors with organic powders, live music, and luxury catering.",
        status: "Planning",
        theme: "Pink"
    },
    {
        id: "navratri",
        name: "Navratri Night Ahmedabad",
        date: "Oct 03 - Oct 12",
        location: "Ahmedabad, Gujarat",
        image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&h=1000&fit=crop",
        category: "Music",
        description: "Nine nights of Garba and Dandiya with grand stadium setups and heritage food stalls.",
        status: "Live",
        theme: "Gold"
    },
    {
        id: "pushkar",
        name: "Pushkar Camel Fair",
        date: "Nov 09 - Nov 15",
        location: "Pushkar, Rajasthan",
        image: "https://images.unsplash.com/photo-1590766940554-634a7ed41450?w=800&h=1000&fit=crop",
        category: "Tradition",
        description: "One of the world's largest camel fairs, featuring cultural events and luxury glamping.",
        status: "Upcoming",
        theme: "Amber"
    },
    {
        id: "goa-carnival",
        name: "Goa Carnival 2025",
        date: "Feb 22 - Feb 25",
        location: "Panaji, Goa",
        image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=1000&fit=crop",
        category: "Parade",
        description: "The biggest carnival in India with floats, music, and colorful street celebrations.",
        status: "Announced",
        theme: "Blue"
    }
];

const CATEGORIES = ["All", "Religious", "Culture", "Music", "Tradition", "Parade"];
const STATUSES = ["All", "Upcoming", "Planning", "Live", "Announced"];

export default function FestivalsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedStatus, setSelectedStatus] = useState("All");

    const filteredFestivals = FESTIVALS.filter(f => {
        const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            f.location.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "All" || f.category === selectedCategory;
        const matchesStatus = selectedStatus === "All" || f.status === selectedStatus;

        return matchesSearch && matchesCategory && matchesStatus;
    });

    return (
        <div className="min-h-screen bg-background text-foreground font-sans">
            {/* Navbar Placeholder */}
            <nav className="fixed top-0 left-0 right-0 z-50 glass h-16 flex items-center justify-between px-6 lg:px-12">
                <a href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-saffron to-gold rounded-lg flex items-center justify-center text-white font-bold">
                        P
                    </div>
                    <span className="text-xl font-bold tracking-tight">Planify</span>
                </a>
                <div className="hidden md:flex items-center gap-8 text-sm font-medium opacity-90">
                    <a href="/agencies" className="hover:text-saffron transition-colors">Agencies</a>
                    <a href="/festivals" className="text-saffron">Festivals</a>
                    <a href="/chat" className="hover:text-saffron transition-colors">Chat</a>
                    <a href="/dashboard/user" className="hover:text-saffron transition-colors">Dashboard</a>
                </div>
                <a href="/login" className="bg-foreground text-background px-4 py-2 rounded-full text-sm font-medium hover:bg-saffron hover:text-white transition-colors">
                    Login
                </a>
            </nav>

            <main className="pt-24 pb-20 px-6 lg:px-12">
                <div className="max-w-7xl mx-auto">
                    {/* Header Section */}
                    <div className="mb-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-saffron/10 border border-saffron/20 text-saffron text-sm font-medium mb-4">
                            <Sparkles className="w-4 h-4" />
                            <span>Tradition Meets Technology</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Festival Marketplace</h1>
                        <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl text-lg">
                            Discover and plan for India's grandest celebrations. Book verified agencies specializing in heritage decor, traditional catering, and modern event management.
                        </p>
                    </div>

                    {/* Search and Filters */}
                    <div className="glass rounded-2xl p-6 mb-12 space-y-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 flex items-center gap-3 px-4 h-12 bg-white/50 dark:bg-black/20 rounded-xl border border-zinc-200 dark:border-zinc-800">
                                <Search className="w-5 h-5 text-zinc-400" />
                                <input
                                    type="text"
                                    placeholder="Search festivals or locations..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="bg-transparent border-none outline-none w-full text-sm placeholder:text-zinc-400"
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-8">
                            <div className="space-y-2">
                                <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">Category</p>
                                <div className="flex flex-wrap gap-2">
                                    {CATEGORIES.map(cat => (
                                        <button
                                            key={cat}
                                            onClick={() => setSelectedCategory(cat)}
                                            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${selectedCategory === cat
                                                    ? "bg-saffron text-white shadow-lg"
                                                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                                                }`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">Status</p>
                                <div className="flex flex-wrap gap-2">
                                    {STATUSES.map(status => (
                                        <button
                                            key={status}
                                            onClick={() => setSelectedStatus(status)}
                                            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${selectedStatus === status
                                                    ? "bg-foreground text-background shadow-lg"
                                                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                                                }`}
                                        >
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Festival Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredFestivals.map((festival) => (
                            <a
                                key={festival.id}
                                href={`/festivals/${festival.id}`}
                                className="group relative flex flex-col glass rounded-2xl overflow-hidden hover:border-saffron/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                            >
                                <div className="aspect-[4/3] relative overflow-hidden">
                                    <img
                                        src={festival.image}
                                        alt={festival.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 left-4 bg-saffron/90 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                        {festival.status}
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-2 rounded-full text-sm font-medium">
                                            View Event Details
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="flex items-center gap-2 text-saffron text-sm font-bold mb-2">
                                        <Calendar className="w-4 h-4" />
                                        <span>{festival.date}</span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-saffron transition-colors">{festival.name}</h3>
                                    <div className="flex items-center gap-2 text-zinc-500 text-sm mb-4">
                                        <MapPin className="w-4 h-4" />
                                        <span>{festival.location}</span>
                                    </div>
                                    <p className="text-sm text-zinc-500 line-clamp-2 mb-6">
                                        {festival.description}
                                    </p>

                                    <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800">
                                        <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Packages from ₹49,999</span>
                                        <ArrowRight className="w-5 h-5 text-saffron transform group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>

                    {filteredFestivals.length === 0 && (
                        <div className="py-20 text-center glass rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800">
                            <p className="text-zinc-500 text-lg">No festivals found matching your search.</p>
                            <button
                                onClick={() => {
                                    setSearchQuery("");
                                    setSelectedCategory("All");
                                    setSelectedStatus("All");
                                }}
                                className="mt-4 text-saffron font-bold hover:underline"
                            >
                                Clear All Filters
                            </button>
                        </div>
                    )}
                </div>
            </main>

            {/* Footer Placeholder */}
            <footer className="bg-zinc-950 text-white py-12 px-6 lg:px-12">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-saffron to-gold rounded-lg flex items-center justify-center text-white font-bold">P</div>
                        <span className="text-xl font-bold tracking-tight">Planify</span>
                    </div>
                    <p className="text-zinc-500 text-sm">© 2024 Planify Event Ecosystem. Celebrating Heritage through Technology.</p>
                    <div className="flex gap-6 text-sm text-zinc-400">
                        <a href="#" className="hover:text-saffron">Terms</a>
                        <a href="#" className="hover:text-saffron">Privacy</a>
                        <a href="#" className="hover:text-saffron">Support</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
