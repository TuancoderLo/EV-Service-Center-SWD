"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface MenuItem {
  href: string;
  label: string;
  icon: string;
  description?: string;
}

const menuItems: MenuItem[] = [
  {
    href: "/admin/dashboard",
    label: "Dashboard",
    icon: "📊",
    description: "Tổng quan hệ thống",
  },
  {
    href: "/admin/users",
    label: "Quản lý Users",
    icon: "👥",
    description: "Quản lý người dùng",
  },
  {
    href: "/admin/roles",
    label: "Quản lý Roles",
    icon: "🛡️",
    description: "Phân quyền hệ thống",
  },
  {
    href: "/admin/bookings",
    label: "Quản lý Bookings",
    icon: "📅",
    description: "Lịch hẹn dịch vụ",
  },
  {
    href: "/admin/inventory",
    label: "Quản lý Kho",
    icon: "📦",
    description: "Phụ tùng & vật tư",
  },
  {
    href: "/admin/reports",
    label: "Báo cáo",
    icon: "📈",
    description: "Thống kê & báo cáo",
  },
  {
    href: "/admin/settings",
    label: "Cài đặt",
    icon: "⚙️",
    description: "Cấu hình hệ thống",
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-card shadow-sm min-h-screen border-r">
      <div className="p-4">
        {/* Sidebar Header */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-1">Admin Panel</h2>
          <p className="text-xs text-muted-foreground">
            Quản trị hệ thống EV Service
          </p>
        </div>

        {/* Navigation Menu */}
        <nav>
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <li key={item.href}>
                  <Button
                    asChild
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start h-auto p-3 transition-all duration-200",
                      isActive && "bg-accent text-accent-foreground shadow-sm"
                    )}
                  >
                    <Link href={item.href}>
                      <span className="mr-3 text-lg">{item.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium">{item.label}</div>
                        {item.description && (
                          <div className="text-xs text-muted-foreground mt-0.5">
                            {item.description}
                          </div>
                        )}
                      </div>
                    </Link>
                  </Button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="mt-8 pt-4 border-t border-border">
          <div className="text-xs text-muted-foreground space-y-1">
            <div>EV Service Center</div>
            <div>Admin Panel v1.0</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
