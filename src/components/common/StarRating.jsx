import React, { useState } from "react";
import { Star } from "lucide-react";

/**
 * Format rating to always display exactly 1 decimal place.
 * Prevents bugs like "4.8.0" or raw unformatted floats.
 */
export function formatRating(val) {
  if (val === null || val === undefined || isNaN(val)) return "5.0";
  return Number(val).toFixed(1);
}

const RATING_SENTIMENTS = {
  5: { label: "Outstanding & Professional", emoji: "⭐", color: "#10B981" },
  4: { label: "Very Good Experience", emoji: "👍", color: "#00B4D8" },
  3: { label: "Satisfactory Service", emoji: "👌", color: "#F59E0B" },
  2: { label: "Needs Improvement", emoji: "⚠️", color: "#F97316" },
  1: { label: "Unsatisfactory", emoji: "👎", color: "#EF4444" },
};

/**
 * StarRating — Universal, high-precision star rating component
 * Supports:
 * - Read-only display with exact fractional star fills (e.g. 4.8 stars)
 * - Interactive rating selection with hover animations & sentiment text
 * - Polished accessible UI for review modals, cards, and dashboards
 */
export default function StarRating({
  rating = 5,
  maxStars = 5,
  size = 16,
  interactive = false,
  value,
  onChange,
  showValue = false,
  showCount = null,
  color = "#F59E0B",
  emptyColor = "#CBD5E1",
  showSentiment = false,
  className = "",
  style = {}
}) {
  const [hoverRating, setHoverRating] = useState(0);

  // Use controlled value if interactive and value provided, otherwise rating
  const currentRating = interactive ? (value !== undefined ? value : rating) : rating;
  const activeRating = hoverRating || currentRating;

  return (
    <div
      className={`star-rating-container ${interactive ? "is-interactive" : ""} ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: size > 20 ? "0.4rem" : "0.25rem",
        ...style
      }}
    >
      <div
        className="star-rating-stars"
        style={{ display: "inline-flex", alignItems: "center", gap: size > 20 ? "0.35rem" : "2px" }}
        role={interactive ? "radiogroup" : "img"}
        aria-label={`Rating: ${formatRating(currentRating)} out of ${maxStars} stars`}
      >
        {Array.from({ length: maxStars }).map((_, i) => {
          const starNum = i + 1;

          if (interactive) {
            const isFilled = activeRating >= starNum;
            const isHoveredTarget = hoverRating === starNum;
            return (
              <button
                key={i}
                type="button"
                role="radio"
                aria-checked={currentRating === starNum}
                aria-label={`${starNum} Star${starNum > 1 ? "s" : ""}`}
                onClick={() => onChange && onChange(starNum)}
                onMouseEnter={() => setHoverRating(starNum)}
                onMouseLeave={() => setHoverRating(0)}
                style={{
                  background: isHoveredTarget ? "rgba(245, 158, 11, 0.1)" : "transparent",
                  border: "none",
                  padding: size > 24 ? "0.35rem 0.25rem" : "0.15rem",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "8px",
                  transition: "all 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  transform: isHoveredTarget ? "translateY(-3px) scale(1.16)" : isFilled ? "scale(1.05)" : "scale(1)",
                  outline: "none"
                }}
              >
                <Star
                  size={size}
                  fill={isFilled ? color : "none"}
                  color={isFilled ? color : emptyColor}
                  strokeWidth={1.75}
                  style={{
                    filter: isFilled ? "drop-shadow(0 2px 6px rgba(245, 158, 11, 0.5))" : "none",
                    transition: "fill 0.15s ease, color 0.15s ease, filter 0.15s ease"
                  }}
                />
              </button>
            );
          }

          // Fractional star calculation for read-only mode
          const fillPercentage = Math.max(0, Math.min(100, (currentRating - i) * 100));

          return (
            <div
              key={i}
              className="star-item"
              style={{
                position: "relative",
                width: size,
                height: size,
                display: "inline-block",
                flexShrink: 0
              }}
            >
              {/* Background empty star */}
              <Star
                size={size}
                color={emptyColor}
                fill="none"
                strokeWidth={1.5}
                style={{ display: "block", minWidth: `${size}px`, width: `${size}px` }}
              />

              {/* Foreground partial or full star */}
              {fillPercentage > 0 && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: `${fillPercentage}%`,
                    height: "100%",
                    overflow: "hidden",
                    pointerEvents: "none"
                  }}
                >
                  <Star
                    size={size}
                    color={color}
                    fill={color}
                    strokeWidth={1.5}
                    style={{
                      display: "block",
                      minWidth: `${size}px`,
                      maxWidth: "none",
                      width: `${size}px`,
                      filter: "drop-shadow(0 1px 3px rgba(245, 158, 11, 0.35))"
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Numerical score display */}
      {showValue && (
        <span
          className="star-rating-val"
          style={{
            fontSize: size > 20 ? "1.05rem" : "0.82rem",
            fontWeight: 800,
            background: "rgba(245, 158, 11, 0.12)",
            color: "#B45309",
            padding: "1px 7px",
            borderRadius: "6px",
            border: "1px solid rgba(245, 158, 11, 0.25)",
            marginLeft: "0.35rem",
            display: "inline-flex",
            alignItems: "center",
            gap: "2px",
            letterSpacing: "-0.01em"
          }}
        >
          {formatRating(currentRating)}
          <span style={{ fontSize: "0.75em", opacity: 0.85 }}>★</span>
        </span>
      )}

      {/* Review count display */}
      {showCount && (
        <span
          className="star-rating-count"
          style={{
            fontSize: "0.8rem",
            color: "#64748B",
            fontWeight: 500,
            marginLeft: "0.2rem"
          }}
        >
          ({showCount})
        </span>
      )}

      {/* Sentiment label for interactive mode */}
      {showSentiment && interactive && (
        <div
          className="star-rating-sentiment"
          style={{
            marginLeft: "0.5rem",
            padding: "0.25rem 0.75rem",
            borderRadius: "20px",
            fontSize: "0.82rem",
            fontWeight: 700,
            background: `${RATING_SENTIMENTS[activeRating]?.color || "#00B4D8"}15`,
            color: RATING_SENTIMENTS[activeRating]?.color || "#0B192C",
            border: `1px solid ${RATING_SENTIMENTS[activeRating]?.color || "#00B4D8"}30`,
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
            transition: "all 0.2s ease"
          }}
        >
          <span>{RATING_SENTIMENTS[activeRating]?.emoji}</span>
          <span>{RATING_SENTIMENTS[activeRating]?.label}</span>
          <span style={{ opacity: 0.85, fontSize: "0.78rem", fontWeight: 800 }}>({formatRating(activeRating)} / 5)</span>
        </div>
      )}
    </div>
  );
}
