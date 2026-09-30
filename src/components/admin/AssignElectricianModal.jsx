import React, { useState } from "react";
import { useBooking } from "../../context/BookingContext";
import { X, UserCheck, ShieldCheck } from "lucide-react";

export default function AssignElectricianModal({ booking, isOpen, onClose }) {
  const { electricians, assignElectrician } = useBooking();
  const [selectedTechId, setSelectedTechId] = useState(
    booking?.assignedElectricianId || electricians[0]?.id || ""
  );

  if (!isOpen || !booking) return null;

  const handleAssign = (e) => {
    e.preventDefault();
    if (!selectedTechId) return;
    assignElectrician(booking.id, selectedTechId);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3 style={{ fontSize: "1.2rem", color: "#0B192C" }}>Assign Electrician</h3>
            <span style={{ fontSize: "0.8rem", color: "#64748B" }}>
              Booking: <strong>#{booking.id}</strong> ({booking.serviceName})
            </span>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <form onSubmit={handleAssign}>
            <div style={{ marginBottom: "1.25rem" }}>
              <label className="form-label" style={{ marginBottom: "0.75rem" }}>
                Select Certified Technician:
              </label>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxHeight: "320px", overflowY: "auto" }}>
                {electricians.map((tech) => (
                  <label
                    key={tech.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      padding: "0.9rem 1.1rem",
                      borderRadius: "10px",
                      border: "1.5px solid",
                      borderColor: selectedTechId === tech.id ? "#00B4D8" : "#E2E8F0",
                      background: selectedTechId === tech.id ? "#EFF6FF" : "#FFFFFF",
                      cursor: "pointer",
                      transition: "all 0.2s ease"
                    }}
                  >
                    <input
                      type="radio"
                      name="electricianSelect"
                      value={tech.id}
                      checked={selectedTechId === tech.id}
                      onChange={() => setSelectedTechId(tech.id)}
                      style={{ accentColor: "#00B4D8" }}
                    />
                    <img
                      src={tech.photo}
                      alt={tech.name}
                      style={{ width: "42px", height: "42px", borderRadius: "50%", objectFit: "cover" }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "#0B192C", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                        {tech.name}
                        <ShieldCheck size={14} color="#10B981" />
                      </div>
                      <div style={{ fontSize: "0.8rem", color: "#64748B" }}>
                        {tech.role} • {tech.experience} • ⭐ {tech.rating}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1.5rem" }}>
              <button type="button" className="btn btn-outline btn-sm" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary btn-sm">
                <UserCheck size={16} />
                <span>Confirm Assignment</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
