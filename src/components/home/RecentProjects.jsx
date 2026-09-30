import React from "react";
import { Link } from "react-router-dom";
import { projectsData } from "../../data/projectsData";
import { MapPin, Clock, ArrowRight } from "lucide-react";

export default function RecentProjects() {
  const showcaseProjects = projectsData.slice(0, 3);

  return (
    <section className="section" style={{ backgroundColor: "#F8FAFC" }}>
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <span>Portfolio</span>
          </div>
          <h2 className="section-title">Recent Electrical Projects</h2>
          <p className="section-desc">
            Take a look at our completed residential renovations, commercial DB boards, and luxury lighting setups across Mumbai.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2rem"
          }}
        >
          {showcaseProjects.map((proj) => (
            <div key={proj.id} className="card" style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ position: "relative", height: "220px", overflow: "hidden" }}>
                <img
                  src={proj.image}
                  alt={proj.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.4s ease"
                  }}
                />
                <span
                  className="badge badge-blue"
                  style={{
                    position: "absolute",
                    top: "12px",
                    left: "12px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
                  }}
                >
                  {proj.category}
                </span>
                <span
                  className="badge badge-gold"
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
                  }}
                >
                  {proj.stats.satisfaction}
                </span>
              </div>

              <div style={{ padding: "1.75rem", display: "flex", flexDirection: "column", flex: "1 0 auto" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#64748B", fontSize: "0.85rem", marginBottom: "0.5rem" }}>
                  <MapPin size={15} color="#00B4D8" />
                  <span>{proj.location}</span>
                  <span>•</span>
                  <Clock size={15} color="#64748B" />
                  <span>{proj.duration}</span>
                </div>

                <h3 style={{ fontSize: "1.2rem", marginBottom: "0.75rem", color: "#0B192C" }}>
                  {proj.title}
                </h3>

                <p style={{ fontSize: "0.9rem", color: "#64748B", lineHeight: "1.55", marginBottom: "1.25rem", flex: "1 0 auto" }}>
                  {proj.description}
                </p>

                <div style={{ borderTop: "1px solid #E2E8F0", paddingTop: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#0B192C" }}>
                    {proj.stats.points} Electrical Points
                  </span>
                  <Link to="/projects" className="btn btn-outline btn-sm">
                    <span>View Details</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <Link to="/projects" className="btn btn-primary">
            <span>Explore Full Project Gallery</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
