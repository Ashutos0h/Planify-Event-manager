import Link from "next/link";
import { Twitter, Instagram, Linkedin, Facebook, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
    return (
        <footer className="w-full bg-zinc-950 text-zinc-400 py-12 px-6 lg:px-12 border-t border-white/10 mt-auto">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                {/* Brand Column */}
                <div className="space-y-4">
                    <Link href="/" className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 bg-gradient-to-br from-saffron to-gold rounded-lg flex items-center justify-center text-white font-bold">
                            P
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white">Planify</span>
                    </Link>
                    <p className="text-sm leading-relaxed">
                        India&apos;s premier event planning ecosystem. We connect you with verified agencies to create timeless memories.
                    </p>
                    <div className="flex gap-4 pt-2">
                        <a href="#" className="hover:text-saffron transition-colors" aria-label="Twitter"><Twitter className="w-5 h-5" /></a>
                        <a href="#" className="hover:text-saffron transition-colors" aria-label="Instagram"><Instagram className="w-5 h-5" /></a>
                        <a href="#" className="hover:text-saffron transition-colors" aria-label="LinkedIn"><Linkedin className="w-5 h-5" /></a>
                        <a href="#" className="hover:text-saffron transition-colors" aria-label="Facebook"><Facebook className="w-5 h-5" /></a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-white font-bold mb-4">Platform</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/agencies" className="hover:text-saffron transition-colors">Browse Agencies</Link></li>
                        <li><Link href="/festivals" className="hover:text-saffron transition-colors">Upcoming Festivals</Link></li>
                        <li><Link href="/dashboard/user" className="hover:text-saffron transition-colors">User Dashboard</Link></li>
                        <li><Link href="/dashboard/agency" className="hover:text-saffron transition-colors">Agency Portal</Link></li>
                    </ul>
                </div>

                {/* Company */}
                <div>
                    <h3 className="text-white font-bold mb-4">Company</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/about" className="hover:text-saffron transition-colors">About Us</Link></li>
                        <li><Link href="#" className="hover:text-saffron transition-colors">Careers</Link></li>
                        <li><Link href="#" className="hover:text-saffron transition-colors">Blog</Link></li>
                        <li><Link href="/contact" className="hover:text-saffron transition-colors">Contact Support</Link></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-white font-bold mb-4">Contact</h3>
                    <ul className="space-y-3 text-sm">
                        <li className="flex items-start gap-3">
                            <MapPin className="w-4 h-4 mt-1 text-saffron" />
                            <span>123, Startup Hub, Cyber City,<br />Gurugram, Haryana 122002</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Phone className="w-4 h-4 text-saffron" />
                            <span>+91 98765 43210</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Mail className="w-4 h-4 text-saffron" />
                            <span>hello@planify.in</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
                <p>&copy; {new Date().getFullYear()} Planify Events Pvt Ltd. All rights reserved.</p>
                <div className="flex gap-6">
                    <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                    <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
}
