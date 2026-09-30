import React, { useState } from "react";
import { X, Check } from "lucide-react";
import { useBooking } from "../../context/BookingContext";
import { servicesData } from "../../data/servicesData";
import StarRating from "./StarRating";

export default function ReviewModal({ isOpen, onClose }) {
  const { addReview } = useBooking();

  const [customerName, setCustomerName] = useState("");
  const [location, setLocation] = useState("Borivali West, Mumbai");
  const [serviceName, setServiceName] = useState("MCB Installation/Replacement");
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerName.trim() || !reviewText.trim()) return;

    addReview({
      customerName: customerName.trim(),
      location: location.trim(),
      serviceName,
      rating,
      review: reviewText.trim()
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 style={{ fontSize: "1.25rem", color: "#0B192C" }}>Write a Customer Review</h3>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {submitted ? (
            <div style={{ textAlign: "center", padding: "2rem 1rem" }}>
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background: "#ECFDF5",
                  color: "#10B981",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1rem"
                }}
              >
                <Check size={32} />
              </div>
              <h4 style={{ fontSize: "1.3rem", color: "#0B192C", marginBottom: "0.5rem" }}>
                Thank You for Your Feedback!
              </h4>
              <p style={{ color: "#64748B", fontSize: "0.95rem" }}>
                Your review has been published and helps your fellow Mumbai neighbours find verified electrical help.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Star Rating Picker */}
              <div className="form-group" style={{ marginBottom: "1.25rem", background: "var(--bg-alt)", padding: "1rem", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
                <label className="form-label" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                  <span style={{ fontWeight: 700 }}>Rate Your Experience *</span>
                  <span style={{ fontSize: "0.78rem", color: "#64748B" }}>Click a star to rate</span>
                </label>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
                  <StarRating
                    interactive={true}
                    value={rating}
                    onChange={setRating}
                    size={32}
                    showSentiment={true}
                  />
                </div>
              </div>

              {/* Quick Compliment Chips */}
              <div style={{ marginBottom: "1.25rem" }}>
                <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: "0.4rem" }}>
                  Quick Highlights (Tap to add):
                </span>
                <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                  {[
                    "⚡ Arrived within 30 mins",
                    "🛡️ Full safety gear & shoes",
                    "🔧 Fixed short-circuit quickly",
                    "💰 100% fair & transparent bill",
                    "⭐ Highly skilled & polite"
                  ].map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => {
                        setReviewText((prev) => (prev ? `${prev} ${chip}.` : `${chip}.`));
                      }}
                      style={{
                        padding: "3px 10px",
                        fontSize: "0.76rem",
                        borderRadius: "14px",
                        border: "1px solid var(--border-color)",
                        background: "var(--bg-card)",
                        color: "var(--text-dark)",
                        cursor: "pointer",
                        transition: "all 0.15s ease"
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#F59E0B")}
                      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border-color)")}
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>

              {/* Full Name */}
              <div className="form-group">
                <label className="form-label">Your Name *</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  placeholder="e.g. Ramesh Kulkarni"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </div>

              {/* Mumbai Locality */}
              <div className="form-group">
                <label className="form-label">Your Locality / City *</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  placeholder="e.g. Borivali West, Mumbai"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              {/* Service Availed */}
              <div className="form-group">
                <label className="form-label">Service Availed *</label>
                <select
                  className="form-select"
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  style={{ fontWeight: 600 }}
                >
                  {servicesData.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Review Experience */}
              <div className="form-group">
                <label className="form-label">Your Experience & Feedback *</label>
                <textarea
                  required
                  className="form-control"
                  rows={3}
                  placeholder="Share details like arrival speed, technician politeness, quality of work..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1.5rem" }}>
                <button type="button" className="btn btn-outline btn-sm" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Publish Review
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
