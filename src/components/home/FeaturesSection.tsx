export default function FeaturesSection() {
  const features = [
    {
      icon: "📅",
      title: "Đặt lịch trực tuyến",
      description:
        "Đặt lịch bảo dưỡng xe điện dễ dàng, nhanh chóng qua website với giao diện thân thiện",
    },
    {
      icon: "🔍",
      title: "Theo dõi tiến độ",
      description:
        "Theo dõi tình trạng xe của bạn theo thời gian thực, nhận thông báo khi hoàn thành",
    },
    {
      icon: "👨‍🔧",
      title: "Kỹ thuật viên chuyên nghiệp",
      description:
        "Đội ngũ kỹ thuật viên được đào tạo chuyên sâu về xe điện với nhiều năm kinh nghiệm",
    },
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          Dịch vụ của chúng tôi
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 bg-gray-50 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
