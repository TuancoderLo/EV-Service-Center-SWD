import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="py-20 px-4 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          EV Service Center
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Trung tâm bảo dưỡng xe điện hàng đầu với dịch vụ chuyên nghiệp và công
          nghệ tiên tiến
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/login"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg"
          >
            Đăng nhập
          </Link>
          <Link
            href="/register"
            className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium shadow-lg"
          >
            Đăng ký ngay
          </Link>
        </div>
      </div>
    </section>
  );
}
