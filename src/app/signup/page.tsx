"use client";

import { useState } from "react";
import { User, Building2, ArrowRight, Mail, Lock, Eye, EyeOff } from "lucide-react";

import Link from "next/link";

export default function SignupPage() {
    const [role, setRole] = useState<"customer" | "agency" | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        // Agency specific
        agencyName: "",
        location: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                alert("Account created successfully! Please log in.");
                window.location.href = "/login";
            } else {
                const data = await res.json();
                setError(data.error || "Registration failed");
            }
        } catch (err) {
            console.error(err);
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground font-sans flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <Link href="/" className="flex items-center justify-center gap-2 mb-8">
                    <div className="w-10 h-10 bg-gradient-to-br from-saffron to-gold rounded-lg flex items-center justify-center text-white font-bold text-lg">
                        P
                    </div>
                    <span className="text-2xl font-bold tracking-tight">Planify</span>
                </Link>

                <div className="glass rounded-2xl p-8 border border-white/10">
                    <h1 className="text-2xl font-bold mb-2 text-center">Create Account</h1>
                    <p className="text-zinc-500 text-center mb-6">Join Planify as a customer or agency</p>

                    {!role ? (
                        // Role Selection
                        <div className="space-y-4">
                            <button
                                onClick={() => setRole("customer")}
                                className="w-full p-6 rounded-xl border-2 border-zinc-200 dark:border-zinc-800 hover:border-saffron hover:bg-saffron/5 transition-all group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:bg-saffron/20 transition-colors">
                                        <User className="w-6 h-6 text-blue-500 group-hover:text-saffron" />
                                    </div>
                                    <div className="text-left flex-1">
                                        <h3 className="font-bold text-lg">I&apos;m a Customer</h3>
                                        <p className="text-sm text-zinc-500">Book events and manage celebrations</p>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-zinc-400 group-hover:text-saffron" />
                                </div>
                            </button>

                            <button
                                onClick={() => setRole("agency")}
                                className="w-full p-6 rounded-xl border-2 border-zinc-200 dark:border-zinc-800 hover:border-saffron hover:bg-saffron/5 transition-all group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center group-hover:bg-saffron/20 transition-colors">
                                        <Building2 className="w-6 h-6 text-purple-500 group-hover:text-saffron" />
                                    </div>
                                    <div className="text-left flex-1">
                                        <h3 className="font-bold text-lg">I&apos;m an Agency</h3>
                                        <p className="text-sm text-zinc-500">List services and manage bookings</p>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-zinc-400 group-hover:text-saffron" />
                                </div>
                            </button>
                        </div>
                    ) : (
                        // Signup Form
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <button
                                type="button"
                                onClick={() => setRole(null)}
                                className="text-sm text-saffron hover:underline mb-4"
                            >
                                ← Change role
                            </button>

                            {error && (
                                <div className="p-3 bg-red-100 border border-red-200 text-red-600 rounded-lg text-sm">
                                    {error}
                                </div>
                            )}

                            {role === "agency" && (
                                <div>
                                    <label className="block text-sm font-medium mb-1">Agency Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.agencyName}
                                        onChange={(e) => setFormData({ ...formData, agencyName: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-background focus:ring-2 focus:ring-saffron outline-none"
                                        placeholder="Royal Events Co."
                                    />
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium mb-1">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-background focus:ring-2 focus:ring-saffron outline-none"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-background focus:ring-2 focus:ring-saffron outline-none"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Phone</label>
                                <input
                                    type="tel"
                                    required
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-background focus:ring-2 focus:ring-saffron outline-none"
                                    placeholder="+91 98765 43210"
                                />
                            </div>

                            {role === "agency" && (
                                <div>
                                    <label className="block text-sm font-medium mb-1">Location</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-background focus:ring-2 focus:ring-saffron outline-none"
                                        placeholder="Mumbai, Maharashtra"
                                    />
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium mb-1">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className="w-full pl-10 pr-12 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-background focus:ring-2 focus:ring-saffron outline-none"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-foreground"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 rounded-lg bg-gradient-to-r from-saffron to-gold text-white font-bold hover:shadow-lg transition-all active:scale-95 mt-6"
                            >
                                Create Account
                            </button>
                        </form>
                    )}

                    <p className="text-center text-sm text-zinc-500 mt-6">
                        Already have an account?{" "}
                        <Link href="/login" className="text-saffron font-medium hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
