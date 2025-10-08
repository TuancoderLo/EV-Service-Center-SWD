"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/stores/auth";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function TechnicianLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "technician")) {
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

  if (!user || user.role !== "technician") {
    return null;
  }

  return (
    <div className="min-h-screen bg-orange-50">
      {/* Technician Navbar */}
      <nav className="bg-orange-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">🔧 EV Technician Panel</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm">Xin chào, {user.name}</span>
              <span className="bg-orange-500 px-2 py-1 rounded text-xs font-semibold">TECHNICIAN</span>
              <button
                onClick={() => {
                  // TODO: Implement logout
                  router.push("/login");
                }}
                className="bg-orange-500 hover:bg-orange-700 px-3 py-1 rounded text-sm"
              >
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Technician Sidebar */}
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <a
                  href="/technician/dashboard"
                  className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded"
                >
                  📊 Dashboard
                </a>
              </li>
              <li>
                <a
                  href="/technician/tasks"
                  className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded"
                >
                  📝 Nhiệm vụ của tôi
                </a>
              </li>
              <li>
                <a
                  href="/technician/vehicles"
                  className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded"
                >
                  🚗 Xe đang sửa
                </a>
              </li>
              <li>
                <a
                  href="/technician/tools"
                  className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded"
                >
                  🛠️ Dụng cụ
                </a>
              </li>
              <li>
                <a
                  href="/technician/history"
                  className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded"
                >
                  📚 Lịch sử công việc
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