"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { register as registerApi } from "@/services/auth";
import { LoadingButton } from "@/components/ui/LoadingSpinner";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});
type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
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
      await registerApi(data);
      setMsg("Đăng ký thành công — chuyển tới đăng nhập…");
      setTimeout(() => router.push("/login"), 800);
    } catch (e: unknown) {
      const error = e as { response?: { data?: { message?: string } } };
      setMsg(error?.response?.data?.message || "Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-16 space-y-3">
      <h1 className="text-xl font-semibold">Đăng ký</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input
          className="w-full border p-2 rounded"
          placeholder="Họ tên"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-red-600 text-sm">{errors.name.message}</p>
        )}
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
        {msg && (
          <div className={`p-3 rounded-md ${
            msg.includes('thành công') 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {msg}
          </div>
        )}
        <LoadingButton
          loading={loading}
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition-colors disabled:opacity-50"
        >
          Tạo tài khoản
        </LoadingButton>
      </form>
    </div>
  );
}
