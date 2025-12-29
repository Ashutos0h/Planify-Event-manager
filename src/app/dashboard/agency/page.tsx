"use client";

import { LeadPipeline } from "@/components/LeadPipeline";
import { RevenueChart } from "@/components/RevenueChart";
import { TrendingUp, Users, DollarSign, Calendar } from "lucide-react";
import { useState, useEffect } from "react";

// Keeping mock revenue data for chart visualization as historical data doesn't exist yet
const MOCK_REVENUE_DATA = [
    { month: "Sep", revenue: 320000 },
    { month: "Oct", revenue: 450000 },
    { month: "Nov", revenue: 380000 },
    { month: "Dec", revenue: 520000 },
    { month: "Jan", revenue: 410000 },
    { month: "Feb", revenue: 370000 }
];

export default function AgencyDashboard() {
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalRevenue: 2450000, // Mock initial base
        activeLeads: 0,
        completedEvents: 0,
        avgRating: 4.9
    });

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const res = await fetch('/api/agency/bookings');
            if (res.ok) {
                const data = await res.json();
                setBookings(data);
                calculateStats(data);
            }
        } catch (error) {
            console.error("Error fetching bookings:", error);
        } finally {
            setLoading(false);
        }
    };

    const calculateStats = (data: any[]) => {
        const active = data.filter(b => b.status === 'PENDING' || b.status === 'CONFIRMED').length;
        const completed = data.filter(b => b.status === 'COMPLETED').length;

        // Calculate revenue from COMPLETED events
        const newRevenue = data
            .filter(b => b.status === 'COMPLETED')
            .reduce((acc, curr) => acc + curr.totalAmount, 0);

        setStats(prev => ({
            ...prev,
            activeLeads: active,
            completedEvents: completed,
            totalRevenue: 2450000 + newRevenue // Add to mock base
        }));
    };

    const handleStatusUpdate = async (id: string, newStatus: string) => {
        // Optimistic update
        const originalBookings = [...bookings];
        const updatedBookings = bookings.map(b =>
            b.id === id ? { ...b, status: newStatus } : b
        );
        setBookings(updatedBookings);
        calculateStats(updatedBookings);

        try {
            const res = await fetch(`/api/bookings/${id}`, {
                method: 'PATCH',
                body: JSON.stringify({ status: newStatus }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (!res.ok) {
                throw new Error("Failed to update status");
            }
        } catch (error) {
            console.error("Error updating status:", error);
            // Revert on error
            setBookings(originalBookings);
            calculateStats(originalBookings);
            alert("Failed to update status. Please try again.");
        }
    };

    // Transform bookings for pipeline
    const pipelineData = {
        new: bookings.filter(b => b.status === 'PENDING').map(b => ({
            id: b.id,
            clientName: b.user?.name || "Unknown Client",
            eventType: b.packageType + " Event", // Approximation
            date: new Date(b.date).toLocaleDateString(),
            value: b.totalAmount,
            status: b.status
        })),
        inProgress: bookings.filter(b => b.status === 'CONFIRMED').map(b => ({
            id: b.id,
            clientName: b.user?.name || "Client",
            eventType: b.packageType,
            date: new Date(b.date).toLocaleDateString(),
            value: b.totalAmount,
            status: b.status
        })),
        closed: bookings.filter(b => b.status === 'COMPLETED').map(b => ({
            id: b.id,
            clientName: b.user?.name || "Client",
            eventType: b.packageType,
            date: new Date(b.date).toLocaleDateString(),
            value: b.totalAmount,
            status: b.status
        }))
    };

    return (
        <div className="min-h-screen bg-background text-foreground font-sans">
            {/* Header */}
            <header className="glass sticky top-0 z-40 border-b border-white/10 px-6 lg:px-12 h-16 flex items-center justify-between">
                <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <div className="w-8 h-8 bg-gradient-to-br from-saffron to-gold rounded-lg flex items-center justify-center text-white font-bold">P</div>
                    <span className="text-xl font-bold tracking-tight">Planify</span>
                    <span className="text-sm text-zinc-500 ml-2">Agency Portal</span>
                </a>
                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <button className="w-9 h-9 rounded-full bg-gradient-to-br from-saffron to-gold flex items-center justify-center text-white font-bold text-sm hover:shadow-lg transition-all">
                            E
                        </button>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Elite Marriages Dashboard 📊</h1>
                    <p className="text-zinc-500">Track your performance and manage leads</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="glass rounded-xl p-6 border border-white/10">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                                <DollarSign className="w-6 h-6 text-green-500" />
                            </div>
                            <TrendingUp className="w-5 h-5 text-green-500" />
                        </div>
                        <div className="text-2xl font-bold mb-1">₹{(stats.totalRevenue / 100000).toFixed(2)}L</div>
                        <div className="text-sm text-zinc-500">Total Revenue</div>
                    </div>

                    <div className="glass rounded-xl p-6 border border-white/10">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                                <Users className="w-6 h-6 text-blue-500" />
                            </div>
                        </div>
                        <div className="text-2xl font-bold mb-1">{stats.activeLeads}</div>
                        <div className="text-sm text-zinc-500">Active Leads</div>
                    </div>

                    <div className="glass rounded-xl p-6 border border-white/10">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-full bg-saffron/20 flex items-center justify-center">
                                <Calendar className="w-6 h-6 text-saffron" />
                            </div>
                        </div>
                        <div className="text-2xl font-bold mb-1">{stats.completedEvents}</div>
                        <div className="text-sm text-zinc-500">Completed Events</div>
                    </div>

                    <div className="glass rounded-xl p-6 border border-white/10">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                                <span className="text-2xl">⭐</span>
                            </div>
                        </div>
                        <div className="text-2xl font-bold mb-1">{stats.avgRating}</div>
                        <div className="text-sm text-zinc-500">Average Rating</div>
                    </div>
                </div>

                {/* Revenue Chart */}
                <div className="glass rounded-xl p-6 border border-white/10 mb-8">
                    <h2 className="text-xl font-bold mb-6">Revenue Trends</h2>
                    <RevenueChart data={MOCK_REVENUE_DATA} />
                </div>

                {/* Lead Pipeline */}
                <div className="glass rounded-xl p-6 border border-white/10">
                    <h2 className="text-xl font-bold mb-6">Lead Pipeline</h2>
                    {loading ? (
                        <div className="text-center py-10">Loading pipeline...</div>
                    ) : (
                        <LeadPipeline leads={pipelineData} onUpdateStatus={handleStatusUpdate} />
                    )}
                </div>
            </div>
        </div>
    );
}
