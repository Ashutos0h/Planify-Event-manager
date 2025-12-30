"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toaster";
import { Loader2, Save, ArrowLeft, Plus, X } from "lucide-react";

export default function AgencyProfilePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [agency, setAgency] = useState<any>(null);

    // Form Stats
    const [formData, setFormData] = useState({
        name: "",
        location: "",
        description: "",
        priceRangeMin: 100000,
        priceRangeMax: 500000,
        tags: "",
        portfolio: [] as string[],
        newImageUrl: ""
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await fetch("/api/agency/profile");
            if (res.ok) {
                const data = await res.json();
                setAgency(data);
                setFormData({
                    name: data.name,
                    location: data.location,
                    description: data.description || "",
                    priceRangeMin: data.priceRangeMin,
                    priceRangeMax: data.priceRangeMax,
                    tags: data.tags || "",
                    portfolio: data.portfolio ? JSON.parse(data.portfolio) : [],
                    newImageUrl: ""
                });
            } else {
                toast.error("Failed to load profile");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const res = await fetch("/api/agency/profile", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    // Filter empty
                }),
            });

            if (res.ok) {
                toast.success("Profile updated successfully!");
                router.refresh();
            } else {
                const err = await res.json();
                toast.error(err.error || "Update failed");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setSaving(false);
        }
    };

    const addImage = () => {
        if (!formData.newImageUrl) return;
        setFormData(prev => ({
            ...prev,
            portfolio: [...prev.portfolio, prev.newImageUrl],
            newImageUrl: ""
        }));
    };

    const removeImage = (index: number) => {
        setFormData(prev => ({
            ...prev,
            portfolio: prev.portfolio.filter((_, i) => i !== index)
        }));
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;
    }

    if (!agency) {
        return <div className="p-8 text-center">Agency not found. Please contact support.</div>;
    }

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black p-6 lg:p-12">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Button variant="ghost" onClick={() => router.back()}>
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back
                    </Button>
                    <h1 className="text-2xl font-bold">Manage Agency Profile</h1>
                </div>

                <form onSubmit={handleSave} className="space-y-8">
                    {/* Basic Info */}
                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <h2 className="text-lg font-semibold mb-4">Basic Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Agency Name</label>
                                <Input
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Location</label>
                                <Input
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="col-span-2 space-y-2">
                                <label className="text-sm font-medium">Description</label>
                                <textarea
                                    className="w-full min-h-[100px] p-3 rounded-md border border-input bg-background text-sm"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Tell clients about your services..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Pricing */}
                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <h2 className="text-lg font-semibold mb-4">Pricing & Services</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Min Price (₹)</label>
                                <Input
                                    type="number"
                                    value={formData.priceRangeMin}
                                    onChange={(e) => setFormData({ ...formData, priceRangeMin: parseInt(e.target.value) })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Max Price (₹)</label>
                                <Input
                                    type="number"
                                    value={formData.priceRangeMax}
                                    onChange={(e) => setFormData({ ...formData, priceRangeMax: parseInt(e.target.value) })}
                                />
                            </div>
                            <div className="col-span-2 space-y-2">
                                <label className="text-sm font-medium">Tags (comma separated)</label>
                                <Input
                                    value={formData.tags}
                                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                    placeholder="Wedding, Corporate, Decor, Catering"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Portfolio */}
                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <h2 className="text-lg font-semibold mb-4">Portfolio Images</h2>

                        <div className="flex gap-2 mb-4">
                            <Input
                                placeholder="Paste Image URL (Unsplash, etc.)"
                                value={formData.newImageUrl}
                                onChange={(e) => setFormData({ ...formData, newImageUrl: e.target.value })}
                            />
                            <Button type="button" onClick={addImage} variant="outline">
                                <Plus className="w-4 h-4" /> Add
                            </Button>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {formData.portfolio.map((url, i) => (
                                <div key={i} className="relative group aspect-square rounded-lg overflow-hidden border border-zinc-200">
                                    <img src={url} alt="Portfolio" className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(i)}
                                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}
                            {formData.portfolio.length === 0 && (
                                <div className="col-span-2 text-zinc-400 text-sm italic">No images added yet.</div>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end gap-4">
                        <Button type="button" variant="ghost" onClick={() => router.back()}>Cancel</Button>
                        <Button type="submit" disabled={saving} className="bg-saffron hover:bg-saffron/90 text-white">
                            {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                            Save Changes
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
