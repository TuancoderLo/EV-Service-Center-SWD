"use client";

import { useState, useEffect } from "react";

export default function StaffDashboard() {
  const [stats, setStats] = useState({
    totalTechnicians: 0,
    activeTechnicians: 0,
    pendingTasks: 0,
    completedToday: 0,
  });

  useEffect(() => {
    // TODO: Fetch real data from API
    setStats({
      totalTechnicians: 15,
      activeTechnicians: 12,
      pendingTasks: 8,
      completedToday: 23,
    });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Staff</h1>
        <p className="text-gray-600">Quản lý Technicians và lịch làm việc</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <span className="text-2xl">🔧</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Tổng Technicians</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalTechnicians}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <span className="text-2xl">✅</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Đang hoạt động</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeTechnicians}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-full">
              <span className="text-2xl">⏳</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Nhiệm vụ chờ</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pendingTasks}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-full">
              <span className="text-2xl">🎯</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Hoàn thành hôm nay</p>
              <p className="text-2xl font-bold text-gray-900">{stats.completedToday}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quản lý Technicians</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-xl mr-3">👨‍🔧</span>
                  <div>
                    <p className="font-medium">Phân công công việc</p>
                    <p className="text-sm text-gray-600">Giao việc cho technicians</p>
                  </div>
                </div>
                <span className="text-blue-600">→</span>
              </div>
            </button>
            
            <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-xl mr-3">📅</span>
                  <div>
                    <p className="font-medium">Lên lịch làm việc</p>
                    <p className="text-sm text-gray-600">Quản lý ca làm việc</p>
                  </div>
                </div>
                <span className="text-blue-600">→</span>
              </div>
            </button>

            <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-xl mr-3">📊</span>
                  <div>
                    <p className="font-medium">Theo dõi hiệu suất</p>
                    <p className="text-sm text-gray-600">Đánh giá công việc</p>
                  </div>
                </div>
                <span className="text-blue-600">→</span>
              </div>
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Technicians đang làm việc</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold">
                  A
                </div>
                <div className="ml-3">
                  <p className="font-medium">Nguyễn Văn A</p>
                  <p className="text-sm text-gray-600">Sửa xe điện Model X</p>
                </div>
              </div>
              <span className="text-green-600 text-sm font-semibold">Đang làm</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                  B
                </div>
                <div className="ml-3">
                  <p className="font-medium">Trần Thị B</p>
                  <p className="text-sm text-gray-600">Bảo trì pin Tesla</p>
                </div>
              </div>
              <span className="text-green-600 text-sm font-semibold">Đang làm</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-semibold">
                  C
                </div>
                <div className="ml-3">
                  <p className="font-medium">Lê Văn C</p>
                  <p className="text-sm text-gray-600">Chờ phân công</p>
                </div>
              </div>
              <span className="text-yellow-600 text-sm font-semibold">Chờ việc</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}