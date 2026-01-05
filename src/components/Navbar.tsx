"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Search, Menu, X, User, LogOut, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export function Navbar() {
    const { data: session } = useSession();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const role = (session?.user as any)?.role;

    // Navigation Links Logic
    const isAgency = role === "AGENCY_OWNER";

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10 h-16">
            <div className="max-w-screen-2xl mx-auto px-6 h-full flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-saffron to-gold rounded-lg flex items-center justify-center text-white font-bold">
                        P
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-bold tracking-tight leading-none">Planify</span>
                        {isAgency && <span className="text-[10px] text-saffron font-bold tracking-wider uppercase leading-none">Partner</span>}
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium opacity-90">
                    {!isAgency && (
                        <>
                            <Link href="/agencies" className="hover:text-saffron transition-colors">Agencies</Link>
                            <Link href="/agencies" className="hover:text-saffron transition-colors">Venues</Link>
                            <Link href="/festivals" className="hover:text-saffron transition-colors">Festivals</Link>
                            <Link href="#" className="hover:text-saffron transition-colors">About</Link>
                        </>
                    )}
                    {isAgency && (
                        <>
                            <Link href="/dashboard/agency" className="hover:text-saffron transition-colors">Overview</Link>
                            <Link href="/dashboard/agency/profile" className="hover:text-saffron transition-colors">My Profile</Link>
                            <Link href="#" className="hover:text-saffron transition-colors text-zinc-400 cursor-not-allowed">Analytics (Pro)</Link>
                        </>
                    )}
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-4">
                    {/* Search - Hide for Agencies to focus on business */}
                    {!isAgency && (
                        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full border border-transparent focus-within:border-saffron/50 transition-all">
                            <Search className="w-4 h-4 text-zinc-400" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-transparent border-none outline-none text-sm w-32 focus:w-48 transition-all placeholder:text-zinc-400"
                            />
                        </div>
                    )}

                    {session ? (
                        <div className="flex items-center gap-3">
                            {/* Dashboard Link based on Role */}
                            <Link href={isAgency ? "/dashboard/agency" : "/dashboard/user"}>
                                <Button variant="ghost" size="sm" className="hidden sm:flex gap-2">
                                    <LayoutDashboard className="w-4 h-4" />
                                    Dashboard
                                </Button>
                            </Link>

                            {/* User Dropdown / Sign Out */}
                            <div className="flex items-center gap-2 pl-3 border-l border-zinc-200 dark:border-zinc-800">
                                <span className="text-sm font-medium hidden md:block max-w-[100px] truncate">
                                    {session.user?.name}
                                </span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => signOut({ callbackUrl: "/" })}
                                    className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                                >
                                    <LogOut className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="items-center gap-3 hidden md:flex">
                            <Link href="/login" className="text-sm font-medium hover:text-saffron transition-colors">Login</Link>
                            <Link href="/signup">
                                <Button className="bg-foreground text-background hover:bg-saffron hover:text-white rounded-full h-9 px-5">
                                    Sign Up
                                </Button>
                            </Link>
                        </div>
                    )}

                    {/* Mobile Menu Toggle */}
                    <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle mobile menu">
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>

                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-md pt-20 px-6 animate-in slide-in-from-top-10">
                    <div className="flex flex-col gap-6 text-lg font-medium">
                        {!isAgency && (
                            <>
                                <Link href="/agencies" onClick={() => setIsMenuOpen(false)}>Agencies</Link>
                                <Link href="/agencies" onClick={() => setIsMenuOpen(false)}>Venues</Link>
                                <Link href="/festivals" onClick={() => setIsMenuOpen(false)}>Festivals</Link>
                                <Link href="#" onClick={() => setIsMenuOpen(false)}>About</Link>
                            </>
                        )}
                        {isAgency && (
                            <>
                                <Link href="/dashboard/agency" onClick={() => setIsMenuOpen(false)}>Overview</Link>
                                <Link href="/dashboard/agency/profile" onClick={() => setIsMenuOpen(false)}>My Profile</Link>
                            </>
                        )}

                        <div className="h-px bg-white/10 my-2"></div>

                        {!session ? (
                            <div className="flex flex-col gap-4">
                                <Link href="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
                                <Link href="/signup" onClick={() => setIsMenuOpen(false)} className="text-saffron">Sign Up</Link>
                            </div>
                        ) : (
                            <Link href={isAgency ? "/dashboard/agency" : "/dashboard/user"} onClick={() => setIsMenuOpen(false)}>
                                Go to Dashboard
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
