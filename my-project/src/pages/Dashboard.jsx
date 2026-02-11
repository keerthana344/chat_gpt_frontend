import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ name: 'User', email: '' });

    useEffect(() => {
        // Simple authentication check
        const token = localStorage.getItem('access_token');
        if (!token) {
            navigate('/login');
        }
        // In a real app, you'd fetch user data here
    }, [navigate]);

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
            {/* Sidebar */}
            <aside className="w-64 bg-[#2e2b85] text-white flex flex-col">
                <div className="p-6 text-2xl font-bold border-b border-[#3b3a99] flex items-center gap-2">
                    <span className="text-3xl">🚀</span> DashVite
                </div>
                <nav className="flex-grow p-4 space-y-2 mt-4">
                    <a href="#" className="block px-6 py-3 rounded-xl bg-[#413fc4] text-white font-semibold">Dashboard</a>
                    <a href="#" className="block px-6 py-3 rounded-xl hover:bg-[#3b3a99] transition text-gray-300 hover:text-white">Analytics</a>
                    <a href="#" className="block px-6 py-3 rounded-xl hover:bg-[#3b3a99] transition text-gray-300 hover:text-white">Settings</a>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-grow p-10">
                <header className="mb-10">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome Back, User!</h1>
                    <p className="text-lg text-gray-500">Here is what is happening with your account today.</p>
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

                    {/* Quick Tools */}
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10">
                        <h3 className="text-2xl font-black text-gray-900 mb-8">Quick Tools</h3>
                        <div className="space-y-6">
                            <button className="w-full flex items-center justify-between p-6 rounded-2xl border border-blue-50 hover:bg-blue-50 transition font-bold text-gray-800 text-lg">
                                <span className="flex items-center gap-4">📊 Generate Report</span>
                            </button>
                            <button className="w-full flex items-center justify-between p-6 rounded-2xl border border-blue-50 hover:bg-blue-50 transition font-bold text-gray-800 text-lg">
                                <span className="flex items-center gap-4">🛠️ Account Audit</span>
                            </button>
                            <button className="w-full flex items-center justify-between p-6 rounded-2xl border border-blue-50 hover:bg-blue-50 transition font-bold text-gray-800 text-lg">
                                <span className="flex items-center gap-4">🔑 security Check</span>
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;

