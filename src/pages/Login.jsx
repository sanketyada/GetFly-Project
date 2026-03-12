import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { HardHat, LogIn } from 'lucide-react';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { login } = useAuth();
    const navigate = useNavigate();
    const [authError, setAuthError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (data) => {
        setAuthError('');
        setIsSubmitting(true);
        try {
            await login(data.email, data.password);
            navigate('/projects');
        } catch (error) {
            setAuthError(error.message || 'Login failed');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full p-4 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
            {/* Grident using for BGCOLOR */}
            <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] rounded-full bg-blue-600/20 blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rounded-full bg-indigo-500/20 blur-[100px] pointer-events-none"></div>

            <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/20 overflow-hidden relative z-10 transition-all">
                <div className="p-8 pb-6 text-center">
                    <div className="mx-auto w-20 h-20 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-2xl shadow-xl shadow-blue-500/30 flex items-center justify-center mb-6 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                        <HardHat className="h-10 w-10 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-white tracking-tight mb-2">BuildTracker</h2>
                    <p className="text-blue-100/70 font-medium tracking-wide text-sm uppercase">Construction Management</p>
                </div>

                <div className="px-8 pb-8">
                    <div className="flex items-center justify-center space-x-3 mb-8">
                        <div className="h-[1px] bg-white/10 flex-1"></div>
                        <span className="text-white/60 text-sm font-medium flex items-center uppercase tracking-wider">
                            <LogIn className="w-4 h-4 mr-1.5 opacity-70" /> Account Login
                        </span>
                        <div className="h-[1px] bg-white/10 flex-1"></div>
                    </div>

                    {authError && (
                        <div className="mb-6 bg-red-500/10 border border-red-500/30 p-4 rounded-xl text-sm text-red-200 animate-pulse flex items-center backdrop-blur-sm">
                            <svg className="w-5 h-5 mr-2 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {authError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-white/90 mb-2 pl-1" htmlFor="email">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" }
                                })}
                                className={`w-full px-4 py-3.5 bg-white/5 border rounded-xl text-white placeholder-white/30 focus:ring-2 focus:ring-blue-400/50 focus:bg-white/10 focus:outline-none transition-all ${errors.email ? 'border-red-400/50 focus:ring-red-400/50' : 'border-white/10'}`}
                                placeholder="name@company.com"
                            />
                            {errors.email && <p className="mt-2 text-sm text-red-300 font-medium pl-1">{errors.email.message}</p>}
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2 pl-1">
                                <label className="block text-sm font-medium text-white/90" htmlFor="password">
                                    Password
                                </label>
                            </div>
                            <input
                                id="password"
                                type="password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Password must be at least 6 characters" }
                                })}
                                className={`w-full px-4 py-3.5 bg-white/5 border rounded-xl text-white placeholder-white/30 focus:ring-2 focus:ring-blue-400/50 focus:bg-white/10 focus:outline-none transition-all ${errors.password ? 'border-red-400/50 focus:ring-red-400/50' : 'border-white/10'}`}
                                placeholder="••••••••"
                            />
                            {errors.password && <p className="mt-2 text-sm text-red-300 font-medium pl-1">{errors.password.message}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold py-4 px-4 rounded-xl hover:from-blue-400 hover:to-indigo-400 focus:ring-4 focus:ring-blue-500/30 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed mt-8 shadow-lg shadow-blue-500/25 border border-white/10"
                        >
                            {isSubmitting ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Authenticating...
                                </span>
                            ) : 'Sign In Securely'}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-white/10 text-center text-sm text-white/50">
                        <p className="font-medium text-white/70 mb-3">Demo Credentials</p>
                        <div className="flex flex-col space-y-2 items-center">
                            <div className="flex items-center bg-white/5 rounded-lg px-4 py-2 border border-white/10 w-full max-w-[200px] justify-between">
                                <span className="opacity-70">Email:</span>
                                <span className="font-mono text-white/90 font-medium">MSD@test.com</span>
                            </div>
                            <div className="flex items-center bg-white/5 rounded-lg px-4 py-2 border border-white/10 w-full max-w-[200px] justify-between">
                                <span className="opacity-70">Pass:</span>
                                <span className="font-mono text-white/90 font-medium">070707</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
