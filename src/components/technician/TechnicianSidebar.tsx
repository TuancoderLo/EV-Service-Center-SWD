"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

interface MenuItem {
  href: string;
  label: string;
  icon: string;
  description?: string;
}

const menuItems: MenuItem[] = [
  {
    href: "/technician/dashboard",
    label: "Dashboard",
    icon: "📊",
    description: "Tổng quan công việc",
  },
  {
    href: "/technician/tasks",
    label: "Nhiệm vụ",
    icon: "📋",
    description: "Công việc được giao",
  },
  {
    href: "/technician/vehicles",
    label: "Xe đang sửa",
    icon: "🚗",
    description: "Xe đang bảo trì",
  },
  {
    href: "/technician/tools",
    label: "Dụng cụ",
    icon: "🔧",
    description: "Quản lý dụng cụ",
  },
  {
    href: "/technician/reports",
    label: "Báo cáo",
    icon: "📄",
    description: "Báo cáo tiến độ",
  },
  {
    href: "/technician/schedule",
    label: "Lịch trình",
    icon: "📅",
    description: "Lịch làm việc",
  },
];

export default function TechnicianSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white shadow-sm min-h-screen border-r border-gray-200">
      <div className="p-4">
        {/* Sidebar Header */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-1">
            Technician Panel
          </h2>
          <p className="text-xs text-gray-500">Công cụ kỹ thuật viên</p>
        </div>

        {/* Navigation Menu */}
        <nav>
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`
                      group flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                      ${
                        isActive
                          ? "bg-orange-50 text-orange-700 shadow-sm border-l-4 border-orange-500"
                          : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                      }
                    `}
                  >
                    {/* Icon */}
                    <span
                      className={`
                      mr-3 text-lg
                      ${isActive ? "scale-110" : "group-hover:scale-110"}
                      transition-transform duration-200
                    `}
                    >
                      {item.icon}
                    </span>

                    {/* Label & Description */}
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{item.label}</div>
                      {item.description && (
                        <div
                          className={`
                          text-xs mt-0.5 truncate
                          ${isActive ? "text-orange-600" : "text-gray-500 group-hover:text-orange-500"}
                        `}
                        >
                          {item.description}
                        </div>
                      )}
                    </div>

                    {/* Active Indicator */}
                    {isActive && (
                      <div className="w-2 h-2 bg-orange-500 rounded-full ml-2"></div>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="mt-8 pt-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 space-y-1">
            <div>EV Service Center</div>
            <div>Technician Panel v1.0</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
