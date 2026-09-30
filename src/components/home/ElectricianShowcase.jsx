import React from "react";
import { Link } from "react-router-dom";
import { useBooking } from "../../context/BookingContext";
import { Star, ShieldCheck, CheckCircle2, Phone, Briefcase, Award, ArrowRight } from "lucide-react";
import { formatRating } from "../common/StarRating";

export default function ElectricianShowcase() {
  const { electricians } = useBooking();
  const featuredTechs = electricians.slice(0, 3);

  return (
    <section className="section" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <ShieldCheck size={15} />
            <span>Certified Wiremen</span>
          </div>
          <h2 className="section-title">Meet Our Verified Electricians</h2>
          <p className="section-desc">
            Background-verified, licensed, and equipped with modern calibrated tools. Your safety and peace of mind is in expert hands.
          </p>
        </div>

        <div className="electricians-grid">
          {featuredTechs.map((tech) => (
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
                      <ShieldCheck size={18} color="#10B981" title="Govt Licensed" />
                    </h3>
                    <div className="electrician-role">{tech.role}</div>
                  </div>
                  <span className="badge badge-green" style={{ fontSize: "0.7rem" }}>
                    Available
                  </span>
                </div>

                <div className="electrician-stats-bar">
                  <div className="tech-stat">
                    <span className="tech-stat-val">
                      <Star size={14} color="#F59E0B" fill="#F59E0B" style={{ display: "inline", marginRight: "3px" }} />
                      {formatRating(tech.rating)}
                    </span>
                    <span className="tech-stat-lbl">Rating</span>
                  </div>

                  <div className="tech-stat">
                    <span className="tech-stat-val">{tech.experienceYears}+ Yrs</span>
                    <span className="tech-stat-lbl">Experience</span>
                  </div>

                  <div className="tech-stat">
                    <span className="tech-stat-val">{tech.completedJobs}+</span>
                    <span className="tech-stat-lbl">Jobs Done</span>
                  </div>
                </div>

                <div className="skills-chips">
                  {tech.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="skill-chip">
                      {skill}
                    </span>
                  ))}
                </div>

                <div style={{ marginTop: "auto", paddingTop: "1rem", borderTop: "1px solid #E2E8F0" }}>
                  <div style={{ fontSize: "0.8rem", color: "#64748B", marginBottom: "0.75rem" }}>
                    <strong>License:</strong> {tech.licenseNo}
                  </div>
                  <Link
                    to={`/book?electrician=${tech.id}`}
                    className="btn btn-outline btn-sm"
                    style={{ width: "100%" }}
                  >
                    <span>Request {tech.name.split(" ")[0]}</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <Link to="/about" className="btn btn-outline">
            <span>View All Master Technicians & Certifications</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
