"use client";

import { useState, useEffect } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStaff: 0,
    totalTechnicians: 0,
    totalMembers: 0,
  });

  useEffect(() => {
    // TODO: Fetch real data from API
    setStats({
      totalUsers: 127,
      totalStaff: 8,
      totalTechnicians: 15,
      totalMembers: 104,
    });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin</h1>
        <p className="text-gray-600">Quản lý toàn bộ hệ thống EV Service Center</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <span className="text-2xl">👥</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Tổng Users</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <span className="text-2xl">👔</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Staff</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalStaff}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-full">
              <span className="text-2xl">🔧</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Technicians</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalTechnicians}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-full">
              <span className="text-2xl">🚗</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Khách hàng</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalMembers}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Thao tác nhanh</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors">
              <div className="flex items-center">
                <span className="text-xl mr-3">➕</span>
                <div>
                  <p className="font-medium">Tạo tài khoản mới</p>
                  <p className="text-sm text-gray-600">Thêm user vào hệ thống</p>
                </div>
              </div>
            </button>
            
            <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors">
              <div className="flex items-center">
                <span className="text-xl mr-3">📊</span>
                <div>
                  <p className="font-medium">Xem báo cáo</p>
                  <p className="text-sm text-gray-600">Thống kê hoạt động</p>
                </div>
              </div>
            </button>

            <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors">
              <div className="flex items-center">
                <span className="text-xl mr-3">⚙️</span>
                <div>
                  <p className="font-medium">Cài đặt hệ thống</p>
                  <p className="text-sm text-gray-600">Cấu hình toàn hệ thống</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Hoạt động gần đây</h3>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-lg mr-3">🟢</span>
              <div>
                <p className="text-sm font-medium">User mới đăng ký</p>
                <p className="text-xs text-gray-600">2 phút trước</p>
              </div>
            </div>
            
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-lg mr-3">🔄</span>
              <div>
                <p className="text-sm font-medium">Technician cập nhật trạng thái</p>
                <p className="text-xs text-gray-600">5 phút trước</p>
              </div>
            </div>

            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-lg mr-3">📝</span>
              <div>
                <p className="text-sm font-medium">Staff tạo booking mới</p>
                <p className="text-xs text-gray-600">10 phút trước</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}