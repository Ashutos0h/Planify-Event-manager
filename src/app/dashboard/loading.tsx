export default function DashboardLoading() {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-8 lg:pl-72">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header Skeleton */}
                <div className="space-y-4">
                    <div className="h-8 w-64 bg-zinc-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
                    <div className="h-4 w-96 bg-zinc-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
                </div>

                {/* Stats Grid Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-32 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 animate-pulse">
                            <div className="h-10 w-10 bg-zinc-200 dark:bg-zinc-800 rounded-full mb-4" />
                            <div className="h-8 w-24 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
                        </div>
                    ))}
                </div>

                {/* Content Skeleton */}
                <div className="h-96 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 animate-pulse" />
            </div>
        </div>
    );
}
