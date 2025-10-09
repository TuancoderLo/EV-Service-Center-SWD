import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ServicesSection() {
  const services = [
    {
      icon: "⚡",
      title: "Electric Vehicle Maintenance",
      description:
        "Comprehensive EV care with cutting-edge diagnostic tools and specialized technicians",
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/10",
      borderColor: "border-yellow-400/20",
    },
    {
      icon: "�",
      title: "Battery Health Check",
      description:
        "Advanced battery analysis and optimization to maximize your EV's performance and lifespan",
      color: "text-green-400",
      bgColor: "bg-green-400/10",
      borderColor: "border-green-400/20",
    },
    {
      icon: "🌱",
      title: "Eco-Friendly Solutions",
      description:
        "Sustainable practices and green technologies for environmentally conscious vehicle care",
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
      borderColor: "border-blue-400/20",
    },
    {
      icon: "�",
      title: "Smart Monitoring",
      description:
        "Real-time vehicle health tracking with AI-powered insights and predictive maintenance",
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
      borderColor: "border-purple-400/20",
    },
  ];

  return (
    <section
      id="services"
      className="py-24 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_80%,rgba(34,197,94,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(59,130,246,0.1),transparent_50%)]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block">
            <Badge
              variant="secondary"
              className="text-primary font-semibold text-lg mb-4"
            >
              Our Services
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Complete{" "}
              <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                EV Care
              </span>
            </h2>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            From routine maintenance to advanced diagnostics, we provide
            everything your electric vehicle needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className={`group relative bg-white/5 backdrop-blur-sm border ${service.borderColor} hover:border-white/20 transition-all duration-500 hover:transform hover:scale-105`}
            >
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

              <CardHeader className="relative z-10 pb-4">
                <div
                  className={`w-16 h-16 ${service.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <span className={`text-2xl ${service.color}`}>
                    {service.icon}
                  </span>
                </div>

                <CardTitle className="text-white group-hover:text-primary transition-colors">
                  {service.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="relative z-10 pt-0">
                <p className="text-gray-300 leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-700 shadow-lg hover:shadow-primary/25"
          >
            Explore All Services
          </Button>
        </div>
      </div>
    </section>
  );
}
