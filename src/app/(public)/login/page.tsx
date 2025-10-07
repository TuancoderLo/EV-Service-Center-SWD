"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { login } from "@/services/auth";
import { useAuthStore } from "@/stores/auth";
import { LoadingButton } from "@/components/ui/LoadingSpinner";
import { ErrorMessage } from "@/components/ui/ErrorBoundary";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const setAuth = useAuthStore((s) => s.setAuth);
  const router = useRouter();
  const next = useSearchParams().get("next") || "/dashboard";
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setErr("");
    try {
      const res = await login(data);
      setAuth(res.user, res.access_token ?? null);
      router.push(next);
    } catch (e: unknown) {
      const error = e as { response?: { data?: { message?: string } } };
      setErr(error?.response?.data?.message || "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-16 space-y-3">
      <h1 className="text-xl font-semibold">Đăng nhập</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input
          className="w-full border p-2 rounded"
          placeholder="Email"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-600 text-sm">{errors.email.message}</p>
        )}
        <input
          className="w-full border p-2 rounded"
          type="password"
          placeholder="Mật khẩu"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-600 text-sm">{errors.password.message}</p>
        )}
        {err && <ErrorMessage message={err} onRetry={() => setErr("")} />}
        <LoadingButton
          loading={loading}
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          Đăng nhập
        </LoadingButton>
      </form>
    </div>
  );
}
