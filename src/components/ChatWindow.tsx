"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Paperclip, MoreVertical, Phone, Video } from "lucide-react";
import { useSession } from "next-auth/react";

interface Message {
    id: string;
    senderRole: "USER" | "AGENCY";
    content: string;
    timestamp: string;
    createdAt: string;
}

interface ChatWindowProps {
    conversationId: string;
    agencyName: string;
    agencyAvatar?: string;
}

export function ChatWindow({ conversationId, agencyName, agencyAvatar }: ChatWindowProps) {
    const { data: session } = useSession();
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Fetch Messages & Poll
    useEffect(() => {
        if (!conversationId) return;

        const fetchMessages = async () => {
            try {
                const res = await fetch(`/api/chat/${conversationId}/messages`);
                if (res.ok) {
                    const data = await res.json();
                    // Transform data if needed or just set it
                    setMessages(data);
                }
            } catch (error) {
                console.error("Failed to fetch messages", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
        const interval = setInterval(fetchMessages, 3000); // Poll every 3s
        return () => clearInterval(interval);

    }, [conversationId]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const tempData: any = {
            id: Date.now().toString(),
            senderRole: "USER", // Optimistic UI assumption, backend corrects it
            content: inputValue,
            createdAt: new Date().toISOString()
        };

        // Optimistic update (optional, but good for UX)
        // setMessages(prev => [...prev, tempData]); 
        setInputValue("");

        try {
            const res = await fetch(`/api/chat/${conversationId}/messages`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: tempData.content })
            });

            if (res.ok) {
                // If successful, the polling will pick it up, or we can manually append the real response
                const newMessage = await res.json();
                setMessages((prev) => [...prev, newMessage]);
            }
        } catch (error) {
            console.error("Failed to send message", error);
        }
    };

    const formatTime = (dateStr: string) => {
        return new Date(dateStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const isUserSender = (role: string) => {
        // If current user is agency owner, then their sent messages are AGENCY role
        // If current user is normal user, then their sent messages are USER role
        // This logic depends on what visual side we want.
        // Simpler: If I am logged in as Agency, "AGENCY" messages are ME (Right side).

        const isAgencyUser = (session?.user as any)?.role === "AGENCY_OWNER";
        if (isAgencyUser) return role === "AGENCY";
        return role === "USER";
    };

    return (
        <div className="flex flex-col h-full">
            {/* Chat Header */}
            <div className="glass border-b border-white/10 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-saffron to-gold flex items-center justify-center text-white font-bold overflow-hidden">
                        {agencyAvatar ? (
                            <span className="text-xl">{agencyAvatar}</span>
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
                {loading ? (
                    <div className="text-center text-zinc-500 mt-10">Loading messages...</div>
                ) : messages.map((message) => {
                    const isMe = isUserSender(message.senderRole);
                    return (
                        <div
                            key={message.id}
                            className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`max-w-[70%] rounded-2xl px-4 py-2 ${isMe
                                    ? "bg-gradient-to-r from-saffron to-gold text-white"
                                    : "glass border border-white/10"
                                    }`}
                            >
                                <p className="text-sm">{message.content}</p>
                                <p className={`text-xs mt-1 ${isMe ? "text-white/70" : "text-zinc-500"}`}>
                                    {formatTime(message.createdAt)}
                                </p>
                            </div>
                        </div>
                    );
                })}
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
