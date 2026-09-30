import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Calculator, Plus, Minus, AlertCircle, ArrowRight, MessageSquare, Download, Check, X, ShieldCheck } from "lucide-react";

const ESTIMATOR_ITEMS = [
  { id: "fan-installation-repair", name: "Fan Installation / Repair", unitRate: 300, icon: "Fan" },
  { id: "light-installation", name: "Light Installation (LED / Spot / Strip)", unitRate: 200, icon: "Lightbulb" },
  { id: "switch-socket-installation", name: "Switch & Socket Point", unitRate: 150, icon: "Power" },
  { id: "mcb-installation-replacement", name: "MCB / Breaker Replacement", unitRate: 500, icon: "ShieldAlert" },
  { id: "electrical-fault-repair", name: "Electrical Fault Diagnosis & Repair", unitRate: 299, icon: "AlertTriangle" },
  { id: "inverter-installation", name: "Home Inverter Setup & Wiring", unitRate: 1200, icon: "BatteryCharging" },
  { id: "distribution-board-work", name: "Distribution Board (DB) Organizing", unitRate: 1800, icon: "Sliders" },
  { id: "home-wiring", name: "Concealed Room Rewiring / Circuit", unitRate: 1499, icon: "Zap" }
];

export default function PriceEstimator() {
  const [quantities, setQuantities] = useState({
    "fan-installation-repair": 1,
    "light-installation": 2,
    "switch-socket-installation": 0,
    "mcb-installation-replacement": 0,
    "electrical-fault-repair": 0,
    "inverter-installation": 0,
    "distribution-board-work": 0,
    "home-wiring": 0
  });

  const [showEstimateModal, setShowEstimateModal] = useState(false);
  const [customerPhone, setCustomerPhone] = useState("");
  const [sentSuccess, setSentSuccess] = useState(false);

  const updateQuantity = (id, delta) => {
    setQuantities(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [id]: next };
    });
  };

  const selectedBreakdown = useMemo(() => {
    return ESTIMATOR_ITEMS.filter(item => (quantities[item.id] || 0) > 0).map(item => ({
      ...item,
      qty: quantities[item.id],
      subtotal: item.unitRate * quantities[item.id]
    }));
  }, [quantities]);

  const totalEstimate = useMemo(() => {
    return selectedBreakdown.reduce((sum, item) => sum + item.subtotal, 0);
  }, [selectedBreakdown]);

  const primarySelectedId = selectedBreakdown.length > 0 ? selectedBreakdown[0].id : "fan-installation-repair";

  const handleSendEstimate = (e) => {
    e.preventDefault();
    if (!customerPhone.trim() || customerPhone.replace(/\D/g, "").length < 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }
    setSentSuccess(true);
    setTimeout(() => {
      setSentSuccess(false);
      setShowEstimateModal(false);
    }, 3000);
  };

  const whatsappMessage = encodeURIComponent(
    `Hi Vishal Electricals, I calculated an instant estimate of ₹${totalEstimate.toLocaleString("en-IN")} on your website for:\n` +
    selectedBreakdown.map(b => `• ${b.name} (Qty: ${b.qty}) - ₹${b.subtotal}`).join("\n") +
    `\n\nPlease confirm technician availability in Mumbai.`
  );

  return (
    <div className="estimator-card" id="price-estimator">
      <div style={{ marginBottom: "2rem" }}>
        <div className="section-badge gold">
          <Calculator size={16} />
          <span>Instant Quote Calculator</span>
        </div>
        <h3 style={{ fontSize: "1.75rem", marginBottom: "0.4rem" }}>
          Dynamic Service Price Estimator
        </h3>
        <p style={{ fontSize: "1rem" }}>
          Select the services and quantities you need. Calculate an instant ballpark price before booking.
        </p>
      </div>

      <div className="estimator-grid">
        {/* Left: Service Selection & Quantity Steppers */}
        <div className="estimator-items-list">
          {ESTIMATOR_ITEMS.map((item) => {
            const qty = quantities[item.id] || 0;
            const isSelected = qty > 0;

            return (
              <div
                key={item.id}
                className={`estimator-item-row ${isSelected ? "selected" : ""}`}
              >
                <div className="estimator-item-details">
                  <span className="estimator-item-name">{item.name}</span>
                  <span className="estimator-item-rate">Starting from ₹{item.unitRate} / unit</span>
                </div>

                <div className="qty-counter">
                  <button
                    type="button"
                    className="qty-btn"
                    onClick={() => updateQuantity(item.id, -1)}
                    disabled={qty === 0}
                    aria-label={`Decrease ${item.name}`}
                  >
                    <Minus size={14} />
                  </button>

                  <span className="qty-display">{qty}</span>

                  <button
                    type="button"
                    className="qty-btn"
                    onClick={() => updateQuantity(item.id, 1)}
                    aria-label={`Increase ${item.name}`}
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Real-time Calculation Summary Box */}
        <div className="estimator-summary-box">
          <div>
            <h4 className="estimator-summary-title">Estimate Summary</h4>

            <div className="estimator-selected-items">
              {selectedBreakdown.length === 0 ? (
                <p style={{ color: "#94A3B8", fontSize: "0.9rem", fontStyle: "italic" }}>
                  Adjust quantities on the left to calculate your estimate.
                </p>
              ) : (
                selectedBreakdown.map((item) => (
                  <div key={item.id} className="selected-line">
                    <span>
                      {item.name} <strong style={{ color: "#F59E0B" }}>× {item.qty}</strong>
                    </span>
                    <span>₹{item.subtotal.toLocaleString("en-IN")}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div>
            {/* Total Row */}
            <div className="estimator-total-row">
              <span style={{ fontSize: "1.1rem", fontWeight: 600 }}>Estimated Total:</span>
              <span className="estimator-total-val">
                ₹{totalEstimate.toLocaleString("en-IN")}
              </span>
            </div>

            {/* Mandatory Disclaimer as requested */}
            <div className="estimator-disclaimer">
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontWeight: 700, marginBottom: "0.2rem" }}>
                <AlertCircle size={15} color="#F59E0B" />
                <span>Notice</span>
              </div>
              <p>“Final price may vary after site inspection.” (Standard inspection fee is adjusted against the final service invoice).</p>
            </div>

            {/* Action buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem", marginTop: "1rem" }}>
              <Link
                to={`/book?service=${primarySelectedId}&qty=${selectedBreakdown.length > 0 ? selectedBreakdown[0].qty : 1}`}
                className="btn btn-gold btn-lg"
                style={{ width: "100%" }}
                id="estimator-proceed-btn"
              >
                <span>Book with this Estimate</span>
                <ArrowRight size={18} />
              </Link>

              <button
                type="button"
                onClick={() => setShowEstimateModal(true)}
                className="btn btn-outline"
                style={{ width: "100%", fontWeight: 700 }}
              >
                <span>Get Free Estimate Copy</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Free Estimate Dialog Modal */}
      {showEstimateModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowEstimateModal(false)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(7, 11, 20, 0.75)",
            backdropFilter: "blur(6px)",
            zIndex: 1100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem"
          }}
        >
          <div
            className="modal-content card"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "460px",
              width: "100%",
              padding: "2rem",
              borderRadius: "16px",
              position: "relative"
            }}
          >
            <button
              type="button"
              onClick={() => setShowEstimateModal(false)}
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--text-muted)"
              }}
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: "1.35rem", marginBottom: "0.3rem" }}>
              Get Your Free Estimate Copy
            </h3>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "1.25rem" }}>
              Receive an official estimate breakdown directly on your WhatsApp or download a printable PDF copy.
            </p>

            <div style={{ background: "var(--bg-alt)", padding: "1rem", borderRadius: "10px", marginBottom: "1.25rem", fontSize: "0.9rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, marginBottom: "0.5rem" }}>
                <span>Ballpark Estimate:</span>
                <span style={{ color: "#F59E0B" }}>₹{totalEstimate.toLocaleString("en-IN")}</span>
              </div>
              <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", margin: 0 }}>
                ⚡ Final price may vary after site inspection depending on wire accessibility and materials required.
              </p>
            </div>

            {sentSuccess ? (
              <div style={{ padding: "1rem", background: "#ECFDF5", borderRadius: "8px", textAlign: "center", color: "#059669", fontWeight: 700 }}>
                <Check size={20} style={{ display: "inline-block", marginRight: "6px" }} />
                Estimate dispatched to WhatsApp!
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <a
                  href={`https://wa.me/919004807180?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                  style={{ width: "100%" }}
                >
                  <MessageSquare size={17} />
                  <span>Receive on WhatsApp (+91 90048 07180)</span>
                </a>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="btn btn-outline"
                  style={{ width: "100%" }}
                >
                  <Download size={16} />
                  <span>Print / Save as PDF</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
