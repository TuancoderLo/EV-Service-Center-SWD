"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

import { LoadingButton } from "@/components/ui/LoadingSpinner";
import { forgotPassword } from "@/services/auth";

const schema = z.object({
  email: z.string().email("Email không hợp lệ"),
});
type FormData = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setMsg("");

    try {
      const result = await forgotPassword(data.email);
      setMsg(result.message);

      // Chuyển sang trang reset password sau 3s
      setTimeout(() => {
        router.push(`/reset-password?email=${encodeURIComponent(data.email)}`);
      }, 3000);
    } catch (e: unknown) {
      const error = e as { message?: string };
      setMsg(error?.message || "Có lỗi xảy ra. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Quên mật khẩu
          </h1>
          <p className="text-gray-600">Nhập email hoặc username để khôi phục</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none transition-all duration-200"
              placeholder="your@email.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Success/Error Message */}
          {msg && (
            <div
              className={`rounded-lg p-4 ${msg.includes("thành công") ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}
            >
              <div className="flex items-start">
                {msg.includes("thành công") ? (
                  <svg
                    className="w-5 h-5 text-green-500 mt-0.5 mr-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5 text-red-500 mt-0.5 mr-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                <div className="flex-1">
                  <p
                    className={`text-sm ${msg.includes("thành công") ? "text-green-700" : "text-red-700"}`}
                  >
                    {msg}
                  </p>
                  {!msg.includes("thành công") && (
                    <button
                      type="button"
                      onClick={() => setMsg("")}
                      className="text-red-600 text-sm underline hover:no-underline mt-1"
                    >
                      Đóng
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <LoadingButton
            loading={loading}
            type="submit"
            className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Đang xử lý..." : "Gửi yêu cầu"}
          </LoadingButton>
        </form>

        {/* Footer Links */}
        <div className="mt-8 text-center space-y-4">
          <p className="text-gray-600 text-sm">
            Nhớ lại mật khẩu?{" "}
            <Link
              href="/login"
              className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
            >
              Đăng nhập
            </Link>
          </p>

          <p className="text-gray-500 text-xs">
            <Link href="/" className="hover:text-gray-700 hover:underline">
              ← Về trang chủ
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
