import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4 text-center">
            <h1 className="text-9xl font-bold bg-gradient-to-r from-saffron to-gold bg-clip-text text-transparent">
                404
            </h1>
            <h2 className="text-2xl font-bold mt-4 mb-2">Page Not Found</h2>
            <p className="text-zinc-500 mb-8 max-w-md">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>

            <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 text-white rounded-xl hover:bg-zinc-800 transition-colors font-medium"
            >
                <Home className="w-4 h-4" />
                Back to Home
            </Link>
        </div>
    );
}
