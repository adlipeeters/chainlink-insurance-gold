import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link';
import { DASHBOARD_MENU_ITEMS } from '@/data/dashboard-menu';

const DashboardMenu = () => {
    const pathname = usePathname();
    return (
        <>
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                {DASHBOARD_MENU_ITEMS.map((item, index) => (
                    <Link
                        key={index}
                        href={item.href}
                        className={`
                            flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary
                            ${pathname === item.href ? 'text-primary' : ''}
                            `}
                    >
                        <item.icon className="h-4 w-4" />
                        {item.title}
                    </Link>
                ))}
            </nav>
        </>
    )
}

export default DashboardMenu