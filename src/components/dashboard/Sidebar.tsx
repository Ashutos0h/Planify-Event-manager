"use client";

import { Home, LayoutDashboard, Calendar, Settings, LogOut, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

export function DashboardSidebar() {
    const pathname = usePathname();

    const links = [
        { href: "/dashboard/user", label: "Overview", icon: LayoutDashboard },
        { href: "/dashboard/user/bookings", label: "My Bookings", icon: Calendar },
        { href: "/dashboard/user/profile", label: "Profile", icon: User },
        { href: "/dashboard/user/settings", label: "Settings", icon: Settings },
    ];

    return (
        <aside className="w-64 fixed left-0 top-0 bottom-0 bg-white/50 dark:bg-black/50 backdrop-blur-xl border-r border-zinc-200 dark:border-zinc-800 p-6 flex flex-col z-30 hidden lg:flex">
            <div className="flex items-center gap-2 mb-10">
                <div className="w-8 h-8 bg-gradient-to-br from-saffron to-gold rounded-lg flex items-center justify-center text-white font-bold">P</div>
                <span className="text-xl font-bold tracking-tight">Planify</span>
            </div>

            <nav className="space-y-2 flex-1">
                {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm",
                                isActive
                                    ? "bg-saffron/10 text-saffron border border-saffron/20"
                                    : "text-zinc-500 hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800"
                            )}
                        >
                            <Icon className="w-4 h-4" />
                            {link.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="border-t border-zinc-200 dark:border-zinc-800 pt-6 space-y-2">
                <Link
                    href="/"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-500 hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800 font-medium text-sm transition-all"
                >
                    <Home className="w-4 h-4" />
                    Back to Home
                </Link>
                <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 font-medium text-sm transition-all"
                >
                    <LogOut className="w-4 h-4" />
                    Logout
                </button>
            </div>
        </aside>
    );
}
