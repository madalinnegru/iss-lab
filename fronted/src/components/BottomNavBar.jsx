import { NavLink } from 'react-router-dom';

const navItems = [
    { path: '/', icon: 'dashboard', label: 'Dashboard' },
    { path: '/medications', icon: 'pill', label: 'Meds' },
    { path: '/schedule', icon: 'schedule', label: 'Plan' },
    { path: '/settings', icon: 'settings', label: 'Settings' },
];

export function BottomNavBar() {
    return (
        <nav className="md:hidden fixed bottom-0 left-0 w-full bg-surface/80 backdrop-blur-xl flex justify-around items-center h-20 px-4 z-50">
            {navItems.map((item) => (
                <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                        `flex flex-col items-center gap-1 active:scale-95 duration-200 ${
                            isActive
                                ? 'text-blue-700 dark:text-blue-300 font-bold'
                                : 'text-slate-500'
                        }`
                    }
                >
                    <span className="material-symbols-outlined">{item.icon}</span>
                    <span className="text-[10px] font-medium font-headline">{item.label}</span>
                </NavLink>
            ))}
        </nav>
    );
}