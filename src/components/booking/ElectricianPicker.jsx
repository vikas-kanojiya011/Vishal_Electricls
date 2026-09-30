import React from "react";
import { Star, UserCheck } from "lucide-react";
import { useBooking } from "../../context/BookingContext";
import { formatRating } from "../common/StarRating";

export default function ElectricianPicker({
  selectedTechId,
  onSelectTech
}) {
  const { electricians } = useBooking();

  return (
    <div className="electrician-picker-section" style={{ marginTop: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
        <div>
          <label className="form-label" style={{ fontWeight: 700, fontSize: "1rem", margin: 0 }}>
            <UserCheck size={18} color="#F59E0B" />
            <span>Choose Your Certified Electrician</span>
          </label>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "0.15rem" }}>
            Select your preferred technician or let our smart system auto-assign the nearest available specialist.
          </p>
        </div>

        {selectedTechId && (
          <button
            type="button"
            onClick={() => onSelectTech(null)}
            style={{
              fontSize: "0.8rem",
              color: "#2563EB",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
              textDecoration: "underline"
            }}
          >
            Reset to Auto-Assign
          </button>
        )}
      </div>

      {/* Auto-assign card */}
      <div
        onClick={() => onSelectTech(null)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onSelectTech(null); }}
        style={{
          border: selectedTechId === null
            ? "2px solid #F59E0B"
            : "1px solid var(--border-light)",
          background: selectedTechId === null
            ? "rgba(245, 158, 11, 0.08)"
            : "var(--bg-card)",
          borderRadius: "12px",
          padding: "0.85rem 1.15rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
          marginBottom: "1rem",
          transition: "all 0.2s ease"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #0B132B, #2563EB)",
              color: "#FBBF24",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.2rem"
            }}
          >
            ⚡
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--text-dark)" }}>
              Auto-Assign Fastest Available Technician (Recommended)
            </div>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
              Dispatches the nearest certified wireman in your Mumbai zone within 30 mins
            </span>
          </div>
        </div>

        <div
          style={{
            width: "22px",
            height: "22px",
            borderRadius: "50%",
            border: selectedTechId === null ? "6px solid #F59E0B" : "2px solid var(--border-medium)",
            background: "#FFFFFF",
            flexShrink: 0
          }}
        />
      </div>

      {/* Grid of Individual Technicians */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1rem"
        }}
      >
        {electricians.map((tech) => {
          const isSelected = selectedTechId === tech.id;
          const isAvailable = tech.available;

          return (
            <div
              key={tech.id}
              onClick={() => {
                if (isAvailable) onSelectTech(tech.id);
              }}
              role="button"
              tabIndex={isAvailable ? 0 : -1}
              onKeyDown={(e) => {
                if (isAvailable && (e.key === "Enter" || e.key === " ")) onSelectTech(tech.id);
              }}
              style={{
                border: isSelected
                  ? "2px solid #F59E0B"
                  : "1px solid var(--border-light)",
                background: isSelected
                  ? "rgba(245, 158, 11, 0.08)"
                  : "var(--bg-card)",
                borderRadius: "14px",
                padding: "1rem",
                cursor: isAvailable ? "pointer" : "not-allowed",
                opacity: isAvailable ? 1 : 0.65,
                position: "relative",
                transition: "all 0.25s ease",
                boxShadow: isSelected ? "0 4px 18px rgba(245, 158, 11, 0.2)" : "var(--shadow-xs)"
              }}
            >
              {/* Header: Photo + Name + Status */}
              <div style={{ display: "flex", gap: "0.85rem", alignItems: "flex-start" }}>
                <div style={{ position: "relative" }}>
                  <img
                    src={tech.photo}
                    alt={tech.name}
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "12px",
                      objectFit: "cover",
                      border: "2px solid var(--border-light)"
                    }}
                  />
                  {/* Online/Busy Badge */}
                  <span
                    title={isAvailable ? "Available for Dispatch" : "Currently on active job"}
                    style={{
                      position: "absolute",
                      bottom: "-2px",
                      right: "-2px",
                      width: "14px",
                      height: "14px",
                      borderRadius: "50%",
                      background: isAvailable ? "#10B981" : "#EF4444",
                      border: "2px solid #FFFFFF",
                      boxShadow: isAvailable ? "0 0 6px #10B981" : "none"
                    }}
                  />
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <h4 style={{ fontSize: "0.98rem", fontWeight: 700, margin: 0, color: "var(--text-dark)" }}>
                      {tech.name}
                    </h4>
                    <span
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        padding: "0.15rem 0.5rem",
                        borderRadius: "999px",
                        background: isAvailable ? "#ECFDF5" : "#FEF2F2",
                        color: isAvailable ? "#059669" : "#DC2626",
                        border: `1px solid ${isAvailable ? "#A7F3D0" : "#FCA5A5"}`
                      }}
                    >
                      {isAvailable ? "Available" : "Busy on Job"}
                    </span>
                  </div>

                  <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", display: "block" }}>
                    {tech.experience}
                  </span>

                  {/* Rating & Jobs */}
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "0.25rem", fontSize: "0.78rem" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.2rem", fontWeight: 700, color: "#F59E0B" }}>
                      <Star size={13} fill="#F59E0B" color="#F59E0B" /> {formatRating(tech.rating)}
                    </span>
                    <span style={{ color: "var(--text-muted)" }}>
                      · {tech.completedJobs}+ jobs
                    </span>
                  </div>
                </div>
              </div>

              {/* Skills Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem", marginTop: "0.75rem" }}>
                {tech.skills.slice(0, 3).map((skill, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: "0.7rem",
                      padding: "0.15rem 0.45rem",
                      borderRadius: "6px",
                      background: "var(--bg-alt)",
                      color: "var(--text-charcoal)",
                      fontWeight: 600
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Selection Indicator */}
              <div style={{ marginTop: "0.75rem", display: "flex", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  disabled={!isAvailable}
                  style={{
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    padding: "0.3rem 0.75rem",
                    borderRadius: "8px",
                    border: "none",
                    cursor: isAvailable ? "pointer" : "not-allowed",
                    background: isSelected ? "#F59E0B" : "var(--bg-alt)",
                    color: isSelected ? "#070B14" : "var(--text-dark)",
                    transition: "all 0.2s ease"
                  }}
                >
                  {isSelected ? "Selected ✓" : isAvailable ? "Select Electrician" : "Currently Busy"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
