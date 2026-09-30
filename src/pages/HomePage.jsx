import React from "react";
import HeroSection from "../components/home/HeroSection";
import EmergencyBanner from "../components/common/EmergencyBanner";
import ServiceAreaChecker from "../components/common/ServiceAreaChecker";
import PopularServices from "../components/home/PopularServices";
import WhyChooseUs from "../components/home/WhyChooseUs";
import HowItWorks from "../components/home/HowItWorks";
import ElectricianShowcase from "../components/home/ElectricianShowcase";
import CustomerReviews from "../components/home/CustomerReviews";
import RecentProjects from "../components/home/RecentProjects";

export default function HomePage() {
  return (
    <div className="home-page">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Emergency Electrical Service Banner */}
      <EmergencyBanner />

      {/* 3. Service Area Checker */}
      <section className="section-sm" style={{ backgroundColor: "#F1F5F9" }}>
        <div className="container">
          <ServiceAreaChecker />
        </div>
      </section>

      {/* 4. Popular Services */}
      <PopularServices />

      {/* 5. Why Choose Us */}
      <WhyChooseUs />

      {/* 6. How It Works */}
      <HowItWorks />

      {/* 7. Verified Electrician Profiles Showcase */}
      <ElectricianShowcase />

      {/* 8. Recent Projects Preview */}
      <RecentProjects />

      {/* 9. Customer Reviews & Write a Review Form */}
      <CustomerReviews />
    </div>
  );
}
