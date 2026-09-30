import React, { useState } from "react";
import {
  QrCode,
  Banknote,
  CreditCard,
  Smartphone,
  ShieldCheck,
  Building2,
  Wallet,
  Lock,
  CheckCircle2,
  ArrowRight,
  Copy,
  Check
} from "lucide-react";
import OnlinePaymentModal from "../common/OnlinePaymentModal";
import gpayQrImg from "../../assets/images/gpay-qr.png";

const ONLINE_METHODS = [
  {
    id: "online-upi",
    label: "UPI Instant Payment (QR / Apps)",
    sub: "Google Pay, PhonePe, Paytm, BHIM — Instant 5% Cashback Applied",
    icon: Smartphone,
    badge: "Most Popular • Zero Fee",
    color: "#2563EB"
  },
  {
    id: "online-card",
    label: "Debit / Credit Card (Online Gateway)",
    sub: "Visa, Mastercard, RuPay, Amex with 256-bit 3D Secure Verification",
    icon: CreditCard,
    badge: "All Cards",
    color: "#8B5CF6"
  },
  {
    id: "online-netbanking",
    label: "Net Banking (All Indian Banks)",
    sub: "HDFC, SBI, ICICI, Axis, Kotak, PNB & 50+ Scheduled Banks",
    icon: Building2,
    badge: "Instant",
    color: "#059669"
  },
  {
    id: "online-wallet",
    label: "Digital Wallets",
    sub: "Paytm Wallet, Amazon Pay, PhonePe Wallet, Mobikwik",
    icon: Wallet,
    badge: "1-Click",
    color: "#D97706"
  }
];

const OFFLINE_METHODS = [
  {
    id: "cash",
    label: "Cash on Service (Pay After Work)",
    sub: "Pay technician in cash after work completion and live testing",
    icon: Banknote,
    badge: "Post-Service",
    color: "#10B981"
  },
  {
    id: "pos-onsite",
    label: "Debit / Credit Card (POS on site)",
    sub: "Swipe / tap your card on technician portable POS terminal after work",
    icon: CreditCard,
    badge: "On Doorstep",
    color: "#8B5CF6"
  },
  {
    id: "upi-onsite",
    label: "Scan UPI QR on site",
    sub: "Scan technician personal ID QR code after work is signed off",
    icon: QrCode,
    badge: "On Doorstep",
    color: "#2563EB"
  }
];

export default function PaymentSelectionUI({
  selectedMethod,
  onSelectMethod,
  amount = 650,
  serviceName = "Electrical Service",
  onlinePaymentData = null,
  onOnlinePaymentSuccess = null
}) {
  const [payCategory, setPayCategory] = useState(() => {
    if (onlinePaymentData || selectedMethod?.toLowerCase().includes("online") || selectedMethod?.toLowerCase().includes("upi")) {
      return "online";
    }
    return "online"; // Default to Online as requested
  });

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [activeOnlineSub, setActiveOnlineSub] = useState("UPI Instant Payment (QR / Apps)");
  const [copiedUpi, setCopiedUpi] = useState(false);

  const handleCopyUpi = () => {
    navigator.clipboard.writeText("kanojiyavikas314-2@okicici");
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleCategorySwitch = (category) => {
    setPayCategory(category);
    if (category === "online") {
      if (onlinePaymentData) {
        onSelectMethod(`Online (${onlinePaymentData.method})`);
      } else {
        onSelectMethod(activeOnlineSub);
      }
    } else {
      onSelectMethod("Cash on Service (Pay After Work)");
    }
  };

  const handleSelectOnlineSub = (methodLabel) => {
    setActiveOnlineSub(methodLabel);
    if (!onlinePaymentData) {
      onSelectMethod(methodLabel);
    }
  };

  const handleModalSuccess = (paymentResult) => {
    if (onOnlinePaymentSuccess) {
      onOnlinePaymentSuccess(paymentResult);
    }
    onSelectMethod(`Online (${paymentResult.method})`);
  };

  return (
    <div className="payment-selection-box" style={{ marginTop: "1.5rem" }}>
      <div style={{ marginBottom: "1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
          <label className="form-label" style={{ fontWeight: 800, fontSize: "1.05rem", margin: 0, display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <CreditCard size={20} color="#F59E0B" />
            <span>Select Payment Method</span>
          </label>
          <span style={{ fontSize: "0.78rem", background: "rgba(16,185,129,0.12)", color: "#059669", padding: "3px 10px", borderRadius: "12px", fontWeight: 700 }}>
            ⚡ 100% Safe & Guaranteed
          </span>
        </div>
        <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", margin: 0 }}>
          Choose your preferred payment mode. Pay online for instant priority technician dispatch and 5% cashback, or choose pay after service.
        </p>
      </div>

      {/* Primary Category Switcher: Pay Online vs Pay After Service */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0.75rem",
          marginBottom: "1.25rem",
          background: "var(--bg-alt)",
          padding: "5px",
          borderRadius: "14px",
          border: "1px solid var(--border-color)"
        }}
      >
        <button
          type="button"
          onClick={() => handleCategorySwitch("online")}
          style={{
            padding: "0.75rem 1rem",
            borderRadius: "10px",
            border: payCategory === "online" ? "2px solid #2563EB" : "1px solid transparent",
            background: payCategory === "online" ? "var(--bg-card)" : "transparent",
            color: payCategory === "online" ? "#2563EB" : "var(--text-muted)",
            fontWeight: 800,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            fontSize: "0.92rem",
            boxShadow: payCategory === "online" ? "0 4px 12px rgba(0,0,0,0.08)" : "none",
            transition: "all 0.15s ease"
          }}
        >
          <Smartphone size={17} />
          <span>Pay Online Now</span>
          <span style={{ fontSize: "0.7rem", background: "#10B981", color: "#FFF", padding: "1px 6px", borderRadius: "8px" }}>
            5% OFF
          </span>
        </button>

        <button
          type="button"
          onClick={() => handleCategorySwitch("offline")}
          style={{
            padding: "0.75rem 1rem",
            borderRadius: "10px",
            border: payCategory === "offline" ? "2px solid #F59E0B" : "1px solid transparent",
            background: payCategory === "offline" ? "var(--bg-card)" : "transparent",
            color: payCategory === "offline" ? "#D97706" : "var(--text-muted)",
            fontWeight: 800,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            fontSize: "0.92rem",
            boxShadow: payCategory === "offline" ? "0 4px 12px rgba(0,0,0,0.08)" : "none",
            transition: "all 0.15s ease"
          }}
        >
          <Banknote size={17} />
          <span>Pay After Service</span>
        </button>
      </div>

      {/* ── CATEGORY 1: PAY ONLINE ── */}
      {payCategory === "online" && (
        <div>
          {/* If already paid online */}
          {onlinePaymentData ? (
            <div
              style={{
                background: "rgba(16, 185, 129, 0.08)",
                border: "2px solid #10B981",
                borderRadius: "16px",
                padding: "1.25rem 1.5rem",
                marginBottom: "1rem"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.75rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      background: "#10B981",
                      color: "#FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <CheckCircle2 size={26} />
                  </div>
                  <div>
                    <h4 style={{ margin: 0, color: "#065F46", fontSize: "1.1rem" }}>
                      Payment Verified & Confirmed!
                    </h4>
                    <span style={{ fontSize: "0.82rem", color: "#047857" }}>
                      Paid via <strong>{onlinePaymentData.method}</strong> • Ref: <span style={{ fontFamily: "monospace", fontWeight: 700 }}>{onlinePaymentData.transactionId}</span>
                    </span>
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <span style={{ fontSize: "0.75rem", color: "#065F46", textTransform: "uppercase", fontWeight: 700 }}>Amount Paid</span>
                  <div style={{ fontSize: "1.35rem", fontWeight: 900, color: "#10B981" }}>
                    ₹{Number(onlinePaymentData.amount).toLocaleString("en-IN")}
                  </div>
                </div>
              </div>

              <div style={{ marginTop: "1rem", display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
                <button
                  type="button"
                  onClick={() => setShowPaymentModal(true)}
                  style={{
                    background: "transparent",
                    border: "1px solid #10B981",
                    color: "#065F46",
                    padding: "4px 12px",
                    borderRadius: "8px",
                    fontSize: "0.8rem",
                    cursor: "pointer",
                    fontWeight: 600
                  }}
                >
                  View Receipt
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* Online Methods List */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.25rem" }}>
                {ONLINE_METHODS.map((method) => {
                  const isSelected = activeOnlineSub === method.label;
                  const Icon = method.icon;

                  return (
                    <div
                      key={method.id}
                      onClick={() => handleSelectOnlineSub(method.label)}
                      style={{
                        border: isSelected ? "2px solid #2563EB" : "1px solid var(--border-color)",
                        background: isSelected ? "rgba(37,99,235,0.06)" : "var(--bg-card)",
                        borderRadius: "12px",
                        padding: "0.9rem 1.15rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        cursor: "pointer",
                        transition: "all 0.2s ease"
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
                        <div
                          style={{
                            width: "42px",
                            height: "42px",
                            borderRadius: "10px",
                            background: `${method.color}15`,
                            color: method.color,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0
                          }}
                        >
                          <Icon size={20} />
                        </div>

                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <span style={{ fontWeight: 700, fontSize: "0.92rem", color: "var(--text-dark)" }}>
                              {method.label}
                            </span>
                            <span
                              style={{
                                fontSize: "0.68rem",
                                fontWeight: 700,
                                padding: "0.1rem 0.45rem",
                                borderRadius: "999px",
                                background: "var(--bg-alt)",
                                color: method.color
                              }}
                            >
                              {method.badge}
                            </span>
                          </div>
                          <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", display: "block", marginTop: "0.15rem" }}>
                            {method.sub}
                          </span>
                        </div>
                      </div>

                      <div
                        style={{
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          border: isSelected ? "6px solid #2563EB" : "2px solid var(--border-medium)",
                          background: "#FFFFFF",
                          flexShrink: 0
                        }}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Responsive Center-Aligned Google Pay QR Code */}
              {activeOnlineSub === "UPI Instant Payment (QR / Apps)" && (
                <div
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-color)",
                    borderRadius: "14px",
                    padding: "1.25rem",
                    marginBottom: "1.25rem",
                    textAlign: "center"
                  }}
                >
                  <h4
                    style={{
                      margin: "0 0 0.35rem 0",
                      fontWeight: 800,
                      fontSize: "1.05rem",
                      color: "var(--text-dark)"
                    }}
                  >
                    Scan & Pay using Google Pay / UPI
                  </h4>
                  <span
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--text-muted)",
                      display: "block",
                      marginBottom: "0.85rem"
                    }}
                  >
                    Vikas Kanojiya • Scan with Any UPI App
                  </span>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      margin: "0 auto 0.85rem auto",
                      width: "100%"
                    }}
                  >
                    <div
                      style={{
                        background: "#FFFFFF",
                        padding: "10px",
                        borderRadius: "14px",
                        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                        border: "2px solid #E2E8F0",
                        display: "inline-flex",
                        flexDirection: "column",
                        alignItems: "center",
                        maxWidth: "210px",
                        width: "100%",
                        margin: "0 auto"
                      }}
                    >
                      <img
                        src={gpayQrImg || "/images/gpay-qr.png"}
                        alt="Scan & Pay using Google Pay / UPI"
                        onError={(e) => {
                          if (e.currentTarget.src !== window.location.origin + "/images/gpay-qr.png") {
                            e.currentTarget.src = "/images/gpay-qr.png";
                          }
                        }}
                        style={{
                          width: "100%",
                          maxWidth: "190px",
                          height: "auto",
                          display: "block",
                          borderRadius: "10px",
                          objectFit: "contain",
                          margin: "0 auto"
                        }}
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "0.5rem",
                      flexWrap: "wrap"
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.84rem",
                        fontFamily: "monospace",
                        color: "var(--text-dark)",
                        fontWeight: 700,
                        background: "var(--bg-alt)",
                        padding: "3px 8px",
                        borderRadius: "6px",
                        border: "1px solid var(--border-color)"
                      }}
                    >
                      kanojiyavikas314-2@okicici
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyUpi}
                      style={{
                        background: "var(--bg-card)",
                        border: "1px solid var(--border-color)",
                        padding: "4px 8px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "0.75rem",
                        color: "#2563EB",
                        fontWeight: 600,
                        display: "flex",
                        alignItems: "center",
                        gap: "4px"
                      }}
                    >
                      {copiedUpi ? <Check size={13} color="#10B981" /> : <Copy size={13} />}
                      <span>{copiedUpi ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Instant Online Pay Trigger Button */}
              <button
                type="button"
                onClick={() => setShowPaymentModal(true)}
                className="btn btn-primary btn-lg"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  padding: "0.9rem",
                  fontSize: "1.05rem",
                  background: "linear-gradient(135deg, #2563EB, #1D4ED8)",
                  boxShadow: "0 6px 20px rgba(37, 99, 235, 0.3)"
                }}
              >
                <Lock size={18} />
                <span>Pay ₹{Number(amount).toLocaleString("en-IN")} Online Now (UPI / Card)</span>
                <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── CATEGORY 2: PAY AFTER SERVICE ── */}
      {payCategory === "offline" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {OFFLINE_METHODS.map((method) => {
            const isSelected = selectedMethod === method.label;
            const Icon = method.icon;

            return (
              <div
                key={method.id}
                onClick={() => onSelectMethod(method.label)}
                style={{
                  border: isSelected ? "2px solid #F59E0B" : "1px solid var(--border-color)",
                  background: isSelected ? "rgba(245, 158, 11, 0.08)" : "var(--bg-card)",
                  borderRadius: "12px",
                  padding: "0.9rem 1.15rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
                  <div
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "10px",
                      background: `${method.color}15`,
                      color: method.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0
                    }}
                  >
                    <Icon size={20} />
                  </div>

                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span style={{ fontWeight: 700, fontSize: "0.92rem", color: "var(--text-dark)" }}>
                        {method.label}
                      </span>
                      <span
                        style={{
                          fontSize: "0.68rem",
                          fontWeight: 700,
                          padding: "0.1rem 0.45rem",
                          borderRadius: "999px",
                          background: "var(--bg-alt)",
                          color: method.color
                        }}
                      >
                        {method.badge}
                      </span>
                    </div>
                    <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", display: "block", marginTop: "0.15rem" }}>
                      {method.sub}
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    border: isSelected ? "6px solid #F59E0B" : "2px solid var(--border-medium)",
                    background: "#FFFFFF",
                    flexShrink: 0
                  }}
                />
              </div>
            );
          })}
        </div>
      )}

      {/* Trust & Guarantee Banner */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          marginTop: "1.25rem",
          padding: "0.75rem 1rem",
          background: "rgba(16, 185, 129, 0.08)",
          borderRadius: "10px",
          border: "1px solid rgba(16, 185, 129, 0.2)",
          fontSize: "0.82rem",
          color: "#059669"
        }}
      >
        <ShieldCheck size={17} flexShrink={0} />
        <span>
          <strong>100% Safe & Verified.</strong> All online payments are protected by 256-bit encryption. Digital GST tax invoice issued upon confirmation.
        </span>
      </div>

      {/* Online Payment Modal Component */}
      <OnlinePaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        amount={amount}
        serviceName={serviceName}
        onPaymentSuccess={handleModalSuccess}
      />
    </div>
  );
}
