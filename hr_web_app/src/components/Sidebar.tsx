'use client';

import Link from 'next/link';
import { LayoutDashboard, CalendarCheck } from 'lucide-react';

export default function Sidebar() {
    const navItems = [
        { href: '/employeeApp', label: 'Dashboard', Icon: LayoutDashboard },
        { href: '/employeeApp/attendance', label: 'Attendance', Icon: CalendarCheck },
    ];

    return (
        <aside className="hidde md:flex w-64 flex-col border-r">
            <div className="px-4 py-6 md:px-6 md:py-8 border-b">
                <h1 className="text-base md:text-lg font-semibold">HR Flow</h1>
                <p className="text-xs md:text-sm mt-1 opacity-60">Employee Portal</p>
            </div>

            <nav className="flex-1 px-3 py-6 space-y-1">
                {navItems.map((item) => {
                    const Icon = item.Icon;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200 hover:bg-gray-100"
                        >
                            <Icon size={18} strokeWidth={1.5} />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}