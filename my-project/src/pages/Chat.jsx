import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const Chat = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialQuery = queryParams.get('q');

    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! I'm your AI assistant. How can I help you today?", sender: 'ai' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (initialQuery) {
            handleSendMessage(initialQuery);
        }
    }, []);

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

        // Simulate AI response
        setTimeout(() => {
            const aiMessage = {
                id: Date.now() + 1,
                text: getMockResponse(text),
                sender: 'ai'
            };
            setMessages(prev => [...prev, aiMessage]);
            setIsTyping(false);
        }, 1500);
    };

    const getMockResponse = (query) => {
        const q = query.toLowerCase();
        if (q.includes('hello') || q.includes('hi')) return "Hi there! I'm DashVite AI. Ready to boost your productivity.";
        if (q.includes('project')) return "I can help you manage your projects. You currently have 12 active projects in your dashboard.";
        if (q.includes('help')) return "I can answer questions, generate reports, or help you navigate your workspace. What do you need?";
        return "That's an interesting question! I'm currently in 'mock mode', but in a real integration, I would process this using a LLM like Gemini.";
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col pt-16">
            <div className="flex-grow max-w-4xl w-full mx-auto p-6 flex flex-col overflow-hidden">
                <div
                    ref={scrollRef}
                    className="flex-grow overflow-y-auto space-y-6 pr-2 mb-6 scrollbar-thin scrollbar-thumb-slate-200"
                >
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                        >
                            <div className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${msg.sender === 'user'
                                    ? 'bg-indigo-600 text-white rounded-tr-none'
                                    : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none'
                                }`}>
                                <p className="text-base leading-relaxed">{msg.text}</p>
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex justify-start animate-pulse">
                            <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-tl-none shadow-sm">
                                <div className="flex gap-1">
                                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="relative">
                    <div className="glass p-2 rounded-2xl flex items-center gap-2 pr-4 shadow-lg border border-slate-200 bg-white">
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
                            className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-indigo-200"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </button>
                    </div>
                    <p className="text-center text-xs text-slate-400 mt-4">
                        DashVite AI can make mistakes. Check important info.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Chat;
