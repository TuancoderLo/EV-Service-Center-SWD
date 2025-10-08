"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/stores/auth";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "staff")) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user || user.role !== "staff") {
    return null;
  }

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Staff Navbar */}
      <nav className="bg-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">👔 EV Staff Panel</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm">Xin chào, {user.name}</span>
              <span className="bg-blue-500 px-2 py-1 rounded text-xs font-semibold">STAFF</span>
              <button
                onClick={() => {
                  // TODO: Implement logout
                  router.push("/login");
                }}
                className="bg-blue-500 hover:bg-blue-700 px-3 py-1 rounded text-sm"
              >
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Staff Sidebar */}
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <a
                  href="/staff/dashboard"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded"
                >
                  📊 Dashboard
                </a>
              </li>
              <li>
                <a
                  href="/staff/technicians"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded"
                >
                  🔧 Quản lý Technicians
                </a>
              </li>
              <li>
                <a
                  href="/staff/schedules"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded"
                >
                  📅 Lịch làm việc
                </a>
              </li>
              <li>
                <a
                  href="/staff/reports"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded"
                >
                  📈 Báo cáo
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}