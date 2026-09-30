import React, { useState } from "react";
import { Link } from "react-router-dom";
import { servicesData, serviceCategories } from "../data/servicesData";
import ServiceIcon from "../components/common/ServiceIcon";
import PriceEstimator from "../components/common/PriceEstimator";
import EmergencyBanner from "../components/common/EmergencyBanner";
import { Check, ArrowRight, ShieldCheck, Clock, Award } from "lucide-react";

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Services");

  const filteredServices = servicesData.filter((svc) => {
    if (selectedCategory === "All Services") return true;
    return svc.category === selectedCategory;
  });

  return (
    <div className="services-page">
      {/* Page Header */}
      <section className="section-sm" style={{ background: "linear-gradient(135deg, #070E1B 0%, #0B192C 100%)", color: "#FFFFFF" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <div className="section-badge gold">
            <ShieldCheck size={14} />
            <span>Standardized Rates & Guaranteed Spares</span>
          </div>
          <h1 style={{ color: "#FFFFFF", marginBottom: "0.75rem" }}>Our Electrical Services</h1>
          <p style={{ color: "#CBD5E1", maxWidth: "680px", margin: "0 auto", fontSize: "1.1rem" }}>
            From emergency repairs to end-to-end residential wiring, discover full pricing and specifications for our 10 professional electrical services.
          </p>
        </div>
      </section>

      {/* Main Catalog Section */}
      <section className="section" style={{ backgroundColor: "#F8FAFC" }}>
        <div className="container">
          {/* Category Filter Pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", justifyContent: "center", marginBottom: "3rem" }}>
            {serviceCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`area-tag-btn ${selectedCategory === cat ? "active" : ""}`}
                style={{ fontSize: "0.9rem", padding: "0.5rem 1.1rem" }}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 10 Services Grid */}
          <div className="services-grid">
            {filteredServices.map((service) => (
              <div key={service.id} className="service-card">
                <div className="service-card-top">
                  <div className="service-icon-wrap">
                    <ServiceIcon name={service.icon} size={28} />
                  </div>
                  {service.badge && (
                    <span
                      className={`badge ${
                        service.id === "electrical-fault-repair"
                          ? "badge-red"
                          : service.badge === "Safety Essential"
                          ? "badge-purple"
                          : "badge-gold"
                      }`}
                    >
                      {service.badge}
                    </span>
                  )}
                </div>

                <h3 className="service-name">{service.name}</h3>
                <p className="service-short-desc">{service.shortDesc}</p>

                <div style={{ display: "flex", gap: "1rem", fontSize: "0.8rem", color: "#64748B", marginBottom: "1rem" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
                    <Clock size={13} /> {service.estimatedTime}
                  </span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
                    <ShieldCheck size={13} color="#10B981" /> {service.warranty}
                  </span>
                </div>

                <ul className="service-features-list">
                  {service.features.map((feat, idx) => (
                    <li key={idx}>
                      <Check size={14} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <div className="service-card-footer">
                  <div className="price-container">
                    <span className="price-label">Starting Rate</span>
                    <span className="price-amount">₹{service.startingPrice}</span>
                    <span className="price-unit">{service.priceUnit}</span>
                  </div>

                  <Link
                    to={`/book?service=${service.id}`}
                    className="btn btn-primary btn-sm"
                    id={`book-catalog-${service.id}`}
                  >
                    <span>Book Now</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Dynamic Price Estimator Feature */}
          <div style={{ marginTop: "5rem" }}>
            <PriceEstimator />
          </div>
        </div>
      </section>

      {/* Emergency Callout */}
      <EmergencyBanner />
    </div>
  );
}
