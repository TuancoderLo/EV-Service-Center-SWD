"use client";

import { useRouter } from "next/navigation";

import { useAuthStore } from "@/stores/auth";

export default function TechnicianNavbar() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav className="bg-orange-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-lg font-bold">🔧</span>
              </div>
              <h1 className="text-xl font-bold">EV Technician Panel</h1>
            </div>
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              {/* User Avatar */}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="hidden md:block">
                  <div className="text-sm font-medium">{user?.name}</div>
                  <div className="text-xs text-orange-200">Technician</div>
                </div>
              </div>

              {/* Technician Badge */}
              <span className="bg-orange-500 px-2 py-1 rounded-full text-xs font-semibold">
                TECHNICIAN
              </span>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="bg-orange-500 hover:bg-orange-700 px-3 py-1 rounded-lg text-sm transition-colors duration-200 flex items-center space-x-1"
                title="Đăng xuất"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <span className="hidden sm:block">Đăng xuất</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
