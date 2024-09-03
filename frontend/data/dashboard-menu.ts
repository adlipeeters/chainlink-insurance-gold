import {
    Home,
    UmbrellaOff,
    Users,
} from "lucide-react"

export const DASHBOARD_MENU_ITEMS = [
    {
        title: 'Dashboard',
        icon: Home,
        href: '/dashboard',
    },
    {
        title: 'System Policies',
        icon: UmbrellaOff,
        href: '/system-policies',
    },
    {
        title: 'Users Policies',
        icon: Users,
        href: '/users-policies',
    },
];