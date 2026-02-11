import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('access_token');

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        navigate('/login');
        window.location.reload(); // Refresh to update header state
    };

    return (
        <nav style={{ padding: '1rem', backgroundColor: '#333', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
                <Link to="/" style={{ color: 'white', marginRight: '1rem', fontWeight: 'bold' }}>DashVite</Link>
                <Link to="/about" style={{ color: 'white', marginRight: '1rem' }}>About</Link>
                <Link to="/contact" style={{ color: 'white', marginRight: '1rem' }}>Contact</Link>
                {isLoggedIn && <Link to="/dashboard" style={{ color: 'white', marginRight: '1rem' }}>Dashboard</Link>}
            </div>
            <div>
                <Link to="/login" style={{ color: 'white', marginRight: '1rem' }}>Login</Link>
                <Link to="/signup" style={{ color: 'white', marginRight: '1rem' }}>Signup</Link>
                {isLoggedIn && (
                    <button
                        onClick={handleLogout}
                        style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        Logout
                    </button>
                )}
            </div>

        </nav>
    );
};


export default Header;