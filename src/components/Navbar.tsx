"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuthStore } from "@/stores/auth";

// ✅ THÊM: NavLink component với hiệu ứng hover đẹp
function NavLink({
  href,
  children,
  isScrolled,
}: {
  href: string;
  children: React.ReactNode;
  isScrolled: boolean;
}) {
  return (
    <Link
      href={href}
      className={`relative px-4 py-2 text-white/90 hover:text-white transition-all duration-300 font-medium group ${
        isScrolled ? "text-sm" : "text-base"
      }`}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-white/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 backdrop-blur-sm"></div>
      <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-green-400 group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
    </Link>
  );
}

// ✅ THÊM: MobileNavLink component cho mobile menu
function MobileNavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block text-white/90 hover:text-white px-4 py-3 rounded-lg hover:bg-white/10 transition-all duration-300 font-medium"
    >
      {children}
    </Link>
  );
}

// ✅ THÊM: UserAvatar dropdown component
function UserAvatar({
  user,
  onLogout,
  getDashboardUrl,
  isScrolled,
}: {
  user: any;
  onLogout: () => void;
  getDashboardUrl: (role: string) => string;
  isScrolled: boolean;
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Truncate long names
  const truncatedName =
    user.name.length > 12 ? `${user.name.substring(0, 12)}...` : user.name;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar Button */}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className={`flex items-center space-x-3 px-3 py-2 rounded-xl transition-all duration-300 hover:scale-105 ${
          isScrolled
            ? "bg-gray-100 hover:bg-gray-200 text-gray-900"
            : "bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/20"
        }`}
      >
        {/* Avatar */}
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
            user.role === "admin"
              ? "bg-gradient-to-br from-red-500 to-red-600"
              : user.role === "staff"
                ? "bg-gradient-to-br from-blue-500 to-blue-600"
                : user.role === "technician"
                  ? "bg-gradient-to-br from-orange-500 to-orange-600"
                  : "bg-gradient-to-br from-purple-500 to-purple-600"
          }`}
        >
          {user.name.charAt(0).toUpperCase()}
        </div>

        {/* Name */}
        <span
          className={`font-medium whitespace-nowrap ${
            isScrolled ? "text-gray-900" : "text-white"
          }`}
        >
          {truncatedName}
        </span>

        {/* Dropdown Arrow */}
        <svg
          className={`w-4 h-4 transition-transform duration-300 ${
            isDropdownOpen ? "rotate-180" : ""
          } ${isScrolled ? "text-gray-600" : "text-white/80"}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <Card className="absolute right-0 mt-2 w-56 shadow-2xl border-border/40 py-2 z-50 animate-in fade-in slide-in-from-top-5 duration-200">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                  user.role === "admin"
                    ? "bg-gradient-to-br from-red-500 to-red-600"
                    : user.role === "staff"
                      ? "bg-gradient-to-br from-blue-500 to-blue-600"
                      : user.role === "technician"
                        ? "bg-gradient-to-br from-orange-500 to-orange-600"
                        : "bg-gradient-to-br from-purple-500 to-purple-600"
                }`}
              >
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-sm">
                  {user.name}
                </div>
                <div className="text-xs text-gray-500">{user.email}</div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            {/* Personal Info */}
            <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              <svg
                className="w-4 h-4 mr-3 text-gray-400"
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
              Thông tin cá nhân
            </button>

            {/* Dashboard */}
            <Link
              href={getDashboardUrl(user.role)}
              className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => setIsDropdownOpen(false)}
            >
              <svg
                className="w-4 h-4 mr-3 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              Dashboard
            </Link>

            {/* Booking History - Only for members */}
            {user.role === "member" && (
              <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                <svg
                  className="w-4 h-4 mr-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
                Lịch sử đặt lịch
              </button>
            )}

            <div className="border-t border-gray-100 my-1"></div>

            {/* Sign Out */}
            <button
              onClick={() => {
                onLogout();
                setIsDropdownOpen(false);
              }}
              className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <svg
                className="w-4 h-4 mr-3 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Đăng xuất
            </button>
          </div>
        </Card>
      )}
    </div>
  );
}

export default function Navbar() {
  const { user, clear } = useAuthStore();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // ✅ THÊM: Theo dõi scroll để thay đổi navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logout = () => {
    clear();
    router.push("/");
  };

  const getDashboardUrl = (role: string): string => {
    switch (role) {
      case "admin":
        return "/admin/dashboard";
      case "staff":
        return "/staff/dashboard";
      case "technician":
        return "/technician/dashboard";
      case "member":
        return "/member/dashboard";
      default:
        return "/";
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-gray-900/95 backdrop-blur-md border-b border-white/10 shadow-2xl"
          : "bg-transparent"
      }`}
    >
      <div
        className={`container mx-auto px-6 transition-all duration-300 ${
          isScrolled ? "py-4" : "py-6"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 text-white hover:text-green-400 transition-all duration-300 group"
          >
            <div
              className={`bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 ${
                isScrolled ? "w-8 h-8" : "w-10 h-10"
              }`}
            >
              <span className="text-white font-bold text-xl">⚡</span>
            </div>
            <div className="flex flex-col">
              <span
                className={`font-bold transition-all duration-300 ${
                  isScrolled ? "text-lg" : "text-xl"
                }`}
              >
                EV Service
              </span>
              <span
                className={`text-green-400 text-xs font-medium transition-all duration-300 ${
                  isScrolled ? "opacity-0 -mt-2" : "opacity-100"
                }`}
              >
                Future of EV Care
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink href="#overview" isScrolled={isScrolled}>
              Overview
            </NavLink>
            <NavLink href="#features" isScrolled={isScrolled}>
              Features
            </NavLink>
            <NavLink href="#services" isScrolled={isScrolled}>
              Services
            </NavLink>
            <NavLink href="#about" isScrolled={isScrolled}>
              About
            </NavLink>

            {user && (
              <Button
                asChild
                variant="outline"
                className="ml-4 bg-primary/20 text-primary border-primary/30 hover:bg-primary/30 hover:text-primary"
              >
                <Link href={getDashboardUrl(user.role)}>Dashboard</Link>
              </Button>
            )}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-3">
            {!user ? (
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  asChild
                  className={
                    isScrolled
                      ? "text-gray-700 hover:text-blue-600"
                      : "text-white/90 hover:text-white"
                  }
                >
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button
                  asChild
                  className="bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-600 rounded-full shadow-lg hover:shadow-primary/25"
                >
                  <Link href="/register">Get Started</Link>
                </Button>
              </div>
            ) : (
              <UserAvatar
                user={user}
                onLogout={logout}
                getDashboardUrl={getDashboardUrl}
                isScrolled={isScrolled}
              />
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden relative p-2 text-white bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
          >
            <svg
              className="w-6 h-6 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                  className="animate-pulse"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/20 animate-in slide-in-from-top-2 duration-300">
            <div className="space-y-2 pt-4">
              <MobileNavLink
                href="#overview"
                onClick={() => setIsMenuOpen(false)}
              >
                Overview
              </MobileNavLink>
              <MobileNavLink
                href="#features"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </MobileNavLink>
              <MobileNavLink
                href="#services"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </MobileNavLink>
              <MobileNavLink href="#about" onClick={() => setIsMenuOpen(false)}>
                About
              </MobileNavLink>

              {user ? (
                <>
                  <Link
                    href={getDashboardUrl(user.role)}
                    onClick={() => setIsMenuOpen(false)}
                    className="block bg-green-500/20 text-green-400 px-4 py-3 rounded-lg hover:bg-green-500/30 transition-all duration-300 font-medium border border-green-500/30"
                  >
                    📊 Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left bg-red-500/20 text-red-400 px-4 py-3 rounded-lg hover:bg-red-500/30 transition-all duration-300 font-medium border border-red-500/30"
                  >
                    🚪 Sign Out
                  </button>
                </>
              ) : (
                <div className="space-y-2 pt-2">
                  <Link
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block bg-white/10 text-white px-4 py-3 rounded-lg hover:bg-white/20 transition-all duration-300 text-center font-medium border border-white/20"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="block bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-3 rounded-lg hover:from-green-600 hover:to-blue-600 transition-all duration-300 text-center font-medium shadow-lg"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
