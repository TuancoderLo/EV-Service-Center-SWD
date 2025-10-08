"use client";

import { useState, useEffect } from "react";

export default function MemberDashboard() {
  const [stats, setStats] = useState({
    totalVehicles: 0,
    activeBookings: 0,
    completedServices: 0,
    upcomingServices: 0,
  });

  useEffect(() => {
    // TODO: Fetch real data from API
    setStats({
      totalVehicles: 2,
      activeBookings: 1,
      completedServices: 8,
      upcomingServices: 2,
    });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Khách hàng</h1>
        <p className="text-gray-600">Quản lý xe điện và dịch vụ của bạn</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-full">
              <span className="text-2xl">🚗</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Xe của tôi</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalVehicles}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <span className="text-2xl">📅</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Đang sửa chữa</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeBookings}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <span className="text-2xl">✅</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Đã hoàn thành</p>
              <p className="text-2xl font-bold text-gray-900">{stats.completedServices}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-full">
              <span className="text-2xl">⏰</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Sắp tới</p>
              <p className="text-2xl font-bold text-gray-900">{stats.upcomingServices}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Xe của tôi</h3>
          <div className="space-y-4">
            <div className="p-4 border border-purple-200 bg-purple-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">Tesla Model 3</h4>
                  <p className="text-sm text-gray-600">Biển số: 30A-12345</p>
                  <p className="text-sm text-gray-600">Năm sản xuất: 2022</p>
                </div>
                <div className="text-right">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                    Hoạt động tốt
                  </span>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <button className="bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700">
                  Đặt lịch bảo trì
                </button>
                <button className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700">
                  Xem chi tiết
                </button>
              </div>
            </div>

            <div className="p-4 border border-gray-200 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">VinFast VF8</h4>
                  <p className="text-sm text-gray-600">Biển số: 51G-67890</p>
                  <p className="text-sm text-gray-600">Năm sản xuất: 2023</p>
                </div>
                <div className="text-right">
                  <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-semibold">
                    Đang sửa chữa
                  </span>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                  Theo dõi tiến độ
                </button>
                <button className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700">
                  Liên hệ technician
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Lịch hẹn gần đây</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div>
                <p className="font-medium text-gray-900">Bảo trì định kỳ - Tesla Model 3</p>
                <p className="text-sm text-gray-600">15/10/2025 - 9:00 AM</p>
                <p className="text-sm text-gray-600">Technician: Nguyễn Văn A</p>
              </div>
              <span className="text-blue-600 text-sm font-semibold">Đang thực hiện</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
              <div>
                <p className="font-medium text-gray-900">Kiểm tra hệ thống điện - VinFast VF8</p>
                <p className="text-sm text-gray-600">20/10/2025 - 2:00 PM</p>
                <p className="text-sm text-gray-600">Chờ phân công technician</p>
              </div>
              <span className="text-orange-600 text-sm font-semibold">Đã đặt</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div>
                <p className="font-medium text-gray-900">Thay lọc gió - Tesla Model 3</p>
                <p className="text-sm text-gray-600">05/10/2025 - Hoàn thành</p>
                <p className="text-sm text-gray-600">Technician: Trần Thị B</p>
              </div>
              <span className="text-green-600 text-sm font-semibold">✅ Xong</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <button className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition-colors">
              Đặt lịch mới
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}