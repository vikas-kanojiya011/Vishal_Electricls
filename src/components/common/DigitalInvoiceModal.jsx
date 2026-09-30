import React from "react";
import { X, Download, ShieldCheck } from "lucide-react";
import BrandLogo from "./BrandLogo";

export default function DigitalInvoiceModal({
  booking,
  isOpen,
  onClose
}) {
  if (!isOpen || !booking) return null;

  const servicePrice = Number(booking.estimatedPrice) || 300;
  const materialCharges = Number(booking.materialTotal) || 0;
  const discount = Number(booking.discountAmount) || 0;
  const gstAmount = Math.round((servicePrice + materialCharges - discount) * 0.18);
  const grandTotal = Math.max(0, servicePrice + materialCharges - discount + gstAmount);

  const handleDownload = () => {
    // Generate text/html printable version for immediate save
    window.print();
  };

  return (
    <div
      className="invoice-modal-overlay"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(7, 11, 20, 0.78)",
        backdropFilter: "blur(8px)",
        zIndex: 1100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem"
      }}
    >
      <div
        className="invoice-modal-dialog"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--bg-card)",
          color: "var(--text-dark)",
          borderRadius: "16px",
          maxWidth: "680px",
          width: "100%",
          maxHeight: "92vh",
          overflowY: "auto",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.35)",
          border: "1px solid var(--border-light)",
          display: "flex",
          flexDirection: "column"
        }}
      >
        {/* Modal Action Bar (Hidden during Print) */}
        <div
          className="no-print"
          style={{
            padding: "1rem 1.5rem",
            borderBottom: "1px solid var(--border-light)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "var(--bg-alt)"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontWeight: 700, fontSize: "0.95rem" }}>
              Digital Tax Invoice · #{booking.id}
            </span>
            <span
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                padding: "0.15rem 0.5rem",
                borderRadius: "999px",
                background: booking.paymentStatus === "Paid" ? "#ECFDF5" : "#FEF3C7",
                color: booking.paymentStatus === "Paid" ? "#059669" : "#B45309",
                border: `1px solid ${booking.paymentStatus === "Paid" ? "#A7F3D0" : "#FDE68A"}`
              }}
            >
              {booking.paymentStatus === "Paid" ? "PAID ✓" : "PAYMENT DUE"}
            </span>
          </div>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              type="button"
              onClick={handleDownload}
              className="btn btn-sm btn-gold"
              title="Download or Print Invoice"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem" }}
            >
              <Download size={15} />
              <span>Download Invoice</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--text-muted)",
                padding: "0.3rem"
              }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Invoice Printable Area */}
        <div id="printable-invoice" style={{ padding: "2rem 2.25rem", flex: 1 }}>
          {/* Header Row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", paddingBottom: "1.5rem", borderBottom: "2px solid var(--border-light)" }}>
            <div>
              <BrandLogo variant="light" size="md" />
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.4rem", lineHeight: "1.4" }}>
                Govt. PWD Wireman License: MH-B-WIRE-2012-4412<br />
                GSTIN: 27AAAAA0000A1Z5 · ISO 9001:2015 Safety Certified<br />
                Cartan Road No. 8, Sukkarwadi, Borivali East, Mumbai 400066 · Tel: +91 90048 07180
              </p>
            </div>

            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--color-primary-navy)", letterSpacing: "0.05em" }}>
                TAX INVOICE
              </div>
              <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#F59E0B", marginTop: "0.2rem" }}>
                Booking ID: {booking.id}
              </div>
              <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>
                Date: {booking.createdAt ? new Date(booking.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "Today"}
              </div>
            </div>
          </div>

          {/* Customer & Electrician Info Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", padding: "1.25rem 0", borderBottom: "1px solid var(--border-light)" }}>
            <div>
              <span style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "var(--text-muted)", letterSpacing: "0.06em" }}>
                Billed To (Customer):
              </span>
              <div style={{ fontSize: "0.95rem", fontWeight: 700, marginTop: "0.25rem", color: "var(--text-dark)" }}>
                {booking.customerName || "Customer"}
              </div>
              <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "0.15rem" }}>
                Phone: {booking.phone || "+91 98201 23456"}
              </div>
              <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "0.15rem" }}>
                {booking.address || `${booking.flatNumber || ""}, ${booking.society || ""}, ${booking.selectedArea || "Mumbai"} - ${booking.pincode || "400066"}`}
              </div>
            </div>

            <div>
              <span style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "var(--text-muted)", letterSpacing: "0.06em" }}>
                Assigned Certified Technician:
              </span>
              <div style={{ fontSize: "0.95rem", fontWeight: 700, marginTop: "0.25rem", color: "var(--text-dark)" }}>
                {booking.assignedElectricianName || "Rajesh Kumar (Senior Technician)"}
              </div>
              <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "0.15rem" }}>
                Technician Hotline: {booking.assignedElectricianPhone || "+91 98201 45892"}
              </div>
              <div style={{ fontSize: "0.82rem", color: "#059669", marginTop: "0.15rem", fontWeight: 600 }}>
                PWD Wireman License: MH-B-WIRE-2016-8941
              </div>
            </div>
          </div>

          {/* Itemized Charges Table */}
          <div style={{ marginTop: "1.5rem" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem" }}>
              <thead>
                <tr style={{ background: "var(--bg-alt)", textAlign: "left" }}>
                  <th style={{ padding: "0.6rem 0.8rem", borderRadius: "6px 0 0 6px" }}>Item / Description</th>
                  <th style={{ padding: "0.6rem 0.8rem", textAlign: "center" }}>Qty</th>
                  <th style={{ padding: "0.6rem 0.8rem", textAlign: "right" }}>Rate</th>
                  <th style={{ padding: "0.6rem 0.8rem", textAlign: "right", borderRadius: "0 6px 6px 0" }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {/* Labour Charge */}
                <tr style={{ borderBottom: "1px solid var(--border-light)" }}>
                  <td style={{ padding: "0.75rem 0.8rem" }}>
                    <strong>{booking.serviceName || "Electrical Service & Fault Repair"}</strong>
                    <span style={{ display: "block", fontSize: "0.75rem", color: "var(--text-muted)" }}>
                      Labour, calibrated testing & 30-day post-service warranty
                    </span>
                  </td>
                  <td style={{ padding: "0.75rem 0.8rem", textAlign: "center" }}>{booking.quantity || 1}</td>
                  <td style={{ padding: "0.75rem 0.8rem", textAlign: "right" }}>₹{Math.round(servicePrice / (booking.quantity || 1))}</td>
                  <td style={{ padding: "0.75rem 0.8rem", textAlign: "right", fontWeight: 700 }}>₹{servicePrice}</td>
                </tr>

                {/* Materials Added */}
                {booking.materials && booking.materials.length > 0 ? (
                  booking.materials.map((mat, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid var(--border-light)" }}>
                      <td style={{ padding: "0.65rem 0.8rem" }}>
                        <span>{mat.name}</span>
                        <span style={{ display: "block", fontSize: "0.72rem", color: "#2563EB" }}>
                          Genuine ISI Spare Part Fitted
                        </span>
                      </td>
                      <td style={{ padding: "0.65rem 0.8rem", textAlign: "center" }}>{mat.qty}</td>
                      <td style={{ padding: "0.65rem 0.8rem", textAlign: "right" }}>₹{mat.unitPrice}</td>
                      <td style={{ padding: "0.65rem 0.8rem", textAlign: "right", fontWeight: 700 }}>₹{mat.subtotal}</td>
                    </tr>
                  ))
                ) : materialCharges > 0 ? (
                  <tr style={{ borderBottom: "1px solid var(--border-light)" }}>
                    <td style={{ padding: "0.65rem 0.8rem" }}>Electrical Materials & Spares</td>
                    <td style={{ padding: "0.65rem 0.8rem", textAlign: "center" }}>1</td>
                    <td style={{ padding: "0.65rem 0.8rem", textAlign: "right" }}>₹{materialCharges}</td>
                    <td style={{ padding: "0.65rem 0.8rem", textAlign: "right", fontWeight: 700 }}>₹{materialCharges}</td>
                  </tr>
                ) : null}

                {/* Inspection Fee */}
                <tr style={{ borderBottom: "1px solid var(--border-light)", color: "var(--text-muted)" }}>
                  <td style={{ padding: "0.65rem 0.8rem" }}>
                    Doorstep Inspection & Calibration Fee
                  </td>
                  <td style={{ padding: "0.65rem 0.8rem", textAlign: "center" }}>1</td>
                  <td style={{ padding: "0.65rem 0.8rem", textAlign: "right" }}>₹150</td>
                  <td style={{ padding: "0.65rem 0.8rem", textAlign: "right", color: "#10B981", fontWeight: 600 }}>WAIVED (₹0)</td>
                </tr>

                {/* Discount if any */}
                {discount > 0 && (
                  <tr style={{ borderBottom: "1px solid var(--border-light)", color: "#10B981" }}>
                    <td style={{ padding: "0.65rem 0.8rem" }}>
                      Promotional Discount ({booking.promoCode || "Offer"})
                    </td>
                    <td style={{ padding: "0.65rem 0.8rem", textAlign: "center" }}>-</td>
                    <td style={{ padding: "0.65rem 0.8rem", textAlign: "right" }}>-</td>
                    <td style={{ padding: "0.65rem 0.8rem", textAlign: "right", fontWeight: 700 }}>-₹{discount}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Totals Calculation Box */}
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1.25rem" }}>
            <div style={{ width: "260px", fontSize: "0.85rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "0.3rem 0" }}>
                <span style={{ color: "var(--text-muted)" }}>Subtotal (Labour + Materials):</span>
                <span style={{ fontWeight: 600 }}>₹{(servicePrice + materialCharges - discount).toLocaleString("en-IN")}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "0.3rem 0" }}>
                <span style={{ color: "var(--text-muted)" }}>GST (18% SGST + CGST):</span>
                <span style={{ fontWeight: 600 }}>₹{gstAmount}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "0.6rem 0",
                  borderTop: "2px solid var(--border-medium)",
                  marginTop: "0.4rem",
                  fontSize: "1.1rem",
                  fontWeight: 800,
                  color: "var(--color-primary-navy)"
                }}
              >
                <span>Total Amount:</span>
                <span style={{ color: "#F59E0B" }}>₹{grandTotal.toLocaleString("en-IN")}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>
                <span>Payment Mode:</span>
                <span style={{ fontWeight: 600, color: "var(--text-dark)" }}>{booking.paymentMethod || "Cash on Service"}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>
                <span>Payment Status:</span>
                <span style={{ fontWeight: 700, color: booking.paymentStatus?.toLowerCase().includes("paid") ? "#10B981" : "#D97706" }}>
                  {booking.paymentStatus?.toLowerCase().includes("paid") ? "✓ PAID ONLINE" : (booking.paymentStatus || "Pending (Pay on Service)")}
                </span>
              </div>
              {booking.transactionId && (
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.74rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>
                  <span>Transaction Ref:</span>
                  <span style={{ fontFamily: "monospace", fontWeight: 700, color: "var(--text-dark)" }}>{booking.transactionId}</span>
                </div>
              )}
            </div>
          </div>

          {/* Guarantee & Terms Footer */}
          <div style={{ marginTop: "1.5rem", padding: "0.85rem 1rem", background: "var(--bg-alt)", borderRadius: "8px", fontSize: "0.78rem", color: "var(--text-muted)", lineHeight: "1.5" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontWeight: 700, color: "#10B981", marginBottom: "0.2rem" }}>
              <ShieldCheck size={15} />
              <span>30-Day Human Safety & Workmanship Warranty</span>
            </div>
            All installations adhere strictly to CEA Regulations 2010 and IS 732 standards. For any queries regarding this invoice, contact our helpline at <strong>+91 90048 07180</strong>.
          </div>
        </div>
      </div>
    </div>
  );
}
