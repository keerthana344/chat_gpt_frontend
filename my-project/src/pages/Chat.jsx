import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Chat = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialQuery = queryParams.get('q');
    const isLoggedIn = !!localStorage.getItem('access_token');

    const [userId, setUserId] = useState(localStorage.getItem('user_id'));
    const [messages, setMessages] = useState([]);
    const [history, setHistory] = useState([]);
    const [historyLoading, setHistoryLoading] = useState(false);
    const [historyError, setHistoryError] = useState(null);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const scrollRef = useRef(null);
    const messageRefs = useRef({});

    const scrollToMessage = (id) => {
        const element = messageRefs.current[id];
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            // Add a brief highlight effect
            element.classList.add('ring-2', 'ring-indigo-400', 'ring-offset-2');
            setTimeout(() => {
                element.classList.remove('ring-2', 'ring-indigo-400', 'ring-offset-2');
            }, 2000);
        }
    };

    useEffect(() => {
        const syncUserAndFetchHistory = async () => {
            const token = localStorage.getItem('access_token');
            let currentUserId = userId;

            // 1. Sync User ID if missing but token exists
            if (token && !currentUserId) {
                try {
                    console.log("Syncing user profile...");
                    const profileRes = await fetch('http://127.0.0.1:8000/users/me', {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    if (profileRes.ok) {
                        const profile = await profileRes.json();
                        console.log("Profile synced:", profile);
                        localStorage.setItem('user_id', profile.id);
                        setUserId(profile.id);
                        currentUserId = profile.id;
                    } else {
                        console.warn("Profile sync failed with status:", profileRes.status);
                    }
                } catch (err) {
                    console.error("Profile sync error:", err);
                }
            }

            // 2. Fetch History if we have a user ID
            if (isLoggedIn && currentUserId) {
                setHistoryLoading(true);
                setHistoryError(null);
                try {
                    console.log(`Fetching history for user: ${currentUserId}`);
                    const response = await fetch(`http://127.0.0.1:8000/history/${currentUserId}`);
                    if (response.ok) {
                        const data = await response.json();
                        console.log("History fetched:", data.length, "messages");
                        setHistory(data);
                        setMessages(data.map(m => ({
                            id: m.id,
                            text: m.message,
                            sender: m.sender
                        })));
                    } else {
                        const errData = await response.json();
                        setHistoryError(`Failed to load history: ${errData.detail || response.statusText}`);
                    }
                } catch (error) {
                    console.error("History fetch error:", error);
                    setHistoryError("Cannot connect to history server.");
                } finally {
                    setHistoryLoading(false);
                }
            }

            // 3. Set default message if no history after fetch
            setMessages(prev => {
                if (prev.length === 0) {
                    return [{ id: 'welcome', text: "Hello! I'm your AI assistant. How can I help you today?", sender: 'ai' }];
                }
                return prev;
            });

            if (initialQuery) {
                handleSendMessage(initialQuery);
            }
        };

        syncUserAndFetchHistory();
    }, [isLoggedIn, userId === null, initialQuery]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSendMessage = async (text = input) => {
        if (!text.trim()) return;

        const userMessage = { id: Date.now(), text, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        try {
            const response = await fetch('http://127.0.0.1:8000/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: text,
                    user_id: userId ? parseInt(userId) : null
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to get response from AI');
            }

            const data = await response.json();

            const aiMessage = {
                id: Date.now() + 1,
                text: data.response,
                sender: 'ai'
            };
            setMessages(prev => [...prev, aiMessage]);

            // Refresh history list if logged in
            if (isLoggedIn && userId) {
                const histRes = await fetch(`http://127.0.0.1:8000/history/${userId}`);
                if (histRes.ok) {
                    const histData = await histRes.json();
                    setHistory(histData);
                }
            }
        } catch (error) {
            console.error('AI Error:', error);
            const errorMessage = {
                id: Date.now() + 1,
                text: "I'm sorry, I'm having trouble connecting to my brain right now. Please make sure the backend server is running and try again.",
                sender: 'ai'
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    // Filter user messages for history sidebar (as conversation starters)
    const historyStarters = history.filter(m => m.sender === 'user').reverse().slice(0, 15);

    return (
        <div className="min-h-screen bg-white flex pt-16 overflow-hidden">
            {/* Sidebar - History */}
            <div className={`${isSidebarOpen ? 'w-72' : 'w-0'} bg-slate-50 border-r border-slate-200 transition-all duration-300 flex flex-col overflow-hidden`}>
                <div className="p-6 flex justify-between items-center bg-white border-b border-slate-100">
                    <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
                        <span className="text-indigo-600">🕒</span> History
                    </h2>
                    <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-slate-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                <div className="flex-grow overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-slate-200">
                    {!isLoggedIn ? (
                        <div className="p-5 bg-indigo-50 border border-indigo-100 rounded-3xl text-center">
                            <p className="text-sm font-black text-indigo-700 mb-2">Login Required</p>
                            <p className="text-xs text-indigo-600/70 mb-4 leading-relaxed">Sign in to see your previous conversations and searches.</p>
                            <Link to="/login" className="block w-full py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-black hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">Sign In</Link>
                        </div>
                    ) : historyLoading ? (
                        <div className="text-center py-20 animate-pulse">
                            <div className="w-8 h-8 bg-indigo-200 rounded-full mx-auto mb-4"></div>
                            <p className="text-xs font-bold text-slate-400">Loading history...</p>
                        </div>
                    ) : historyError ? (
                        <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-center">
                            <p className="text-xs font-bold text-red-600 mb-2">Oops!</p>
                            <p className="text-[10px] text-red-500 mb-3">{historyError}</p>
                            <button onClick={() => window.location.reload()} className="text-[10px] font-black text-white bg-red-500 px-3 py-1.5 rounded-lg hover:bg-red-600 transition-colors">Retry</button>
                        </div>
                    ) : historyStarters.length === 0 ? (
                        <div className="text-center py-20 opacity-30">
                            <span className="text-5xl block mb-4">💬</span>
                            <p className="text-sm font-black">No history found</p>
                            <p className="text-[10px] mt-2">Start chatting to save history</p>
                        </div>
                    ) : (
                        historyStarters.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToMessage(item.id)}
                                className="w-full text-left p-3.5 rounded-2xl hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 border border-transparent hover:border-slate-100 transition-all group flex items-start gap-3 active:scale-95"
                            >
                                <span className="text-indigo-400 group-hover:text-indigo-600 transition-colors mt-1 text-xs">●</span>
                                <div className="flex-1 overflow-hidden">
                                    <span className="text-sm text-slate-700 font-bold truncate block group-hover:text-indigo-600 transition-colors">{item.message}</span>
                                    <span className="text-[10px] text-slate-400 font-medium">Click to view</span>
                                </div>
                            </button>
                        ))
                    )}
                </div>

                {isLoggedIn && (
                    <div className="p-4 border-t border-slate-200 bg-white">
                        <button
                            onClick={() => window.location.reload()}
                            className="w-full py-3 px-4 bg-slate-900 text-white rounded-2xl text-xs font-black hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-slate-200 active:scale-95"
                        >
                            <span className="text-lg font-bold">+</span> New Conversation
                        </button>
                    </div>
                )}
            </div>

            {/* Content Area */}
            <div className="flex-1 flex flex-col relative h-[calc(100vh-64px)] overflow-hidden bg-slate-50/20">
                {/* Sidebar Toggle Buttons */}
                {!isSidebarOpen && (
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="absolute left-6 top-6 z-40 p-3 bg-white border border-slate-200 rounded-2xl shadow-xl hover:bg-slate-50 transition-all active:scale-90 group"
                        title="Show History"
                    >
                        <svg className="w-6 h-6 text-slate-500 group-hover:text-indigo-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
                    </button>
                )}

                <div className="flex-grow max-w-4xl w-full mx-auto p-4 md:p-8 flex flex-col overflow-hidden">
                    <div
                        ref={scrollRef}
                        className="flex-grow overflow-y-auto space-y-8 pr-4 -mr-4 mb-6 scrollbar-thin scrollbar-thumb-slate-200 scroll-smooth"
                    >
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                ref={el => messageRefs.current[msg.id] = el}
                                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-4 duration-500`}
                            >
                                <div className={`max-w-[95%] md:max-w-[85%] p-6 rounded-[2rem] shadow-sm transition-all duration-500 ${msg.sender === 'user'
                                    ? 'bg-indigo-600 text-white rounded-tr-none shadow-xl shadow-indigo-100/50 border border-indigo-500/20'
                                    : 'bg-white text-slate-800 border border-slate-200/50 rounded-tl-none shadow-sm'
                                    }`}>
                                    <div className="prose prose-slate max-w-none prose-p:leading-relaxed prose-pre:bg-slate-900 prose-pre:text-white prose-pre:rounded-2xl prose-code:text-indigo-600 prose-code:bg-indigo-50/80 prose-code:px-2 prose-code:py-0.5 prose-code:rounded-md prose-code:font-bold prose-code:before:content-none prose-code:after:content-none">
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                            {msg.text}
                                        </ReactMarkdown>
                                    </div>
                                    <div className={`mt-3 text-[10px] font-black uppercase tracking-widest opacity-40 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                                        {msg.sender === 'user' ? 'Verified Search' : 'DashVite AI Response'}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start animate-pulse">
                                <div className="bg-white border border-slate-100 p-4 rounded-3xl rounded-tl-none shadow-sm">
                                    <div className="flex gap-1.5">
                                        <div className="w-2 h-2 bg-indigo-200 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-indigo-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                                        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="relative">
                        {!isLoggedIn && (
                            <div className="mb-4 p-4 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-between animate-in fade-in slide-in-from-bottom-2 duration-500 shadow-sm">
                                <p className="text-sm font-bold text-indigo-700">
                                    <span className="mr-2">💾</span>
                                    Sign in to save your chat history and unlock persistent AI memory.
                                </p>
                                <div className="flex gap-3">
                                    <Link to="/login" className="text-sm font-black text-indigo-600 hover:text-indigo-800 transition-colors">Sign In</Link>
                                    <Link to="/signup" className="text-sm font-black text-white bg-indigo-600 px-4 py-1.5 rounded-lg hover:bg-indigo-700 transition-colors">Join</Link>
                                </div>
                            </div>
                        )}
                        <div className="glass p-2 rounded-2xl flex items-center gap-2 pr-4 shadow-xl border border-slate-200 bg-white ring-1 ring-slate-200">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                placeholder="Ask me anything..."
                                className="flex-1 bg-transparent border-none outline-none px-4 py-3 text-slate-700 placeholder-slate-400 text-lg"
                            />
                            <button
                                onClick={() => handleSendMessage()}
                                disabled={!input.trim() || isTyping}
                                className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-200 active:scale-95"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
                        </div>
                        <p className="text-center text-xs text-slate-400 mt-4 font-medium">
                            DashVite AI is powered by Gemini. <span className="hidden md:inline">Check important info.</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;
