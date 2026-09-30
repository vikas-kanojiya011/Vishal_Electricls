import React, { useState } from "react";
import {
  X,
  CreditCard,
  Smartphone,
  Building2,
  Wallet,
  CheckCircle2,
  Lock,
  ShieldCheck,
  Copy,
  Check,
  ArrowRight,
  Sparkles
} from "lucide-react";
import gpayQrImg from "../../assets/images/gpay-qr.png";

export default function OnlinePaymentModal({
  isOpen,
  onClose,
  amount = 650,
  serviceName = "Electrical Service",
  bookingId = "",
  onPaymentSuccess
}) {
  const [activeTab, setActiveTab] = useState("upi"); // 'upi' | 'card' | 'netbanking' | 'wallet'
  const [copiedUpi, setCopiedUpi] = useState(false);

  // Card form state
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  // Netbanking state
  const [selectedBank, setSelectedBank] = useState("HDFC Bank");

  // Wallet state
  const [selectedWallet, setSelectedWallet] = useState("Paytm");

  // Checkout flow state: 'form' | 'processing' | 'otp' | 'success'
  const [paymentStep, setPaymentStep] = useState("form");
  const [simulatedOtp, setSimulatedOtp] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const [otpError, setOtpError] = useState("");
  const [transactionData, setTransactionData] = useState(null);

  if (!isOpen) return null;

  const upiMerchantId = "kanojiyavikas314-2@okicici";

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiMerchantId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  // Format Card Number into chunks of 4 digits
  const handleCardNumberChange = (e) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 16);
    const formatted = val.replace(/(\d{4})(?=\d)/g, "$1 ");
    setCardNumber(formatted);
  };

  // Format Expiry MM/YY
  const handleExpiryChange = (e) => {
    let val = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (val.length >= 2) {
      val = `${val.slice(0, 2)}/${val.slice(2)}`;
    }
    setCardExpiry(val);
  };

  // Detect card type
  const detectCardBrand = () => {
    const clean = cardNumber.replace(/\s/g, "");
    if (clean.startsWith("4")) return "Visa";
    if (/^5[1-5]/.test(clean)) return "Mastercard";
    if (/^(60|65|81|82)/.test(clean)) return "RuPay";
    if (/^3[47]/.test(clean)) return "Amex";
    return "Card";
  };

  // Trigger Online Payment Simulation
  const handleStartPayment = (chosenMethodName) => {
    setPaymentStep("processing");

    // After 1.2s of bank server handshake, request 3D-Secure OTP
    setTimeout(() => {
      const generatedCode = "789456";
      setSimulatedOtp(generatedCode);
      setPaymentStep("otp");
    }, 1200);
  };

  // Verify OTP
  const handleVerifyOtp = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (otpInput.trim() !== simulatedOtp && otpInput.trim() !== "123456") {
      setOtpError("Invalid OTP. Try entering 789456 or click 'Auto-Fill'");
      return;
    }

    setOtpError("");
    setPaymentStep("processing");

    setTimeout(() => {
      const txId = "TXN" + Date.now().toString().slice(-8);
      const paymentResult = {
        method: activeTab === "upi" ? "UPI Instant" : activeTab === "card" ? `${detectCardBrand()} Online` : activeTab === "netbanking" ? selectedBank : selectedWallet,
        transactionId: txId,
        amount,
        paidAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: "Paid Online (Verified)"
      };

      setTransactionData(paymentResult);
      setPaymentStep("success");

      if (onPaymentSuccess) {
        onPaymentSuccess(paymentResult);
      }
    }, 1200);
  };

  const handleFinish = () => {
    onClose();
  };

  return (
    <div
      className="payment-modal-overlay"
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(11, 19, 43, 0.78)",
        backdropFilter: "blur(8px)",
        zIndex: 1200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem"
      }}
      onClick={(e) => {
        if (paymentStep !== "processing") onClose();
      }}
    >
      <div
        className="payment-modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--bg-card)",
          color: "var(--text-dark)",
          borderRadius: "20px",
          maxWidth: "560px",
          width: "100%",
          maxHeight: "92vh",
          overflowY: "auto",
          boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.4)",
          border: "1px solid var(--border-color)",
          display: "flex",
          flexDirection: "column",
          position: "relative"
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "1.25rem 1.5rem",
            borderBottom: "1px solid var(--border-color)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "linear-gradient(135deg, #070B14 0%, #0F172A 100%)",
            color: "#FFFFFF",
            borderRadius: "19px 19px 0 0"
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Lock size={15} color="#10B981" />
              <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#10B981", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                256-Bit SSL Encrypted Gateway
              </span>
            </div>
            <h3 style={{ fontSize: "1.25rem", color: "#FFFFFF", margin: "0.2rem 0 0" }}>
              Vishal Electricals Secure Pay
            </h3>
          </div>

          {paymentStep !== "processing" && (
            <button
              type="button"
              onClick={onClose}
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "none",
                borderRadius: "50%",
                width: "34px",
                height: "34px",
                color: "#FFFFFF",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Amount Summary Bar */}
        <div
          style={{
            padding: "1rem 1.5rem",
            background: "rgba(245, 158, 11, 0.08)",
            borderBottom: "1px solid var(--border-color)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <div>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "block" }}>
              {bookingId ? `Booking #${bookingId}` : "Doorstep Service Booking"}
            </span>
            <strong style={{ fontSize: "0.95rem", color: "var(--text-dark)" }}>{serviceName}</strong>
          </div>
          <div style={{ textAlign: "right" }}>
            <span style={{ fontSize: "0.75rem", color: "#059669", fontWeight: 700, display: "block" }}>
              Flat 5% Online Cashback Applied
            </span>
            <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "#F59E0B" }}>
              ₹{Number(amount).toLocaleString("en-IN")}
            </div>
          </div>
        </div>

        {/* ── STAGE 1: FORM SELECTION ── */}
        {paymentStep === "form" && (
          <div style={{ padding: "1.5rem" }}>
            {/* Tabs for Online Methods */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "0.5rem",
                marginBottom: "1.5rem"
              }}
            >
              {[
                { id: "upi", label: "UPI Apps / QR", icon: Smartphone },
                { id: "card", label: "Cards", icon: CreditCard },
                { id: "netbanking", label: "NetBanking", icon: Building2 },
                { id: "wallet", label: "Wallets", icon: Wallet }
              ].map((tab) => {
                const Icon = tab.icon;
                const isSelected = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      padding: "0.65rem 0.4rem",
                      borderRadius: "10px",
                      border: isSelected ? "2px solid #2563EB" : "1px solid var(--border-color)",
                      background: isSelected ? "rgba(37,99,235,0.08)" : "var(--bg-card)",
                      color: isSelected ? "#2563EB" : "var(--text-muted)",
                      fontWeight: isSelected ? 700 : 500,
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "0.3rem",
                      fontSize: "0.78rem",
                      transition: "all 0.15s ease"
                    }}
                  >
                    <Icon size={18} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* TAB CONTENT: UPI */}
            {activeTab === "upi" && (
              <div>
                <div
                  style={{
                    border: "1px solid var(--border-color)",
                    borderRadius: "14px",
                    padding: "1.25rem",
                    textAlign: "center",
                    background: "var(--bg-alt)",
                    marginBottom: "1.25rem"
                  }}
                >
                  <div style={{ marginBottom: "0.85rem" }}>
                    <h4
                      style={{
                        fontSize: "1.05rem",
                        fontWeight: 800,
                        color: "var(--text-dark)",
                        margin: "0 0 0.35rem 0",
                        textAlign: "center"
                      }}
                    >
                      Scan & Pay using Google Pay / UPI
                    </h4>
                    <span
                      style={{
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        color: "var(--text-muted)",
                        display: "block"
                      }}
                    >
                      Vikas Kanojiya • Scan with Any UPI App (GPay / PhonePe / Paytm / BHIM)
                    </span>
                  </div>

                  {/* Responsive & Centered Google Pay QR Code */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      margin: "0 auto",
                      width: "100%"
                    }}
                  >
                    <div
                      style={{
                        background: "#FFFFFF",
                        padding: "12px",
                        borderRadius: "16px",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                        border: "2px solid #E2E8F0",
                        display: "inline-flex",
                        flexDirection: "column",
                        alignItems: "center",
                        maxWidth: "240px",
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
                          maxWidth: "216px",
                          height: "auto",
                          display: "block",
                          borderRadius: "12px",
                          objectFit: "contain",
                          margin: "0 auto"
                        }}
                      />
                    </div>
                  </div>

                  {/* Merchant VPA info & Copy Button */}
                  <div style={{ marginTop: "0.85rem", display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ fontSize: "0.88rem", fontFamily: "monospace", color: "var(--text-dark)", fontWeight: 700 }}>
                      {upiMerchantId}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyUpi}
                      style={{
                        background: "var(--bg-card)",
                        border: "1px solid var(--border-color)",
                        padding: "3px 8px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "0.75rem",
                        color: "#2563EB",
                        display: "flex",
                        alignItems: "center",
                        gap: "3px"
                      }}
                    >
                      {copiedUpi ? <Check size={13} color="#10B981" /> : <Copy size={13} />}
                      <span>{copiedUpi ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                </div>

                {/* Direct UPI Apps Quick Select */}
                <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>
                  Or Choose Installed UPI App:
                </span>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.6rem", marginBottom: "1.25rem" }}>
                  {[
                    { name: "Google Pay", color: "#4285F4" },
                    { name: "PhonePe", color: "#5F259F" },
                    { name: "Paytm", color: "#00BAF2" },
                    { name: "BHIM UPI", color: "#008744" }
                  ].map((app) => (
                    <button
                      key={app.name}
                      type="button"
                      onClick={() => handleStartPayment(`UPI (${app.name})`)}
                      style={{
                        padding: "0.6rem 0.4rem",
                        borderRadius: "10px",
                        border: "1px solid var(--border-color)",
                        background: "var(--bg-card)",
                        cursor: "pointer",
                        fontWeight: 700,
                        fontSize: "0.8rem",
                        color: "var(--text-dark)",
                        textAlign: "center"
                      }}
                    >
                      <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: app.color, display: "inline-block", marginRight: "5px" }} />
                      {app.name}
                    </button>
                  ))}
                </div>

                {/* Instant Pay CTA */}
                <button
                  type="button"
                  onClick={() => handleStartPayment("UPI Instant")}
                  className="btn btn-primary btn-lg"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  <Sparkles size={18} />
                  <span>Confirm UPI Payment (₹{Number(amount).toLocaleString("en-IN")})</span>
                </button>
              </div>
            )}

            {/* TAB CONTENT: DEBIT / CREDIT CARDS */}
            {activeTab === "card" && (
              <div>
                {/* Virtual Card Preview */}
                <div
                  style={{
                    background: "linear-gradient(135deg, #1E293B 0%, #0F172A 100%)",
                    color: "#FFFFFF",
                    padding: "1.25rem 1.5rem",
                    borderRadius: "14px",
                    marginBottom: "1.25rem",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.18)",
                    border: "1px solid rgba(255,255,255,0.1)"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                    <span style={{ fontSize: "0.75rem", letterSpacing: "1px", color: "#94A3B8" }}>VISHAL ELECTRICALS SECURE</span>
                    <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "#F59E0B" }}>{detectCardBrand()}</span>
                  </div>
                  <div style={{ fontSize: "1.25rem", fontFamily: "monospace", letterSpacing: "2px", margin: "0.8rem 0" }}>
                    {cardNumber || "•••• •••• •••• ••••"}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                    <div>
                      <span style={{ fontSize: "0.65rem", color: "#94A3B8", display: "block" }}>CARDHOLDER</span>
                      <strong style={{ fontSize: "0.88rem", textTransform: "uppercase" }}>{cardHolder || "PRIYA SHARMA"}</strong>
                    </div>
                    <div>
                      <span style={{ fontSize: "0.65rem", color: "#94A3B8", display: "block" }}>EXPIRES</span>
                      <strong style={{ fontSize: "0.88rem" }}>{cardExpiry || "MM/YY"}</strong>
                    </div>
                  </div>
                </div>

                {/* Card Inputs */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", marginBottom: "1.25rem" }}>
                  <div>
                    <label className="form-label" style={{ fontSize: "0.8rem", marginBottom: "0.3rem" }}>Card Number</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="4532 8901 2345 6789"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                    />
                  </div>

                  <div>
                    <label className="form-label" style={{ fontSize: "0.8rem", marginBottom: "0.3rem" }}>Name on Card</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Priya Sharma"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem" }}>
                    <div>
                      <label className="form-label" style={{ fontSize: "0.8rem", marginBottom: "0.3rem" }}>Expiry Date</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={handleExpiryChange}
                      />
                    </div>
                    <div>
                      <label className="form-label" style={{ fontSize: "0.8rem", marginBottom: "0.3rem" }}>CVV</label>
                      <input
                        type="password"
                        maxLength={3}
                        className="form-control"
                        placeholder="•••"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ""))}
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleStartPayment(`${detectCardBrand()} Card`)}
                  className="btn btn-primary btn-lg"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  <Lock size={16} />
                  <span>Pay ₹{Number(amount).toLocaleString("en-IN")} via Card</span>
                </button>
              </div>
            )}

            {/* TAB CONTENT: NETBANKING */}
            {activeTab === "netbanking" && (
              <div>
                <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: "0.75rem" }}>
                  Select Popular Bank:
                </span>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.65rem", marginBottom: "1.25rem" }}>
                  {["HDFC Bank", "State Bank of India", "ICICI Bank", "Axis Bank", "Kotak Mahindra", "Punjab National Bank"].map((bank) => (
                    <button
                      key={bank}
                      type="button"
                      onClick={() => setSelectedBank(bank)}
                      style={{
                        padding: "0.75rem",
                        borderRadius: "10px",
                        border: selectedBank === bank ? "2px solid #2563EB" : "1px solid var(--border-color)",
                        background: selectedBank === bank ? "rgba(37,99,235,0.08)" : "var(--bg-card)",
                        color: selectedBank === bank ? "#2563EB" : "var(--text-dark)",
                        fontWeight: selectedBank === bank ? 700 : 500,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        fontSize: "0.85rem"
                      }}
                    >
                      <Building2 size={16} color={selectedBank === bank ? "#2563EB" : "#64748B"} />
                      <span>{bank}</span>
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => handleStartPayment(`NetBanking (${selectedBank})`)}
                  className="btn btn-primary btn-lg"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  <span>Proceed to {selectedBank} Gateway</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            )}

            {/* TAB CONTENT: WALLETS */}
            {activeTab === "wallet" && (
              <div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.5rem" }}>
                  {["Paytm Wallet", "Amazon Pay", "PhonePe Wallet", "Mobikwik"].map((w) => (
                    <div
                      key={w}
                      onClick={() => setSelectedWallet(w)}
                      style={{
                        padding: "0.85rem 1rem",
                        borderRadius: "12px",
                        border: selectedWallet === w ? "2px solid #2563EB" : "1px solid var(--border-color)",
                        background: selectedWallet === w ? "rgba(37,99,235,0.08)" : "var(--bg-card)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        cursor: "pointer"
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                        <Wallet size={18} color="#2563EB" />
                        <strong style={{ fontSize: "0.95rem" }}>{w}</strong>
                      </div>
                      <input
                        type="radio"
                        checked={selectedWallet === w}
                        onChange={() => setSelectedWallet(w)}
                      />
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => handleStartPayment(selectedWallet)}
                  className="btn btn-primary btn-lg"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  <span>Pay ₹{Number(amount).toLocaleString("en-IN")} via {selectedWallet}</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── STAGE 2: CONNECTING / PROCESSING SPINNER ── */}
        {paymentStep === "processing" && (
          <div style={{ padding: "3.5rem 2rem", textAlign: "center" }}>
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                border: "4px solid rgba(37,99,235,0.2)",
                borderTopColor: "#2563EB",
                animation: "spin 0.8s linear infinite",
                margin: "0 auto 1.5rem"
              }}
            />
            <h4 style={{ fontSize: "1.3rem", color: "var(--text-dark)", marginBottom: "0.4rem" }}>
              Connecting to Bank Gateway...
            </h4>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: 0 }}>
              Please do not press back or refresh. Securing 256-bit encrypted handshake with your bank.
            </p>
          </div>
        )}

        {/* ── STAGE 3: 3D-SECURE SIMULATED OTP ── */}
        {paymentStep === "otp" && (
          <div style={{ padding: "2rem" }}>
            <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "50%",
                  background: "rgba(37,99,235,0.1)",
                  color: "#2563EB",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 0.75rem"
                }}
              >
                <Lock size={26} />
              </div>
              <h4 style={{ fontSize: "1.25rem", color: "var(--text-dark)", marginBottom: "0.25rem" }}>
                3D Secure Bank Verification
              </h4>
              <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", margin: 0 }}>
                A 6-digit one-time password has been sent to your registered mobile number for ₹{Number(amount).toLocaleString("en-IN")}.
              </p>
            </div>

            {/* Quick Demo Help Banner */}
            <div
              style={{
                background: "rgba(245, 158, 11, 0.1)",
                border: "1px dashed #F59E0B",
                borderRadius: "10px",
                padding: "0.75rem 1rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.25rem"
              }}
            >
              <div>
                <span style={{ fontSize: "0.75rem", color: "#B45309", fontWeight: 700, display: "block" }}>
                  TEST DEMO SIMULATION
                </span>
                <span style={{ fontSize: "0.85rem", color: "var(--text-dark)" }}>
                  Auto-fill test OTP: <strong>789456</strong>
                </span>
              </div>
              <button
                type="button"
                onClick={() => setOtpInput("789456")}
                style={{
                  background: "#F59E0B",
                  color: "#FFFFFF",
                  border: "none",
                  padding: "4px 10px",
                  borderRadius: "6px",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  cursor: "pointer"
                }}
              >
                Auto-Fill
              </button>
            </div>

            <form onSubmit={handleVerifyOtp}>
              <div style={{ marginBottom: "1.25rem" }}>
                <input
                  type="text"
                  required
                  maxLength={6}
                  placeholder="Enter 6-digit OTP"
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ""))}
                  className="form-control"
                  style={{
                    fontSize: "1.4rem",
                    textAlign: "center",
                    letterSpacing: "6px",
                    fontWeight: 800
                  }}
                />
                {otpError && (
                  <span style={{ color: "#EF4444", fontSize: "0.8rem", display: "block", marginTop: "0.4rem", textAlign: "center" }}>
                    {otpError}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg"
                style={{ width: "100%", justifyContent: "center" }}
              >
                <CheckCircle2 size={18} />
                <span>Authorize & Pay ₹{Number(amount).toLocaleString("en-IN")}</span>
              </button>
            </form>
          </div>
        )}

        {/* ── STAGE 4: PAYMENT SUCCESS ── */}
        {paymentStep === "success" && transactionData && (
          <div style={{ padding: "2.5rem 1.5rem", textAlign: "center" }}>
            <div
              style={{
                width: "68px",
                height: "68px",
                borderRadius: "50%",
                background: "rgba(16,185,129,0.15)",
                color: "#10B981",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.25rem"
              }}
            >
              <CheckCircle2 size={40} />
            </div>

            <h3 style={{ fontSize: "1.5rem", color: "#059669", marginBottom: "0.25rem" }}>
              Online Payment Successful!
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
              Your transaction has been approved by your bank and digitally verified.
            </p>

            {/* Receipt Summary Box */}
            <div
              style={{
                background: "var(--bg-alt)",
                border: "1px solid var(--border-color)",
                borderRadius: "12px",
                padding: "1rem 1.25rem",
                textAlign: "left",
                marginBottom: "1.75rem",
                fontSize: "0.88rem"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                <span style={{ color: "var(--text-muted)" }}>Amount Paid:</span>
                <strong style={{ color: "#F59E0B", fontSize: "1.05rem" }}>₹{Number(transactionData.amount).toLocaleString("en-IN")}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                <span style={{ color: "var(--text-muted)" }}>Transaction ID:</span>
                <span style={{ fontFamily: "monospace", fontWeight: 700 }}>{transactionData.transactionId}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                <span style={{ color: "var(--text-muted)" }}>Payment Method:</span>
                <span style={{ fontWeight: 600 }}>{transactionData.method}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-muted)" }}>Status:</span>
                <span style={{ color: "#059669", fontWeight: 700 }}>✓ Verified & Settled</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleFinish}
              className="btn btn-gold btn-lg"
              style={{ width: "100%", justifyContent: "center" }}
            >
              <span>Continue with Confirmed Booking</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}

        {/* Modal Footer Security Badge */}
        <div
          style={{
            padding: "0.75rem 1.5rem",
            background: "var(--bg-alt)",
            borderTop: "1px solid var(--border-color)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "0.75rem",
            color: "var(--text-muted)",
            borderRadius: "0 0 19px 19px"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <ShieldCheck size={14} color="#10B981" />
            <span>RBI Approved • NPCI UPI Compliant</span>
          </div>
          <span>Vishal Electricals Enterprise</span>
        </div>
      </div>
    </div>
  );
}
