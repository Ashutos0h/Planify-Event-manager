"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Paperclip, MoreVertical, Phone, Video } from "lucide-react";

interface Message {
    id: string;
    sender: "user" | "agency";
    content: string;
    timestamp: string;
}

interface ChatWindowProps {
    agencyName: string;
    agencyAvatar?: string;
}

export function ChatWindow({ agencyName, agencyAvatar }: ChatWindowProps) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            sender: "agency",
            content: "Hello! Thank you for your interest in our services. How can we help you plan your event?",
            timestamp: "10:30 AM"
        },
        {
            id: "2",
            sender: "user",
            content: "Hi! I'm planning a wedding for March 2025. Can you help with venue and catering?",
            timestamp: "10:32 AM"
        },
        {
            id: "3",
            sender: "agency",
            content: "Absolutely! We'd love to help. Do you have a specific location in mind?",
            timestamp: "10:33 AM"
        }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            sender: "user",
            content: inputValue,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages([...messages, newMessage]);
        setInputValue("");

        // Simulate agency typing
        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);
            const response: Message = {
                id: (Date.now() + 1).toString(),
                sender: "agency",
                content: "Thank you for your message! Our team will get back to you shortly with more details.",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages((prev) => [...prev, response]);
        }, 2000);
    };

    return (
        <div className="flex flex-col h-full">
            {/* Chat Header */}
            <div className="glass border-b border-white/10 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-saffron to-gold flex items-center justify-center text-white font-bold overflow-hidden">
                        {agencyAvatar ? (
                            <img src={agencyAvatar} alt={agencyName} className="w-full h-full object-cover" />
                        ) : (
                            agencyName.charAt(0)
                        )}
                    </div>
                    <div>
                        <h3 className="font-bold">{agencyName}</h3>
                        <p className="text-xs text-green-500">● Online</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="w-9 h-9 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-center transition-colors">
                        <Phone className="w-4 h-4" />
                    </button>
                    <button className="w-9 h-9 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-center transition-colors">
                        <Video className="w-4 h-4" />
                    </button>
                    <button className="w-9 h-9 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-center transition-colors">
                        <MoreVertical className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                        <div
                            className={`max-w-[70%] rounded-2xl px-4 py-2 ${message.sender === "user"
                                ? "bg-gradient-to-r from-saffron to-gold text-white"
                                : "glass border border-white/10"
                                }`}
                        >
                            <p className="text-sm">{message.content}</p>
                            <p className={`text-xs mt-1 ${message.sender === "user" ? "text-white/70" : "text-zinc-500"}`}>
                                {message.timestamp}
                            </p>
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div className="flex justify-start">
                        <div className="glass border border-white/10 rounded-2xl px-4 py-3">
                            <div className="flex gap-1">
                                <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="glass border-t border-white/10 p-4">
                <div className="flex items-center gap-2">
                    <button className="w-10 h-10 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-center transition-colors">
                        <Paperclip className="w-5 h-5 text-zinc-500" />
                    </button>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSend()}
                        placeholder="Type a message..."
                        className="flex-1 bg-zinc-100 dark:bg-zinc-800 border-none rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-saffron"
                    />
                    <button
                        onClick={handleSend}
                        className="w-10 h-10 rounded-full bg-gradient-to-r from-saffron to-gold text-white flex items-center justify-center hover:shadow-lg transition-all active:scale-95"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
