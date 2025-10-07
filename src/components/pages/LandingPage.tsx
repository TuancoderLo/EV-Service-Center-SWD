import {
  HeroSection,
  FeaturesSection,
  ServicesSection,
  CTASection,
} from "@/components/home";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <HeroSection />
      <FeaturesSection />
      <ServicesSection />
      <CTASection />
    </div>
  );
}
