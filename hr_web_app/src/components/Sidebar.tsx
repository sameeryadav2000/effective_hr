'use client';

import Link from 'next/link';
import {
    LayoutDashboard,
    Inbox,
    FileText,
    BarChart3,
    Plus,
} from 'lucide-react';

export default function Sidebar() {
    const mainNavItems = [
        { href: '/employeeApp', label: 'Dashboard', Icon: LayoutDashboard },
        { href: '/employeeApp/inbox', label: 'Inbox', Icon: Inbox },
        { href: '/employeeApp/my-requests', label: 'My Requests', Icon: FileText },
        { href: '/employeeApp/reports', label: 'Reports', Icon: BarChart3 },
    ];

    return (
        <aside className="w-64 h-screen flex flex-col border-r">
            {/* Header */}
            <div className="px-6 py-8 border-b">
                <h1 className="text-lg font-semibold tracking-tight">Request Hub</h1>
                <p className="text-xs mt-1 opacity-60">Approval Management</p>
            </div>

            {/* Main Navigation */}
            <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
                {mainNavItems.map((item) => {
                    const Icon = item.Icon;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200}`}
                        >
                            <Icon size={18} strokeWidth={1.5} />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Create Request Button */}
            <div className="px-3 pb-6 border-b">
                <Link
                    href="/create-request"
                    className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-semibold rounded-md border border-current transition-all duration-200 hover:opacity-80"
                >
                    <Plus size={18} strokeWidth={2} />
                    <span>Create Request</span>
                </Link>
            </div>
        </aside>
    );
}