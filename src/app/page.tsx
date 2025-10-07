import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            EV Service Center
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Trung tâm bảo dưỡng xe điện hàng đầu với dịch vụ chuyên nghiệp và
            công nghệ tiên tiến
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

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Dịch vụ của chúng tôi
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">📅</div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Đặt lịch trực tuyến
              </h3>
              <p className="text-gray-600">
                Đặt lịch bảo dưỡng xe điện dễ dàng, nhanh chóng qua website với
                giao diện thân thiện
              </p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Theo dõi tiến độ
              </h3>
              <p className="text-gray-600">
                Theo dõi tình trạng xe của bạn theo thời gian thực, nhận thông
                báo khi hoàn thành
              </p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">👨‍🔧</div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Kỹ thuật viên chuyên nghiệp
              </h3>
              <p className="text-gray-600">
                Đội ngũ kỹ thuật viên được đào tạo chuyên sâu về xe điện với
                nhiều năm kinh nghiệm
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Các tính năng nổi bật
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl mb-3">📋</div>
              <h4 className="font-semibold mb-2">Quản lý đặt lịch</h4>
              <p className="text-sm text-gray-600">
                Hệ thống đặt lịch thông minh
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl mb-3">📊</div>
              <h4 className="font-semibold mb-2">Theo dõi quy trình</h4>
              <p className="text-sm text-gray-600">
                Giám sát tiến độ bảo dưỡng
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl mb-3">🔧</div>
              <h4 className="font-semibold mb-2">Quản lý phụ tùng</h4>
              <p className="text-sm text-gray-600">
                Kiểm soát tồn kho thông minh
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl mb-3">👥</div>
              <h4 className="font-semibold mb-2">Quản lý nhân sự</h4>
              <p className="text-sm text-gray-600">Phân công ca làm hiệu quả</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
    </div>
  );
}
