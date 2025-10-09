"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuthStore } from "@/stores/auth";

export default function CTASection() {
  const { user } = useAuthStore();

  return (
    <section className="py-16 px-4 bg-gradient-to-r from-primary to-blue-600 text-white">
      <div className="container max-w-4xl mx-auto text-center">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
          <CardContent className="pt-6">
            {!user ? (
              // ✅ CTA cho user chưa login
              <>
                <h2 className="text-3xl font-bold mb-4">
                  Sẵn sàng bắt đầu chưa?
                </h2>
                <p className="text-xl text-white/90 mb-8">
                  Đăng ký ngay hôm nay để trải nghiệm dịch vụ tốt nhất cho xe
                  điện của bạn
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    asChild
                    size="lg"
                    className="bg-white text-primary hover:bg-white/90"
                  >
                    <Link href="/register">Đăng ký miễn phí</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white hover:text-primary"
                  >
                    <Link href="/login">Đã có tài khoản</Link>
                  </Button>
                </div>
              </>
            ) : user.role === "member" ? (
              // ✅ CTA cho member đã login
              <>
                <h2 className="text-3xl font-bold mb-4">
                  Quản lý xe điện của bạn
                </h2>
                <p className="text-xl text-white/90 mb-8">
                  Theo dõi tình trạng xe, đặt lịch bảo trì và nhận ưu đãi độc
                  quyền
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    asChild
                    size="lg"
                    className="bg-white text-primary hover:bg-white/90"
                  >
                    <Link href="/member/dashboard">📊 Vào Dashboard</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white hover:text-primary"
                  >
                    <Link href="/member/dashboard">📅 Đặt lịch bảo trì</Link>
                  </Button>
                </div>
              </>
            ) : (
              // ✅ CTA cho staff/admin/technician
              <>
                <h2 className="text-3xl font-bold mb-4">Workspace của bạn</h2>
                <p className="text-xl text-white/90 mb-8">
                  Quản lý công việc và theo dõi hiệu suất từ dashboard chuyên
                  nghiệp
                </p>
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90"
                >
                  <Link href={`/${user.role}/dashboard`}>📊 Về Dashboard</Link>
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
