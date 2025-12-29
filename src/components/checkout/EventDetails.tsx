"use client";

import { Calendar, Users, MapPin, Info } from "lucide-react";

interface EventDetailsProps {
    date: string;
    setDate: (date: string) => void;
    guests: number;
    setGuests: (num: number) => void;
    venue: string;
    setVenue: (venue: string) => void;
}

export function EventDetails({
    date,
    setDate,
    guests,
    setGuests,
    venue,
    setVenue
}: EventDetailsProps) {
    const isMuhurat = (dateString: string) => {
        // Mock logic for auspicious dates
        const day = new Date(dateString).getDate();
        return day % 3 === 0; // Every 3rd day is auspicious for demo
    };

    return (
        <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold">Event Details</h2>
                <p className="text-zinc-500">Tell us when and where the magic happens</p>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-8 space-y-6 border border-zinc-200 dark:border-zinc-800">

                {/* Date Picker */}
                <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-saffron" /> Event Date
                    </label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full p-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-saffron outline-none"
                    />
                    {date && isMuhurat(date) && (
                        <div className="flex items-center gap-2 text-saffron text-sm bg-saffron/10 p-2 rounded-lg">
                            <Info className="w-4 h-4" />
                            <span>Great choice! This adds up to a Shubh Muhurat date.</span>
                        </div>
                    )}
                </div>

                {/* Guest Count */}
                <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                        <Users className="w-4 h-4 text-blue-500" /> Expected Guests
                    </label>
                    <input
                        type="number"
                        placeholder="e.g. 500"
                        value={guests || ""}
                        onChange={(e) => setGuests(parseInt(e.target.value))}
                        className="w-full p-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                {/* Venue Preference */}
                <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-green-500" /> Venue Preference (City/Area)
                    </label>
                    <input
                        type="text"
                        placeholder="e.g. Udaipur Palace or 'Any 5-star Hotel'"
                        value={venue}
                        onChange={(e) => setVenue(e.target.value)}
                        className="w-full p-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-green-500 outline-none"
                    />
                </div>
            </div>
        </div>
    );
}
