export default function AgenciesLoading() {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
            {/* Header Skeleton */}
            <div className="h-20 bg-white dark:bg-black/20 border-b border-white/10" />

            <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 flex gap-8">
                {/* Sidebar Constants */}
                <div className="hidden lg:block w-64 space-y-4">
                    <div className="h-64 bg-zinc-200 dark:bg-zinc-800 rounded-xl animate-pulse" />
                </div>

                {/* Main Content */}
                <div className="flex-1 space-y-6">
                    <div className="h-8 w-48 bg-zinc-200 dark:bg-zinc-800 rounded-lg animate-pulse" />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="aspect-[4/3] bg-zinc-200 dark:bg-zinc-800 rounded-xl animate-pulse" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
