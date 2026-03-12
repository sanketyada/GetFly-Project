import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-200">
            <Navbar />
            <main className="flex-grow flex flex-col w-full max-w-7xl mx-auto items-center justify-start">
                <div className="w-full h-full flex-grow p-4 sm:p-6 lg:p-8 animation-fade-in flex flex-col">
                    <Outlet />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Layout;