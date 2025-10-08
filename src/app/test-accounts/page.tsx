"use client";

import Link from "next/link";

import { MOCK_ACCOUNTS } from "@/services/mockAuth";

export default function TestAccountsPage() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🧪 Test Accounts - EV Service Center
          </h1>
          <p className="text-gray-600 text-lg">
            Sử dụng các tài khoản test sau để đăng nhập và kiểm tra từng role
          </p>
          <div className="mt-4">
            <Link 
              href="/login" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              → Đến trang đăng nhập
            </Link>
          </div>
        </div>

        {/* Test Accounts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {MOCK_ACCOUNTS.map((account) => (
            <div
              key={account.id}
              className={`bg-white rounded-xl shadow-lg border-l-4 p-6 hover:shadow-xl transition-all duration-200 ${
                account.role === "admin" ? "border-red-500" :
                account.role === "staff" ? "border-blue-500" :
                account.role === "technician" ? "border-orange-500" :
                "border-purple-500"
              }`}
            >
              {/* Role Badge */}
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold mb-4 ${
                account.role === "admin" ? "bg-red-100 text-red-800" :
                account.role === "staff" ? "bg-blue-100 text-blue-800" :
                account.role === "technician" ? "bg-orange-100 text-orange-800" :
                "bg-purple-100 text-purple-800"
              }`}>
                {account.role === "admin" && "🔴 ADMIN"}
                {account.role === "staff" && "🔵 STAFF"}
                {account.role === "technician" && "🟠 TECHNICIAN"}
                {account.role === "member" && "🟣 MEMBER"}
              </div>

              {/* User Info */}
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">{account.name}</h3>
                  <p className="text-gray-600 text-sm">@{account.username}</p>
                </div>

                {/* Login Credentials */}
                <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Email:</span>
                    <button
                      onClick={() => copyToClipboard(account.email)}
                      className="text-sm font-mono bg-white px-2 py-1 rounded border hover:bg-gray-100 transition-colors"
                      title="Click to copy"
                    >
                      {account.email}
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Password:</span>
                    <button
                      onClick={() => copyToClipboard(account.password)}
                      className="text-sm font-mono bg-white px-2 py-1 rounded border hover:bg-gray-100 transition-colors"
                      title="Click to copy"
                    >
                      {account.password}
                    </button>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="text-sm text-gray-600">
                  <p>📞 {account.phoneNumber}</p>
                  <p>📍 {account.address}</p>
                </div>

                {/* Quick Login Button */}
                <Link
                  href={`/login?email=${encodeURIComponent(account.email)}`}
                  className={`w-full inline-block text-center py-2 px-4 rounded-lg font-medium transition-colors ${
                    account.role === "admin" ? "bg-red-600 hover:bg-red-700 text-white" :
                    account.role === "staff" ? "bg-blue-600 hover:bg-blue-700 text-white" :
                    account.role === "technician" ? "bg-orange-600 hover:bg-orange-700 text-white" :
                    "bg-purple-600 hover:bg-purple-700 text-white"
                  }`}
                >
                  Đăng nhập nhanh
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Role Explanations */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">📋 Phân quyền và chức năng</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-red-700 mb-2">🔴 ADMIN - Quản lý toàn hệ thống</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Quản lý tất cả users và roles</li>
                <li>• Giám sát hệ thống và performance</li>
                <li>• Xem báo cáo tổng hợp</li>
                <li>• Cài đặt hệ thống</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-blue-700 mb-2">🔵 STAFF - Quản lý technicians</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Phân công công việc cho technicians</li>
                <li>• Theo dõi tiến độ làm việc</li>
                <li>• Quản lý lịch trình bảo trì</li>
                <li>• Báo cáo hiệu suất team</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-orange-700 mb-2">🟠 TECHNICIAN - Sửa chữa xe EV</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Nhận và thực hiện nhiệm vụ sửa chữa</li>
                <li>• Cập nhật tiến độ công việc</li>
                <li>• Quản lý dụng cụ và tài liệu kỹ thuật</li>
                <li>• Báo cáo tình trạng xe khách hàng</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-purple-700 mb-2">🟣 MEMBER - Khách hàng</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Quản lý xe điện cá nhân</li>
                <li>• Đặt lịch bảo trì và sửa chữa</li>
                <li>• Theo dõi tình trạng dịch vụ</li>
                <li>• Xem lịch sử và tích điểm</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>
            💡 Tip: Click vào email hoặc password để copy. Sử dụng &ldquo;Đăng nhập nhanh&rdquo; để tự động điền email.
          </p>
        </div>
      </div>
    </div>
  );
}