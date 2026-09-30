import React, { useState } from "react";
import { Link } from "react-router-dom";
import { projectsData } from "../data/projectsData";
import { MapPin, Clock, Check, ArrowRight, ShieldCheck, Star } from "lucide-react";

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Residential", "Commercial", "Luxury Lighting", "Backup Power", "Industrial"];

  const filteredProjects = projectsData.filter((p) => {
    if (selectedCategory === "All") return true;
    return p.category === selectedCategory;
  });

  return (
    <div className="projects-page">
      {/* Header */}
      <section className="section-sm" style={{ background: "linear-gradient(135deg, #070E1B 0%, #0B192C 100%)", color: "#FFFFFF" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <div className="section-badge gold">
            <ShieldCheck size={14} />
            <span>Real Mumbai Case Studies</span>
          </div>
          <h1 style={{ color: "#FFFFFF", marginBottom: "0.75rem" }}>Projects & Work Gallery</h1>
          <p style={{ color: "#CBD5E1", maxWidth: "680px", margin: "0 auto", fontSize: "1.1rem" }}>
            Explore verified photos and project briefs from our recent residential rewiring, commercial panel upgrades, and architectural lighting installations.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section" style={{ backgroundColor: "#F8FAFC" }}>
        <div className="container">
          {/* Category Filter */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", justifyContent: "center", marginBottom: "3rem" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`area-tag-btn ${selectedCategory === cat ? "active" : ""}`}
                style={{ fontSize: "0.9rem", padding: "0.5rem 1.2rem" }}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: "2.25rem" }}>
            {filteredProjects.map((proj) => (
              <div key={proj.id} className="card" style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ position: "relative", height: "240px", overflow: "hidden" }}>
                  <img
                    src={proj.image}
                    alt={proj.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <span
                    className="badge badge-blue"
                    style={{ position: "absolute", top: "14px", left: "14px", boxShadow: "0 2px 8px rgba(0,0,0,0.3)" }}
                  >
                    {proj.category}
                  </span>
                  <span
                    className="badge badge-gold"
                    style={{ position: "absolute", top: "14px", right: "14px", boxShadow: "0 2px 8px rgba(0,0,0,0.3)" }}
                  >
                    ⭐ {proj.stats.satisfaction}
                  </span>
                </div>

                <div style={{ padding: "1.75rem", display: "flex", flexDirection: "column", flex: "1 0 auto" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#64748B", fontSize: "0.85rem", marginBottom: "0.6rem" }}>
                    <MapPin size={15} color="#00B4D8" />
                    <span>{proj.location}</span>
                    <span>•</span>
                    <Clock size={15} color="#64748B" />
                    <span>{proj.duration}</span>
                  </div>

                  <h3 style={{ fontSize: "1.25rem", color: "#0B192C", marginBottom: "0.75rem" }}>
                    {proj.title}
                  </h3>

                  <p style={{ fontSize: "0.9rem", color: "#64748B", lineHeight: "1.6", marginBottom: "1.25rem" }}>
                    {proj.description}
                  </p>

                  <div style={{ marginBottom: "1.25rem" }}>
                    <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#475569", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>
                      Work Scope Delivered:
                    </span>
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                      {proj.scope.map((item, idx) => (
                        <li key={idx} style={{ fontSize: "0.85rem", color: "#334155", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                          <Check size={14} color="#10B981" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ marginTop: "auto", borderTop: "1px solid #E2E8F0", paddingTop: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <span style={{ fontSize: "0.75rem", color: "#64748B", display: "block" }}>Scope Metric</span>
                      <strong style={{ fontSize: "0.95rem", color: "#0B192C" }}>{proj.stats.points} Points Tested</strong>
                    </div>

                    <Link to="/book" className="btn btn-primary btn-sm">
                      <span>Get Similar Setup</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Banner */}
          <div
            style={{
              marginTop: "4rem",
              background: "linear-gradient(135deg, #0B192C 0%, #15253F 100%)",
              color: "#FFFFFF",
              borderRadius: "16px",
              padding: "2.5rem 3rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1.5rem"
            }}
          >
            <div>
              <h3 style={{ color: "#FFFFFF", fontSize: "1.5rem", marginBottom: "0.4rem" }}>
                Need Turnkey Electrical Work for Your New Flat or Shop?
              </h3>
              <p style={{ color: "#CBD5E1", fontSize: "0.95rem" }}>
                We provide custom contractor estimates, CAD slab drawings, and society PWD liaising across Mumbai.
              </p>
            </div>

            <div style={{ display: "flex", gap: "1rem" }}>
              <a href="tel:+919004807180" className="btn btn-gold">
                <span>Call Project Desk: +91 90048 07180</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
