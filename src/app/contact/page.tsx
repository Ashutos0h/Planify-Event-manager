"use client";

import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        // Simple mock submission
        setTimeout(() => {
            alert("Message sent! We'll get back to you shortly.");
            setSubmitted(false);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-background text-foreground font-sans pt-24 pb-12 px-6 lg:px-12">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
                    <p className="text-zinc-500">We'd love to hear from you. Our team is always here to chat.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="glass p-8 rounded-2xl border border-zinc-200 dark:border-white/10">
                            <h3 className="text-xl font-bold mb-6">Contact Information</h3>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-saffron/10 flex items-center justify-center shrink-0">
                                        <Mail className="w-5 h-5 text-saffron" />
                                    </div>
                                    <div>
                                        <p className="font-medium">Email Us</p>
                                        <a href="mailto:hello@planify.in" className="text-zinc-500 hover:text-saffron transition-colors">hello@planify.in</a>
                                        <p className="text-xs text-zinc-400 mt-1">Typically responds within 2 hours</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                                        <Phone className="w-5 h-5 text-blue-500" />
                                    </div>
                                    <div>
                                        <p className="font-medium">Call Us</p>
                                        <a href="tel:+919876543210" className="text-zinc-500 hover:text-blue-500 transition-colors">+91 98765 43210</a>
                                        <p className="text-xs text-zinc-400 mt-1">Mon-Fri from 9am to 6pm</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                                        <MapPin className="w-5 h-5 text-green-500" />
                                    </div>
                                    <div>
                                        <p className="font-medium">Visit Us</p>
                                        <p className="text-zinc-500">
                                            123, Startup Hub, Cyber City<br />
                                            Gurugram, Haryana 122002
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="aspect-video bg-zinc-100 dark:bg-zinc-800 rounded-2xl overflow-hidden relative">
                            <img
                                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=600&fit=crop"
                                alt="Map Location"
                                className="w-full h-full object-cover opacity-50 contrast-125"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="bg-white/80 dark:bg-black/80 px-4 py-2 rounded-full text-sm font-medium backdrop-blur">
                                    Planify HQ
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="glass p-8 rounded-2xl border border-zinc-200 dark:border-white/10">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-background border border-zinc-200 dark:border-zinc-700 focus:ring-2 focus:ring-saffron outline-none transition-all"
                                    placeholder="Your full name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Email</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-background border border-zinc-200 dark:border-zinc-700 focus:ring-2 focus:ring-saffron outline-none transition-all"
                                    placeholder="you@company.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Subject</label>
                                <select className="w-full px-4 py-3 rounded-lg bg-background border border-zinc-200 dark:border-zinc-700 focus:ring-2 focus:ring-saffron outline-none transition-all appearance-none cursor-pointer">
                                    <option>General Inquiry</option>
                                    <option>Agency Partnership</option>
                                    <option>Support Request</option>
                                    <option>Press</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Message</label>
                                <textarea
                                    required
                                    rows={5}
                                    className="w-full px-4 py-3 rounded-lg bg-background border border-zinc-200 dark:border-zinc-700 focus:ring-2 focus:ring-saffron outline-none transition-all resize-none"
                                    placeholder="How can we help you?"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={submitted}
                                className="w-full py-4 bg-foreground text-background font-bold rounded-lg hover:bg-saffron hover:text-white transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {submitted ? "Sending..." : <><Send className="w-4 h-4" /> Send Message</>}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
