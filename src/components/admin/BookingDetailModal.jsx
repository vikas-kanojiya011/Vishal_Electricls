import React from "react";
import { useBooking } from "../../context/BookingContext";
import { getGoogleMapsUrl } from "../../data/serviceAreasData";
import { X, Phone, Mail, ArrowRight, Ban, CheckCircle, Navigation, ExternalLink, MessageSquare } from "lucide-react";

const STATUS_PROGRESSION = [
  "Booked",
  "Electrician Assigned",
  "On the Way",
  "Work In Progress",
  "Completed"
];

export default function BookingDetailModal({ booking, isOpen, onClose, onOpenAssign }) {
  const { updateBookingStatus, cancelBooking } = useBooking();

  if (!isOpen || !booking) return null;

  const currentIdx = STATUS_PROGRESSION.indexOf(booking.status);
  const nextStatus = currentIdx >= 0 && currentIdx < STATUS_PROGRESSION.length - 1
    ? STATUS_PROGRESSION[currentIdx + 1]
    : null;

  const handleNextStatus = () => {
    if (nextStatus) {
      updateBookingStatus(booking.id, nextStatus);
    }
  };

  const handleCancel = () => {
    if (window.confirm(`Are you sure you want to cancel booking #${booking.id}?`)) {
      cancelBooking(booking.id, "Admin cancelled from dashboard");
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" style={{ maxWidth: "620px" }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <h3 style={{ fontSize: "1.25rem", color: "#0B192C" }}>Booking #{booking.id}</h3>
              <span
                className={`status-pill ${booking.status === "Completed"
                  ? "status-completed"
                  : booking.status === "Cancelled"
                    ? "status-cancelled"
                    : booking.status === "Work In Progress"
                      ? "status-progress"
                      : booking.status === "On the Way"
                        ? "status-ontheway"
                        : booking.status === "Electrician Assigned"
                          ? "status-assigned"
                          : "status-booked"
                  }`}
              >
                {booking.status}
              </span>
            </div>
            <span style={{ fontSize: "0.8rem", color: "#64748B" }}>
              Created: {booking.statusHistory?.[0]?.timestamp || "Recent"}
            </span>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {/* Customer & Address Details */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "1.5rem" }}>
            <div style={{ background: "#F8FAFC", padding: "1rem 1.25rem", borderRadius: "10px", border: "1px solid #E2E8F0" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748B", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
                Customer Information
              </span>
              <div style={{ fontWeight: 700, color: "#0B192C", fontSize: "1rem" }}>{booking.customerName}</div>
              <div style={{ fontSize: "0.85rem", color: "#334155", marginTop: "0.2rem" }}>
                <Phone size={13} style={{ display: "inline", marginRight: "4px" }} />
                <a href={`tel:${booking.phone}`} style={{ color: "#00B4D8" }}>{booking.phone}</a>
              </div>
              {booking.email && (
                <div style={{ fontSize: "0.85rem", color: "#334155" }}>
                  <Mail size={13} style={{ display: "inline", marginRight: "4px" }} />
                  {booking.email}
                </div>
              )}
            </div>

            <div style={{ background: "#F8FAFC", padding: "1rem 1.25rem", borderRadius: "10px", border: "1px solid #E2E8F0" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748B", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
                Doorstep Address
              </span>
              <div style={{ fontSize: "0.9rem", color: "#0B192C", fontWeight: 600 }}>
                {booking.address}
              </div>
              <div style={{ fontSize: "0.85rem", color: "#64748B" }}>
                {booking.area}, Mumbai - {booking.pincode}
              </div>
              {booking.landmark && (
                <div style={{ fontSize: "0.8rem", color: "#64748B", marginTop: "0.2rem" }}>
                  Landmark: {booking.landmark}
                </div>
              )}
              <div style={{ marginTop: "0.75rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                <a
                  href={getGoogleMapsUrl(booking.address, "", booking.area, booking.pincode)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm"
                  style={{ fontSize: "0.75rem", padding: "0.3rem 0.6rem", display: "inline-flex", alignItems: "center", gap: "0.3rem" }}
                >
                  <Navigation size={12} color="#00B4D8" />
                  <span>Locate on Map</span>
                  <ExternalLink size={10} />
                </a>
                <a
                  href={`https://wa.me/${booking.phone.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm"
                  style={{ fontSize: "0.75rem", padding: "0.3rem 0.6rem", display: "inline-flex", alignItems: "center", gap: "0.3rem" }}
                >
                  <MessageSquare size={12} color="#16A34A" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Service & Technician */}
          <div style={{ background: "#F8FAFC", padding: "1.25rem", borderRadius: "10px", border: "1px solid #E2E8F0", marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              <div>
                <span style={{ fontSize: "0.8rem", color: "#64748B" }}>Service:</span>{" "}
                <strong>{booking.serviceName}</strong> (Qty: {booking.quantity})
              </div>
              <div>
                <span style={{ fontSize: "0.8rem", color: "#64748B" }}>Estimated:</span>{" "}
                <strong style={{ color: "#F59E0B" }}>₹{booking.estimatedPrice}</strong>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px dashed #CBD5E1", paddingTop: "0.75rem" }}>
              <div>
                <span style={{ fontSize: "0.8rem", color: "#64748B" }}>Assigned Electrician:</span>{" "}
                <strong>{booking.assignedElectricianName || "Unassigned"}</strong>
                {booking.assignedElectricianPhone && (
                  <span style={{ fontSize: "0.8rem", color: "#64748B", marginLeft: "6px" }}>
                    ({booking.assignedElectricianPhone})
                  </span>
                )}
              </div>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => {
                  onClose();
                  onOpenAssign(booking);
                }}
              >
                {booking.assignedElectricianId ? "Change Tech" : "Assign Now"}
              </button>
            </div>
          </div>

          {/* Action Progression Controls */}
          <div style={{ borderTop: "1px solid #E2E8F0", paddingTop: "1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
            <div>
              {booking.status !== "Cancelled" && booking.status !== "Completed" && (
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  style={{ color: "#DC2626", borderColor: "#FECACA" }}
                  onClick={handleCancel}
                >
                  <Ban size={15} />
                  <span>Cancel Booking</span>
                </button>
              )}
            </div>

            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button type="button" className="btn btn-outline btn-sm" onClick={onClose}>
                Close
              </button>

              {nextStatus && (
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={handleNextStatus}
                >
                  <span>Advance Status to "{nextStatus}"</span>
                  <ArrowRight size={15} />
                </button>
              )}

              {booking.status === "Completed" && (
                <span className="badge badge-green" style={{ padding: "0.5rem 1rem" }}>
                  <CheckCircle size={16} /> Job Closed & Billed
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
