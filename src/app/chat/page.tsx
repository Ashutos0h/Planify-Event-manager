"use client";

import { ChatWindow } from "@/components/ChatWindow";
import { Search, MessageCircle } from "lucide-react";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface Conversation {
    id: string;
    agency?: { name: string; imageUrl: string };
    user?: { name: string; image?: string | null };
    messages: { content: string; createdAt: string }[];
}

function ChatPageContent() {
    const { data: session } = useSession();
    const searchParams = useSearchParams();
    const router = useRouter();
    const agencyIdParam = searchParams.get("agencyId");

    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedChat, setSelectedChat] = useState<Conversation | null>(null);
    const [loading, setLoading] = useState(true);

    // Fetch Conversations
    useEffect(() => {
        if (!session) return;

        const fetchConversations = async () => {
            try {
                const res = await fetch("/api/chat");
                if (res.ok) {
                    const data = await res.json();
                    setConversations(data);
                }
            } catch (error) {
                console.error("Failed to fetch conversations", error);
            } finally {
                setLoading(false);
            }
        };

        fetchConversations();
    }, [session]);

    // Handle initial selection from URL (e.g. "Message Agency" button)
    useEffect(() => {
        if (!agencyIdParam || loading) return;

        const initChat = async () => {
            // Check if we already have a conversation with this agency
            // Note: In a real app, strict checking might need more robust logic
            // But for now, we rely on the API to find/create based on agencyId

            try {
                // Call create/get endpoint
                const res = await fetch("/api/chat", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ agencyId: agencyIdParam })
                });

                if (res.ok) {
                    const conversation = await res.json();
                    // Refetch list to include this new one if needed, or just select it
                    // Ideally we should add it to the list if not present

                    const exists = conversations.find(c => c.id === conversation.id);
                    if (!exists) {
                        // We need to fetch the full object again to get the included 'agency' details
                        // Or we can manually construct it if we trust the params, but fetching list again is safer
                        const listRes = await fetch("/api/chat");
                        if (listRes.ok) {
                            const list = await listRes.json();
                            setConversations(list);
                            const updated = list.find((c: any) => c.id === conversation.id);
                            if (updated) setSelectedChat(updated);
                        }
                    } else {
                        setSelectedChat(exists);
                    }
                }
            } catch (error) {
                console.error("Failed to init chat", error);
            }
        };

        initChat();
    }, [agencyIdParam, loading]);

    const getChatName = (conv: Conversation) => {
        // If I am user, show Agency name. If I am agency, show User name.
        // Simplified: check which one exists and is not me.
        // Since we include conditionally in API:
        // User fetching sees 'agency'. Agency fetching sees 'user'.
        return conv.agency?.name || conv.user?.name || "Unknown";
    };

    const getChatAvatar = (conv: Conversation) => {
        return conv.agency?.imageUrl || conv.user?.image; // or undefined
    };

    const getLastMessage = (conv: Conversation) => {
        if (conv.messages && conv.messages.length > 0) {
            return conv.messages[0].content;
        }
        return "No messages yet";
    };

    const getTime = (conv: Conversation) => {
        if (conv.messages && conv.messages.length > 0) {
            // Simple logic for now
            return new Date(conv.messages[0].createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
        return "";
    };

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
                        {loading ? (
                            <div className="p-4 text-center text-zinc-500 text-sm">Loading chats...</div>
                        ) : conversations.length === 0 ? (
                            <div className="p-4 text-center text-zinc-500 text-sm">No conversations yet.</div>
                        ) : (
                            conversations.map((conv) => (
                                <button
                                    key={conv.id}
                                    onClick={() => setSelectedChat(conv)}
                                    className={`w-full p-4 flex items-start gap-3 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors border-b border-white/5 ${selectedChat?.id === conv.id ? "bg-zinc-50 dark:bg-zinc-800/50" : ""
                                        }`}
                                >
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-saffron to-gold flex items-center justify-center text-white font-bold flex-shrink-0 overflow-hidden">
                                        {getChatAvatar(conv) ? (
                                            <span className="text-xs">{getChatAvatar(conv)}</span> // Placeholder for real image tag if URL valid
                                        ) : (
                                            getChatName(conv).charAt(0)
                                        )}
                                    </div>
                                    <div className="flex-1 text-left overflow-hidden">
                                        <div className="flex items-center justify-between mb-1">
                                            <h3 className="font-bold text-sm truncate">{getChatName(conv)}</h3>
                                            <span className="text-xs text-zinc-500">{getTime(conv)}</span>
                                        </div>
                                        <p className="text-sm text-zinc-500 truncate">{getLastMessage(conv)}</p>
                                    </div>
                                </button>
                            ))
                        )}
                    </div>
                </aside>

                {/* Main Chat Area */}
                <main className="flex-1 flex flex-col">
                    {selectedChat ? (
                        <ChatWindow
                            key={selectedChat.id}
                            conversationId={selectedChat.id}
                            agencyName={getChatName(selectedChat)}
                            agencyAvatar={getChatAvatar(selectedChat) || undefined}
                        />
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
