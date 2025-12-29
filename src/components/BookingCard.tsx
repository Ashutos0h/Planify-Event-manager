import { Calendar, MapPin, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";

interface BookingCardProps {
    id: string;
    agencyName: string;
    eventType: string;
    date: string;
    location: string;
    guests: number;
    status: "pending" | "confirmed" | "completed" | "cancelled";
    amount: number;
}

const statusConfig = {
    pending: {
        icon: Clock,
        color: "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800",
        label: "Pending"
    },
    confirmed: {
        icon: CheckCircle,
        color: "text-green-600 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
        label: "Confirmed"
    },
    completed: {
        icon: CheckCircle,
        color: "text-blue-600 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
        label: "Completed"
    },
    cancelled: {
        icon: XCircle,
        color: "text-red-600 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",
        label: "Cancelled"
    }
};

export function BookingCard({
    id,
    agencyName,
    eventType,
    date,
    location,
    guests,
    status,
    amount
}: BookingCardProps) {
    const StatusIcon = statusConfig[status].icon;

    return (
        <div className="glass rounded-xl p-5 border border-white/10 hover:border-saffron/30 transition-all">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className="font-bold text-lg mb-1">{agencyName}</h3>
                    <p className="text-sm text-zinc-500 capitalize">{eventType} Event</p>
                </div>
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${statusConfig[status].color}`}>
                    <StatusIcon className="w-3.5 h-3.5" />
                    {statusConfig[status].label}
                </div>
            </div>

            <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                    <Calendar className="w-4 h-4" />
                    <span>{date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                    <MapPin className="w-4 h-4" />
                    <span>{location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                    <AlertCircle className="w-4 h-4" />
                    <span>{guests} Guests</span>
                </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <span className="text-sm text-zinc-500">Total Amount</span>
                <span className="text-lg font-bold text-saffron">₹{amount.toLocaleString()}</span>
            </div>

            <div className="mt-3 flex gap-2">
                <a href={`/book/${id}`} className="flex-1 py-2 px-4 rounded-lg border border-zinc-200 dark:border-zinc-700 text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-center">
                    View Details
                </a>
                {status === "confirmed" && (
                    <a href="/chat" className="flex-1 py-2 px-4 rounded-lg bg-saffron text-white text-sm font-medium hover:bg-saffron/90 transition-colors text-center">
                        Contact Agency
                    </a>
                )}
            </div>
        </div>
    );
}
