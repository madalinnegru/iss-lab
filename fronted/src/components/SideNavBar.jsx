import { NavLink } from 'react-router-dom';

const navItems = [
    { path: '/home', icon: 'dashboard', label: 'Dashboard' },
    { path: '/medications', icon: 'pill', label: 'Medications' },
    { path: '/schedule', icon: 'schedule', label: 'Med Schedule' },
    { path: '/notifications', icon: 'notifications', label: 'Notifications' },
    { path: '/settings', icon: 'settings', label: 'Settings' },
];

export function SideNavBar() {
    return (
        <aside className="hidden md:flex fixed left-0 top-0 h-full w-64 z-40 flex-col p-6 gap-2 bg-slate-50 dark:bg-slate-900">
            <div className="text-2xl font-black text-blue-800 dark:text-blue-200 mb-8 font-headline">Med Reminder</div>
            <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 font-headline font-semibold text-sm transition-all active:translate-x-1 duration-150 rounded-xl ${
                                isActive
                                    ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-100'
                                    : 'text-slate-600 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-slate-800'
                            }`
                        }
                    >
                        <span className="material-symbols-outlined">{item.icon}</span>
                        {item.label}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
}