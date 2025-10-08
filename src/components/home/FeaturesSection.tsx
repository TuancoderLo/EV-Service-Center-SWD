export default function FeaturesSection() {
  const features = [
    {
      icon: "🤖",
      title: "AI-Powered Diagnostics",
      description: "Chẩn đoán thông minh với công nghệ AI tiên tiến, phát hiện sự cố nhanh chóng và chính xác",
      gradient: "from-blue-500 to-cyan-400"
    },
    {
      icon: "⚡",
      title: "Lightning Fast Service", 
      description: "Bảo trì nhanh chóng với quy trình tự động hóa, tiết kiệm thời gian tối đa cho khách hàng",
      gradient: "from-green-500 to-emerald-400"
    },
    {
      icon: "�",
      title: "Secure & Reliable",
      description: "An toàn tuyệt đối với hệ thống bảo mật cao cấp, đảm bảo thông tin khách hàng được bảo vệ",
      gradient: "from-purple-500 to-pink-400"
    },
    {
      icon: "📱",
      title: "Mobile First",
      description: "Theo dõi và quản lý mọi lúc mọi nơi trên điện thoại với ứng dụng di động hiện đại",
      gradient: "from-orange-500 to-red-400"
    }
  ];

  return (
    <section id="features" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Why choose <span className="text-green-500">EV Service</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Trải nghiệm dịch vụ xe điện tương lai với công nghệ tiên tiến nhất
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-2xl">{feature.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
