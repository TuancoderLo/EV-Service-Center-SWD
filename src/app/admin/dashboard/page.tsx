"use client";

import { useState, useEffect } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Admin</h1>
          <p className="text-muted-foreground">
            Quản lý toàn bộ hệ thống EV Service Center
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng Users</CardTitle>
            <span className="text-2xl">👥</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">+12% từ tháng trước</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Staff</CardTitle>
            <span className="text-2xl">👔</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStaff}</div>
            <p className="text-xs text-muted-foreground">+2 nhân viên mới</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Technicians</CardTitle>
            <span className="text-2xl">🔧</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTechnicians}</div>
            <p className="text-xs text-muted-foreground">+1 kỹ thuật viên</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Khách hàng</CardTitle>
            <span className="text-2xl">🚗</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalMembers}</div>
            <p className="text-xs text-muted-foreground">+8% khách hàng mới</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Thao tác nhanh</CardTitle>
            <CardDescription>
              Các chức năng quản trị thường dùng
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              variant="outline"
              className="w-full justify-start h-auto p-4"
            >
              <span className="text-xl mr-3">➕</span>
              <div className="text-left">
                <div className="font-medium">Tạo tài khoản mới</div>
                <div className="text-sm text-muted-foreground">
                  Thêm user vào hệ thống
                </div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start h-auto p-4"
            >
              <span className="text-xl mr-3">📊</span>
              <div className="text-left">
                <div className="font-medium">Xem báo cáo</div>
                <div className="text-sm text-muted-foreground">
                  Thống kê hoạt động
                </div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start h-auto p-4"
            >
              <span className="text-xl mr-3">⚙️</span>
              <div className="text-left">
                <div className="font-medium">Cài đặt hệ thống</div>
                <div className="text-sm text-muted-foreground">
                  Cấu hình toàn hệ thống
                </div>
              </div>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hoạt động gần đây</CardTitle>
            <CardDescription>Theo dõi các hoạt động mới nhất</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center p-3 rounded-lg border">
              <span className="text-lg mr-3">🟢</span>
              <div className="flex-1">
                <p className="text-sm font-medium">User mới đăng ký</p>
                <p className="text-xs text-muted-foreground">2 phút trước</p>
              </div>
              <Badge variant="outline">Mới</Badge>
            </div>

            <div className="flex items-center p-3 rounded-lg border">
              <span className="text-lg mr-3">🔄</span>
              <div className="flex-1">
                <p className="text-sm font-medium">
                  Technician cập nhật trạng thái
                </p>
                <p className="text-xs text-muted-foreground">5 phút trước</p>
              </div>
              <Badge variant="secondary">Cập nhật</Badge>
            </div>

            <div className="flex items-center p-3 rounded-lg border">
              <span className="text-lg mr-3">📝</span>
              <div className="flex-1">
                <p className="text-sm font-medium">Staff tạo booking mới</p>
                <p className="text-xs text-muted-foreground">10 phút trước</p>
              </div>
              <Badge>Hoàn thành</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
