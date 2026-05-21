import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

export function TopNavBar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        authService.logout();
        navigate('/');
    }

    return (
        <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl shadow-[0_8px_24px_rgba(26,27,34,0.04)] flex justify-between items-center px-6 h-16">
            <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-blue-900 dark:text-blue-100 font-headline tracking-tight">Med Reminder</span>
            </div>
            <div className="flex items-center gap-4">
                <button
                    onClick={() => handleLogout()}
                    className="flex-1 text-primary font-headline font-bold text-sm py-2 px-4 rounded-lg bg-primary-container/10 hover:bg-primary-container/20 transition-colors"
                >Log out
                </button>
            </div>
        </header>
    );
}