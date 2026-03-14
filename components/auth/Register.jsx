'use client';

import { useState } from 'react';
import { authAPI } from '@/services/auth.service';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function RegisterForm() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.username.trim()) newErrors.username = 'Username is required';
        else if (formData.username.length < 3) newErrors.username = 'Username must be at least 3 characters';
        else if (formData.username.length > 20) newErrors.username = 'Username must be less than 20 characters';

        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';

        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setApiError('');
        if (!validateForm()) return;

        setLoading(true);
        try {
            const { ...registrationData } = formData;
            const response = await authAPI.register(registrationData);
            if (response.token) {
                localStorage.setItem('token', response.token);
                localStorage.setItem('user', JSON.stringify(response.user));
            }
            router.push('/admin/dashboard');
            toast.success("Signup success")
        } catch (error) {
            setApiError(error.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { 
            opacity: 1, 
            scale: 1,
            transition: { type: 'spring', stiffness: 100, damping: 15, staggerChildren: 0.1 }
        }
    };

    const fieldVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <section className="min-h-screen flex items-center justify-center bg-[#0f172a] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900 via-slate-900 to-black p-6">
            <motion.div
                className="max-w-md w-full bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Header */}
                <motion.div variants={fieldVariants} className="text-center mb-10">
                    <h2 className="text-4xl font-black text-white tracking-tight mb-3">Join Us</h2>
                    <p className="text-slate-400 font-medium">
                        Already a member?{' '}
                        <Link href="/login" className="text-blue-400 hover:text-blue-300 underline underline-offset-4 transition-colors">
                            Sign in
                        </Link>
                    </p>
                </motion.div>

                {/* API Error */}
                {apiError && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }} 
                        animate={{ opacity: 1, height: 'auto' }}
                        className="rounded-2xl bg-red-500/10 border border-red-500/20 p-4 mb-6"
                    >
                        <p className="text-sm font-semibold text-red-400 text-center">{apiError}</p>
                    </motion.div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Username */}
                    <motion.div variants={fieldVariants}>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">
                            Username
                        </label>
                        <input
                            name="username"
                            type="text"
                            value={formData.username}
                            onChange={handleChange}
                            className={`w-full px-5 py-4 bg-white/5 border ${errors.username ? 'border-red-500/50' : 'border-white/10'} rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300`}
                            placeholder="johndoe"
                        />
                        {errors.username && <p className="mt-2 ml-1 text-xs font-medium text-red-400">{errors.username}</p>}
                    </motion.div>

                    {/* Email */}
                    <motion.div variants={fieldVariants}>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">
                            Email Address
                        </label>
                        <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full px-5 py-4 bg-white/5 border ${errors.email ? 'border-red-500/50' : 'border-white/10'} rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300`}
                            placeholder="name@example.com"
                        />
                        {errors.email && <p className="mt-2 ml-1 text-xs font-medium text-red-400">{errors.email}</p>}
                    </motion.div>

                    {/* Password */}
                    <motion.div variants={fieldVariants}>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">
                            Password
                        </label>
                        <input
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`w-full px-5 py-4 bg-white/5 border ${errors.password ? 'border-red-500/50' : 'border-white/10'} rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300`}
                            placeholder="••••••••"
                        />
                        {errors.password && <p className="mt-2 ml-1 text-xs font-medium text-red-400">{errors.password}</p>}
                    </motion.div>

                    {/* Submit Button */}
                    <motion.div variants={fieldVariants} className="pt-2">
                        <motion.button
                            type="submit"
                            disabled={loading}
                            className="relative w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl shadow-[0_10px_20px_rgba(37,99,235,0.3)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {loading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Processing...
                                    </>
                                ) : (
                                    'Create Account'
                                )}
                            </span>
                        </motion.button>
                    </motion.div>
                </form>
            </motion.div>
        </section>
    );
}
