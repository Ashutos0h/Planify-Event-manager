"use client";

import { use } from "react";
import {
    Calendar,
    MapPin,
    Clock,
    ArrowLeft,
    Share2,
    Heart,
    Users,
    Star,
    Sparkles,
    Zap,
    Music,
    Utensils
} from "lucide-react";
import { useState, useEffect } from "react";

const FESTIVAL_DATA: Record<string, any> = {
    "diwali": {
        name: "Diwali Gala 2024",
        date: "2024-10-24",
        location: "New Delhi, India",
        image: "https://images.unsplash.com/photo-1606929253611-64c1b5e2e6f1?w=1200&h=600&fit=crop",
        description: "Experience the festival of lights with premium event packages, including traditional decor and fireworks shows. Our curated agencies provide everything from hand-painted diyas to modern laser light shows.",
        highlights: ["Laser Light Show", "Traditional Catering", "Fireworks Display", "Celebrity Performances"],
        agencies: ["royal-heritage", "elite-decor"],
        themeColor: "from-saffron/20 to-gold/20"
    },
    "holi": {
        name: "Holi Celebration Mumbai",
        date: "2025-03-14",
        location: "Mumbai, Maharashtra",
        image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200&h=600&fit=crop",
        description: "A vibrant celebration of colors with organic powders, live music, and luxury catering. Join us for the most premium Holi party in Mumbai featuring rain dance and infinity pools.",
        highlights: ["Organic Colors", "Rain Dance", "Live Fusion Music", "Thandai Bar"],
        agencies: ["urban-events", "goa-vibes"],
        themeColor: "from-pink-500/20 to-purple-500/20"
    },
    "navratri": {
        name: "Navratri Night Ahmedabad",
        date: "2024-10-03",
        location: "Ahmedabad, Gujarat",
        image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1200&h=600&fit=crop",
        description: "Nine nights of Garba and Dandiya with grand stadium setups and heritage food stalls. Experience the rhythm of Gujarat with state-of-the-art sound systems.",
        highlights: ["Stadium Setup", "Traditional Orchestra", "Heritage Food Market", "Mega Prizes"],
        agencies: ["elite-decor", "royal-heritage"],
        themeColor: "from-gold/20 to-saffron/20"
    }
};

const AGENCIES = [
    {
        id: "royal-heritage",
        name: "Royal Heritage Weddings",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=300&fit=crop",
        tag: "Heritage Expert"
    },
    {
        id: "urban-events",
        name: "Urban Events Pro",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
        tag: "Modern Fusion"
    },
    {
        id: "goa-vibes",
        name: "Goa Vibes Planners",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=400&h=300&fit=crop",
        tag: "Party Specialists"
    },
    {
        id: "elite-decor",
        name: "Elite Decor & Catering",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop",
        tag: "Luxury Styling"
    }
];

export default function FestivalDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const festival = FESTIVAL_DATA[id] || FESTIVAL_DATA["diwali"];

    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const targetDate = new Date(festival.date);

        const timer = setInterval(() => {
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();

            if (difference <= 0) {
                clearInterval(timer);
                return;
            }

            setTimeLeft({
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [festival.date]);

    return (
        <div className="min-h-screen bg-background text-foreground font-sans">
            {/* Hero Header */}
            <div className="relative h-[60vh] w-full">
                <img
                    src={festival.image}
                    alt={festival.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

                {/* Top Actions */}
                <div className="absolute top-8 left-6 right-6 flex justify-between items-center z-20">
                    <a href="/festivals" className="p-2 rounded-full glass hover:bg-white/20 transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </a>
                    <div className="flex gap-2">
                        <button className="p-2 rounded-full glass hover:bg-white/20 transition-colors">
                            <Share2 className="w-6 h-6" />
                        </button>
                        <button className="p-2 rounded-full glass hover:bg-white/20 transition-colors text-red-500">
                            <Heart className="w-6 h-6 fill-red-500" />
                        </button>
                    </div>
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-12 left-6 lg:left-12 max-w-4xl z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-saffron/20 border border-saffron/30 text-saffron backdrop-blur-md text-sm font-bold mb-4">
                        <Sparkles className="w-4 h-4" />
                        <span>Premium Event Tier</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-4">{festival.name}</h1>
                    <div className="flex flex-wrap items-center gap-6 text-lg font-medium">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-saffron" />
                            <span>{festival.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-saffron" />
                            <span>{festival.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-saffron" />
                            <span>5,000+ Attending</span>
                        </div>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 lg:px-12 py-12 -mt-8 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left: Content */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Description */}
                        <section className="glass rounded-3xl p-8 border border-white/10">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <Zap className="w-6 h-6 text-saffron" />
                                About the Event
                            </h2>
                            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                                {festival.description}
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {festival.highlights.map((h: string) => (
                                    <div key={h} className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 text-center">
                                        <p className="text-xs font-bold text-saffron uppercase mb-1">Highlight</p>
                                        <p className="text-sm font-semibold">{h}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Curated Agencies */}
                        <section>
                            <div className="flex items-end justify-between mb-8">
                                <div>
                                    <h2 className="text-2xl font-bold mb-1">Recommended Agencies</h2>
                                    <p className="text-zinc-500">Verified partners for this festival</p>
                                </div>
                                <a href="/agencies" className="text-saffron font-bold text-sm hover:underline">See all</a>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {AGENCIES.filter(a => festival.agencies.includes(a.id)).map((agency) => (
                                    <div key={agency.id} className="glass rounded-2xl overflow-hidden group hover:border-saffron/30 transition-all border border-white/10 flex">
                                        <div className="w-32 h-32 relative flex-shrink-0">
                                            <img src={agency.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                        </div>
                                        <div className="p-4 flex-1 flex flex-col justify-center">
                                            <div className="bg-saffron/10 text-saffron text-[10px] uppercase font-black px-2 py-0.5 rounded-full inline-block self-start mb-2">
                                                {agency.tag}
                                            </div>
                                            <h4 className="font-bold text-lg mb-1 group-hover:text-saffron transition-colors">{agency.name}</h4>
                                            <div className="flex items-center gap-1 text-gold text-sm">
                                                <Star className="w-3 h-3 fill-current" />
                                                <span className="font-black">{agency.rating}</span>
                                            </div>
                                        </div>
                                        <div className="p-4 flex items-center">
                                            <a href={`/book/${agency.id}`} className="p-2 rounded-full border border-zinc-200 dark:border-zinc-800 group-hover:bg-saffron group-hover:text-white transition-all">
                                                <Zap className="w-4 h-4 fill-current" />
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right: Sidebar / Sticky */}
                    <div className="space-y-8">
                        {/* Countdown Box */}
                        <div className={`p-8 rounded-3xl bg-gradient-to-br ${festival.themeColor} border border-white/20 shadow-2xl relative overflow-hidden backdrop-blur-xl`}>
                            <div className="relative z-10">
                                <h3 className="text-foreground/70 font-bold uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    Event Begins In
                                </h3>
                                <div className="grid grid-cols-4 gap-4 text-center">
                                    <div>
                                        <p className="text-3xl font-black">{timeLeft.days}</p>
                                        <p className="text-[10px] font-bold text-zinc-500 uppercase">Days</p>
                                    </div>
                                    <div>
                                        <p className="text-3xl font-black">{timeLeft.hours}</p>
                                        <p className="text-[10px] font-bold text-zinc-500 uppercase">Hrs</p>
                                    </div>
                                    <div>
                                        <p className="text-3xl font-black">{timeLeft.minutes}</p>
                                        <p className="text-[10px] font-bold text-zinc-500 uppercase">Min</p>
                                    </div>
                                    <div>
                                        <p className="text-3xl font-black">{timeLeft.seconds}</p>
                                        <p className="text-[10px] font-bold text-zinc-500 uppercase">Sec</p>
                                    </div>
                                </div>

                                <button className="w-full mt-10 py-4 rounded-xl bg-foreground text-background font-black hover:bg-saffron hover:text-white transition-all shadow-xl active:scale-95">
                                    Secure Entry & Planning
                                </button>
                                <p className="text-center text-xs text-zinc-500 mt-4 font-medium italic">
                                    * Limited VIP packages available
                                </p>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="glass rounded-3xl p-6 space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                                    <Music className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm">Entertainment</h4>
                                    <p className="text-xs text-zinc-500">Live DJ & Traditional Artists</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                                    <Utensils className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm">Catering</h4>
                                    <p className="text-xs text-zinc-500">Heritage Buffet Included</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
