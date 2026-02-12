import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Successfully logged in!');
                localStorage.setItem('access_token', data.access_token);
                localStorage.setItem('user_id', data.user_id);
                setTimeout(() => navigate('/dashboard'), 1500);
            } else {
                setMessage(`Error: ${data.detail || 'Invalid credentials'}`);
            }
        } catch (error) {
            setMessage('Error connecting to server. Please try again.');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-20 bg-[#f8fafc] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex justify-center mb-8">
                    <div className="h-16 w-16 bg-indigo-600 rounded-3xl flex items-center justify-center shadow-xl transform rotate-12 hover:rotate-0 transition-transform duration-500">
                        <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                </div>
                <h2 className="text-center text-4xl font-black text-slate-900 tracking-tight">
                    Welcome Back
                </h2>
                <p className="mt-2 text-center text-slate-500 font-medium">
                    Continue your journey with DashVite AI
                </p>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="modern-card p-10 bg-white/80 backdrop-blur-xl">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Email address</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full px-5 py-4 border border-slate-200 rounded-2xl bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all placeholder-slate-400 font-medium"
                                placeholder="name@example.com"
                            />
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-sm font-bold text-slate-700">Password</label>
                                <a href="#" className="text-sm font-bold text-indigo-600 hover:text-indigo-500">Forgot?</a>
                            </div>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full px-5 py-4 border border-slate-200 rounded-2xl bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all placeholder-slate-400 font-medium"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center py-4 px-4 border border-transparent rounded-2xl shadow-xl text-lg font-black text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all transform hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : 'Sign In'}
                        </button>
                    </form>

                    {message && (
                        <div className={`mt-6 p-4 rounded-xl text-sm font-bold flex items-center gap-3 ${message.includes('Error') ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-green-50 text-green-600 border border-green-100'
                            } animate-in fade-in zoom-in duration-300`}>
                            {message.includes('Error') ? '❌' : '✅'} {message}
                        </div>
                    )}

                    <div className="mt-8 flex items-center justify-between">
                        <div className="w-full h-px bg-slate-100"></div>
                        <span className="px-4 text-slate-400 text-xs font-bold whitespace-nowrap uppercase tracking-widest">Or continue with</span>
                        <div className="w-full h-px bg-slate-100"></div>
                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center gap-3 px-4 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all font-bold text-slate-700">
                            <span className="text-xl">G</span> Google
                        </button>
                        <button className="flex items-center justify-center gap-3 px-4 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all font-bold text-slate-700">
                            <span className="text-xl">🐱</span> GitHub
                        </button>
                    </div>
                </div>

                <p className="mt-10 text-center text-slate-600 font-medium">
                    New to DashVite?{' '}
                    <Link to="/signup" className="font-black text-indigo-600 hover:text-indigo-500 underline underline-offset-4">
                        Create an account
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;