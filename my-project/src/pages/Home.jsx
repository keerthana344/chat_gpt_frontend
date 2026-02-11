import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 -mt-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          What can I help with?
        </h1>
        <p className="text-lg text-gray-600 max-w-lg mx-auto">
          Experience the future of productivity with DashVite.
          Start your journey today.
        </p>
        <div className="mt-8 flex gap-4 justify-center">
          <Link
            to="/signup"
            className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:bg-indigo-700 transition transform hover:-translate-y-0.5"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="px-8 py-3 bg-white text-gray-700 border border-gray-200 rounded-xl font-semibold shadow-sm hover:bg-gray-50 transition transform hover:-translate-y-0.5"
          >
            Sign In
          </Link>
        </div>
      </div>

      {/* Input box */}
      <div className="w-full max-w-2xl">
        <div className="flex items-center gap-2 border border-gray-200 rounded-2xl px-4 py-4 shadow-sm focus-within:ring-2 focus-within:ring-indigo-100 transition">
          <input
            type="text"
            placeholder="Ask anything..."
            className="flex-1 outline-none text-gray-700 placeholder-gray-400 text-lg"
          />
          <button className="p-2 bg-gray-900 text-white rounded-xl hover:bg-gray-800">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </button>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-3 mt-6 justify-center">
          {["Attach", "Search", "Study", "Create image"].map((item) => (
            <button
              key={item}
              className="px-5 py-2 text-sm border border-gray-200 rounded-full text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Footer text */}
      <p className="text-xs text-gray-400 mt-16 text-center max-w-sm">
        By messaging DashVite, you agree to our <a href="#" className="underline">Terms</a> and have read our <a href="#" className="underline">Privacy Policy</a>.
      </p>
    </div>
  );
};

export default Home;
