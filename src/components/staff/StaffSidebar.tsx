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
    href: "/staff/dashboard",
    label: "Dashboard",
    icon: "📊",
    description: "Tổng quan công việc",
  },
  {
    href: "/staff/technicians",
    label: "Quản lý Technicians",
    icon: "🔧",
    description: "Phân công kỹ thuật viên",
  },
  {
    href: "/staff/schedules",
    label: "Quản lý Lịch hẹn",
    icon: "📅",
    description: "Lịch làm việc & hẹn",
  },
  {
    href: "/staff/customers",
    label: "Khách hàng",
    icon: "👥",
    description: "Thông tin khách hàng",
  },
  {
    href: "/staff/services",
    label: "Dịch vụ",
    icon: "🛠️",
    description: "Quản lý dịch vụ",
  },
  {
    href: "/staff/reports",
    label: "Báo cáo",
    icon: "📈",
    description: "Báo cáo công việc",
  },
];

export default function StaffSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white shadow-sm min-h-screen border-r border-gray-200">
      <div className="p-4">
        {/* Sidebar Header */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-1">
            Staff Panel
          </h2>
          <p className="text-xs text-gray-500">Quản lý hoạt động dịch vụ</p>
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
                          ? "bg-blue-50 text-blue-700 shadow-sm border-l-4 border-blue-500"
                          : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
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
                          ${isActive ? "text-blue-600" : "text-gray-500 group-hover:text-blue-500"}
                        `}
                        >
                          {item.description}
                        </div>
                      )}
                    </div>

                    {/* Active Indicator */}
                    {isActive && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full ml-2"></div>
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
            <div>Staff Panel v1.0</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
