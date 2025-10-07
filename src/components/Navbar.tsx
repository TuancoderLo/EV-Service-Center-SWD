"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/stores/auth";

export default function Navbar() {
  const { user, clear } = useAuthStore();
  const router = useRouter();

  const logout = () => {
    clear();
    router.push("/login");
  };

  return (
    <nav className="border-b bg-white shadow-sm p-4 flex gap-6 items-center">
      <Link href="/" className="font-semibold text-blue-600 hover:text-blue-800 transition-colors">
        EV Service Center
      </Link>
      {user && (
        <Link href="/dashboard" className="text-gray-600 hover:text-gray-800 transition-colors">
          Dashboard
        </Link>
      )}
      <div className="ml-auto flex items-center gap-4">
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
        {user && (
          <>
            <span className="text-sm text-gray-600 font-medium">Xin chào, {user.name}</span>
            <button 
              onClick={logout} 
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
            >
              Đăng xuất
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
