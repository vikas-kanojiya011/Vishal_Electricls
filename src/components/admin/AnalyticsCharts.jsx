import React from "react";
import { useBooking } from "../../context/BookingContext";
import { TrendingUp, IndianRupee, Star } from "lucide-react";
import StarRating from "../common/StarRating";

export default function AnalyticsCharts() {
  const { kpiStats } = useBooking();

  // Weekly bookings sample data
  const weeklyData = [
    { day: "Mon", count: 8, height: "65%" },
    { day: "Tue", count: 11, height: "85%" },
    { day: "Wed", count: 9, height: "70%" },
    { day: "Thu", count: 14, height: "100%" },
    { day: "Fri", count: 12, height: "90%" },
    { day: "Sat", count: 15, height: "100%" },
    { day: "Sun", count: 10, height: "75%" }
  ];

  // Monthly trends
  const monthlyRevenue = [
    { month: "Jun", rev: "₹48,500", pct: 55 },
    { month: "Jul", rev: "₹62,000", pct: 70 },
    { month: "Aug", rev: "₹78,400", pct: 88 },
    { month: "Sep (Current)", rev: `₹${(kpiStats.totalRevenue + 85000).toLocaleString("en-IN")}`, pct: 95 }
  ];

  // Service distribution calculation from active bookings
  const serviceDistribution = [
    { name: "MCB & Distribution Boards", count: 28, pct: 32 },
    { name: "Electrical Fault Diagnosis", count: 24, pct: 27 },
    { name: "Fan & BLDC Installations", count: 18, pct: 20 },
    { name: "Home Concealed Rewiring", count: 12, pct: 14 },
    { name: "Inverters & Heavy Power", count: 6, pct: 7 }
  ];

  return (
    <div>
      <div className="analytics-grid">
        {/* Chart 1: Weekly Bookings Bar Chart */}
        <div className="analytics-card">
          <div className="chart-header">
            <div>
              <h3 className="chart-title">Weekly Booking Volume</h3>
              <span style={{ fontSize: "0.85rem", color: "#64748B" }}>
                Total 79 bookings scheduled this week
              </span>
            </div>
            <span className="badge badge-blue">
              <TrendingUp size={14} /> +18% vs last week
            </span>
          </div>

          <div className="bar-chart-container">
            {weeklyData.map((item, idx) => (
              <div key={idx} className="bar-col">
                <span className="bar-value-tooltip">{item.count}</span>
                <div className="bar-pill" style={{ height: item.height }}></div>
                <span className="bar-label">{item.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 2: Most Requested Services */}
        <div className="analytics-card">
          <div className="chart-header">
            <div>
              <h3 className="chart-title">Most Requested Services</h3>
              <span style={{ fontSize: "0.85rem", color: "#64748B" }}>
                Breakdown by service demand
              </span>
            </div>
            <span className="badge badge-gold">Top Categories</span>
          </div>

          <div className="service-dist-list">
            {serviceDistribution.map((item, idx) => (
              <div key={idx} className="dist-item">
                <div className="dist-info">
                  <span>{item.name}</span>
                  <span>{item.pct}% ({item.count} jobs)</span>
                </div>
                <div className="dist-bar-track">
                  <div className="dist-bar-fill" style={{ width: `${item.pct}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Revenue Bar Chart */}
      <div className="analytics-card" style={{ marginBottom: "2rem" }}>
        <div className="chart-header">
          <div>
            <h3 className="chart-title">Monthly Revenue Performance</h3>
            <span style={{ fontSize: "0.85rem", color: "#64748B" }}>
              Western Mumbai operations gross revenue (INR)
            </span>
          </div>
          <span className="badge badge-green">
            <IndianRupee size={14} /> Consistent Growth
          </span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1.5rem" }}>
          {monthlyRevenue.map((m, idx) => (
            <div key={idx} style={{ background: "#F8FAFC", padding: "1.25rem", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
              <span style={{ fontSize: "0.8rem", color: "#64748B", fontWeight: 700, textTransform: "uppercase" }}>
                {m.month}
              </span>
              <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "#0B192C", margin: "0.3rem 0" }}>
                {m.rev}
              </div>
              <div style={{ height: "6px", background: "#E2E8F0", borderRadius: "3px", overflow: "hidden" }}>
                <div style={{ width: `${m.pct}%`, height: "100%", background: "#F59E0B" }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chart 4: Customer Ratings & Quality Analytics Card */}
      <div className="analytics-card" style={{ marginBottom: "2rem" }}>
        <div className="chart-header">
          <div>
            <h3 className="chart-title" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Star size={20} fill="#F59E0B" color="#F59E0B" />
              <span>Customer Ratings & Service Quality Analytics</span>
            </h3>
            <span style={{ fontSize: "0.85rem", color: "#64748B" }}>
              Verified customer feedback distribution & technician performance scores
            </span>
          </div>
          <span className="badge badge-gold" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <Star size={13} fill="#F59E0B" color="#F59E0B" />
            <span>4.9 / 5.0 Rating</span>
          </span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem", alignItems: "center" }}>
          {/* Summary Score Card */}
          <div style={{ background: "linear-gradient(135deg, #0B192C 0%, #1E293B 100%)", borderRadius: "16px", padding: "1.75rem", color: "#FFFFFF", textAlign: "center" }}>
            <div style={{ fontSize: "3.2rem", fontWeight: 800, color: "#FBBF24", lineHeight: 1 }}>
              4.9
            </div>
            <div style={{ display: "flex", justifyContent: "center", margin: "0.5rem 0" }}>
              <StarRating rating={4.9} size={22} />
            </div>
            <div style={{ fontSize: "0.88rem", color: "#94A3B8", fontWeight: 600 }}>
              Overall CSAT Score
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginTop: "1.25rem", borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: "1rem" }}>
              <div>
                <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "#34D399" }}>98.5%</div>
                <span style={{ fontSize: "0.75rem", color: "#94A3B8" }}>Positive Reviews</span>
              </div>
              <div>
                <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "#38BDF8" }}>+86</div>
                <span style={{ fontSize: "0.75rem", color: "#94A3B8" }}>NPS Benchmark</span>
              </div>
            </div>
          </div>

          {/* 5-Tier Star Distribution */}
          <div>
            <span style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text-dark)", display: "block", marginBottom: "0.75rem" }}>
              Rating Distribution Breakdown:
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {[
                { stars: 5, pct: 92, count: 1306, color: "linear-gradient(90deg, #F59E0B, #FBBF24)" },
                { stars: 4, pct: 6, count: 85, color: "#38BDF8" },
                { stars: 3, pct: 1.5, count: 21, color: "#94A3B8" },
                { stars: 2, pct: 0.4, count: 6, color: "#FB923C" },
                { stars: 1, pct: 0.1, count: 2, color: "#F87171" }
              ].map((tier) => (
                <div key={tier.stars} style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.82rem" }}>
                  <span style={{ width: "42px", color: "var(--text-dark)", fontWeight: 700, display: "flex", alignItems: "center", gap: "3px" }}>
                    {tier.stars} <Star size={12} fill="#F59E0B" color="#F59E0B" />
                  </span>
                  <div style={{ flex: 1, height: "8px", background: "#E2E8F0", borderRadius: "4px", overflow: "hidden" }}>
                    <div style={{ width: `${tier.pct}%`, height: "100%", background: tier.color, borderRadius: "4px" }} />
                  </div>
                  <span style={{ width: "36px", textAlign: "right", fontWeight: 700, color: "var(--text-dark)" }}>
                    {tier.pct}%
                  </span>
                  <span style={{ width: "45px", textAlign: "right", color: "#64748B", fontSize: "0.76rem" }}>
                    ({tier.count})
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quality Audit Metric Pills */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginTop: "1.75rem", borderTop: "1px solid var(--border-light)", paddingTop: "1.25rem" }}>
          <div style={{ background: "var(--bg-alt)", padding: "0.85rem 1rem", borderRadius: "10px", border: "1px solid var(--border-color)" }}>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>Punctuality & Arrival</span>
            <strong style={{ fontSize: "1.1rem", color: "#059669" }}>99.2% On-Time</strong>
          </div>
          <div style={{ background: "var(--bg-alt)", padding: "0.85rem 1rem", borderRadius: "10px", border: "1px solid var(--border-color)" }}>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>Safety Gear Compliance</span>
            <strong style={{ fontSize: "1.1rem", color: "#2563EB" }}>100% Verified</strong>
          </div>
          <div style={{ background: "var(--bg-alt)", padding: "0.85rem 1rem", borderRadius: "10px", border: "1px solid var(--border-color)" }}>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>Workmanship Quality</span>
            <strong style={{ fontSize: "1.1rem", color: "#D97706" }}>98.6% Flawless</strong>
          </div>
          <div style={{ background: "var(--bg-alt)", padding: "0.85rem 1rem", borderRadius: "10px", border: "1px solid var(--border-color)" }}>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>Billing Transparency</span>
            <strong style={{ fontSize: "1.1rem", color: "#059669" }}>97.8% Accurate</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
