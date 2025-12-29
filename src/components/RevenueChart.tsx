"use client";

interface RevenueChartProps {
    data: {
        month: string;
        revenue: number;
    }[];
}

export function RevenueChart({ data }: RevenueChartProps) {
    const maxRevenue = Math.max(...data.map(d => d.revenue));

    return (
        <div className="space-y-4">
            <div className="flex items-end justify-between gap-2 h-64">
                {data.map((item, idx) => {
                    const height = (item.revenue / maxRevenue) * 100;

                    return (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                            <div className="w-full flex flex-col justify-end h-full">
                                <div
                                    className="w-full bg-gradient-to-t from-saffron to-gold rounded-t-lg transition-all duration-500 hover:opacity-80 cursor-pointer relative group"
                                    style={{ height: `${height}%` }}
                                >
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                                        ₹{item.revenue.toLocaleString()}
                                    </div>
                                </div>
                            </div>
                            <span className="text-xs text-zinc-500 font-medium">{item.month}</span>
                        </div>
                    );
                })}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-saffron to-gold" />
                    <span className="text-xs text-zinc-500">Monthly Revenue</span>
                </div>
            </div>
        </div>
    );
}
