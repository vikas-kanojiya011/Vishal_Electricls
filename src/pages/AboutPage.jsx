import React from "react";
import { Link } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import {
  ShieldCheck,
  Award,
  Users,
  CheckCircle2,
  Star,
  ArrowRight,
  Zap
} from "lucide-react";
import { formatRating } from "../components/common/StarRating";

export default function AboutPage() {
  const { electricians } = useBooking();

  return (
    <div className="about-page">
      {/* Header */}
      <section className="section-sm" style={{ background: "linear-gradient(135deg, #070E1B 0%, #0B192C 100%)", color: "#FFFFFF" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <div className="section-badge gold">
            <ShieldCheck size={14} />
            <span>Serving Mumbai Since 2014</span>
          </div>
          <h1 style={{ color: "#FFFFFF", marginBottom: "0.75rem" }}>About Vishal Electricals</h1>
          <p style={{ color: "#CBD5E1", maxWidth: "680px", margin: "0 auto", fontSize: "1.1rem" }}>
            “Reliable Electrical Solutions at Your Doorstep” — Founded by master wiremen to provide honest, certified, and rapid electrical services for homes and offices.
          </p>
        </div>
      </section>

      {/* Story & Company Overview */}
      <section className="section" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "3.5rem", alignItems: "center" }}>
            <div>
              <div className="section-badge">
                <span>Our Heritage</span>
              </div>
              <h2 style={{ fontSize: "2.1rem", marginBottom: "1.25rem", color: "#0B192C" }}>
                12 Years of Trusted Electrical Craftsmanship in Mumbai
              </h2>
              <p style={{ color: "#475569", fontSize: "1.05rem", lineHeight: "1.7", marginBottom: "1rem" }}>
                Started in 2014 from our main workshop at Cartan Road No. 8, Sukkarwadi, Borivali East, <strong>Vishal Electricals</strong> was established with a singular vision: eliminate the anxiety of hiring unqualified handymen who cut corners on safety and overcharge during blackouts.
              </p>
              <p style={{ color: "#475569", fontSize: "1.05rem", lineHeight: "1.7", marginBottom: "1.75rem" }}>
                Today, we have grown into a network of 18 government-licensed electrical wiremen covering the entire Mumbai Western Railway Corridor from Virar to Churchgate. Having successfully powered over 10,000 homes, clinics, and offices, we remain dedicated to our core principles of safety, punctuality, and upfront pricing.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", borderTop: "1px solid #E2E8F0", paddingTop: "1.5rem" }}>
                <div>
                  <div style={{ fontSize: "2rem", fontWeight: 800, color: "#0B192C", fontFamily: "var(--font-heading)" }}>
                    10,000+
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "#64748B" }}>Mumbai Homes Repaired</div>
                </div>
                <div>
                  <div style={{ fontSize: "2rem", fontWeight: 800, color: "#F59E0B", fontFamily: "var(--font-heading)" }}>
                    100%
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "#64748B" }}>PWD Wireman Certified</div>
                </div>
              </div>
            </div>

            <div style={{ position: "relative" }}>
              <img
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&auto=format&fit=crop&q=80"
                alt="Vishal Electricals certified technicians working on panel"
                style={{ borderRadius: "20px", boxShadow: "var(--shadow-xl)", width: "100%", height: "420px", objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "-25px",
                  left: "20px",
                  background: "#0B192C",
                  color: "#FFFFFF",
                  padding: "1.2rem 1.5rem",
                  borderRadius: "14px",
                  boxShadow: "var(--shadow-lg)",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem"
                }}
              >
                <Award size={32} color="#F59E0B" />
                <div>
                  <div style={{ fontWeight: 800, fontSize: "1.1rem" }}>ISO 9001:2015</div>
                  <div style={{ fontSize: "0.8rem", color: "#94A3B8" }}>Safety & Quality Certified</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Protocols */}
      <section className="section" style={{ backgroundColor: "#F8FAFC" }}>
        <div className="container">
          <div className="section-header">
            <div className="section-badge emergency">
              <Zap size={14} />
              <span>Zero-Compromise Safety</span>
            </div>
            <h2 className="section-title">Our 4-Pillar Electrical Safety Standard</h2>
            <p className="section-desc">
              Every job undertaken follows Indian Electricity Rules and strict fire-prevention safety protocols.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.75rem" }}>
            {[
              {
                title: "Calibrated Insulation Megger Testing",
                desc: "We verify cable insulation resistance before energizing circuits, preventing hidden fires behind walls."
              },
              {
                title: "30mA Human Shock Protection (RCCB)",
                desc: "We audit distribution boards to ensure human-rated earth leakage breakers trip within 30 milliseconds."
              },
              {
                title: "Strict Genuine ISI FRLS Copper Cables",
                desc: "We refuse cheap counterfeit aluminum cables. Only genuine Polycab / Finolex fire-retardant wires are used."
              },
              {
                title: "Chemical & Copper Earthing Audit",
                desc: "Every installation includes ground fault loop impedance check to guarantee safe voltage dissipation."
              }
            ].map((p, idx) => (
              <div key={idx} className="card" style={{ padding: "2rem" }}>
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "10px",
                    background: "rgba(16, 185, 129, 0.12)",
                    color: "#10B981",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1rem"
                  }}
                >
                  <CheckCircle2 size={22} />
                </div>
                <h3 style={{ fontSize: "1.15rem", color: "#0B192C", marginBottom: "0.5rem" }}>{p.title}</h3>
                <p style={{ fontSize: "0.9rem", color: "#64748B", lineHeight: "1.6" }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All 5 Electrician Profiles */}
      <section className="section" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="container">
          <div className="section-header">
            <div className="section-badge">
              <Users size={14} />
              <span>Certified Team</span>
            </div>
            <h2 className="section-title">Our Master Electricians & Technicians</h2>
            <p className="section-desc">
              Every Vishal Electricals wireman is government-licensed, background-cleared, and carries a minimum of 4 years of residential field experience.
            </p>
          </div>

          <div className="electricians-grid">
            {electricians.map((tech) => (
              <div key={tech.id} className="electrician-card">
                <div className="electrician-header">
                  <div className="electrician-avatar-wrap">
                    <img src={tech.photo} alt={tech.name} className="electrician-photo" />
                  </div>
                </div>

                <div className="electrician-body">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <h3 className="electrician-name">
                        {tech.name}
                        <ShieldCheck size={18} color="#10B981" />
                      </h3>
                      <div className="electrician-role">{tech.role}</div>
                    </div>
                    <span className="badge badge-gold">{tech.experience}</span>
                  </div>

                  <p style={{ fontSize: "0.85rem", color: "#475569", margin: "0.75rem 0 1rem", lineHeight: "1.5" }}>
                    {tech.bio}
                  </p>

                  <div className="electrician-stats-bar">
                    <div className="tech-stat">
                      <span className="tech-stat-val">
                        <Star size={14} color="#F59E0B" fill="#F59E0B" style={{ display: "inline", marginRight: "3px" }} />
                        {formatRating(tech.rating)}
                      </span>
                      <span className="tech-stat-lbl">Rating ({tech.reviewCount})</span>
                    </div>

                    <div className="tech-stat">
                      <span className="tech-stat-val">{tech.completedJobs}+</span>
                      <span className="tech-stat-lbl">Jobs Completed</span>
                    </div>
                  </div>

                  <div style={{ marginBottom: "1rem" }}>
                    <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748B", textTransform: "uppercase", display: "block", marginBottom: "0.3rem" }}>
                      Specialized Skills:
                    </span>
                    <div className="skills-chips">
                      {tech.skills.map((s, idx) => (
                        <span key={idx} className="skill-chip">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginTop: "auto", borderTop: "1px solid #E2E8F0", paddingTop: "1rem" }}>
                    <div style={{ fontSize: "0.8rem", color: "#64748B", marginBottom: "0.75rem" }}>
                      <strong>Govt License:</strong> {tech.licenseNo}<br />
                      <strong>Zones:</strong> {tech.zones.join(", ")}
                    </div>

                    <Link
                      to={`/book?electrician=${tech.id}`}
                      className="btn btn-primary btn-sm"
                      style={{ width: "100%" }}
                    >
                      <span>Book Service with {tech.name.split(" ")[0]}</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
