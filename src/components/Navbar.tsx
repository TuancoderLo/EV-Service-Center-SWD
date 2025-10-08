"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/stores/auth";

export default function Navbar() {
  const { user, clear } = useAuthStore();
  const router = useRouter();

  const logout = () => {
    clear();
    router.push("/");  // ✅ Sau khi logout về homepage
  };

  // Helper function để get dashboard URL theo role
  const getDashboardUrl = (role: string): string => {
    switch (role) {
      case "admin":
        return "/admin/dashboard";
      case "staff":
        return "/staff/dashboard";
      case "technician":
        return "/technician/dashboard";
      case "member":
        return "/member/dashboard";
      default:
        return "/";
    }
  };

  return (
    <nav className="border-b bg-white shadow-sm p-4 flex gap-6 items-center">
      <Link
        href="/"
        className="font-semibold text-blue-600 hover:text-blue-800 transition-colors"
      >
        EV Service Center
      </Link>
      
      {/* ✅ Dashboard link - chỉ hiển thị khi user đã login */}
      {user && (
        <Link
          href={getDashboardUrl(user.role)}
          className="text-gray-600 hover:text-gray-800 transition-colors font-medium"
        >
          Dashboard
        </Link>
      )}
      
      <div className="ml-auto flex items-center gap-4">
        {/* ✅ TRƯỜNG HỢP 1: User chưa login */}
        {!user && (
          <>
            <Link
              href="/login"
              className="px-4 py-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              Đăng nhập
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Đăng ký
            </Link>
          </>
        )}
        
        {/* ✅ TRƯỜNG HỢP 2: User đã login (bao gồm member) */}
        {user && (
          <>
            <div className="flex items-center space-x-3">
              {/* Avatar */}
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              
              {/* User info */}
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900">
                  {user.name}
                </span>
                {/* Role badge */}
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                  user.role === 'admin' ? 'bg-red-100 text-red-700' :
                  user.role === 'staff' ? 'bg-blue-100 text-blue-700' :
                  user.role === 'technician' ? 'bg-orange-100 text-orange-700' :
                  'bg-purple-100 text-purple-700'
                }`}>
                  {user.role === 'member' ? 'Khách hàng' :
                   user.role === 'staff' ? 'Nhân viên' :
                   user.role === 'technician' ? 'Kỹ thuật viên' :
                   'Quản trị viên'}
                </span>
              </div>
            </div>
            
            {/* Logout button */}
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm"
            >
              Đăng xuất
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
