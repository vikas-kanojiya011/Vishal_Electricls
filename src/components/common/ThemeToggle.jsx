import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function ThemeToggle({ className = "", showLabel = false }) {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button
      type="button"
      className={`theme-toggle-btn ${className}`}
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "Light" : "Dark"} Mode`}
      title={`Switch to ${isDark ? "Light" : "Dark"} Mode`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.45rem",
        background: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(11, 19, 43, 0.06)",
        border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(11, 19, 43, 0.12)"}`,
        color: isDark ? "#FBBF24" : "#0B132B",
        padding: showLabel ? "0.4rem 0.8rem" : "0.42rem",
        borderRadius: "999px",
        cursor: "pointer",
        transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: isDark ? "rotate(0deg)" : "rotate(360deg)",
          transition: "transform 0.4s ease",
        }}
      >
        {isDark ? <Sun size={17} color="#FBBF24" /> : <Moon size={17} color="#1E3A8A" />}
      </div>
      {showLabel && (
        <span style={{ fontSize: "0.8rem", fontWeight: 700 }}>
          {isDark ? "Light Mode" : "Dark Mode"}
        </span>
      )}
    </button>
  );
}
