"use client";

import { useState, useEffect } from "react";

export default function TechnicianDashboard() {
  const [stats, setStats] = useState({
    assignedTasks: 0,
    completedToday: 0,
    inProgress: 0,
    avgCompletionTime: 0,
  });

  useEffect(() => {
    // TODO: Fetch real data from API
    setStats({
      assignedTasks: 5,
      completedToday: 3,
      inProgress: 2,
      avgCompletionTime: 45,
    });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Technician</h1>
        <p className="text-gray-600">Quản lý công việc sửa chữa xe điện</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-full">
              <span className="text-2xl">📝</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Nhiệm vụ được giao</p>
              <p className="text-2xl font-bold text-gray-900">{stats.assignedTasks}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <span className="text-2xl">✅</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Hoàn thành hôm nay</p>
              <p className="text-2xl font-bold text-gray-900">{stats.completedToday}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <span className="text-2xl">⏳</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Đang thực hiện</p>
              <p className="text-2xl font-bold text-gray-900">{stats.inProgress}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-full">
              <span className="text-2xl">⏱️</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Thời gian TB (phút)</p>
              <p className="text-2xl font-bold text-gray-900">{stats.avgCompletionTime}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Nhiệm vụ hiện tại</h3>
          <div className="space-y-3">
            <div className="p-4 border border-orange-200 bg-orange-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">Sửa chữa pin Tesla Model 3</h4>
                  <p className="text-sm text-gray-600">Khách hàng: Nguyễn Văn A</p>
                  <p className="text-sm text-gray-600">Ưu tiên: Cao</p>
                </div>
                <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Đang làm
                </span>
              </div>
              <div className="mt-3 flex gap-2">
                <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">
                  Hoàn thành
                </button>
                <button className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700">
                  Tạm dừng
                </button>
              </div>
            </div>

            <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">Bảo trì định kỳ BMW i3</h4>
                  <p className="text-sm text-gray-600">Khách hàng: Trần Thị B</p>
                  <p className="text-sm text-gray-600">Ưu tiên: Trung bình</p>
                </div>
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Chờ bắt đầu
                </span>
              </div>
              <div className="mt-3">
                <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                  Bắt đầu
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Hoàn thành gần đây</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div>
                <p className="font-medium text-gray-900">Thay lọc gió VinFast VF8</p>
                <p className="text-sm text-gray-600">Hoàn thành 30 phút trước</p>
              </div>
              <span className="text-green-600 text-sm font-semibold">✅ Xong</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div>
                <p className="font-medium text-gray-900">Kiểm tra hệ thống điện Audi e-tron</p>
                <p className="text-sm text-gray-600">Hoàn thành 1 giờ trước</p>
              </div>
              <span className="text-green-600 text-sm font-semibold">✅ Xong</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div>
                <p className="font-medium text-gray-900">Cập nhật phần mềm Hyundai Kona</p>
                <p className="text-sm text-gray-600">Hoàn thành 2 giờ trước</p>
              </div>
              <span className="text-green-600 text-sm font-semibold">✅ Xong</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <button className="text-orange-600 hover:text-orange-700 text-sm font-medium">
              Xem tất cả lịch sử →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}