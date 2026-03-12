import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { LogOut, HardHat } from 'lucide-react';

const Navbar = () => {
    const { user, logout, isAuthenticated } = useAuth();

    return (
        <nav className="fixed top-0 w-full z-50 bg-slate-900 backdrop-blur-xl border-b border-white/10 text-white shadow-lg shadow-black/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center group cursor-pointer">
                        <div className="bg-gradient-to-tr from-blue-500 to-indigo-500 p-1.5 rounded-lg mr-3 shadow-md shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow">
                            <HardHat className="h-6 w-6 text-white" />
                        </div>
                        <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">BuildTracker</span>
                    </div>
                    <div className="flex items-center">
                        {isAuthenticated && (
                            <div className="flex items-center space-x-4">
                                <span className="text-sm font-medium hidden sm:block text-white/80 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                                    {user?.name}
                                </span>
                                <button
                                    onClick={logout}
                                    className="p-2 rounded-xl hover:bg-red-500/20 hover:text-red-300 transition-all flex items-center text-sm text-white/70 border border-transparent hover:border-red-500/30 focus:outline-none focus:ring-2 focus:ring-red-400/50"
                                    aria-label="Logout"
                                    title="Logout"
                                >
                                    <LogOut className="h-5 w-5 sm:mr-2" />
                                    <span className="hidden sm:inline font-semibold">Logout</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;