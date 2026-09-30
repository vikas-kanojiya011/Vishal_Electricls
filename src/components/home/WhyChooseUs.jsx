import React from "react";
import { ShieldCheck, Clock, BadgePercent, CheckCircle, Cpu, Wrench } from "lucide-react";

export default function WhyChooseUs() {
  const reasons = [
    {
      icon: ShieldCheck,
      title: "Government-Licensed Wiremen",
      desc: "All technicians carry valid Maharashtra PWD electrical wireman licenses and rigorous background clearance."
    },
    {
      icon: Clock,
      title: "30-Min Rapid Doorstep Arrival",
      desc: "With localized dispatch hubs across Borivali, Dahisar, Kandivali & Malad, emergency help reaches you swiftly."
    },
    {
      icon: BadgePercent,
      title: "Transparent & Upfront Pricing",
      desc: "No inflated post-inspection bills. You approve clear upfront rate charts before any wire is stripped."
    },
    {
      icon: CheckCircle,
      title: "30-Day Service Guarantee",
      desc: "If any installed point or repaired circuit shows issues within 30 days, we fix it free with zero hassle."
    },
    {
      icon: Cpu,
      title: "Digital Fault Diagnosis",
      desc: "We don't guess. We pinpoint short circuits and insulation leakage with calibrated insulation megger testers."
    },
    {
      icon: Wrench,
      title: "Only Genuine ISI Materials",
      desc: "We strictly supply authentic, fire-resistant Polycab, Finolex cables and certified Schneider/Legrand MCBs."
    }
  ];

  return (
    <section className="section" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="container">
        <div className="section-header">
          <div className="section-badge gold">
            <CheckCircle size={15} />
            <span>The Vishal Electricals Standard</span>
          </div>
          <h2 className="section-title">Why Mumbai Trusts Vishal Electricals</h2>
          <p className="section-desc">
            We bridge the gap between unreliable local handymen and overpriced corporate apps with dependable, licensed neighborhood masters.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2rem"
          }}
        >
          {reasons.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="card"
                style={{
                  padding: "2rem",
                  display: "flex",
                  gap: "1.25rem",
                  alignItems: "flex-start"
                }}
              >
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "12px",
                    background: "rgba(0, 180, 216, 0.12)",
                    color: "#00B4D8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}
                >
                  <IconComponent size={26} />
                </div>
                <div>
                  <h3 style={{ fontSize: "1.15rem", marginBottom: "0.4rem", color: "#0B192C" }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: "0.9rem", color: "#64748B", lineHeight: "1.6" }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
