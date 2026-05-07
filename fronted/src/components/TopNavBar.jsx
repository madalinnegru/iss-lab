import { useMantineColorScheme } from '@mantine/core';

export function TopNavBar() {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const isDark = colorScheme === 'dark';

    return (
        <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl shadow-[0_8px_24px_rgba(26,27,34,0.04)] flex justify-between items-center px-6 h-16">
            <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-blue-900 dark:text-blue-100 font-headline tracking-tight">Med Reminder</span>
            </div>
            <div className="flex items-center gap-4">
                <button
                    onClick={() => toggleColorScheme()}
                    className="p-2 text-slate-500 hover:bg-slate-100/50 transition-colors active:scale-95 duration-200 rounded-full"
                >
          <span className="material-symbols-outlined">
            {isDark ? 'light_mode' : 'dark_mode'}
          </span>
                </button>
                <button className="p-2 text-slate-500 hover:bg-slate-100/50 transition-colors active:scale-95 duration-200 rounded-full">
                    <span className="material-symbols-outlined">account_circle</span>
                </button>
            </div>
        </header>
    );
}