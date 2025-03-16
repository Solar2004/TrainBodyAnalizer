"use client";

import Link from "next/link";
import { createClient } from "../../supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import {
  UserCircle,
  Home,
  Activity,
  BarChart2,
  ClipboardList,
  Calendar,
  Users,
  Settings,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function DashboardNavbar() {
  const supabase = createClient();
  const router = useRouter();

  const navItems = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: <Activity className="h-5 w-5" />,
    },
    {
      href: "/dashboard/stats",
      label: "Statistics",
      icon: <BarChart2 className="h-5 w-5" />,
    },
    {
      href: "/dashboard/training",
      label: "Training",
      icon: <ClipboardList className="h-5 w-5" />,
    },
    {
      href: "/dashboard/calendar",
      label: "Calendar",
      icon: <Calendar className="h-5 w-5" />,
    },
  ];

  return (
    <nav className="w-full border-b border-gray-200 bg-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            prefetch
            className="text-xl font-bold flex items-center gap-2"
          >
            <Activity className="h-6 w-6 text-blue-600" />
            <span>Train Body Analyzer</span>
          </Link>

          <div className="hidden md:flex items-center space-x-2 ml-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 flex items-center gap-2"
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <UserCircle className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={async () => {
                  await supabase.auth.signOut();
                  router.refresh();
                }}
              >
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
