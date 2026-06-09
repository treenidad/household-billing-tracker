import type React from "react";
import { Link, useNavigate } from "react-router-dom"

type LayoutProps = {
    children: React.ReactNode;
    onLogout: () => void;
};

function Layout({ children, onLogout }: LayoutProps) {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar */}
            <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
                <h1 className="text-lg font-bold text-indigo-600">
                    Household Billing Tracker
                </h1>
                <div className="flex items-center gap-6">
                    <Link to="/dashboard" className="text-grey-600 hover:text-indigo-600">Dashboard</Link>
                    <Link to="/bills" className="text-grey-600 hover:text-indigo-600">Bills</Link>
                    <Link to="/members" className="text-grey-600 hover:text-indigo-600">Members</Link>
                    {/* <Link to="/settings" className="text-grey-600 hover:text-indigo-600">Settings</Link> */}

                    <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 transition">
                        Logout
                    </button>    
                </div>
            </nav>
            <main className="p-6">{children}</main>
        </div>
    )
};

export default Layout;