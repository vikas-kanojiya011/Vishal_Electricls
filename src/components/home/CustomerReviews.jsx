import React, { useState, useMemo } from "react";
import { useBooking } from "../../context/BookingContext";
import { Star, CheckCircle2, MessageSquarePlus, Quote, ShieldCheck, ThumbsUp, Filter, Sparkles } from "lucide-react";
import ReviewModal from "../common/ReviewModal";
import StarRating, { formatRating } from "../common/StarRating";

export default function CustomerReviews() {
  const { reviews } = useBooking();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [helpfulVotes, setHelpfulVotes] = useState({});

  // Calculate rating statistics dynamically across all 5 tiers
  const stats = useMemo(() => {
    const baseCount = 1420;
    const currentReviews = reviews || [];
    const totalCount = baseCount + currentReviews.length - 6;

    // Actual user review counts
    const c5 = currentReviews.filter((r) => Number(r.rating) >= 4.8).length;
    const c4 = currentReviews.filter((r) => Number(r.rating) >= 3.8 && Number(r.rating) < 4.8).length;
    const c3 = currentReviews.filter((r) => Number(r.rating) >= 2.8 && Number(r.rating) < 3.8).length;
    const c2 = currentReviews.filter((r) => Number(r.rating) >= 1.8 && Number(r.rating) < 2.8).length;
    const c1 = currentReviews.filter((r) => Number(r.rating) < 1.8).length;

    // Projected total counts weighted with base benchmark
    const b5 = Math.round(totalCount * 0.915) + c5;
    const b4 = Math.round(totalCount * 0.065) + c4;
    const b3 = Math.round(totalCount * 0.015) + c3;
    const b2 = Math.round(totalCount * 0.003) + c2;
    const b1 = Math.max(2, totalCount - b5 - b4 - b3 - b2);

    const sum = b5 + b4 + b3 + b2 + b1;
    const p5 = Math.round((b5 / sum) * 100);
    const p4 = Math.round((b4 / sum) * 100);
    const p3 = Math.max(1, Math.round((b3 / sum) * 100));
    const p2 = Math.max(0, Math.round((b2 / sum) * 100));
    const p1 = Math.max(0, 100 - p5 - p4 - p3 - p2);

    const totalScore = currentReviews.reduce((acc, r) => acc + (Number(r.rating) || 5), 0);
    const calculatedAvg = currentReviews.length > 0 ? (totalScore / currentReviews.length) : 4.9;

    return {
      avg: Number(calculatedAvg.toFixed(1)),
      totalCount,
      satisfactionRate: "98.5%",
      tiers: [
        { stars: 5, label: "5 Stars", pct: p5, count: b5, color: "linear-gradient(90deg, #F59E0B, #FBBF24)" },
        { stars: 4, label: "4 Stars", pct: p4, count: b4, color: "#38BDF8" },
        { stars: 3, label: "3 Stars", pct: p3, count: b3, color: "#FCD34D" },
        { stars: 2, label: "2 Stars", pct: p2, count: b2, color: "#FB923C" },
        { stars: 1, label: "1 Star", pct: p1, count: b1, color: "#F87171" }
      ]
    };
  }, [reviews]);

  // Filtered reviews list
  const filteredReviews = useMemo(() => {
    if (selectedFilter === "5") return reviews.filter((r) => Number(r.rating) >= 4.8);
    if (selectedFilter === "4") return reviews.filter((r) => Number(r.rating) >= 3.8 && Number(r.rating) < 4.8);
    if (selectedFilter === "3") return reviews.filter((r) => Number(r.rating) >= 2.8 && Number(r.rating) < 3.8);
    return reviews;
  }, [reviews, selectedFilter]);

  const handleHelpfulClick = (id) => {
    setHelpfulVotes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  // Helper to extract customer initials
  const getInitials = (name) => {
    if (!name) return "VE";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  const AVATAR_COLORS = [
    "linear-gradient(135deg, #3B82F6, #1D4ED8)",
    "linear-gradient(135deg, #10B981, #047857)",
    "linear-gradient(135deg, #8B5CF6, #6D28D9)",
    "linear-gradient(135deg, #F59E0B, #D97706)",
    "linear-gradient(135deg, #EC4899, #BE185D)"
  ];

  return (
    <section className="section" style={{ backgroundColor: "#FFFFFF" }} id="customer-reviews">
      <div className="container">
        {/* ── Section Header ── */}
        <div className="section-header">
          <div className="section-badge gold">
            <Star size={15} fill="#F59E0B" color="#F59E0B" />
            <span>Verified Customer Stories</span>
          </div>
          <h2 className="section-title">What Our Mumbai Clients Say</h2>
          <p className="section-desc">
            Real feedback from verified homeowners, housing society chairmen, and commercial businesses across Mumbai Western Suburbs.
          </p>

          <div style={{ marginTop: "1.25rem" }}>
            <button
              type="button"
              className="btn btn-gold btn-sm"
              onClick={() => setModalOpen(true)}
              id="write-review-btn"
            >
              <MessageSquarePlus size={16} />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* ── Rating Overview & Executive Summary Card ── */}
        <div
          className="rating-overview-card"
          style={{
            background: "linear-gradient(135deg, #0B192C 0%, #172A45 100%)",
            borderRadius: "18px",
            padding: "2.25rem",
            color: "#FFFFFF",
            marginBottom: "2.5rem",
            boxShadow: "0 12px 35px rgba(11, 25, 44, 0.15)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2.25rem",
            alignItems: "center"
          }}
        >
          {/* Left: Overall Big Score */}
          <div style={{ textAlign: "center", borderRight: "1px solid rgba(255, 255, 255, 0.12)", paddingRight: "1.5rem" }}>
            <div
              style={{
                fontFamily: "var(--font-heading, 'Outfit', sans-serif)",
                fontSize: "3.75rem",
                fontWeight: 800,
                color: "#FBBF24",
                lineHeight: 1,
                letterSpacing: "-1px"
              }}
            >
              {formatRating(stats.avg)}
            </div>
            <div style={{ marginTop: "0.6rem", display: "flex", justifyContent: "center" }}>
              <StarRating rating={stats.avg} size={24} />
            </div>
            <p style={{ margin: "0.5rem 0 0", fontSize: "0.9rem", color: "#CBD5E1", fontWeight: 600 }}>
              Overall Customer Rating
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.75rem" }}>
              <span
                style={{
                  padding: "0.25rem 0.75rem",
                  background: "rgba(16, 185, 129, 0.2)",
                  color: "#34D399",
                  borderRadius: "20px",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px"
                }}
              >
                <Sparkles size={12} /> {stats.satisfactionRate} CSAT
              </span>
              <span
                style={{
                  padding: "0.25rem 0.75rem",
                  background: "rgba(255, 255, 255, 0.1)",
                  color: "#E2E8F0",
                  borderRadius: "20px",
                  fontSize: "0.78rem",
                  fontWeight: 600
                }}
              >
                {stats.totalCount.toLocaleString()}+ Doorstep Bookings
              </span>
            </div>
          </div>

          {/* Middle: 5-Tier Star Rating Breakdown (Interactive) */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.85rem" }}>
              <span style={{ fontSize: "0.92rem", fontWeight: 700, color: "#F1F5F9" }}>
                Rating Distribution
              </span>
              <span style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
                Click bar to filter
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem" }}>
              {stats.tiers.map((tier) => {
                const isSelected = selectedFilter === String(tier.stars);
                return (
                  <div
                    key={tier.stars}
                    onClick={() => setSelectedFilter(selectedFilter === String(tier.stars) ? "all" : String(tier.stars))}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      fontSize: "0.82rem",
                      cursor: "pointer",
                      padding: "3px 6px",
                      borderRadius: "6px",
                      background: isSelected ? "rgba(245, 158, 11, 0.15)" : "transparent",
                      transition: "background 0.15s ease"
                    }}
                    title={`Filter by ${tier.label}`}
                  >
                    <span style={{ width: "45px", color: isSelected ? "#FBBF24" : "#CBD5E1", display: "flex", alignItems: "center", gap: "3px", fontWeight: 700 }}>
                      {tier.stars} <Star size={12} fill="#F59E0B" color="#F59E0B" />
                    </span>
                    <div style={{ flex: 1, height: "9px", background: "rgba(255, 255, 255, 0.15)", borderRadius: "5px", overflow: "hidden" }}>
                      <div
                        style={{
                          width: `${tier.pct}%`,
                          height: "100%",
                          background: tier.color,
                          borderRadius: "5px",
                          transition: "width 0.4s ease"
                        }}
                      />
                    </div>
                    <span style={{ width: "42px", textAlign: "right", color: "#E2E8F0", fontWeight: 700 }}>
                      {tier.pct}%
                    </span>
                    <span style={{ width: "45px", textAlign: "right", color: "#94A3B8", fontSize: "0.75rem" }}>
                      ({tier.count})
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Trust Guarantees & Write Review CTA */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", background: "rgba(255, 255, 255, 0.05)", padding: "1.25rem", borderRadius: "14px", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.86rem", color: "#F1F5F9" }}>
              <ShieldCheck size={18} color="#10B981" />
              <span><strong>100% PWD Wiremen</strong> background verified</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.86rem", color: "#F1F5F9" }}>
              <ThumbsUp size={18} color="#38BDF8" />
              <span><strong>30-Day Work Warranty</strong> on all repairs</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.86rem", color: "#F1F5F9" }}>
              <CheckCircle2 size={18} color="#FBBF24" />
              <span><strong>Standardized Bill</strong> with zero hidden charges</span>
            </div>

            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="btn btn-gold btn-sm"
              style={{ marginTop: "0.5rem", width: "100%" }}
            >
              <MessageSquarePlus size={15} />
              <span>Rate Your Experience</span>
            </button>
          </div>
        </div>

        {/* ── Filter Tabs ── */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.75rem", flexWrap: "wrap" }}>
          <span style={{ fontSize: "0.82rem", color: "#64748B", fontWeight: 700, display: "flex", alignItems: "center", gap: "4px", marginRight: "0.35rem" }}>
            <Filter size={14} /> Filter Reviews:
          </span>
          <button
            type="button"
            className={`btn btn-sm ${selectedFilter === "all" ? "btn-primary" : "btn-outline"}`}
            style={{ padding: "0.4rem 0.95rem", fontSize: "0.82rem", borderRadius: "20px" }}
            onClick={() => setSelectedFilter("all")}
          >
            All Reviews ({reviews.length})
          </button>
          <button
            type="button"
            className={`btn btn-sm ${selectedFilter === "5" ? "btn-primary" : "btn-outline"}`}
            style={{ padding: "0.4rem 0.95rem", fontSize: "0.82rem", borderRadius: "20px" }}
            onClick={() => setSelectedFilter("5")}
          >
            ⭐ 5.0 Stars ({reviews.filter((r) => Number(r.rating) >= 4.8).length})
          </button>
          <button
            type="button"
            className={`btn btn-sm ${selectedFilter === "4" ? "btn-primary" : "btn-outline"}`}
            style={{ padding: "0.4rem 0.95rem", fontSize: "0.82rem", borderRadius: "20px" }}
            onClick={() => setSelectedFilter("4")}
          >
            ⭐ 4.0 - 4.9 Stars ({reviews.filter((r) => Number(r.rating) >= 3.8 && Number(r.rating) < 4.8).length})
          </button>
          {reviews.some((r) => Number(r.rating) < 3.8) && (
            <button
              type="button"
              className={`btn btn-sm ${selectedFilter === "3" ? "btn-primary" : "btn-outline"}`}
              style={{ padding: "0.4rem 0.95rem", fontSize: "0.82rem", borderRadius: "20px" }}
              onClick={() => setSelectedFilter("3")}
            >
              ⭐ 3.0 Stars ({reviews.filter((r) => Number(r.rating) >= 2.8 && Number(r.rating) < 3.8).length})
            </button>
          )}
        </div>

        {/* ── Reviews Grid ── */}
        <div className="reviews-grid">
          {filteredReviews.map((item, idx) => {
            const avatarBg = AVATAR_COLORS[idx % AVATAR_COLORS.length];
            const helpfulCount = 12 + (idx * 3) + (helpfulVotes[item.id] || 0);

            return (
              <div key={item.id} className="review-card">
                {/* Review Header: User avatar, name, and verified badge */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.85rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div
                      style={{
                        width: "42px",
                        height: "42px",
                        borderRadius: "50%",
                        background: avatarBg,
                        color: "#FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 800,
                        fontSize: "0.95rem",
                        letterSpacing: "0.5px",
                        flexShrink: 0,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.12)"
                      }}
                    >
                      {getInitials(item.customerName)}
                    </div>
                    <div>
                      <div className="author-name" style={{ fontSize: "0.98rem", marginBottom: "2px" }}>
                        {item.customerName}
                      </div>
                      <div className="author-location" style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                        {item.location}
                      </div>
                    </div>
                  </div>

                  <Quote size={22} color="#CBD5E1" />
                </div>

                {/* Star Rating Row + Service Chip */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.75rem" }}>
                  <StarRating rating={item.rating} size={17} showValue={true} />

                  <span className="badge badge-blue" style={{ fontSize: "0.74rem", padding: "3px 8px" }}>
                    {item.serviceName}
                  </span>
                </div>

                {/* Review Text */}
                <p className="review-text" style={{ fontSize: "0.92rem", lineHeight: "1.6", color: "var(--text-dark)", marginBottom: "1rem" }}>
                  "{item.review}"
                </p>

                {/* Review Footer with Verified Badge and Helpful button */}
                <div className="review-author-row" style={{ marginTop: "auto", paddingTop: "0.85rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  {item.verified !== false ? (
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.3rem",
                        fontSize: "0.78rem",
                        color: "#059669",
                        fontWeight: 700
                      }}
                    >
                      <CheckCircle2 size={14} /> Verified Customer
                    </span>
                  ) : (
                    <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Customer Feedback</span>
                  )}

                  <button
                    type="button"
                    onClick={() => handleHelpfulClick(item.id)}
                    style={{
                      background: "var(--bg-alt)",
                      border: "1px solid var(--border-color)",
                      borderRadius: "15px",
                      padding: "3px 10px",
                      fontSize: "0.76rem",
                      color: "var(--text-muted)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      transition: "all 0.15s ease"
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#F59E0B")}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border-color)")}
                  >
                    <ThumbsUp size={12} color="#F59E0B" />
                    <span>Helpful ({helpfulCount})</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <ReviewModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}

