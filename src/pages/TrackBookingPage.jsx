import React, { useState, useEffect } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import { STATUS_STAGES } from "../data/sampleBookings";
import { getGoogleMapsUrl } from "../data/serviceAreasData";
import DigitalInvoiceModal from "../components/common/DigitalInvoiceModal";
import OnlinePaymentModal from "../components/common/OnlinePaymentModal";
import StarRating, { formatRating } from "../components/common/StarRating";
import {
  Search,
  CheckCircle2,
  CreditCard,
  Clock,
  UserCheck,
  Truck,
  Wrench,
  CheckCircle,
  Phone,
  Calendar,
  MapPin,
  AlertCircle,
  Shield,
  FileText,
  Navigation,
  ExternalLink,
  MessageSquare,
  Star,
  RotateCw,
  Download,
  Share2,
  Check
} from "lucide-react";

export default function TrackBookingPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { getBookingById, electricians, addReview, updatePayment } = useBooking();
  const [payModalOpen, setPayModalOpen] = useState(false);

  const initialId = searchParams.get("id") || "VE20260045";
  const [searchId, setSearchId] = useState(initialId);
  const [currentBooking, setCurrentBooking] = useState(() => getBookingById(initialId));

  // Digital Invoice Modal
  const [invoiceOpen, setInvoiceOpen] = useState(false);

  // Rating & Review State
  const [ratingVal, setRatingVal] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      setSearchId(id);
      setCurrentBooking(getBookingById(id));
    }
  }, [searchParams, getBookingById]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchId.trim()) return;
    setSearchParams({ id: searchId.trim().toUpperCase() });
    setCurrentBooking(getBookingById(searchId.trim()));
  };

  const selectSample = (id) => {
    setSearchId(id);
    setSearchParams({ id });
    setCurrentBooking(getBookingById(id));
  };

  // Find assigned technician details
  const assignedTech = currentBooking?.assignedElectricianId
    ? electricians.find((t) => t.id === currentBooking.assignedElectricianId)
    : null;

  // Determine current stage index (1 to 5)
  const getCurrentStageStep = () => {
    if (!currentBooking) return 0;
    if (currentBooking.status === "Cancelled") return -1;
    const match = STATUS_STAGES.find((s) => s.id === currentBooking.status);
    return match ? match.step : 1;
  };

  const currentStepNum = getCurrentStageStep();

  const getStepIcon = (stageId) => {
    switch (stageId) {
      case "Booked":
        return <Calendar size={20} />;
      case "Electrician Assigned":
        return <UserCheck size={20} />;
      case "On the Way":
        return <Truck size={20} />;
      case "Work In Progress":
        return <Wrench size={20} />;
      case "Completed":
        return <CheckCircle size={20} />;
      default:
        return <Clock size={20} />;
    }
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;

    addReview({
      bookingId: currentBooking.id,
      customerName: currentBooking.customerName || "Satisfied Customer",
      rating: ratingVal,
      comment: reviewComment.trim(),
      serviceName: currentBooking.serviceName,
      area: currentBooking.area
    });

    setReviewSubmitted(true);
    setReviewComment("");
  };

  const handleRepeatBooking = () => {
    if (!currentBooking) return;
    navigate(`/book?service=${currentBooking.serviceId}&qty=${currentBooking.quantity || 1}&area=${currentBooking.area || "Borivali East"}`);
  };

  return (
    <div className="tracker-container" style={{ padding: "3rem 1.5rem 5rem" }}>
      <div className="section-header" style={{ marginBottom: "2rem" }}>
        <div className="section-badge gold">
          <Clock size={14} />
          <span>Live Booking Status</span>
        </div>
        <h1 style={{ fontSize: "2.3rem", marginBottom: "0.5rem" }}>
          Track Your Electrician Live
        </h1>
        <p>
          Real-time progression from confirmation to technician doorstep arrival. Enter your Booking ID below.
        </p>
      </div>

      {/* Search Bar & Quick Sample Buttons */}
      <div className="track-search-card">
        <form onSubmit={handleSearch} style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
          <div style={{ position: "relative", flex: 1 }}>
            <Search
              size={20}
              style={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#64748B"
              }}
            />
            <input
              type="text"
              className="form-control"
              style={{ paddingLeft: "44px", fontFamily: "monospace", fontSize: "1.05rem", textTransform: "uppercase" }}
              placeholder="Enter Booking ID (e.g. VE20260045)..."
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary" id="track-submit-btn">
            <span>Track Status</span>
          </button>
        </form>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", fontSize: "0.85rem" }}>
          <span style={{ color: "var(--text-muted)", fontWeight: 600 }}>Quick Demo Tracking:</span>
          {["VE20260045", "VE20260044", "VE20260043", "VE20260046"].map((id) => (
            <button
              key={id}
              type="button"
              className={`area-tag-btn ${searchId.toUpperCase() === id ? "active" : ""}`}
              onClick={() => selectSample(id)}
            >
              {id}
            </button>
          ))}
        </div>
      </div>

      {/* Tracking Result */}
      {currentBooking ? (
        <div className="tracker-display-card">
          {/* Header */}
          <div className="tracker-card-header">
            <div>
              <span style={{ fontSize: "0.8rem", color: "#94A3B8", textTransform: "uppercase", fontWeight: 700 }}>
                Booking Reference
              </span>
              <div className="tracker-id-badge">{currentBooking.id}</div>
              <div style={{ fontSize: "0.9rem", color: "#CBD5E1", marginTop: "0.2rem" }}>
                {currentBooking.serviceName} • {currentBooking.area}
              </div>
            </div>

            <div style={{ textAlign: "right" }}>
              <span
                className={`status-pill ${currentBooking.status === "Completed"
                  ? "status-completed"
                  : currentBooking.status === "Cancelled"
                    ? "status-cancelled"
                    : currentBooking.status === "Work In Progress"
                      ? "status-progress"
                      : currentBooking.status === "On the Way"
                        ? "status-ontheway"
                        : currentBooking.status === "Electrician Assigned"
                          ? "status-assigned"
                          : "status-booked"
                  }`}
                style={{ fontSize: "0.95rem", padding: "0.4rem 1rem" }}
              >
                ● {currentBooking.status}
              </span>
              <div style={{ fontSize: "0.8rem", color: "#CBD5E1", marginTop: "0.4rem" }}>
                Scheduled: {currentBooking.bookingDate} ({currentBooking.timeSlot})
              </div>
            </div>
          </div>

          {/* Quick Action Top Bar (Invoice, Rebook) */}
          <div
            style={{
              padding: "0.85rem 1.5rem",
              background: "var(--bg-alt)",
              borderBottom: "1px solid var(--border-light)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "0.75rem"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.85rem" }}>
              <span style={{ fontWeight: 600 }}>Payment: <strong>{currentBooking.paymentMethod || "Cash on Service"}</strong></span>
              <span className="badge badge-gold">{currentBooking.paymentStatus || "Due After Service"}</span>
            </div>

            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button
                type="button"
                onClick={() => setInvoiceOpen(true)}
                className="btn btn-sm btn-outline"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
              >
                <FileText size={15} color="#2563EB" />
                <span>Digital Invoice</span>
              </button>

              <button
                type="button"
                onClick={handleRepeatBooking}
                className="btn btn-sm btn-gold"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
              >
                <RotateCw size={14} />
                <span>Book This Service Again</span>
              </button>
            </div>
          </div>

          {/* Cancelled Banner if applicable */}
          {currentBooking.status === "Cancelled" ? (
            <div style={{ padding: "2rem", background: "#FEF2F2", borderBottom: "1px solid #FECACA", color: "#991B1B" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: 700, fontSize: "1.1rem" }}>
                <AlertCircle size={20} /> This booking has been cancelled.
              </div>
              <p style={{ marginTop: "0.4rem", fontSize: "0.9rem" }}>
                Reason: Customer requested cancellation. You can rebook anytime.
              </p>
            </div>
          ) : (
            /* 5-STAGE VISUAL STEPPER */
            <div className="status-timeline">
              {STATUS_STAGES.map((st) => {
                const isNodeCompleted = currentStepNum > st.step;
                const isNodeActive = currentStepNum === st.step;

                return (
                  <div
                    key={st.id}
                    className={`status-step-node ${isNodeCompleted ? "completed" : ""} ${isNodeActive ? "active" : ""}`}
                  >
                    <div className="node-icon-circle">
                      {isNodeCompleted ? <CheckCircle2 size={22} /> : getStepIcon(st.id)}
                    </div>
                    <div className="node-title">{st.label}</div>
                    <div className="node-desc">{st.desc}</div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Assigned Technician Profile Box */}
          {assignedTech && currentBooking.status !== "Cancelled" && (
            <div className="assigned-tech-card">
              <div className="tech-avatar-info">
                <img
                  src={assignedTech.photo}
                  alt={assignedTech.name}
                  className="tech-avatar-img"
                />
                <div>
                  <span className="badge badge-green" style={{ marginBottom: "0.3rem" }}>
                    Assigned Technician
                  </span>
                  <h4 style={{ fontSize: "1.15rem", color: "var(--text-dark)", marginBottom: "0.2rem" }}>
                    {assignedTech.name}
                  </h4>
                  <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                    {assignedTech.role} • {assignedTech.experience} • ⭐ {formatRating(assignedTech.rating)} ({assignedTech.completedJobs}+ jobs)
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#2563EB", fontWeight: 600, marginTop: "0.2rem" }}>
                    Govt. Wireman License: {assignedTech.licenseNo}
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.75rem" }}>
                <a
                  href={`tel:${assignedTech.phone}`}
                  className="btn btn-primary btn-sm"
                  id="call-technician-btn"
                >
                  <Phone size={15} />
                  <span>Call Technician</span>
                </a>
              </div>
            </div>
          )}

          {/* Service Details & Address */}
          <div style={{ padding: "0 2rem 2rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            <div style={{ background: "var(--bg-alt)", padding: "1.5rem", borderRadius: "12px", border: "1px solid var(--border-light)" }}>
              <h4 style={{ fontSize: "1rem", color: "var(--text-dark)", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <MapPin size={16} color="#2563EB" /> Service Location
              </h4>
              <p style={{ fontSize: "0.9rem", color: "var(--text-charcoal)", lineHeight: "1.5" }}>
                <strong>{currentBooking.customerName}</strong><br />
                {currentBooking.address}<br />
                {currentBooking.area}, Mumbai - {currentBooking.pincode}<br />
                {currentBooking.landmark && <small style={{ color: "var(--text-muted)" }}>Landmark: {currentBooking.landmark}</small>}
              </p>
              <div style={{ marginTop: "0.75rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
                Phone: <strong>{currentBooking.phone}</strong>
              </div>
              <div style={{ marginTop: "1rem", display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
                <a
                  href={getGoogleMapsUrl(currentBooking.address, "", currentBooking.area, currentBooking.pincode)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
                >
                  <Navigation size={13} />
                  <span>Locate on Google Maps</span>
                  <ExternalLink size={11} />
                </a>
                <a
                  href={`https://wa.me/919004807180?text=Hi%20Vishal%20Electricals%2C%20tracking%20booking%20${currentBooking.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm"
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
                >
                  <MessageSquare size={13} />
                  <span>WhatsApp Helpdesk</span>
                </a>
              </div>
            </div>

            <div style={{ background: "var(--bg-alt)", padding: "1.5rem", borderRadius: "12px", border: "1px solid var(--border-light)" }}>
              <h4 style={{ fontSize: "1rem", color: "var(--text-dark)", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <FileText size={16} color="#F59E0B" /> Order Overview
              </h4>
              <div style={{ fontSize: "0.9rem", color: "var(--text-charcoal)", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                <div>Service: <strong>{currentBooking.serviceName}</strong> (Qty: {currentBooking.quantity})</div>
                <div>Labour Charges: <strong>₹{currentBooking.estimatedPrice}</strong></div>
                {currentBooking.materialTotal > 0 && (
                  <div>Material Spares: <strong>₹{currentBooking.materialTotal}</strong></div>
                )}
                {currentBooking.discountAmount > 0 && (
                  <div style={{ color: "#10B981" }}>Discount: <strong>-₹{currentBooking.discountAmount}</strong></div>
                )}
                <div>Arrival Slot: <strong>{currentBooking.timeSlot}</strong></div>
                {currentBooking.problemNotes && (
                  <div style={{ marginTop: "0.3rem", fontSize: "0.85rem", color: "var(--text-muted)", fontStyle: "italic" }}>
                    Notes: "{currentBooking.problemNotes}"
                  </div>
                )}

                {/* Online Payment Status & Quick Pay Button */}
                <div style={{ marginTop: "0.6rem", paddingTop: "0.6rem", borderTop: "1px dashed var(--border-medium)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem" }}>
                    <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Payment Method:</span>
                    <strong style={{ fontSize: "0.88rem" }}>{currentBooking.paymentMethod || "Cash on Service"}</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Payment Status:</span>
                    {currentBooking.paymentStatus?.toLowerCase().includes("paid") ? (
                      <span className="badge badge-green">
                        ✓ {currentBooking.paymentStatus}
                      </span>
                    ) : (
                      <span className="badge badge-gold">
                        ● {currentBooking.paymentStatus || "Pending"}
                      </span>
                    )}
                  </div>
                  {currentBooking.transactionId && (
                    <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontFamily: "monospace", marginTop: "0.25rem" }}>
                      Ref: {currentBooking.transactionId}
                    </div>
                  )}

                  {!currentBooking.paymentStatus?.toLowerCase().includes("paid") && (
                    <button
                      type="button"
                      onClick={() => setPayModalOpen(true)}
                      className="btn btn-primary btn-sm"
                      style={{ width: "100%", marginTop: "0.85rem", justifyContent: "center", background: "linear-gradient(135deg, #2563EB, #1D4ED8)" }}
                    >
                      <CreditCard size={15} />
                      <span>💳 Pay Bill Online Now (UPI / Card)</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ⭐ Service Rating & Review Section (Post Service) */}
          <div style={{ padding: "2rem", borderTop: "1px solid var(--border-light)", background: "var(--bg-card)" }}>
            <div style={{ maxWidth: "540px", margin: "0 auto", textAlign: "center" }}>
              <h3 style={{ fontSize: "1.3rem", color: "var(--text-dark)", marginBottom: "0.3rem" }}>
                How was your service?
              </h3>
              <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", marginBottom: "1rem" }}>
                Rate your technician's punctuality, safety compliance, and workmanship.
              </p>

              {reviewSubmitted ? (
                <div style={{ padding: "1.25rem", background: "rgba(16, 185, 129, 0.1)", borderRadius: "10px", color: "#059669", fontWeight: 700 }}>
                  <Check size={20} style={{ display: "inline-block", marginRight: "6px" }} />
                  Thank you for your rating & review!
                </div>
              ) : (
                <form onSubmit={handleSubmitReview}>
                  {/* Star selection */}
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
                    <StarRating
                      interactive={true}
                      value={ratingVal}
                      onChange={setRatingVal}
                      size={32}
                      showSentiment={true}
                    />
                  </div>

                  {/* Quick Compliment Chips */}
                  <div style={{ display: "flex", justifyContent: "center", gap: "0.4rem", flexWrap: "wrap", marginBottom: "1rem" }}>
                    {[
                      "⚡ Prompt arrival",
                      "🛡️ Safety gear worn",
                      "🔧 Quick diagnosis & fix",
                      "💰 Exact bill as estimated"
                    ].map((chip) => (
                      <button
                        key={chip}
                        type="button"
                        onClick={() => setReviewComment((prev) => (prev ? `${prev} ${chip}.` : `${chip}.`))}
                        style={{
                          padding: "3px 10px",
                          fontSize: "0.76rem",
                          borderRadius: "14px",
                          border: "1px solid var(--border-color)",
                          background: "var(--bg-alt)",
                          color: "var(--text-dark)",
                          cursor: "pointer"
                        }}
                      >
                        {chip}
                      </button>
                    ))}
                  </div>

                  <div style={{ marginBottom: "1rem" }}>
                    <textarea
                      required
                      className="form-control"
                      rows={3}
                      placeholder="Write your feedback (e.g. Technician arrived on time, wore safety boots, solved short-circuit quickly)..."
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                    />
                  </div>

                  <button type="submit" className="btn btn-gold" id="submit-track-review-btn">
                    <CheckCircle2 size={16} />
                    <span>Submit Rating & Review</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Activity & Timestamp Log */}
          {currentBooking.statusHistory && currentBooking.statusHistory.length > 0 && (
            <div style={{ padding: "1.5rem 2rem 2rem", borderTop: "1px solid var(--border-light)", background: "var(--bg-alt)" }}>
              <h4 style={{ fontSize: "1rem", color: "var(--text-dark)", marginBottom: "1rem" }}>
                Activity & Timestamp Log
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                {currentBooking.statusHistory.map((hist, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                    <div
                      style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        background: idx === currentBooking.statusHistory.length - 1 ? "#F59E0B" : "#94A3B8",
                        marginTop: "6px",
                        flexShrink: 0
                      }}
                    />
                    <div>
                      <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-dark)" }}>
                        {hist.status} <span style={{ fontWeight: 400, color: "var(--text-muted)", fontSize: "0.8rem" }}>• {hist.timestamp}</span>
                      </div>
                      <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                        {hist.note}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="card" style={{ padding: "3rem", textAlign: "center" }}>
          <AlertCircle size={44} color="#F59E0B" style={{ margin: "0 auto 1rem" }} />
          <h3 style={{ fontSize: "1.3rem", color: "var(--text-dark)", marginBottom: "0.5rem" }}>
            No Booking Found for "{searchId}"
          </h3>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "1.5rem" }}>
            Please check your Booking ID number or click one of the demo bookings above.
          </p>
          <Link to="/book" className="btn btn-primary">
            <span>Create New Booking</span>
          </Link>
        </div>
      )}

      {/* Digital Invoice Modal */}
      {currentBooking && (
        <DigitalInvoiceModal
          booking={currentBooking}
          isOpen={invoiceOpen}
          onClose={() => setInvoiceOpen(false)}
        />
      )}

      {/* Online Payment Modal */}
      {currentBooking && (
        <OnlinePaymentModal
          isOpen={payModalOpen}
          onClose={() => setPayModalOpen(false)}
          amount={((Number(currentBooking.estimatedPrice) || 0) + (Number(currentBooking.materialTotal) || 0) - (Number(currentBooking.discountAmount) || 0))}
          serviceName={currentBooking.serviceName}
          bookingId={currentBooking.id}
          onPaymentSuccess={(paymentResult) => {
            updatePayment(currentBooking.id, {
              method: paymentResult.method,
              status: "Paid Online (Verified)",
              transactionId: paymentResult.transactionId,
              amount: paymentResult.amount
            });
            setPayModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
