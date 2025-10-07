export default function ServicesSection() {
  const services = [
    {
      icon: "📋",
      title: "Quản lý đặt lịch",
      description: "Hệ thống đặt lịch thông minh",
    },
    {
      icon: "📊",
      title: "Theo dõi quy trình",
      description: "Giám sát tiến độ bảo dưỡng",
    },
    {
      icon: "🔧",
      title: "Quản lý phụ tùng",
      description: "Kiểm soát tồn kho thông minh",
    },
    {
      icon: "👥",
      title: "Quản lý nhân sự",
      description: "Phân công ca làm hiệu quả",
    },
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          Các tính năng nổi bật
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <div className="text-3xl mb-3">{service.icon}</div>
              <h4 className="font-semibold mb-2">{service.title}</h4>
              <p className="text-sm text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
