import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/chat?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center px-4 pt-20">
      <div className="text-center mb-16 max-w-3xl animate-in fade-in zoom-in duration-700">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 font-bold text-sm mb-8 border border-indigo-100">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          Next-Gen Intelligence
        </div>
        <h1 className="text-6xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
          What can I help <br />
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">with today?</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-xl mx-auto font-medium">
          Experience the future of productivity with DashVite AI.
          The smartest way to manage your workspace.
        </p>
        <div className="mt-10 flex gap-4 justify-center">
          <Link
            to="/signup"
            className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-300"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="px-10 py-4 bg-white text-slate-900 border border-slate-200 rounded-2xl font-black shadow-lg hover:bg-slate-50 hover:-translate-y-1 transition-all duration-300"
          >
            Sign In
          </Link>
        </div>
      </div>

      {/* Input box */}
      <div className="w-full max-w-3xl transform hover:scale-[1.01] transition-all duration-300">
        <form onSubmit={handleSearch} className="glass p-2 rounded-[2.5rem] flex items-center shadow-2xl border border-slate-200 bg-white">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask anything about your projects..."
            className="flex-1 bg-transparent border-none outline-none px-8 py-5 text-slate-700 placeholder-slate-400 text-xl font-medium"
          />
          <button
            type="submit"
            className="p-4 bg-slate-900 text-white rounded-[2rem] hover:bg-slate-800 transition-all shadow-xl mr-2"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </form>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-4 mt-8 justify-center">
          {[
            { label: "Attach", icon: "📎" },
            { label: "Search", icon: "🔍" },
            { label: "Deep Study", icon: "🧠" },
            { label: "Create image", icon: "🎨" }
          ].map((item) => (
            <button
              key={item.label}
              className="px-6 py-3 text-sm font-bold border border-slate-200 rounded-2xl text-slate-600 bg-white hover:bg-slate-50 hover:border-indigo-200 transition-all flex items-center gap-2 shadow-sm"
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Auth Links for Guests */}
      {!localStorage.getItem('access_token') && (
        <div className="mt-12 flex gap-6 items-center animate-in fade-in slide-in-from-bottom-2 duration-1000">
          <Link
            to="/signup"
            className="text-indigo-600 font-bold hover:underline underline-offset-4"
          >
            New to DashVite? Sign up
          </Link>
          <div className="w-1.5 h-1.5 bg-slate-200 rounded-full"></div>
          <Link
            to="/login"
            className="text-slate-600 font-bold hover:text-slate-900"
          >
            Already have an account? Sign In
          </Link>
        </div>
      )}

      {/* Footer text */}
      <p className="text-xs font-bold text-slate-400 mt-20 text-center max-w-sm tracking-wide uppercase">
        Built for the future of work
      </p>
    </div>
  );
};

export default Home;
