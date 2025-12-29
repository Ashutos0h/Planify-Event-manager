"use client";

import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { User, Mail, Phone, MapPin, Camera, Save } from "lucide-react";
import { useState, useEffect } from "react";

export default function ProfilePage() {
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        location: "",
        bio: ""
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await fetch("/api/user/profile");
            if (res.ok) {
                const data = await res.json();
                setFormData({
                    name: data.name || "",
                    email: data.email || "",
                    phone: data.phone || "",
                    location: data.location || "",
                    bio: data.bio || ""
                });
            }
        } catch (error) {
            console.error("Failed to fetch profile", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = async () => {
        setMessage("Saving...");
        try {
            const res = await fetch("/api/user/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setMessage("Profile updated successfully!");
                setIsEditing(false);
                setTimeout(() => setMessage(""), 3000);
            } else {
                setMessage("Failed to update profile.");
            }
        } catch (error) {
            console.error("Error updating profile", error);
            setMessage("Error occurred.");
        }
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans">
            <DashboardSidebar />

            <main className="lg:pl-64 min-h-screen">
                <div className="p-8 max-w-4xl mx-auto space-y-8">

                    {/* Header */}
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">My Profile</h1>
                            <p className="text-zinc-500">Manage your personal information and preferences.</p>
                        </div>
                        {message && (
                            <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm font-medium">
                                {message}
                            </div>
                        )}
                    </div>

                    {isLoading ? (
                        <div className="text-center py-12">Loading profile...</div>
                    ) : (
                        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                            {/* Cover Image */}
                            <div className="h-48 bg-gradient-to-r from-saffron/20 to-gold/20 relative">
                                <button className="absolute bottom-4 right-4 bg-white/50 backdrop-blur-md p-2 rounded-full hover:bg-white/80 transition-colors">
                                    <Camera className="w-5 h-5 text-zinc-700" />
                                </button>
                            </div>

                            {/* Profile Content */}
                            <div className="px-8 pb-8">
                                <div className="relative -mt-16 mb-8 flex items-end justify-between">
                                    <div className="relative group">
                                        <div className="w-32 h-32 bg-white dark:bg-zinc-900 rounded-full p-2">
                                            <div className="w-full h-full bg-gradient-to-br from-saffron to-gold rounded-full flex items-center justify-center text-4xl text-white font-bold border-4 border-white dark:border-zinc-900">
                                                {formData.name?.charAt(0) || "U"}
                                            </div>
                                        </div>
                                        <button className="absolute bottom-2 right-2 bg-zinc-900 text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Camera className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div className="mb-4">
                                        {isEditing ? (
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => setIsEditing(false)}
                                                    className="px-4 py-2 bg-zinc-200 text-zinc-900 rounded-xl font-medium text-sm hover:opacity-90"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={handleSave}
                                                    className="px-4 py-2 bg-zinc-900 text-white rounded-xl font-medium text-sm hover:opacity-90"
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => setIsEditing(true)}
                                                className="px-6 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl font-medium text-sm hover:opacity-90 transition-opacity"
                                            >
                                                Edit Profile
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <form className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Full Name</label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    disabled={!isEditing}
                                                    className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 focus:ring-2 focus:ring-saffron/50 outline-none transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Email Address</label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    disabled={true} // Email should generally not be editable
                                                    className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 focus:ring-2 focus:ring-saffron/50 outline-none transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Phone Number</label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    disabled={!isEditing}
                                                    className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 focus:ring-2 focus:ring-saffron/50 outline-none transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Location</label>
                                            <div className="relative">
                                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                                                <input
                                                    type="text"
                                                    name="location"
                                                    value={formData.location}
                                                    onChange={handleChange}
                                                    disabled={!isEditing}
                                                    className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 focus:ring-2 focus:ring-saffron/50 outline-none transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Bio</label>
                                        <textarea
                                            name="bio"
                                            value={formData.bio}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            rows={4}
                                            className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 focus:ring-2 focus:ring-saffron/50 outline-none transition-all disabled:opacity-70 disabled:cursor-not-allowed resize-none"
                                        />
                                    </div>

                                    {isEditing && (
                                        <div className="flex justify-end pt-4">
                                            <button
                                                type="button"
                                                onClick={handleSave}
                                                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-saffron to-gold text-white rounded-xl font-bold shadow-lg shadow-saffron/20 hover:shadow-xl hover:shadow-saffron/30 transition-all transform hover:-translate-y-0.5"
                                            >
                                                <Save className="w-4 h-4" />
                                                Save Changes
                                            </button>
                                        </div>
                                    )}
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
