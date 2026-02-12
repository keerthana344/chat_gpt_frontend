import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('access_token');

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        navigate('/login');
        window.location.reload();
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a1a]/90 backdrop-blur-md text-white px-8 py-4 flex justify-between items-center border-b border-white/10">
            <div className="flex items-center space-x-8 text-sm font-medium">
                <Link to="/" className="text-xl font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mr-4">DashVite</Link>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">About</Link>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
                <Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors">Dashboard</Link>
                <Link to="/chat" className="px-4 py-1.5 bg-indigo-600/20 text-indigo-400 rounded-full border border-indigo-500/30 hover:bg-indigo-600/30 transition-all flex items-center gap-2">
                    <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></span>
                    Ask AI
                </Link>
            </div>

            <div className="flex items-center space-x-6 text-sm font-medium">
                {!isLoggedIn ? (
                    <>
                        <Link to="/login" className="text-gray-400 hover:text-white transition-colors">Login</Link>
                        <Link to="/signup" className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all shadow-lg shadow-indigo-500/20">Get Started</Link>
                    </>
                ) : (
                    <button
                        onClick={handleLogout}
                        className="text-gray-400 hover:text-red-400 transition-colors flex items-center gap-2"
                    >
                        <span>Logout</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Header;
