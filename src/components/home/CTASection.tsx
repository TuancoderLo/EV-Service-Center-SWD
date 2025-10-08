"use client";

import Link from "next/link";

import { useAuthStore } from "@/stores/auth";

export default function CTASection() {
  const { user } = useAuthStore();

  return (
    <section className="py-16 px-4 bg-gradient-to-r from-green-600 to-blue-600 text-white text-center">
      <div className="max-w-4xl mx-auto">
        {!user ? (
          // ✅ CTA cho user chưa login
          <>
            <h2 className="text-3xl font-bold mb-4">
              Sẵn sàng bắt đầu chưa?
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Đăng ký ngay hôm nay để trải nghiệm dịch vụ tốt nhất cho xe điện của bạn
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
              >
                Đăng ký miễn phí
              </Link>
              <Link
                href="/login"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
              >
                Đã có tài khoản
              </Link>
            </div>
          </>
        ) : user.role === 'member' ? (
          // ✅ CTA cho member đã login
          <>
            <h2 className="text-3xl font-bold mb-4">
              Quản lý xe điện của bạn
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Theo dõi tình trạng xe, đặt lịch bảo trì và nhận ưu đãi độc quyền
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/member/dashboard"
                className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
              >
                📊 Vào Dashboard
              </Link>
              <Link
                href="/member/dashboard"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
              >
                📅 Đặt lịch bảo trì
              </Link>
            </div>
          </>
        ) : (
          // ✅ CTA cho staff/admin/technician
          <>
            <h2 className="text-3xl font-bold mb-4">
              Workspace của bạn
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Quản lý công việc và theo dõi hiệu suất từ dashboard chuyên nghiệp
            </p>
            <Link
              href={`/${user.role}/dashboard`}
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors inline-block"
            >
              📊 Về Dashboard
            </Link>
          </>
        )}
      </div>
    </section>
  );
}
