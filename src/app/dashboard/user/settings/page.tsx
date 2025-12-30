"use client";

import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { Bell, Shield, Wallet, Monitor, Moon, Volume2, ChevronRight, LogOut, Trash2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export default function SettingsPage() {
    const router = useRouter();
    const [notifications, setNotifications] = useState({
        email: true,
        sms: false,
        promo: true,
        updates: true
    });

    const [darkMode, setDarkMode] = useState(false);

    const Toggle = ({ checked, onChange }: { checked: boolean, onChange: () => void }) => (
        <button
            onClick={onChange}
            className={cn(
                "w-12 h-6 rounded-full transition-colors relative",
                checked ? "bg-saffron" : "bg-zinc-200 dark:bg-zinc-700"
            )}
        >
            <div className={cn(
                "w-4 h-4 bg-white rounded-full absolute top-1 transition-transform",
                checked ? "left-7" : "left-1"
            )} />
        </button>
    );

    const handleSignOut = () => {
        signOut({ callbackUrl: "/" });
    };

    const handleDeleteAccount = async () => {
        if (!confirm("Are you sure you want to delete your account? This will permanently remove all your data and cannot be undone.")) {
            return;
        }

        try {
            const res = await fetch("/api/user/delete", { method: "DELETE" });
            if (res.ok) {
                alert("Account deleted successfully.");
                router.push("/signup");
            } else {
                alert("Failed to delete account. Please try again.");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred.");
        }
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans">
            <DashboardSidebar />

            <main className="lg:pl-64 min-h-screen">
                <div className="p-8 max-w-3xl mx-auto space-y-8">

                    {/* Header */}
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Settings</h1>
                        <p className="text-zinc-500">Manage your application preferences and security.</p>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 divide-y divide-zinc-100 dark:divide-zinc-800">
                        {/* Notifications Section */}
                        <div className="p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                                    <Bell className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">Notifications</h3>
                                    <p className="text-sm text-zinc-500">Manage how you receive updates</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-medium">Email Notifications</div>
                                        <div className="text-xs text-zinc-500">Receive booking confirmations via email</div>
                                    </div>
                                    <Toggle
                                        checked={notifications.email}
                                        onChange={() => setNotifications({ ...notifications, email: !notifications.email })}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-medium">SMS Notifications</div>
                                        <div className="text-xs text-zinc-500">Receive updates via SMS</div>
                                    </div>
                                    <Toggle
                                        checked={notifications.sms}
                                        onChange={() => setNotifications({ ...notifications, sms: !notifications.sms })}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-medium">Marketing Emails</div>
                                        <div className="text-xs text-zinc-500">Receive offers and promotions</div>
                                    </div>
                                    <Toggle
                                        checked={notifications.promo}
                                        onChange={() => setNotifications({ ...notifications, promo: !notifications.promo })}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Appearance Section */}
                        <div className="p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                                    <Monitor className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">Appearance</h3>
                                    <p className="text-sm text-zinc-500">Customize the interface look and feel</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-medium">Dark Mode</div>
                                        <div className="text-xs text-zinc-500">Switch between light and dark themes</div>
                                    </div>
                                    <Toggle
                                        checked={darkMode}
                                        onChange={() => setDarkMode(!darkMode)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Security Section */}
                        <div className="p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center">
                                    <Shield className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">Security</h3>
                                    <p className="text-sm text-zinc-500">Protect your account and data</p>
                                </div>
                            </div>

                            <button className="w-full flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors mb-2">
                                <div className="text-left">
                                    <div className="font-medium">Change Password</div>
                                    <div className="text-xs text-zinc-500">Last changed 3 months ago</div>
                                </div>
                                <ChevronRight className="w-5 h-5 text-zinc-400" />
                            </button>
                            <button className="w-full flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                                <div className="text-left">
                                    <div className="font-medium">Two-Factor Authentication</div>
                                    <div className="text-xs text-zinc-500">Currently disabled</div>
                                </div>
                                <ChevronRight className="w-5 h-5 text-zinc-400" />
                            </button>
                        </div>

                        {/* Danger Zone */}
                        <div className="p-6">
                            <h3 className="font-bold text-red-600 mb-4">Danger Zone</h3>

                            <div className="flex flex-col md:flex-row gap-4">
                                <button
                                    onClick={handleSignOut}
                                    className="flex-1 py-3 px-4 border border-red-200 text-red-600 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/10 font-medium transition-colors flex items-center justify-center gap-2"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Sign Out
                                </button>
                                <button
                                    onClick={handleDeleteAccount}
                                    className="flex-1 py-3 px-4 bg-red-600 text-white rounded-xl hover:bg-red-700 font-medium transition-colors flex items-center justify-center gap-2"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Delete Account
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
