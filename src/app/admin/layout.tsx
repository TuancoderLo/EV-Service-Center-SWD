"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/stores/auth";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
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

  if (!user || user.role !== "admin") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Navbar */}
      <nav className="bg-red-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">🔧 EV Admin Panel</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm">Xin chào, {user.name}</span>
              <span className="bg-red-500 px-2 py-1 rounded text-xs font-semibold">ADMIN</span>
              <button
                onClick={() => {
                  // TODO: Implement logout
                  router.push("/login");
                }}
                className="bg-red-500 hover:bg-red-700 px-3 py-1 rounded text-sm"
              >
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Admin Sidebar */}
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <a
                  href="/admin/dashboard"
                  className="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded"
                >
                  📊 Dashboard
                </a>
              </li>
              <li>
                <a
                  href="/admin/users"
                  className="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded"
                >
                  👥 Quản lý Users
                </a>
              </li>
              <li>
                <a
                  href="/admin/roles"
                  className="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded"
                >
                  🛡️ Quản lý Roles
                </a>
              </li>
              <li>
                <a
                  href="/admin/system"
                  className="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded"
                >
                  ⚙️ Cài đặt Hệ thống
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