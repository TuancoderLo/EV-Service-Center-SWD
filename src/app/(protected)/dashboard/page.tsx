"use client";

import { useAuthStore } from "@/stores/auth";
import { LoadingPage } from "@/components/ui/LoadingSpinner";

export default function DashboardPage() {
  const { user, isLoading } = useAuthStore();

  if (isLoading) {
    return <LoadingPage message="Đang tải dashboard..." />;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Dashboard - EV Service Center
        </h1>
        <p className="text-gray-600">
          Chào mừng bạn đến với hệ thống quản lý trung tâm dịch vụ xe điện
        </p>
      </div>

      {user && (
        <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-3">
            Thông tin người dùng
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-sm font-medium text-blue-700">Tên:</span>
              <p className="text-blue-900">{user.name}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-blue-700">Email:</span>
              <p className="text-blue-900">{user.email}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-blue-700">Vai trò:</span>
              <p className="text-blue-900 capitalize">{user.role}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-blue-700">ID:</span>
              <p className="text-blue-900 font-mono">{user.id}</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow">
          <h3 className="font-semibold text-gray-900 mb-2">📅 Đặt lịch</h3>
          <p className="text-gray-600 text-sm">Quản lý lịch hẹn dịch vụ</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow">
          <h3 className="font-semibold text-gray-900 mb-2">📦 Kho hàng</h3>
          <p className="text-gray-600 text-sm">Quản lý tồn kho linh kiện</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow">
          <h3 className="font-semibold text-gray-900 mb-2">👥 Nhân viên</h3>
          <p className="text-gray-600 text-sm">Quản lý đội ngũ nhân viên</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow">
          <h3 className="font-semibold text-gray-900 mb-2">🔧 Kỹ thuật viên</h3>
          <p className="text-gray-600 text-sm">Quản lý kỹ thuật viên</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow">
          <h3 className="font-semibold text-gray-900 mb-2">⚡ Lịch trình</h3>
          <p className="text-gray-600 text-sm">Lập lịch công việc</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow">
          <h3 className="font-semibold text-gray-900 mb-2">🔄 Quy trình</h3>
          <p className="text-gray-600 text-sm">Quản lý quy trình làm việc</p>
        </div>
      </div>
    </div>
  );
}
