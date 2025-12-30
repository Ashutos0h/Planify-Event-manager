import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Share2, Heart, CheckCircle, ShieldCheck } from "lucide-react";
import Link from "next/link";

interface Props {
    params: { id: string };
}

async function getAgency(id: string) {
    const agency = await prisma.agency.findUnique({
        where: { id },
    });
    return agency;
}

export default async function AgencyProfilePage({ params }: Props) {
    const { id } = await params; // Await params for Next.js 15
    const agency = await getAgency(id);

    if (!agency) {
        notFound();
    }

    let portfolio: string[] = [];
    try {
        if (agency.portfolio && agency.portfolio !== "" && agency.portfolio !== "[]") {
            // Handle potential double stringification or invalid JSON
            const parsed = JSON.parse(agency.portfolio);
            portfolio = Array.isArray(parsed) ? parsed : [];
        }
    } catch (e) {
        console.error("Failed to parse portfolio JSON:", e);
        portfolio = [];
    }

    const tags = agency.tags ? agency.tags.split(",") : [];

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans">
            <Navbar />

            <main className="pt-16">
                {/* Hero Section */}
                <div className="relative h-[400px] md:h-[500px] w-full bg-zinc-900">
                    <img
                        src={agency.imageUrl || "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&h=630&fit=crop"}
                        alt={agency.name}
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                    <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
                        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-end justify-between gap-6">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="bg-saffron text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Verified Partner</span>
                                    {agency.rating >= 4.5 && <span className="bg-gold/20 text-gold border border-gold/30 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><Star className="w-3 h-3 fill-current" /> Top Rated</span>}
                                </div>
                                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{agency.name}</h1>
                                <div className="flex items-center gap-4 text-zinc-300">
                                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {agency.location}</span>
                                    <span className="flex items-center gap-1"><Star className="w-4 h-4 text-gold fill-current" /> {agency.rating} ({agency.reviewCount} Reviews)</span>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <Button variant="outline" size="icon" className="rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20">
                                    <Share2 className="w-4 h-4" />
                                </Button>
                                <Button variant="outline" size="icon" className="rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20">
                                    <Heart className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* About */}
                        <section>
                            <h2 className="text-2xl font-bold mb-4">About {agency.name}</h2>
                            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-lg">
                                {agency.description || "No description provided."}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-6">
                                {tags.map((tag: string) => (
                                    <span key={tag} className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-full text-sm font-medium">
                                        {tag.trim()}
                                    </span>
                                ))}
                            </div>
                        </section>

                        {/* Portfolio Display */}
                        <section>
                            <h2 className="text-2xl font-bold mb-6">Portfolio Gallery</h2>
                            {portfolio.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {portfolio.map((img: string, i: number) => (
                                        <div key={i} className="aspect-[4/3] rounded-xl overflow-hidden bg-zinc-100 group cursor-zoom-in">
                                            <img src={img} alt={`Portfolio ${i}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-8 border border-dashed border-zinc-300 rounded-xl text-center text-zinc-500">
                                    No portfolio images uploaded yet.
                                </div>
                            )}
                        </section>

                        {/* Reviews Preview (Static for now) */}
                        <section>
                            <h2 className="text-2xl font-bold mb-6">Client Reviews</h2>
                            <div className="space-y-4">
                                {[1, 2].map((i) => (
                                    <div key={i} className="p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-10 h-10 rounded-full bg-zinc-200 flex items-center justify-center font-bold text-zinc-500">U</div>
                                            <div>
                                                <div className="font-bold">Happy Client</div>
                                                <div className="text-xs text-zinc-500">Wedding Event</div>
                                            </div>
                                            <div className="ml-auto flex text-gold"><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /></div>
                                        </div>
                                        <p className="text-zinc-600 dark:text-zinc-400">
                                            "Absolutely amazing service! They took care of everything and made our special day unforgettable."
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar Sticky Booking */}
                    <div className="relative">
                        <div className="sticky top-24 space-y-6">
                            <div className="p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-100 dark:border-zinc-800">
                                <div className="flex justify-between items-end mb-6">
                                    <div>
                                        <span className="text-zinc-500 text-sm">Packages starting from</span>
                                        <div className="text-3xl font-bold">₹{(agency.priceRangeMin / 100000).toFixed(1)}L</div>
                                    </div>
                                    <div className="text-xs text-zinc-400">GST applicable</div>
                                </div>

                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-center gap-3 text-sm text-zinc-600">
                                        <CheckCircle className="w-4 h-4 text-green-500" /> <span>Verified Agency</span>
                                    </li>
                                    <li className="flex items-center gap-3 text-sm text-zinc-600">
                                        <ShieldCheck className="w-4 h-4 text-saffron" /> <span>Planify Money Back Guarantee</span>
                                    </li>
                                    <li className="flex items-center gap-3 text-sm text-zinc-600">
                                        <CheckCircle className="w-4 h-4 text-green-500" /> <span>Dedicated Event Manager</span>
                                    </li>
                                </ul>

                                <Link href={`/checkout/${agency.id}`} className="block w-full">
                                    <Button size="lg" className="w-full bg-gradient-to-r from-saffron to-gold text-white font-bold text-lg h-14 shadow-lg hover:shadow-saffron/25">
                                        Book Agency
                                    </Button>
                                </Link>

                                <Link href={`/chat?agencyId=${agency.id}`} className="block w-full">
                                    <Button variant="outline" size="lg" className="w-full border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-foreground font-semibold h-12">
                                        Message Agency
                                    </Button>
                                </Link>

                                <p className="text-center text-xs text-zinc-400 mt-4">
                                    You won't be charged yet. Free consultation included.
                                </p>
                            </div>

                            <div className="p-6 bg-saffron/5 border border-saffron/10 rounded-2xl">
                                <h3 className="font-bold text-saffron-dark mb-2">Why book on Planify?</h3>
                                <p className="text-sm text-zinc-600 mb-4">
                                    We hold your payment in escrow until the event is successfully completed. Zero risk for you.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}
