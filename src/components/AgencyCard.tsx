import Link from "next/link";
import { Star, MapPin, CheckCircle, ArrowRight } from "lucide-react";

interface AgencyCardProps {
    id: string;
    name: string;
    location: string;
    rating: number;
    reviewCount: number;
    tags: string[];
    smartMatchScore?: number;
    imageUrl: string;
    portfolio: string[];
}

export function AgencyCard({
    id,
    name,
    location,
    rating,
    reviewCount,
    tags,
    smartMatchScore,
    imageUrl,
    portfolio = []
}: AgencyCardProps) {
    return (
        <div className="glass rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group flex flex-col h-full border border-white/10 dark:border-white/5">
            {/* Cover Image */}
            <div className="relative h-48 w-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                <img
                    src={imageUrl}
                    alt={name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />

                <div className="absolute top-3 right-3 z-20">
                    <div className="bg-white/90 dark:bg-black/90 backdrop-blur-md px-2 py-1 rounded-full flex items-center gap-1 text-xs font-bold shadow-sm">
                        <Star className="w-3 h-3 text-gold fill-gold" />
                        <span>{rating}</span>
                        <span className="text-zinc-500 font-normal">({reviewCount})</span>
                    </div>
                </div>

                {smartMatchScore && (
                    <div className="absolute top-3 left-3 z-20">
                        <div className="bg-saffron text-white px-2 py-1 rounded-full text-xs font-bold shadow-sm flex items-center gap-1">
                            <span className="bg-white/20 rounded-full p-0.5"><CheckCircle className="w-3 h-3" /></span>
                            {smartMatchScore}% Match
                        </div>
                    </div>
                )}
            </div>

            <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="text-xl font-bold text-foreground group-hover:text-saffron transition-colors">{name}</h3>
                        <div className="flex items-center gap-1 text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>{location}</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                    {tags.map((tag) => (
                        <span key={tag} className="text-xs px-2 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-medium">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Mini Portfolio Preview */}
                {portfolio.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 mb-4 mt-auto">
                        {portfolio.slice(0, 3).map((img, idx) => (
                            <div key={idx} className="aspect-square rounded-md bg-zinc-100 dark:bg-zinc-800 overflow-hidden relative">
                                {/* Placeholder for portfolio images */}
                                <div className="absolute inset-0 bg-zinc-200 dark:bg-zinc-700 opacity-50" />
                            </div>
                        ))}
                    </div>
                )}

                <Link
                    href={`/checkout/${id}`}
                    className="w-full mt-2 py-2.5 rounded-lg bg-foreground text-background font-medium text-sm flex items-center justify-center gap-2 hover:bg-saffron hover:text-white transition-all shadow-sm hover:shadow-saffron/20 active:scale-95"
                >
                    Book Now <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
}
