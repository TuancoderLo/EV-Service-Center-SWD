"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/stores/auth";

export default function HeroSection() {
  const { user } = useAuthStore();

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-green-900 relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="text-white space-y-8">
            <div className="space-y-2">
              <Badge
                variant="secondary"
                className="bg-primary/20 text-primary border-primary/30"
              >
                DESIGN SMARTER, NOT HARDER
              </Badge>
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="text-primary">EV Service</span> will
                <br />
                take you places
                <br />
                <span className="text-white">technology can&apos;t</span>
              </h1>
            </div>

            <p className="text-xl text-gray-300 max-w-lg leading-relaxed">
              Trung tâm bảo dưỡng xe điện tiên tiến với công nghệ AI và đội ngũ
              kỹ thuật viên chuyên nghiệp. Nơi công nghệ gặp gỡ sự chăm sóc tận
              tâm.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {!user ? (
                <>
                  <Button
                    asChild
                    size="lg"
                    className="bg-white text-gray-900 hover:bg-gray-100 rounded-full px-8"
                  >
                    <Link href="/register">Schedule a Demo</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white hover:text-gray-900 rounded-full px-8"
                  >
                    <Link href="/login">Contact Sales</Link>
                  </Button>
                </>
              ) : user.role === "member" ? (
                <>
                  <Button
                    asChild
                    size="lg"
                    className="bg-primary hover:bg-primary/90 rounded-full px-8"
                  >
                    <Link href="/member/dashboard">📊 My Dashboard</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-primary text-primary hover:bg-primary hover:text-white rounded-full px-8"
                  >
                    <Link href="#services">🔧 Book Service</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    asChild
                    size="lg"
                    className="bg-primary hover:bg-primary/90 rounded-full px-8"
                  >
                    <Link href={`/${user.role}/dashboard`}>
                      📊 Go to Dashboard
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white hover:text-gray-900 rounded-full px-8"
                  >
                    <Link href="#services">🔧 View Services</Link>
                  </Button>
                </>
              )}
            </div>

            {/* Welcome Message for Logged Users */}
            {user && (
              <Card className="mt-8 bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-6">
                  <p className="text-primary text-lg">
                    👋 Welcome back,{" "}
                    <span className="font-bold text-white">{user.name}</span>!
                  </p>
                  <p className="text-gray-300 mt-1">
                    Ready to experience the future of EV service?
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Content - Device Mockups */}
          <div className="relative">
            <div className="relative z-10">
              {/* Phone Mockups */}
              <div className="relative">
                {/* Phone 1 */}
                <div className="relative z-20 transform rotate-12 hover:rotate-6 transition-transform duration-500">
                  <div className="w-64 h-128 bg-gray-800 rounded-3xl p-2 shadow-2xl">
                    <div className="w-full h-full bg-gray-900 rounded-2xl p-4 overflow-hidden">
                      <div className="text-center text-white space-y-4">
                        <div className="w-12 h-12 bg-green-500 rounded-xl mx-auto flex items-center justify-center">
                          <span className="text-2xl">⚡</span>
                        </div>
                        <h3 className="font-bold">EV Dashboard</h3>
                        <div className="space-y-2">
                          <div className="h-2 bg-green-500 rounded-full"></div>
                          <div className="h-2 bg-gray-700 rounded-full"></div>
                          <div className="h-2 bg-gray-700 rounded-full w-3/4"></div>
                        </div>
                        <div className="text-green-400 text-sm">
                          Battery: 95%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phone 2 */}
                <div className="absolute -top-8 -right-8 transform -rotate-12 hover:-rotate-6 transition-transform duration-500">
                  <div className="w-56 h-112 bg-gray-800 rounded-3xl p-2 shadow-2xl">
                    <div className="w-full h-full bg-gray-900 rounded-2xl p-4 overflow-hidden">
                      <div className="text-center text-white space-y-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-xl mx-auto flex items-center justify-center">
                          <span className="text-xl">🔧</span>
                        </div>
                        <h3 className="font-bold text-sm">Service Status</h3>
                        <div className="space-y-2">
                          <div className="h-1.5 bg-blue-500 rounded-full"></div>
                          <div className="h-1.5 bg-gray-700 rounded-full"></div>
                          <div className="h-1.5 bg-gray-700 rounded-full w-2/3"></div>
                        </div>
                        <div className="text-blue-400 text-xs">In Progress</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-12 left-12 w-6 h-6 bg-green-500 rounded-full animate-pulse"></div>
              <div className="absolute top-32 -left-6 w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-300"></div>
              <div className="absolute -bottom-8 right-24 w-8 h-8 bg-purple-500 rounded-full animate-pulse delay-500"></div>
            </div>

            {/* Gradient Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/30 to-blue-500/30 blur-3xl -z-10 animate-pulse"></div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
          <div className="text-green-400 animate-bounce">
            <div className="w-8 h-12 border-2 border-green-400 rounded-full mx-auto mb-2 relative">
              <div className="w-1 h-3 bg-green-400 rounded-full mx-auto mt-2 animate-pulse"></div>
            </div>
            <p className="text-sm font-medium">Scroll down</p>
          </div>
        </div>
      </div>
    </section>
  );
}
