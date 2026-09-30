import React from "react";
import { Link } from "react-router-dom";
import { servicesData } from "../../data/servicesData";
import ServiceIcon from "../common/ServiceIcon";
import { Check, ArrowRight, Shield } from "lucide-react";

export default function PopularServices() {
  // Show popular or top 6 services on home page
  const popularList = servicesData.filter((s) => s.popular).slice(0, 6);

  return (
    <section className="section" id="popular-services">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <Shield size={15} />
            <span>Certified Workmanship</span>
          </div>
          <h2 className="section-title">Popular Electrical Services</h2>
          <p className="section-desc">
            Fast, reliable doorstep assistance for everyday electrical repairs, safety upgrades, and appliance installations.
          </p>
        </div>

        <div className="services-grid">
          {popularList.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-card-top">
                <div className="service-icon-wrap">
                  <ServiceIcon name={service.icon} size={28} />
                </div>
                {service.badge && (
                  <span className={`badge ${service.id === "electrical-fault-repair" ? "badge-red" : "badge-gold"}`}>
                    {service.badge}
                  </span>
                )}
              </div>

              <h3 className="service-name">{service.name}</h3>
              <p className="service-short-desc">{service.shortDesc}</p>

              <ul className="service-features-list">
                {service.features.slice(0, 3).map((feat, idx) => (
                  <li key={idx}>
                    <Check size={14} />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <div className="service-card-footer">
                <div className="price-container">
                  <span className="price-label">Starting From</span>
                  <span className="price-amount">₹{service.startingPrice}</span>
                  <span className="price-unit">{service.priceUnit}</span>
                </div>

                <Link
                  to={`/book?service=${service.id}`}
                  className="btn btn-primary btn-sm"
                  id={`book-service-${service.id}`}
                >
                  <span>Book Now</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <Link to="/services" className="btn btn-outline btn-lg">
            <span>Explore All 10 Electrical Services & Rates</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
