"use client";

import { Search, MapPin, Star, ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

function AgencyLink() {
  const { data: session } = useSession();
  const role = (session?.user as any)?.role;

  if (role === "USER") return null;

  return (
    <Link href="/dashboard/agency" className="hidden lg:block text-sm text-zinc-500 hover:text-saffron transition-colors">
      Agency Portal
    </Link>
  );
}

function AuthButton() {
  const { data: session } = useSession();
  if (session) {
    return (
      <Link href="/dashboard/user" className="bg-foreground text-background px-4 py-2 rounded-full text-sm font-medium hover:bg-saffron hover:text-white transition-colors">
        Dashboard
      </Link>
    );
  }
  return (
    <Link href="/login" className="bg-foreground text-background px-4 py-2 rounded-full text-sm font-medium hover:bg-saffron hover:text-white transition-colors">
      Login
    </Link>
  );
}

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");

  const handleSearch = () => {
    if (!searchQuery && !locationQuery) return;

    const params = new URLSearchParams();
    if (searchQuery) params.append("q", searchQuery);
    if (locationQuery) params.append("location", locationQuery);

    router.push(`/agencies?${params.toString()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden selection:bg-saffron selection:text-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass h-16 flex items-center justify-between px-6 lg:px-12">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-saffron to-gold rounded-lg flex items-center justify-center text-white font-bold">
            P
          </div>
          <span className="text-xl font-bold tracking-tight">Planify</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium opacity-90">
          <Link href="/agencies" className="hover:text-saffron transition-colors">Agencies</Link>
          <Link href="/agencies" className="hover:text-saffron transition-colors">Venues</Link>
          <Link href="/festivals" className="hover:text-saffron transition-colors">Festivals</Link>
          <Link href="#" className="hover:text-saffron transition-colors">About</Link>
        </div>
        <div className="flex items-center gap-3">
          <AgencyLink />
          <AuthButton />
        </div>
      </nav>

      <main className="flex flex-col w-full">
        {/* Hero Section */}
        <section className="relative w-full h-[90vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
          {/* Background Gradients */}
          <div className="absolute inset-0 bg-gradient-to-b from-deep-blue/5 to-background z-0 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-saffron/20 rounded-full blur-[120px] -z-10" />

          <div className="z-10 flex flex-col items-center gap-6 max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-saffron/10 border border-saffron/20 text-saffron text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              <span>India&apos;s Premier Event Ecosystem</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
              Celebrate Tradition, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-saffron to-gold">
                Embrace Modernity
              </span>
            </h1>

            <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
              Plan weddings, festivals, and corporate events with verified agencies.
              Experience the seamless blend of heritage and technology.
            </p>

            {/* Glass Search Bar */}
            <div className="w-full max-w-3xl glass rounded-2xl p-2 mt-8 flex flex-col md:flex-row gap-2 shadow-2xl">
              <div className="flex-1 flex items-center gap-3 px-4 h-12 md:h-14 bg-white/50 dark:bg-black/20 rounded-xl">
                <Search className="w-5 h-5 text-zinc-400" />
                <input
                  type="text"
                  placeholder="What are you planning? (e.g. Wedding, Diwali Party)"
                  className="bg-transparent border-none outline-none w-full text-sm md:text-base placeholder:text-zinc-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <div className="flex-1 flex items-center gap-3 px-4 h-12 md:h-14 bg-white/50 dark:bg-black/20 rounded-xl">
                <MapPin className="w-5 h-5 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Location (e.g. Jaipur, Mumbai)"
                  className="bg-transparent border-none outline-none w-full text-sm md:text-base placeholder:text-zinc-400"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <button
                onClick={handleSearch}
                className="h-12 md:h-14 px-8 bg-gradient-to-r from-saffron to-gold text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-saffron/25 transition-all active:scale-95"
              >
                Search
              </button>
            </div>
          </div>
        </section>

        {/* Festival Marketplace Preview */}
        <section id="festivals" className="py-20 px-6 lg:px-12 w-full bg-zinc-50/50 dark:bg-zinc-950/50">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold mb-2">Upcoming Festivals</h2>
                <p className="text-zinc-500">Curated packages for the season</p>
              </div>
              <Link href="/festivals" className="flex items-center gap-2 text-saffron font-medium hover:underline">
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/festivals/diwali" className="group relative aspect-[4/5] md:aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1606929253611-64c1b5e2e6f1?w=800&h=1000&fit=crop"
                  alt="Diwali Gala"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end text-white">
                  <div className="bg-saffron/90 self-start px-2 py-1 rounded text-xs font-bold mb-2">
                    Oct 24
                  </div>
                  <h3 className="text-2xl font-bold mb-1">Diwali Gala</h3>
                  <div className="flex items-center text-sm text-zinc-300 gap-2">
                    <MapPin className="w-3 h-3" /> <span>New Delhi</span>
                  </div>
                </div>
              </Link>

              <Link href="/festivals/holi" className="group relative aspect-[4/5] md:aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=1000&fit=crop"
                  alt="Holi Festival"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end text-white">
                  <div className="bg-saffron/90 self-start px-2 py-1 rounded text-xs font-bold mb-2">
                    Mar 14
                  </div>
                  <h3 className="text-2xl font-bold mb-1">Holi Celebration</h3>
                  <div className="flex items-center text-sm text-zinc-300 gap-2">
                    <MapPin className="w-3 h-3" /> <span>Mumbai</span>
                  </div>
                </div>
              </Link>

              <Link href="/festivals/navratri" className="group relative aspect-[4/5] md:aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&h=1000&fit=crop"
                  alt="Navratri Night"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end text-white">
                  <div className="bg-saffron/90 self-start px-2 py-1 rounded text-xs font-bold mb-2">
                    Oct 03
                  </div>
                  <h3 className="text-2xl font-bold mb-1">Navratri Night</h3>
                  <div className="flex items-center text-sm text-zinc-300 gap-2">
                    <MapPin className="w-3 h-3" /> <span>Ahmedabad</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Agencies Preview */}
        <section className="py-20 px-6 lg:px-12 w-full">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold mb-2">Trending Agencies</h2>
                <p className="text-zinc-500">Top rated partners for your big day</p>
              </div>
              <Link href="/agencies" className="flex items-center gap-2 text-saffron font-medium hover:underline">
                Browse Agencies <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="glass rounded-xl p-4 hover:border-saffron/50 transition-colors group">
                <img
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop"
                  alt="Royal Weddings"
                  className="aspect-video w-full rounded-lg mb-4 object-cover"
                />
                <h3 className="font-bold text-lg">Royal Weddings</h3>
                <div className="flex items-center gap-1 text-gold text-sm mb-2">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-foreground font-medium">4.9</span>
                  <span className="text-zinc-500">(128)</span>
                </div>
                <p className="text-sm text-zinc-500 line-clamp-2 mb-4">
                  Specializing in heritage weddings and luxury events across Rajasthan.
                </p>
                <Link href="/agencies" className="w-full py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 font-medium text-sm group-hover:bg-saffron group-hover:text-white group-hover:border-saffron transition-colors block text-center">
                  View Profile
                </Link>
              </div>

              <div className="glass rounded-xl p-4 hover:border-saffron/50 transition-colors group">
                <img
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop"
                  alt="Urban Events"
                  className="aspect-video w-full rounded-lg mb-4 object-cover"
                />
                <h3 className="font-bold text-lg">Urban Events Pro</h3>
                <div className="flex items-center gap-1 text-gold text-sm mb-2">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-foreground font-medium">4.7</span>
                  <span className="text-zinc-500">(85)</span>
                </div>
                <p className="text-sm text-zinc-500 line-clamp-2 mb-4">
                  Modern corporate events and tech conferences in Mumbai.
                </p>
                <Link href="/agencies" className="w-full py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 font-medium text-sm group-hover:bg-saffron group-hover:text-white group-hover:border-saffron transition-colors block text-center">
                  View Profile
                </Link>
              </div>

              <div className="glass rounded-xl p-4 hover:border-saffron/50 transition-colors group">
                <img
                  src="https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=400&h=300&fit=crop"
                  alt="Beach Events"
                  className="aspect-video w-full rounded-lg mb-4 object-cover"
                />
                <h3 className="font-bold text-lg">Goa Vibes Planners</h3>
                <div className="flex items-center gap-1 text-gold text-sm mb-2">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-foreground font-medium">4.8</span>
                  <span className="text-zinc-500">(210)</span>
                </div>
                <p className="text-sm text-zinc-500 line-clamp-2 mb-4">
                  Beach parties and destination weddings in Goa.
                </p>
                <Link href="/agencies" className="w-full py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 font-medium text-sm group-hover:bg-saffron group-hover:text-white group-hover:border-saffron transition-colors block text-center">
                  View Profile
                </Link>
              </div>

              <div className="glass rounded-xl p-4 hover:border-saffron/50 transition-colors group">
                <img
                  src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop"
                  alt="Elite Decor"
                  className="aspect-video w-full rounded-lg mb-4 object-cover"
                />
                <h3 className="font-bold text-lg">Elite Decor & Catering</h3>
                <div className="flex items-center gap-1 text-gold text-sm mb-2">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-foreground font-medium">4.6</span>
                  <span className="text-zinc-500">(94)</span>
                </div>
                <p className="text-sm text-zinc-500 line-clamp-2 mb-4">
                  Full-service catering and premium decor in Delhi NCR.
                </p>
                <Link href="/agencies" className="w-full py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 font-medium text-sm group-hover:bg-saffron group-hover:text-white group-hover:border-saffron transition-colors block text-center">
                  View Profile
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
