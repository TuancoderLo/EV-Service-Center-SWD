"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/stores/auth";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "member")) {
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

  if (!user || user.role !== "member") {
    return null;
  }

  return (
    <div className="min-h-screen bg-purple-50">
      {/* Member Navbar */}
      <nav className="bg-purple-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">🚗 EV Service Portal</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm">Xin chào, {user.name}</span>
              <span className="bg-purple-500 px-2 py-1 rounded text-xs font-semibold">KHÁCH HÀNG</span>
              <button
                onClick={() => {
                  // TODO: Implement logout
                  router.push("/login");
                }}
                className="bg-purple-500 hover:bg-purple-700 px-3 py-1 rounded text-sm"
              >
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Member Sidebar */}
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <a
                  href="/member/dashboard"
                  className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded"
                >
                  📊 Dashboard
                </a>
              </li>
              <li>
                <a
                  href="/member/bookings"
                  className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded"
                >
                  📅 Đặt lịch sửa chữa
                </a>
              </li>
              <li>
                <a
                  href="/member/vehicles"
                  className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded"
                >
                  🚗 Xe của tôi
                </a>
              </li>
              <li>
                <a
                  href="/member/history"
                  className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded"
                >
                  📚 Lịch sử dịch vụ
                </a>
              </li>
              <li>
                <a
                  href="/member/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded"
                >
                  👤 Thông tin cá nhân
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