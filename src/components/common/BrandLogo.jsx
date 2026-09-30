import React, { useId } from "react";

/**
 * BrandLogo — Official Vishal Electricals Identity
 *
 * Vector emblem featuring:
 * - High-voltage protective safety shield
 * - Stylized geometric 'V' monogram
 * - Energy lightning bolt with solar amber gradients
 * - Unique SVG IDs per instance (prevents cross-element gradient collisions)
 * - Flexible sizing and color variants for Header, Drawer, Footer, and Light Invoices
 */
export default function BrandLogo({
  variant = "header", // 'header' | 'footer' | 'drawer' | 'light' | 'mark-only'
  size = "md",        // 'sm' | 'md' | 'lg' | 'xl'
  showTagline = true,
  className = "",
}) {
  const uid = useId();
  const isLight = variant === "light";
  const isFooter = variant === "footer";

  const sizeMap = {
    sm: { iconSize: 36, titleSize: "1.05rem", tagSize: "0.6rem", gap: "0.6rem" },
    md: { iconSize: 44, titleSize: "1.25rem", tagSize: "0.65rem", gap: "0.75rem" },
    lg: { iconSize: 54, titleSize: "1.5rem", tagSize: "0.74rem", gap: "0.85rem" },
    xl: { iconSize: 64, titleSize: "1.8rem", tagSize: "0.82rem", gap: "1rem" },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  return (
    <div
      className={`brand-logo-root ${variant} ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: currentSize.gap,
        textDecoration: "none",
        userSelect: "none",
      }}
    >
      {/* ── Vector Shield & Lightning 'V' Emblem ── */}
      <div
        className="brand-logo-emblem"
        style={{
          width: currentSize.iconSize,
          height: currentSize.iconSize,
          flexShrink: 0,
          position: "relative",
          filter: "drop-shadow(0 3px 10px rgba(245, 158, 11, 0.35))",
          transition: "transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.25s ease",
        }}
      >
        <svg
          viewBox="0 0 54 54"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "100%", display: "block" }}
          aria-hidden="true"
        >
          <defs>
            {/* Hexagonal Shield Gradient */}
            <linearGradient id={`${uid}-shield`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0B192C" />
              <stop offset="50%" stopColor="#13233F" />
              <stop offset="100%" stopColor="#050C16" />
            </linearGradient>

            {/* Bevel Border Gradient (Cyan to Gold) */}
            <linearGradient id={`${uid}-border`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="45%" stopColor="#0284C7" />
              <stop offset="75%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#FBBF24" />
            </linearGradient>

            {/* Lightning Bolt Gradient */}
            <linearGradient id={`${uid}-bolt`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFBEB" />
              <stop offset="25%" stopColor="#FDE047" />
              <stop offset="70%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>

            {/* Subtle glow filter */}
            <filter id={`${uid}-glow`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Hexagonal Base Shield */}
          <path
            d="M27 3 L49 12 V30 C49 42 39 50 27 53 C15 50 5 42 5 30 V12 L27 3 Z"
            fill={`url(#${uid}-shield)`}
            stroke={`url(#${uid}-border)`}
            strokeWidth="2.2"
            strokeLinejoin="round"
          />

          {/* Inner Safety Trace Border */}
          <path
            d="M27 7.5 L44 14.5 V29 C44 38.5 36 45 27 47.5 C18 45 10 38.5 10 29 V14.5 L27 7.5 Z"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="1"
            strokeDasharray="2 2.5"
            opacity="0.35"
          />

          {/* Stylized Monogram 'V' Left Arm */}
          <path
            d="M14 17 L23 37 H18 L11 21 Z"
            fill="#38BDF8"
            opacity="0.8"
          />

          {/* Dynamic Center High-Voltage Lightning Bolt */}
          <path
            d="M30 9 L18 27 H27 L23 44 L39 25 H29 L33 9 Z"
            fill={`url(#${uid}-bolt)`}
            stroke="#FFFBEB"
            strokeWidth="0.75"
            filter={`url(#${uid}-glow)`}
          />

          {/* High Voltage Spark Dots */}
          <circle cx="33" cy="9" r="1.5" fill="#FFFFFF" />
          <circle cx="23" cy="44" r="1.2" fill="#FBBF24" />
        </svg>
      </div>

      {/* ── Brand Typography ── */}
      {variant !== "mark-only" && (
        <div
          className="brand-logo-text"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            lineHeight: 1.15,
          }}
        >
          <div
            className="brand-logo-title"
            style={{
              fontFamily: "var(--font-heading, 'Outfit', sans-serif)",
              fontSize: currentSize.titleSize,
              fontWeight: 800,
              letterSpacing: "-0.015em",
              display: "flex",
              alignItems: "center",
              gap: "0.35rem",
              color: isLight ? "#0B192C" : "#FFFFFF",
            }}
          >
            <span>VISHAL</span>
            <span
              style={{
                color: "#F59E0B",
                background: "linear-gradient(90deg, #F59E0B 0%, #FBBF24 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ELECTRICALS
            </span>
          </div>

          {showTagline && (
            <div
              className="brand-logo-tagline"
              style={{
                fontFamily: "var(--font-body, 'Plus Jakarta Sans', sans-serif)",
                fontSize: currentSize.tagSize,
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: isFooter ? "#94A3B8" : isLight ? "#475569" : "rgba(203, 213, 225, 0.85)",
                display: "flex",
                alignItems: "center",
                gap: "0.35rem",
                marginTop: "2px",
              }}
            >
              <span
                style={{
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  background: "#10B981",
                  display: "inline-block",
                  boxShadow: "0 0 6px #10B981",
                  flexShrink: 0,
                }}
              />
              <span>Govt. Licensed Wiremen · Mumbai</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
