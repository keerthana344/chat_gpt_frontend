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
        <nav className="bg-[#1a1a1a] text-white px-6 py-4 flex justify-between items-center shadow-md">
            <div className="flex items-center space-x-6 text-sm font-medium">
                <Link to="/" className="text-lg font-bold mr-2 hover:text-gray-300 transition">DashVite</Link>
                <Link to="/about" className="hover:text-gray-300 transition">About</Link>
                <Link to="/contact" className="hover:text-gray-300 transition">Contact</Link>
                {isLoggedIn && <Link to="/dashboard" className="hover:text-gray-300 transition">Dashboard</Link>}
            </div>

            <div className="flex items-center space-x-6 text-sm font-medium">
                <Link to="/login" className="hover:text-gray-300 transition">Login</Link>
                <Link to="/signup" className="hover:text-gray-300 transition">Signup</Link>
                {isLoggedIn && (
                    <button
                        onClick={handleLogout}
                        className="text-red-500 font-bold hover:text-red-400 transition"
                    >
                        Logout
                    </button>
                )}
            </div>

        </nav>
    );
};

export default Header;
