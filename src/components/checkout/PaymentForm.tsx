"use client";

import { CreditCard, Wallet, ShieldCheck, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaymentFormProps {
    subtotal: number;
    onPaymentComplete: () => void;
}

export function PaymentForm({ subtotal, onPaymentComplete }: PaymentFormProps) {
    const gst = subtotal * 0.18;
    const total = subtotal + gst;
    const deposit = total * 0.25;

    return (
        <div className="animate-in slide-in-from-right-4 duration-500 max-w-2xl mx-auto">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold">Secure Payment</h2>
                <p className="text-zinc-500">Confirm your booking with a deposit</p>
            </div>

            <div className="grid gap-6">
                {/* Invoice Summary */}
                <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-6 border border-zinc-200 dark:border-zinc-800">
                    <h3 className="font-semibold mb-4 text-lg border-b border-dashed border-zinc-300 pb-2">Booking Summary</h3>

                    <div className="flex justify-between py-2 text-zinc-600">
                        <span>Package Subtotal</span>
                        <span>₹{subtotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between py-2 text-zinc-600">
                        <span>GST (18%)</span>
                        <span>₹{gst.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between py-3 font-bold text-xl border-t border-zinc-200 mt-2">
                        <span>Total Estimate</span>
                        <span>₹{total.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="bg-saffron/10 rounded-lg p-4 mt-4 flex justify-between items-center border border-saffron/20 text-saffron-dark">
                        <div>
                            <span className="block text-xs font-bold uppercase tracking-wider">Pay 25% Deposit to Confirm</span>
                            <span className="text-2xl font-bold">₹{deposit.toLocaleString('en-IN')}</span>
                        </div>
                        <ShieldCheck className="w-8 h-8 opacity-50" />
                    </div>
                </div>

                {/* Payment Methods */}
                <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-6 border border-zinc-200 dark:border-zinc-800 space-y-4">
                    <h3 className="font-semibold mb-2">Select Payment Method</h3>

                    <div className={cn(
                        "flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all",
                        "border-saffron bg-saffron/5"
                    )}>
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center p-1 shadow-sm">
                            <Smartphone className="text-blue-600" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold">UPI / QR Code</h4>
                            <p className="text-xs text-zinc-500">Google Pay, PhonePe, Paytm</p>
                        </div>
                        <div className="w-5 h-5 rounded-full border-2 border-saffron flex items-center justify-center">
                            <div className="w-2.5 h-2.5 bg-saffron rounded-full" />
                        </div>
                    </div>

                    <div className={cn(
                        "flex items-center gap-4 p-4 rounded-xl border border-zinc-200 cursor-pointer opacity-60 hover:opacity-100"
                    )}>
                        <CreditCard className="w-6 h-6 ml-2 text-zinc-500" />
                        <div className="flex-1 ml-2">
                            <h4 className="font-medium">Credit / Debit Card</h4>
                            <p className="text-xs text-zinc-500">Visa, Mastercard, Rupay</p>
                        </div>
                    </div>

                    <div className={cn(
                        "flex items-center gap-4 p-4 rounded-xl border border-zinc-200 cursor-pointer opacity-60 hover:opacity-100"
                    )}>
                        <Wallet className="w-6 h-6 ml-2 text-zinc-500" />
                        <div className="flex-1 ml-2">
                            <h4 className="font-medium">Net Banking</h4>
                            <p className="text-xs text-zinc-500">All Indian Banks</p>
                        </div>
                    </div>

                    <button
                        onClick={onPaymentComplete}
                        className="w-full mt-4 bg-gradient-to-r from-saffron to-gold text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-saffron/25 active:scale-95 transition-all text-lg flex items-center justify-center gap-2"
                    >
                        <ShieldCheck className="w-5 h-5" />
                        Secure Pay ₹{deposit.toLocaleString('en-IN')}
                    </button>

                    <p className="text-xs text-center text-zinc-400 mt-2">
                        Payments are held in Planify Escrow until booking is verified.
                    </p>
                </div>
            </div>
        </div>
    );
}
