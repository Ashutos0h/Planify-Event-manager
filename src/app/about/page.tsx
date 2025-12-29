"use client";

import { Sparkles, Users, Globe, Shield } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans pt-24 pb-12 px-6 lg:px-12">
            <div className="max-w-4xl mx-auto space-y-16">

                {/* Hero */}
                <section className="text-center space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-saffron/10 border border-saffron/20 text-saffron text-sm font-medium">
                        <Sparkles className="w-4 h-4" />
                        <span>Our Mission</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                        We Orchestrate <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-saffron to-gold">
                            Life's Greatest Moments
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                        Planify is India's first tech-enabled event ecosystem, bridging the gap between traditional celebrations and modern efficiency.
                    </p>
                </section>

                {/* Values Grid */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="glass p-6 rounded-2xl border border-zinc-200 dark:border-white/10 hover:border-saffron/30 transition-all group">
                        <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Users className="w-6 h-6 text-blue-500" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Community First</h3>
                        <p className="text-zinc-500 text-sm leading-relaxed">
                            We empower local agencies and artisans, giving them a platform to showcase their talent to a global audience.
                        </p>
                    </div>

                    <div className="glass p-6 rounded-2xl border border-zinc-200 dark:border-white/10 hover:border-saffron/30 transition-all group">
                        <div className="w-12 h-12 rounded-xl bg-saffron/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Globe className="w-6 h-6 text-saffron" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Cultural Heritage</h3>
                        <p className="text-zinc-500 text-sm leading-relaxed">
                            Every event is deeply rooted in tradition. We respect and celebrate the diverse cultural tapestry of India.
                        </p>
                    </div>

                    <div className="glass p-6 rounded-2xl border border-zinc-200 dark:border-white/10 hover:border-saffron/30 transition-all group">
                        <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Shield className="w-6 h-6 text-green-500" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Trusted & Verified</h3>
                        <p className="text-zinc-500 text-sm leading-relaxed">
                            Safety and reliability are paramount. All our partners undergo rigorous verification processes.
                        </p>
                    </div>
                </section>

                {/* Team / Story */}
                <section className="glass rounded-3xl p-8 md:p-12 border border-zinc-200 dark:border-white/10 relative overflow-hidden">
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-1 space-y-6">
                            <h2 className="text-3xl font-bold">The Planify Story</h2>
                            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                Started in 2024, Planify appeared from a simple observation: planning a traditional Indian wedding was chaotic, opaque, and stressful.
                                <br /><br />
                                We set out to change that by building a digital infrastructure that brings transparency to pricing, quality to services, and peace of mind to families.
                            </p>
                            <Link href="/contact" className="inline-block px-6 py-3 bg-foreground text-background font-bold rounded-lg hover:bg-saffron hover:text-white transition-colors">
                                Join our Journey
                            </Link>
                        </div>
                        <div className="flex-1 w-full max-w-sm">
                            <div className="aspect-[4/5] bg-zinc-100 dark:bg-zinc-800 rounded-2xl overflow-hidden relative group">
                                <img
                                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=800&fit=crop"
                                    alt="Team"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                                    <p className="text-white font-medium">The Team @ Bangalore</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="text-center py-12">
                    <h2 className="text-2xl font-bold mb-6">Ready to plan your next big event?</h2>
                    <div className="flex justify-center gap-4">
                        <Link href="/agencies" className="px-8 py-3 bg-gradient-to-r from-saffron to-gold text-white font-bold rounded-lg hover:shadow-lg hover:shadow-saffron/25 transition-all active:scale-95">
                            Browse Agencies
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
}
