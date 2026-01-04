"use client";

import { ChatWindow } from "@/components/ChatWindow";
import { Search, MessageCircle } from "lucide-react";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

// Mock conversations
const CONVERSATIONS = [
    {
        id: "1",
        agencyName: "Royal Heritage Weddings",
        lastMessage: "We'd love to help with your wedding!",
        timestamp: "2m ago",
        unread: 2,
        avatar: "R"
    },
    {
        id: "2",
        agencyName: "Urban Events Pro",
        lastMessage: "Thanks for reaching out. When is your event?",
        timestamp: "1h ago",
        unread: 0,
        avatar: "U"
    },
    {
        id: "3",
        agencyName: "Goa Vibes Planners",
        lastMessage: "Perfect! We have availability for that date.",
        timestamp: "3h ago",
        unread: 1,
        avatar: "G"
    }
];

function ChatPageContent() {
    const searchParams = useSearchParams();
    const agencyId = searchParams.get("agencyId");
    const agencyName = searchParams.get("agencyName");

    const [conversations, setConversations] = useState(CONVERSATIONS);
    const [selectedChat, setSelectedChat] = useState<any>(CONVERSATIONS[0]);

    useEffect(() => {
        if (agencyId && agencyName) {
            // Check if chat exists
            const existing = conversations.find(c => c.id === agencyId);
            if (existing) {
                setSelectedChat(existing);
            } else {
                // Create temp new chat
                const newChat = {
                    id: agencyId,
                    agencyName: decodeURIComponent(agencyName),
                    lastMessage: "Start a conversation...",
                    timestamp: "Just now",
                    unread: 0,
                    avatar: agencyName.charAt(0)
                };
                setConversations([newChat, ...conversations]);
                setSelectedChat(newChat);
            }
        }
    }, [agencyId, agencyName]);

    return (
        <div className="h-screen bg-background text-foreground font-sans flex flex-col">
            {/* Header */}
            <header className="glass border-b border-white/10 px-6 lg:px-12 h-16 flex items-center justify-between flex-shrink-0">
                <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <div className="w-8 h-8 bg-gradient-to-br from-saffron to-gold rounded-lg flex items-center justify-center text-white font-bold">P</div>
                    <span className="text-xl font-bold tracking-tight">Planify</span>
                    <span className="text-sm text-zinc-500 ml-2">Messages</span>
                </Link>
            </header>

            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar - Conversation List */}
                <aside className="w-80 border-r border-white/10 glass flex flex-col">
                    <div className="p-4 border-b border-white/10">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                            <input
                                type="text"
                                placeholder="Search conversations..."
                                className="w-full pl-10 pr-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 border-none text-sm outline-none focus:ring-2 focus:ring-saffron"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {conversations.map((conv) => (
                            <button
                                key={conv.id}
                                onClick={() => setSelectedChat(conv)}
                                className={`w-full p-4 flex items-start gap-3 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors border-b border-white/5 ${selectedChat?.id === conv.id ? "bg-zinc-50 dark:bg-zinc-800/50" : ""
                                    }`}
                            >
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-saffron to-gold flex items-center justify-center text-white font-bold flex-shrink-0">
                                    {conv.avatar}
                                </div>
                                <div className="flex-1 text-left overflow-hidden">
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className="font-bold text-sm truncate">{conv.agencyName}</h3>
                                        <span className="text-xs text-zinc-500">{conv.timestamp}</span>
                                    </div>
                                    <p className="text-sm text-zinc-500 truncate">{conv.lastMessage}</p>
                                </div>
                                {conv.unread > 0 && (
                                    <div className="w-5 h-5 rounded-full bg-saffron text-white text-xs flex items-center justify-center font-bold flex-shrink-0">
                                        {conv.unread}
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </aside>

                {/* Main Chat Area */}
                <main className="flex-1 flex flex-col">
                    {selectedChat ? (
                        <ChatWindow key={selectedChat.id} agencyName={selectedChat.agencyName} />
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                            <div className="w-20 h-20 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4">
                                <MessageCircle className="w-10 h-10 text-zinc-400" />
                            </div>
                            <h2 className="text-xl font-bold mb-2">No conversation selected</h2>
                            <p className="text-zinc-500">Choose a conversation from the sidebar to start chatting</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default function ChatPage() {
    return (
        <Suspense fallback={<div>Loading chats...</div>}>
            <ChatPageContent />
        </Suspense>
    );
}
