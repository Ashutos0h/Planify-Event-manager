"use client"

import { useEffect, useState } from "react"

type ToastType = "success" | "error" | "info"

interface Toast {
    id: string
    message: string
    type: ToastType
}

let listeners: ((toasts: Toast[]) => void)[] = []
let memoryToasts: Toast[] = []

function notify() {
    listeners.forEach((listener) => listener([...memoryToasts]))
}

export const toast = {
    success: (message: string) => {
        const id = Math.random().toString(36).substring(2, 9)
        memoryToasts.push({ id, message, type: "success" })
        notify()
        setTimeout(() => toast.dismiss(id), 3000)
    },
    error: (message: string) => {
        const id = Math.random().toString(36).substring(2, 9)
        memoryToasts.push({ id, message, type: "error" })
        notify()
        setTimeout(() => toast.dismiss(id), 4000)
    },
    dismiss: (id: string) => {
        memoryToasts = memoryToasts.filter((t) => t.id !== id)
        notify()
    }
}

export function Toaster() {
    const [toasts, setToasts] = useState<Toast[]>([])

    useEffect(() => {
        listeners.push(setToasts)
        return () => {
            listeners = listeners.filter((l) => l !== setToasts)
        }
    }, [])

    if (toasts.length === 0) return null

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
            {toasts.map((t) => (
                <div
                    key={t.id}
                    className={`px-4 py-3 rounded-lg shadow-lg text-white font-medium text-sm animate-in fade-in slide-in-from-right-5 ${t.type === "success" ? "bg-green-600" : t.type === "error" ? "bg-red-600" : "bg-blue-600"
                        }`}
                >
                    {t.message}
                </div>
            ))}
        </div>
    )
}
