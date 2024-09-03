import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
    Bell,
    CircleUser,
    Home,
    LineChart,
    Menu,
    Package,
    Package2,
    Search,
    ShoppingCart,
    Users,
} from "lucide-react"
import { Button } from './ui/button'
import Link from 'next/link'
import { Badge } from './ui/badge'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { DASHBOARD_MENU_ITEMS } from '@/data/dashboard-menu'

const DashboardMobileMenu = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0 md:hidden"
                >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
                <nav className="grid gap-2 text-lg font-medium">
                    <Link
                        href="#"
                        className="flex items-center gap-2 text-lg font-semibold"
                    >
                        <Package2 className="h-6 w-6" />
                        <span className="sr-only">W+ Insurance</span>
                    </Link>
                    {
                        DASHBOARD_MENU_ITEMS.map((item, index) => (
                            <Link
                                key={index}
                                href={item.href}
                                className={`
                                flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground
                                `}
                            >
                                <item.icon className="h-5 w-5" />
                                {item.title}
                            </Link>
                        ))
                    }
                </nav>
                <div className="mt-auto">
                    {/* <Card>
                        <CardHeader>
                            <CardTitle>Upgrade to Pro</CardTitle>
                            <CardDescription>
                                Unlock all features and get unlimited access to our
                                support team.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button size="sm" className="w-full">
                                Upgrade
                            </Button>
                        </CardContent>
                    </Card> */}
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default DashboardMobileMenu