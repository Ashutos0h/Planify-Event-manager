"use client";

import { useState, useEffect } from "react";
import { Wallet, X, MessageSquare, ChevronUp, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";

interface Booking {
    id: string;
    totalAmount: number;
    status: string;
}

export function BudgetBuddy() {
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const [budget, setBudget] = useState<number>(0);
    const [spent, setSpent] = useState<number>(0);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);

    // Load budget from local storage
    useEffect(() => {
        const savedBudget = localStorage.getItem("planify_budget");
        if (savedBudget) {
            setBudget(parseInt(savedBudget));
        }
    }, []);

    // Fetch bookings to calculate spent
    useEffect(() => {
        async function fetchSpend() {
            if (!session?.user) return;
            try {
                const res = await fetch("/api/user/bookings");
                if (res.ok) {
                    const bookings: Booking[] = await res.json();
                    const total = bookings
                        .filter((b) => b.status !== "CANCELLED")
                        .reduce((acc, curr) => acc + curr.totalAmount, 0);
                    setSpent(total);
                }
            } catch (error) {
                console.error("Failed to fetch bookings", error);
            } finally {
                setLoading(false);
            }
        }

        if (isOpen) {
            fetchSpend();
        }
    }, [session, isOpen]);

    const handleSaveBudget = (e: React.FormEvent) => {
        e.preventDefault();
        localStorage.setItem("planify_budget", budget.toString());
        setIsEditing(false);
    };

    const getAiMessage = () => {
        if (budget === 0) return "Hi! Set a budget to get started. I'll help you stay on track.";

        const percentage = (spent / budget) * 100;

        if (percentage > 100) return "⚠️ Alert! You've exceeded your budget. Consider reviewing your recent bookings.";
        if (percentage > 90) return "Careful! You're very close to your limit. Look for value packages.";
        if (percentage > 75) return "You've used over 75% of your budget. Keep an eye on expenses!";
        if (percentage > 50) return "Halfway there! You're doing great. Still have room for premium add-ons.";
        return "Great start! You have plenty of budget left. Have you checked out our trending agencies?";
    };

    if (!session) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="mb-4 w-80 bg-background/95 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 shadow-2xl rounded-2xl overflow-hidden pointer-events-auto"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-saffron to-gold p-4 text-white flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="bg-white/20 p-1.5 rounded-full">
                                    <Wallet className="w-4 h-4 text-white" />
                                </div>
                                <span className="font-bold text-sm">Budget Buddy (Beta)</span>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 rounded-full p-1">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-4 space-y-4">
                            {/* AI Message Bubble */}
                            <div className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded-lg rounded-tl-none text-sm text-zinc-600 dark:text-zinc-300 relative">
                                <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-zinc-100 dark:bg-zinc-800 transform rotate-45" />
                                {getAiMessage()}
                            </div>

                            {/* Stats */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-zinc-500">Spent</span>
                                    <span className="font-semibold">{spent.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })}</span>
                                </div>
                                <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full transition-all duration-500 ${spent > budget && budget > 0 ? 'bg-red-500' : 'bg-saffron'}`}
                                        style={{ width: `${budget > 0 ? Math.min((spent / budget) * 100, 100) : 0}%` }}
                                    />
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-zinc-500">Total Budget</span>
                                    {isEditing ? (
                                        <form onSubmit={handleSaveBudget} className="flex gap-2">
                                            <Input
                                                type="number"
                                                value={budget}
                                                onChange={(e) => setBudget(Number(e.target.value))}
                                                className="h-6 w-24 text-right px-1 py-0"
                                                autoFocus
                                            />
                                            <button type="submit" className="text-green-600 hover:text-green-700">
                                                <CheckCircle2 className="w-4 h-4" />
                                            </button>
                                        </form>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold">{budget.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })}</span>
                                            <button onClick={() => setIsEditing(true)} className="text-xs text-saffron hover:underline">
                                                Edit
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Button
                onClick={() => setIsOpen(!isOpen)}
                size="lg"
                className="rounded-full h-14 w-14 shadow-xl bg-gradient-to-r from-saffron to-gold hover:opacity-90 transition-all pointer-events-auto"
            >
                {isOpen ? <ChevronUp className="w-6 h-6 text-white" /> : <Wallet className="w-6 h-6 text-white" />}
            </Button>
        </div>
    );
}
