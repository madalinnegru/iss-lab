// src/pages/RegisterPage.jsx - VERSIONEA CU SELECT NATIV (RECOMANDAT)
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        timezone: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [passwordErrors, setPasswordErrors] = useState([]);
    const [timezones, setTimezones] = useState([]);

    // Încarcă timezone-urile disponibile la montarea componentei
    useEffect(() => {
        // Obține toate timezone-urile suportate de browser
        const availableTimezones = Intl.supportedValuesOf('timeZone');
        setTimezones(availableTimezones);

        // Setează timezone-ul implicit (al browser-ului)
        const defaultTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        setFormData(prev => ({ ...prev, timezone: defaultTimezone }));
    }, []);

    const validatePassword = (password) => {
        const errors = [];

        if (password.length < 8) {
            errors.push('At least 8 characters');
        }
        if (!/[A-Z]/.test(password)) {
            errors.push('One uppercase letter');
        }
        if (!/[a-z]/.test(password)) {
            errors.push('One lowercase letter');
        }
        if (!/[0-9]/.test(password)) {
            errors.push('One number');
        }
        if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
            errors.push('One special character');
        }

        return errors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (error) setError('');

        if (name === 'password') {
            setPasswordErrors(validatePassword(value));
        }
    };

    const handleTimezoneChange = (e) => {
        setFormData(prev => ({ ...prev, timezone: e.target.value }));
    };

    // Formatează afișarea timezone-ului pentru opțiuni
    const formatTimezoneLabel = (tz) => {
        return tz.replace(/_/g, ' ').replace(/\//g, ' - ');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        const passwordValidationErrors = validatePassword(formData.password);
        if (passwordValidationErrors.length > 0) {
            setError('Please meet all password requirements');
            return;
        }

        if (!formData.timezone) {
            setError('Please select a timezone');
            return;
        }

        setLoading(true);
        setError('');

        try {
            await authService.register({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                timeZone: formData.timezone
            });

            navigate('/home');
        } catch (err) {
            setError(err.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-surface text-on-surface min-h-screen flex items-center justify-center p-6">
            <main className="w-full max-w-[440px]">
                {/* Brand Identity Section */}
                <div className="mb-10 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-container mb-6 shadow-[0_8px_24px_rgba(26,27,34,0.04)]">
                        <span className="material-symbols-outlined text-on-primary-container text-3xl">
                            pill
                        </span>
                    </div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-primary mb-2">Med Reminder</h1>
                    <p className="text-on-surface-variant font-medium">Start your journey to mindful health</p>
                </div>

                {/* Registration Form Container */}
                <div className="bg-surface-container-lowest p-8 rounded-[2rem] shadow-[0_8px_24px_rgba(26,27,34,0.04)]">
                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-error-container/20 border border-error rounded-xl text-error text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Full Name Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-on-surface ml-1" htmlFor="name">
                                Full Name
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline">
                                    <span className="material-symbols-outlined text-[20px]">person</span>
                                </div>
                                <input
                                    className="block w-full pl-11 pr-4 py-4 bg-surface-container-highest border-none rounded-xl focus:ring-2 focus:ring-surface-tint/20 transition-all placeholder:text-outline outline-none"
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Enter your full name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-on-surface ml-1" htmlFor="email">
                                Email
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline">
                                    <span className="material-symbols-outlined text-[20px]">mail</span>
                                </div>
                                <input
                                    className="block w-full pl-11 pr-4 py-4 bg-surface-container-highest border-none rounded-xl focus:ring-2 focus:ring-surface-tint/20 transition-all placeholder:text-outline outline-none"
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
                            <label className="block text-sm font-semibold text-on-surface ml-1" htmlFor="password">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline">
                                    <span className="material-symbols-outlined text-[20px]">lock</span>
                                </div>
                                <input
                                    className="block w-full pl-11 pr-12 py-4 bg-surface-container-highest border-none rounded-xl focus:ring-2 focus:ring-surface-tint/20 transition-all placeholder:text-outline outline-none"
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
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-outline hover:text-primary transition-colors"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <span className="material-symbols-outlined text-[20px]">
                                        {showPassword ? "visibility_off" : "visibility"}
                                    </span>
                                </button>
                            </div>

                            {formData.password && passwordErrors.length > 0 && (
                                <div className="mt-2 p-3 bg-surface-container-highest rounded-lg">
                                    <p className="text-xs font-semibold text-on-surface-variant mb-2">Password must contain:</p>
                                    <ul className="space-y-1">
                                        {passwordErrors.map((err, index) => (
                                            <li key={index} className="text-xs text-error flex items-center gap-2">
                                                <span className="material-symbols-outlined text-[14px]">close</span>
                                                {err}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {formData.password && passwordErrors.length === 0 && (
                                <div className="mt-2 p-3 bg-secondary-container/20 rounded-lg">
                                    <p className="text-xs text-secondary flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[14px]">check_circle</span>
                                        Password is strong!
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-on-surface ml-1" htmlFor="confirmPassword">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline">
                                    <span className="material-symbols-outlined text-[20px]">shield_lock</span>
                                </div>
                                <input
                                    className="block w-full pl-11 pr-12 py-4 bg-surface-container-highest border-none rounded-xl focus:ring-2 focus:ring-surface-tint/20 transition-all placeholder:text-outline outline-none"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-outline hover:text-primary transition-colors"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    <span className="material-symbols-outlined text-[20px]">
                                        {showConfirmPassword ? "visibility_off" : "visibility"}
                                    </span>
                                </button>
                            </div>

                            {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                                <p className="mt-1 text-xs text-error flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">error</span>
                                    Passwords do not match
                                </p>
                            )}

                            {formData.confirmPassword && formData.password === formData.confirmPassword && formData.password && (
                                <p className="mt-1 text-xs text-secondary flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">check_circle</span>
                                    Passwords match
                                </p>
                            )}
                        </div>

                        {/* Timezone Field - Select nativ (funcționează perfect) */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-on-surface ml-1" htmlFor="timezone">
                                Timezone
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline z-10">
                                    <span className="material-symbols-outlined text-[20px]">schedule</span>
                                </div>
                                <select
                                    id="timezone"
                                    name="timezone"
                                    className="block w-full pl-11 pr-10 py-4 bg-surface-container-highest border-none rounded-xl focus:ring-2 focus:ring-surface-tint/20 transition-all appearance-none cursor-pointer outline-none"
                                    value={formData.timezone}
                                    onChange={handleTimezoneChange}
                                    required
                                    disabled={loading}
                                >
                                    <option value="" disabled>Select your timezone</option>
                                    {timezones.map((tz) => (
                                        <option key={tz} value={tz}>
                                            {formatTimezoneLabel(tz)}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-outline">
                                    <span className="material-symbols-outlined text-[20px]">expand_more</span>
                                </div>
                            </div>
                            <p className="text-xs text-on-surface-variant ml-1">
                                Your medication reminders will be shown in this timezone
                            </p>
                        </div>

                        {/* Action Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full py-4 px-6 bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold rounded-full shadow-lg active:scale-[0.98] transition-transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={loading || (formData.password !== formData.confirmPassword) || passwordErrors.length > 0 || !formData.timezone}
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Creating Account...
                                    </div>
                                ) : (
                                    'Create Account'
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Login Link */}
                    <div className="mt-8 text-center">
                        <p className="text-on-surface-variant text-sm">
                            Already have an account?
                            <Link to="/" className="text-primary font-bold hover:underline underline-offset-4 ml-1">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Footer Visual Hint */}
                <div className="mt-12 flex justify-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-secondary-container"></div>
                    <div className="w-2 h-2 rounded-full bg-secondary"></div>
                    <div className="w-2 h-2 rounded-full bg-secondary-container"></div>
                </div>
            </main>
        </div>
    );
};

export default RegisterPage;