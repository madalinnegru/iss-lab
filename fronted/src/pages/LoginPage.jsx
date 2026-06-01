// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';

const LoginPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const token = await authService.login(formData.email, formData.password);

            if (token && token !== 'Invalid username or password') {
                // Redirect to dashboard or home page
                navigate('/home');
            } else {
                setError('Invalid email or password');
            }
        } catch (err) {
            setError(err.message || 'An error occurred during login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-surface font-body text-on-surface min-h-screen flex items-center justify-center p-6 overflow-hidden">
            {/* Decorative Elements */}
            <div className="fixed -top-24 -left-24 w-96 h-96 bg-primary-fixed/20 rounded-full blur-[100px]"></div>
            <div className="fixed -bottom-24 -right-24 w-96 h-96 bg-secondary-fixed/20 rounded-full blur-[100px]"></div>

            <main className="w-full max-w-md z-10">
                {/* Logo & Branding */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-container mb-6 shadow-[0_8px_24px_rgba(26,27,34,0.04)]">
                        <span className="material-symbols-outlined text-primary text-3xl">pill</span>
                    </div>
                    <h1 className="font-headline font-extrabold text-3xl tracking-tight text-on-surface mb-2">Med Reminder</h1>
                    <p className="text-on-surface-variant font-body">The Serene Guardian</p>
                </div>

                {/* Login Card */}
                <section className="surface-container-lowest glass-panel rounded-[2rem] p-8 md:p-10 shadow-[0_8px_24px_rgba(26,27,34,0.04)] relative">
                    <header className="mb-8">
                        <h2 className="font-headline font-bold text-xl text-on-surface">Welcome Back</h2>
                        <p className="text-sm text-on-surface-variant mt-1">Please sign in to manage your health.</p>
                    </header>

                    {error && (
                        <div className="mb-6 p-4 bg-error-container/20 border border-error rounded-xl text-error text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Field */}
                        <div className="space-y-2">
                            <label className="font-label text-xs font-semibold uppercase tracking-wider text-on-surface-variant ml-1" htmlFor="email">
                                Email Address
                            </label>
                            <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl">
                  mail
                </span>
                                <input
                                    className="w-full bg-surface-container-highest border-none rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-surface-tint/20 transition-all placeholder:text-outline"
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-1">
                                <label className="font-label text-xs font-semibold uppercase tracking-wider text-on-surface-variant" htmlFor="password">
                                    Password
                                </label>
                            </div>
                            <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl">
                  lock
                </span>
                                <input
                                    className="w-full bg-surface-container-highest border-none rounded-xl py-4 pl-12 pr-12 focus:ring-2 focus:ring-surface-tint/20 transition-all placeholder:text-outline"
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                />
                                <button
                                    type="button"
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                  <span className="material-symbols-outlined text-xl">
                    {showPassword ? "visibility" : "visibility_off"}
                  </span>
                                </button>
                            </div>
                        </div>

                        {/* Action Button */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-br from-primary to-primary-container text-on-primary font-headline font-bold py-4 rounded-full shadow-lg active:scale-[0.98] transition-transform duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Signing in...
                                </div>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    <footer className="mt-8 pt-8 border-t border-outline-variant/15 text-center">
                        <p className="text-sm text-on-surface-variant">
                            Don't have an account?
                            <Link to="/register" className="text-primary font-bold ml-1 hover:underline decoration-2 underline-offset-4">
                                Register
                            </Link>
                        </p>
                    </footer>

                    {/* Status Indicator */}
                    <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-secondary rounded-r-full"></div>
                </section>
            </main>
        </div>
    );
};

export default LoginPage;