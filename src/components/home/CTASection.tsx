import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-16 px-4 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Sẵn sàng bắt đầu?</h2>
        <p className="text-xl mb-8 text-gray-300">
          Đăng ký ngay để trải nghiệm dịch vụ bảo dưỡng xe điện tốt nhất
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/register"
            className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium text-lg shadow-lg"
          >
            Tạo tài khoản miễn phí
          </Link>
          <Link
            href="/login"
            className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-gray-900 transition-colors font-medium text-lg"
          >
            Đăng nhập ngay
          </Link>
        </div>
      </div>
    </section>
  );
}
