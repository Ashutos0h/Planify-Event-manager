"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { PackageSelection } from "@/components/checkout/PackageSelection";
import { EventDetails } from "@/components/checkout/EventDetails";
import { PaymentForm } from "@/components/checkout/PaymentForm";

interface Agency {
    id: string;
    name: string;
    location: string;
    priceRangeMin: number;
}

export default function CheckoutPage() {
    const params = useParams();
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [agency, setAgency] = useState<Agency | null>(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Checkout State
    const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
    const [packagePrice, setPackagePrice] = useState(0);
    const [eventDate, setEventDate] = useState("");
    const [guests, setGuests] = useState(0);
    const [venue, setVenue] = useState("");

    useEffect(() => {
        const fetchAgency = async () => {
            try {
                const res = await fetch(`/api/agencies/${params.agencyId}`);
                if (!res.ok) throw new Error("Agency not found");
                const data = await res.json();
                setAgency(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        if (params.agencyId) {
            fetchAgency();
        }
    }, [params.agencyId]);

    const steps = [
        { number: 1, title: "Select Package" },
        { number: 2, title: "Event Details" },
        { number: 3, title: "Payments" },
    ];

    const handlePackageSelect = (pkgId: string, price: number) => {
        setSelectedPackage(pkgId);
        setPackagePrice(price);
    };

    const nextStep = () => setStep(s => Math.min(s + 1, 3));
    const prevStep = () => setStep(s => Math.max(s - 1, 1));

    const handlePaymentComplete = async () => {
        if (!agency || !selectedPackage || !eventDate) {
            alert("Please complete all fields");
            return;
        }

        setIsSubmitting(true);

        try {
            const res = await fetch('/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    agencyId: agency.id,
                    date: eventDate,
                    totalAmount: packagePrice,
                    packageType: selectedPackage
                }),
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message || 'Booking failed');
            }

            // Success
            router.push('/dashboard/user');
        } catch (error: any) {
            console.error("Booking Error:", error);
            alert(error.message || "Failed to process booking. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return <div className="min-h-screen grid place-items-center">Loading Booking Details...</div>;
    if (!agency) return <div className="min-h-screen grid place-items-center">Agency Not Found</div>;

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans pb-20">
            {/* Navbar Header */}
            <header className="glass sticky top-0 z-40 border-b border-black/5 px-6 lg:px-12 h-16 flex items-center justify-between bg-white/80 dark:bg-black/80 backdrop-blur-md">
                <a href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-saffron to-gold rounded-lg flex items-center justify-center text-white font-bold">P</div>
                    <span className="text-xl font-bold tracking-tight">Planify</span>
                </a>
                <div className="font-medium text-zinc-600 text-right">
                    Booking for <span className="text-foreground font-bold block sm:inline">{agency.name}</span>
                    <span className="text-xs text-zinc-400 block sm:hidden">{agency.location}</span>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 py-10">

                {/* Progress Stepper */}
                <div className="flex items-center justify-between max-w-lg mx-auto mb-12 relative">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-zinc-200 dark:bg-zinc-800 -z-10" />
                    <div
                        className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-saffron transition-all duration-500 ease-out -z-10"
                        style={{ width: `${((step - 1) / 2) * 100}%` }}
                    />

                    {steps.map((s) => {
                        const isActive = step >= s.number;
                        const isCompleted = step > s.number;

                        return (
                            <div key={s.number} className="flex flex-col items-center bg-zinc-50 dark:bg-zinc-950 px-2">
                                <div className={cn(
                                    "w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 border-4",
                                    isActive ? "border-saffron bg-white text-saffron scale-110" : "border-zinc-300 bg-zinc-100 text-zinc-400",
                                    isCompleted && "bg-saffron border-saffron text-white"
                                )}>
                                    {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : s.number}
                                </div>
                                <span className={cn(
                                    "text-xs font-medium mt-2 transition-colors",
                                    isActive ? "text-saffron" : "text-zinc-400"
                                )}>
                                    {s.title}
                                </span>
                            </div>
                        )
                    })}
                </div>

                {/* Dynamic Step Content */}
                <div className="min-h-[400px]">
                    {step === 1 && (
                        <PackageSelection
                            selectedPackage={selectedPackage}
                            onSelect={handlePackageSelect}
                            basePrice={agency.priceRangeMin}
                        />
                    )}

                    {step === 2 && (
                        <EventDetails
                            date={eventDate}
                            setDate={setEventDate}
                            guests={guests}
                            setGuests={setGuests}
                            venue={venue}
                            setVenue={setVenue}
                        />
                    )}

                    {step === 3 && (
                        <div className={cn(isSubmitting && "opacity-50 pointer-events-none")}>
                            <PaymentForm
                                subtotal={packagePrice}
                                onPaymentComplete={handlePaymentComplete}
                            />
                            {isSubmitting && (
                                <div className="flex justify-center mt-4">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-saffron"></div>
                                    <span className="ml-2 text-saffron font-bold">Processing...</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Navigation Buttons */}
                {step < 3 && (
                    <div className="flex justify-end mt-8 border-t border-zinc-200 dark:border-zinc-800 pt-6">
                        {step > 1 && (
                            <button
                                onClick={prevStep}
                                className="px-6 py-2 rounded-lg font-medium text-zinc-500 hover:text-foreground mr-auto"
                            >
                                Back
                            </button>
                        )}

                        <button
                            onClick={nextStep}
                            disabled={step === 1 && !selectedPackage}
                            className="flex items-center gap-2 bg-foreground text-background px-8 py-3 rounded-xl font-bold hover:bg-zinc-800 dark:hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            Continue <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                )}

            </main>
        </div>
    );
}
