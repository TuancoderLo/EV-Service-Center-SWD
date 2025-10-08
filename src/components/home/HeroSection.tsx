"use client";

import Link from "next/link";

import { useAuthStore } from "@/stores/auth";

export default function HeroSection() {
  const { user } = useAuthStore();

  return (
    <section className="py-20 px-4 text-center bg-gradient-to-r from-blue-600 to-green-600 text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-6">
          EV Service Center
        </h1>
        <p className="text-xl mb-8 text-blue-100">
          Trung tâm bảo dưỡng và sửa chữa xe điện hàng đầu Việt Nam
        </p>
        <p className="text-lg mb-10 text-blue-200">
          Chúng tôi cung cấp dịch vụ chuyên nghiệp với đội ngũ kỹ thuật viên 
          giàu kinh nghiệm và trang thiết bị hiện đại nhất.
        </p>
        
        {/* ✅ CTA buttons thay đổi theo trạng thái login */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {!user ? (
            // User chưa login - hiện nút đăng ký/đăng nhập
            <>
              <Link
                href="/register"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Đăng ký ngay
              </Link>
              <Link
                href="/login"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Đăng nhập
              </Link>
            </>
          ) : user.role === 'member' ? (
            // Member đã login - hiện nút dashboard và dịch vụ
            <>
              <Link
                href="/member/dashboard"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center"
              >
                📊 Dashboard của tôi
              </Link>
              <Link
                href="#services"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                🔧 Xem dịch vụ
              </Link>
            </>
          ) : (
            // Staff/Admin/Technician - hiện nút về dashboard của họ
            <>
              <Link
                href={`/${user.role}/dashboard`}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                📊 Về Dashboard
              </Link>
              <Link
                href="#services"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                🔧 Xem dịch vụ
              </Link>
            </>
          )}
        </div>

        {/* ✅ THÊM: Welcome message nhỏ cho user đã login */}
        {user && (
          <div className="mt-8 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
            <p className="text-blue-100">
              👋 Xin chào, <span className="font-semibold text-white">{user.name}</span>! 
              Chào mừng bạn trở lại EV Service Center.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
