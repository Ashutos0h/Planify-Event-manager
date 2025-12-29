"use client";

import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { Crown, Sparkles, TrendingUp, Calendar, MapPin, ArrowUpRight } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { useState, useEffect } from "react";
import Link from 'next/link';
import { cn } from "@/lib/utils";

// Mock spending chart for now
const SPENDING_DATA = [
    { month: "Jan", amount: 0 },
    { month: "Feb", amount: 0 },
    { month: "Mar", amount: 250000 },
    { month: "Apr", amount: 150000 },
    { month: "May", amount: 0 },
    { month: "Jun", amount: 0 },
];

interface Booking {
    id: string;
    date: string;
    totalAmount: number;
    status: string;
    agency: {
        name: string;
        location: string;
    }
}

export default function UserDashboard() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await fetch('/api/user/bookings');
                if (res.ok) {
                    const data = await res.json();
                    setBookings(data);
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    const totalSpent = bookings.reduce((acc, curr) => acc + curr.totalAmount, 0);
    const partyPoints = Math.floor(totalSpent * 0.01); // 1% reward points

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans">
            <DashboardSidebar />

            <main className="lg:pl-64 min-h-screen">
                <div className="p-8 max-w-7xl mx-auto space-y-8">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold">Welcome back, Vashu!</h1>
                            <p className="text-zinc-500">Here&apos;s what&apos;s happening with your events.</p>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-saffron to-gold rounded-full text-white shadow-lg shadow-saffron/20">
                            <Crown className="w-5 h-5 fill-white" />
                            <span className="font-bold">Platinum Member</span>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        {/* PartyPoints Card */}
                        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-saffron/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-500" />
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 text-saffron mb-2">
                                    <Sparkles className="w-5 h-5" />
                                    <span className="font-bold uppercase text-xs tracking-wider">PartyPoints Balance</span>
                                </div>
                                <div className="text-4xl font-bold mb-1">{partyPoints.toLocaleString()} pts</div>
                                <p className="text-xs text-zinc-500">Value: ₹{partyPoints.toLocaleString()} off next booking</p>
                            </div>
                        </div>

                        {/* Spending Summary */}
                        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800">
                            <div className="flex items-center gap-2 text-green-600 mb-2">
                                <TrendingUp className="w-5 h-5" />
                                <span className="font-bold uppercase text-xs tracking-wider">Total Spent</span>
                            </div>
                            <div className="text-4xl font-bold mb-1">₹{(totalSpent / 100000).toFixed(2)} L</div>
                            <p className="text-xs text-zinc-500">Lifetime Investment</p>
                        </div>

                        {/* Active Bookings */}
                        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800">
                            <div className="flex items-center gap-2 text-blue-600 mb-2">
                                <Calendar className="w-5 h-5" />
                                <span className="font-bold uppercase text-xs tracking-wider">Total Bookings</span>
                            </div>
                            <div className="text-4xl font-bold mb-1">{bookings.length}</div>
                            <p className="text-xs text-zinc-500">Events Managed</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Spending Chart */}
                        <div className="lg:col-span-2 bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 h-[400px]">
                            <h3 className="font-bold text-lg mb-6">Spending Activity</h3>
                            <ResponsiveContainer width="100%" height="85%">
                                <BarChart data={SPENDING_DATA}>
                                    <XAxis
                                        dataKey="month"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#71717a', fontSize: 12 }}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#71717a', fontSize: 12 }}
                                        tickFormatter={(value) => `₹${value / 1000}k`}
                                    />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                        cursor={{ fill: 'transparent' }}
                                    />
                                    <Bar
                                        dataKey="amount"
                                        fill="#FF9933"
                                        radius={[6, 6, 0, 0]}
                                        barSize={40}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Upcoming Events List */}
                        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold text-lg">Your Bookings</h3>
                                <button className="text-saffron text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                                    View All <ArrowUpRight className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                                {loading && <p className="text-zinc-500 text-sm">Loading events...</p>}

                                {!loading && bookings.length === 0 && (
                                    <p className="text-zinc-500 text-sm">No events booked yet.</p>
                                )}

                                {bookings.map((booking) => (
                                    <div key={booking.id} className="group p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700 transition-all cursor-pointer">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className={cn(
                                                "px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide",
                                                booking.status === "CONFIRMED" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                                            )}>
                                                {booking.status}
                                            </span>
                                            <span className="text-xs text-zinc-400 font-medium">
                                                {new Date(booking.date).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <h4 className="font-bold text-base mb-1 group-hover:text-saffron transition-colors">{booking.agency.name}</h4>

                                        <div className="flex items-center justify-between pt-3 border-t border-zinc-200 dark:border-zinc-700">
                                            <div className="flex items-center gap-1 text-xs text-zinc-500">
                                                <MapPin className="w-3 h-3" />
                                                {booking.agency.location}
                                            </div>
                                            <div className="font-bold text-sm">₹{(booking.totalAmount / 100000).toFixed(2)}L</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Link href="/agencies" className="block mt-4">
                                <button className="w-full py-3 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 text-zinc-500 text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    Plan New Event
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

