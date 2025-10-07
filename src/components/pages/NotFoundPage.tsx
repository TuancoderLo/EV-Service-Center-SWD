"use client";

import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-8xl md:text-9xl font-bold text-gray-300 mb-4">
            404
          </div>
          <div className="text-6xl mb-6">🔋⚡</div>
        </div>

        {/* Main Content */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ôi! Trang không tìm thấy
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Có vẻ như trang bạn đang tìm kiếm đã bị &ldquo;hết pin&rdquo; rồi.
          </p>
          <p className="text-gray-500">
            Đừng lo lắng, hãy để chúng tôi giúp bạn tìm đúng đường!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Về trang chủ
          </Link>

          <Link
            href="/login"
            className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium shadow-lg"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            Đăng nhập
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Quay lại
          </button>
        </div>

        {/* Quick Links */}
        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Có thể bạn đang tìm:
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/register"
              className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-center border"
            >
              <div className="text-2xl mb-2">📝</div>
              <p className="text-sm font-medium text-gray-900">Đăng ký</p>
            </Link>

            <Link
              href="/about"
              className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-center border"
            >
              <div className="text-2xl mb-2">ℹ️</div>
              <p className="text-sm font-medium text-gray-900">Giới thiệu</p>
            </Link>

            <Link
              href="/contact"
              className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-center border"
            >
              <div className="text-2xl mb-2">📞</div>
              <p className="text-sm font-medium text-gray-900">Liên hệ</p>
            </Link>

            <Link
              href="/services"
              className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-center border"
            >
              <div className="text-2xl mb-2">🔧</div>
              <p className="text-sm font-medium text-gray-900">Dịch vụ</p>
            </Link>
          </div>
        </div>

        {/* Footer Message */}
        <div className="mt-8 text-sm text-gray-500">
          <p>
            Nếu bạn gặp vấn đề, vui lòng{" "}
            <Link href="/contact" className="text-blue-600 hover:underline">
              liên hệ với chúng tôi
            </Link>{" "}
            để được hỗ trợ.
          </p>
        </div>
      </div>
    </div>
  );
}
