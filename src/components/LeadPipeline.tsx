"use client";
import { Check, X } from "lucide-react";

interface Lead {
    id: string;
    clientName: string;
    eventType: string;
    date: string;
    value: number;
    status: string; // "PENDING", "CONFIRMED", "COMPLETED"
}

interface LeadPipelineProps {
    leads: {
        new: Lead[];
        inProgress: Lead[];
        closed: Lead[];
    };
    onUpdateStatus?: (id: string, status: string) => void;
}

export function LeadPipeline({ leads, onUpdateStatus }: LeadPipelineProps) {
    const stages = [
        { key: "new" as const, label: "New Leads", color: "bg-blue-500", items: leads.new },
        { key: "inProgress" as const, label: "In Progress", color: "bg-yellow-500", items: leads.inProgress },
        { key: "closed" as const, label: "Closed", color: "bg-green-500", items: leads.closed }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stages.map((stage) => (
                <div key={stage.key} className="flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                        <div className={`w-3 h-3 rounded-full ${stage.color}`} />
                        <h3 className="font-bold text-sm">{stage.label}</h3>
                        <span className="ml-auto text-xs text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full">
                            {stage.items.length}
                        </span>
                    </div>

                    <div className="space-y-3 flex-1">
                        {stage.items.map((lead) => (
                            <div
                                key={lead.id}
                                className="glass rounded-lg p-3 border border-white/10 hover:border-saffron/30 transition-all"
                            >
                                <div className="font-medium text-sm mb-1">{lead.clientName}</div>
                                <div className="text-xs text-zinc-500 mb-2 capitalize">{lead.eventType} • {lead.date}</div>
                                <div className="text-sm font-bold text-saffron mb-2">₹{lead.value.toLocaleString()}</div>

                                {stage.key === "new" && onUpdateStatus && (
                                    <div className="flex gap-2 mt-2 pt-2 border-t border-zinc-100 dark:border-zinc-800/50">
                                        <button
                                            onClick={() => onUpdateStatus(lead.id, "CONFIRMED")}
                                            className="flex-1 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-bold rounded hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors flex items-center justify-center gap-1"
                                        >
                                            <Check className="w-3 h-3" /> Accept
                                        </button>
                                        <button
                                            onClick={() => onUpdateStatus(lead.id, "CANCELLED")}
                                            className="flex-1 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold rounded hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors flex items-center justify-center gap-1"
                                        >
                                            <X className="w-3 h-3" /> Reject
                                        </button>
                                    </div>
                                )}

                                {stage.key === "inProgress" && onUpdateStatus && (
                                    <button
                                        onClick={() => onUpdateStatus(lead.id, "COMPLETED")}
                                        className="w-full mt-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs font-bold rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                                    >
                                        Mark Internal Complete
                                    </button>
                                )}
                            </div>
                        ))}
                        {stage.items.length === 0 && (
                            <div className="glass rounded-lg p-4 border border-dashed border-zinc-300 dark:border-zinc-700 text-center text-sm text-zinc-400">
                                No leads yet
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
