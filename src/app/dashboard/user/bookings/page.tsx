"use client";

import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { Calendar, MapPin, Search, Filter, MoreHorizontal } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Booking {
    id: string;
    date: string;
    totalAmount: number;
    status: string;
    packageType: string;
    agency: {
        name: string;
        location: string;
    }
}

export default function MyBookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState("ALL");

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

    const handleCancel = async (id: string) => {
        if (!confirm("Are you sure you want to cancel this booking? This action cannot be undone.")) return;

        try {
            const res = await fetch(`/api/bookings/${id}`, {
                method: 'PATCH',
            });

            if (res.ok) {
                setBookings(prev => prev.map(b =>
                    b.id === id ? { ...b, status: 'CANCELLED' } : b
                ));
            } else {
                alert("Failed to cancel booking. Please try again.");
            }
        } catch (error) {
            console.error("Error cancelling booking:", error);
            alert("An error occurred. Please try again.");
        }
    };

    const filteredBookings = bookings.filter(b =>
        filterStatus === "ALL" ? true : b.status === filterStatus
    );

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans">
            <DashboardSidebar />

            <main className="lg:pl-64 min-h-screen">
                <div className="p-8 max-w-7xl mx-auto space-y-8">

                    {/* Header */}
                    <div>
                        <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
                        <p className="text-zinc-500">Manage and track all your event reservations.</p>
                    </div>

                    {/* Filter Bar */}
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white dark:bg-zinc-900 p-4 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800">
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                            <input
                                type="text"
                                placeholder="Search by agency name..."
                                className="w-full pl-10 pr-4 py-2 bg-zinc-50 dark:bg-zinc-800 rounded-xl border-none focus:ring-2 focus:ring-saffron/50 outline-none text-sm"
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <Filter className="w-4 h-4 text-zinc-500" />
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="bg-transparent text-sm font-medium text-zinc-700 dark:text-zinc-300 outline-none cursor-pointer"
                            >
                                <option value="ALL">All Status</option>
                                <option value="CONFIRMED">Confirmed</option>
                                <option value="PENDING">Pending</option>
                                <option value="COMPLETED">Completed</option>
                                <option value="CANCELLED">Cancelled</option>
                            </select>
                        </div>
                    </div>

                    {/* Bookings List */}
                    <div className="space-y-4">
                        {loading && (
                            <div className="text-center py-12">
                                <div className="text-zinc-500">Loading bookings...</div>
                            </div>
                        )}

                        {!loading && filteredBookings.length === 0 && (
                            <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 border-dashed">
                                <Calendar className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
                                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">No bookings found</h3>
                                <p className="text-zinc-500 text-sm">You haven&apos;t made any bookings yet.</p>
                            </div>
                        )}

                        {filteredBookings.map((booking) => (
                            <div key={booking.id} className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 hover:shadow-md transition-shadow">
                                <div className="flex flex-col md:flex-row justify-between md:items-center gap-6">
                                    {/* Agency Info */}
                                    <div className="flex items-start gap-4">
                                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700 flex items-center justify-center">
                                            <Calendar className="w-8 h-8 text-zinc-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold mb-1">{booking.agency.name}</h3>
                                            <div className="flex items-center gap-4 text-sm text-zinc-500">
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="w-4 h-4" />
                                                    {booking.agency.location}
                                                </div>
                                                <div className="w-1 h-1 bg-zinc-300 rounded-full" />
                                                <div>{booking.packageType} Package</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Status & Actions */}
                                    <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
                                        <div className="text-right">
                                            <div className="text-sm text-zinc-500 mb-1">Total Amount</div>
                                            <div className="font-bold text-lg">₹{(booking.totalAmount).toLocaleString()}</div>
                                        </div>

                                        <div className="text-right">
                                            <div className="text-sm text-zinc-500 mb-1">Status</div>
                                            <span className={cn(
                                                "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide",
                                                booking.status === "CONFIRMED" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                                                    booking.status === "PENDING" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" :
                                                        booking.status === "CANCELLED" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" :
                                                            "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400"
                                            )}>
                                                {booking.status}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            {(booking.status === "PENDING" || booking.status === "CONFIRMED") && (
                                                <button
                                                    onClick={() => handleCancel(booking.id)}
                                                    className="px-4 py-2 rounded-lg border border-red-200 text-red-600 text-sm font-medium hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                            )}
                                            <button className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors text-zinc-400 hover:text-zinc-600">
                                                <MoreHorizontal className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </main>
        </div>
    );
}
