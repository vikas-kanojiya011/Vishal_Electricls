import React from "react";
import { Zap } from "lucide-react";

export default function PageLoader() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        padding: "3rem 1rem"
      }}
    >
      <div
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #1E3A8A 0%, #0B192C 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#F59E0B",
          boxShadow: "0 8px 24px rgba(245, 158, 11, 0.3)",
          animation: "pulse 1.5s infinite ease-in-out"
        }}
      >
        <Zap size={28} className="spin-slow" />
      </div>
      <div style={{ textAlign: "center" }}>
        <h4 style={{ fontSize: "1.05rem", color: "var(--text-dark)", margin: "0 0 0.25rem 0", fontWeight: 700 }}>
          Vishal Electricals
        </h4>
        <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
          Loading page resources...
        </span>
      </div>
    </div>
  );
}
