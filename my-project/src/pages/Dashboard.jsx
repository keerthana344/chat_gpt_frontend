import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ name: 'User', email: '' });

    useEffect(() => {
        // Dashboard is now public
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        navigate('/login');
    };

    const stats = [
        { label: 'TOTAL PROJECTS', value: '12', icon: '📁', bg: 'bg-blue-100', color: 'text-blue-600' },
        { label: 'ACTIVE TASKS', value: '5', icon: '⚡', bg: 'bg-green-100', color: 'text-green-600' },
        { label: 'MESSAGES', value: '3', icon: '🟪', bg: 'bg-purple-100', color: 'text-purple-600' },
        { label: 'CREDITS', value: '450', icon: '💎', bg: 'bg-orange-100', color: 'text-orange-600' },
    ];

    const activities = [
        { id: 1, text: 'Logged in from a new device', time: '2 mins ago' },
        { id: 2, text: 'Completed "Project Alpha" milestones', time: '1 hour ago' },
        { id: 3, text: 'Password changed successfully', time: 'Yesterday' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <aside className="w-64 bg-[#1a1a1a] text-white flex flex-col fixed top-0 left-0 bottom-0 z-40">
                <div className="p-8 text-2xl font-black border-b border-white/5 flex items-center gap-3">
                    <span className="text-3xl">🚀</span> DashVite
                </div>
                <nav className="flex-grow p-4 space-y-2 mt-6">
                    <Link to="/dashboard" className="block px-6 py-3 rounded-xl bg-indigo-600/10 text-indigo-400 font-bold border border-indigo-600/20">Dashboard</Link>
                    <Link to="/chat" className="flex items-center gap-3 px-6 py-3 rounded-xl hover:bg-white/5 transition text-gray-400 hover:text-white group">
                        <span className="w-2 h-2 bg-indigo-500 rounded-full group-hover:animate-pulse"></span>
                        Ask AI
                    </Link>
                    <a href="#" className="block px-6 py-3 rounded-xl hover:bg-white/5 transition text-gray-400 hover:text-white">Analytics</a>
                    <a href="#" className="block px-6 py-3 rounded-xl hover:bg-white/5 transition text-gray-400 hover:text-white">Settings</a>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-grow p-10 ml-64 mt-16 bg-[#f8fafc]/50">
                <header className="mb-12">
                    <h1 className="text-5xl font-black text-slate-900 mb-3 tracking-tight">Welcome Back, User!</h1>
                    <p className="text-xl text-slate-500 font-medium">Here's what's happening with your workspace today.</p>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6">
                            <div className={`${stat.bg} ${stat.color} w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-bold`}>
                                {stat.icon}
                            </div>
                            <div>
                                <p className="text-sm text-gray-400 font-bold uppercase tracking-wider mb-1">{stat.label}</p>
                                <p className="text-3xl font-black text-gray-900">{stat.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Recent Activity */}
                    <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 p-10">
                        <h3 className="text-2xl font-black text-gray-900 mb-8">Recent Activity</h3>
                        <div className="space-y-10">
                            {activities.map(activity => (
                                <div key={activity.id} className="flex gap-6 items-start">
                                    <div className="w-3 h-3 rounded-full bg-blue-600 mt-2.5"></div>
                                    <div>
                                        <p className="text-xl font-bold text-gray-900">{activity.text}</p>
                                        <p className="text-base text-gray-400 mt-1">{activity.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* AI Insights - New Section */}
                    <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl shadow-xl p-10 text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="text-2xl font-black mb-4">AI Power Insights</h3>
                            <p className="text-indigo-100 mb-8 text-lg font-medium leading-relaxed">
                                Your productivity is up 24% this week. Ask AI to analyze your recent project performance.
                            </p>
                            <Link
                                to="/chat"
                                className="inline-flex items-center gap-3 px-8 py-3 bg-white text-indigo-600 rounded-2xl font-bold hover:bg-indigo-50 transition-colors shadow-lg"
                            >
                                Start Chatting
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                            </Link>
                        </div>
                        {/* Decorative background element */}
                        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    </div>

                    {/* Quick Tools */}
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-10">
                        <h3 className="text-2xl font-black text-slate-900 mb-8 font-display tracking-tight">Quick Tools</h3>
                        <div className="space-y-4">
                            <button className="w-full flex items-center justify-between p-5 rounded-2xl border border-slate-100 hover:border-indigo-100 hover:bg-slate-50 transition-all font-bold text-slate-700">
                                <span className="flex items-center gap-4">📊 Generate Report</span>
                            </button>
                            <button className="w-full flex items-center justify-between p-5 rounded-2xl border border-slate-100 hover:border-indigo-100 hover:bg-slate-50 transition-all font-bold text-slate-700">
                                <span className="flex items-center gap-4">🛠️ Account Audit</span>
                            </button>
                            <button className="w-full flex items-center justify-between p-5 rounded-2xl border border-slate-100 hover:border-indigo-100 hover:bg-slate-50 transition-all font-bold text-slate-700">
                                <span className="flex items-center gap-4">🔑 Security Check</span>
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;

