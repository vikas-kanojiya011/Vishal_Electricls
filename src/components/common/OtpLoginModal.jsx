import React, { useState, useEffect, useRef, useCallback } from "react";
import { X, Phone, ShieldCheck, RotateCw, CheckCircle2, ArrowRight, Smartphone } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

// ═══════════════════════════════════════════════════════
// OTP Login Modal — Vishal Electricals
// 2-step mobile OTP authentication via Firebase Phone Auth
// Step 1: Enter 10-digit mobile number
// Step 2: Enter 6-digit OTP with resend countdown
// ═══════════════════════════════════════════════════════

const RESEND_SECONDS = 30;

export default function OtpLoginModal({ isOpen, onClose, onSuccess }) {
  const { sendOtp, verifyOtp, isLoading, authError, clearAuthError, confirmationResult } = useAuth();

  const [step, setStep]               = useState("phone"); // "phone" | "otp" | "success"
  const [phone, setPhone]             = useState("");
  const [otp, setOtp]                 = useState(["", "", "", "", "", ""]);
  const [localError, setLocalError]   = useState("");
  const [countdown, setCountdown]     = useState(0);
  const otpRefs = useRef([]);
  const timerRef = useRef(null);

  // Reset when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setStep("phone");
      setPhone("");
      setOtp(["", "", "", "", "", ""]);
      setLocalError("");
      setCountdown(0);
      clearAuthError();
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen, clearAuthError]);

  // Sync firebase error to local
  useEffect(() => {
    if (authError) setLocalError(authError);
  }, [authError]);

  const startCountdown = useCallback(() => {
    setCountdown(RESEND_SECONDS);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) { clearInterval(timerRef.current); return 0; }
        return prev - 1;
      });
    }, 1000);
  }, []);

  // ── Step 1: Submit phone number ──
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLocalError("");
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length !== 10) {
      setLocalError("Please enter a valid 10-digit mobile number.");
      return;
    }
    const result = await sendOtp(cleaned, "otp-recaptcha-container");
    if (result.success) {
      setStep("otp");
      startCountdown();
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    }
  };

  // ── OTP digit input handler ──
  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
    // Auto-submit when all 6 digits entered
    if (updated.every((d) => d !== "") && updated.join("").length === 6) {
      submitOtp(updated.join(""));
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      setOtp(pasted.split(""));
      setTimeout(() => submitOtp(pasted), 50);
    }
  };

  // ── Step 2: Verify OTP ──
  const submitOtp = async (code) => {
    setLocalError("");
    const result = await verifyOtp(code);
    if (result.success) {
      setStep("success");
      setTimeout(() => {
        onSuccess?.(result.user);
        onClose?.();
      }, 1800);
    } else {
      setOtp(["", "", "", "", "", ""]);
      setTimeout(() => otpRefs.current[0]?.focus(), 50);
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    submitOtp(otp.join(""));
  };

  // ── Resend OTP ──
  const handleResend = async () => {
    if (countdown > 0) return;
    setOtp(["", "", "", "", "", ""]);
    setLocalError("");
    const result = await sendOtp(phone.replace(/\D/g, ""), "otp-recaptcha-container");
    if (result.success) {
      startCountdown();
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    }
  };

  if (!isOpen) return null;

  const maskedPhone = phone.replace(/\D/g, "").replace(/(\d{2})\d{6}(\d{2})/, "$1••••••$2");

  return (
    <>
      {/* Invisible reCAPTCHA container — must be in DOM while modal is open */}
      <div id="otp-recaptcha-container" style={{ position: "fixed", bottom: 0, left: 0, zIndex: 99999 }} />

      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 9000,
          background: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(4px)",
          animation: "fadeIn 0.2s ease",
        }}
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Mobile OTP Login"
        style={{
          position: "fixed", inset: 0, zIndex: 9001,
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "1rem",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            background: "var(--bg-card)",
            borderRadius: "20px",
            padding: "0",
            width: "100%",
            maxWidth: "420px",
            boxShadow: "0 24px 64px rgba(0,0,0,0.3)",
            overflow: "hidden",
            pointerEvents: "auto",
            animation: "slideUp 0.25s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >
          {/* ── Header ── */}
          <div style={{
            background: "linear-gradient(135deg, #070B14 0%, #0B132B 60%, #131E3D 100%)",
            padding: "1.75rem 1.75rem 1.5rem",
            position: "relative",
            textAlign: "center",
          }}>
            <button
              onClick={onClose}
              style={{
                position: "absolute", top: "1rem", right: "1rem",
                background: "rgba(255,255,255,0.1)", border: "none",
                borderRadius: "50%", width: "32px", height: "32px",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", color: "#FFFFFF",
              }}
            >
              <X size={16} />
            </button>

            {/* Lightning emblem */}
            <div style={{
              width: "54px", height: "54px", borderRadius: "50%",
              background: "rgba(245,158,11,0.15)", border: "2px solid rgba(245,158,11,0.4)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 0.85rem",
            }}>
              {step === "success"
                ? <CheckCircle2 size={26} color="#10B981" />
                : step === "otp"
                  ? <ShieldCheck size={26} color="#F59E0B" />
                  : <Smartphone size={26} color="#F59E0B" />
              }
            </div>

            <h2 style={{ color: "#FFFFFF", fontSize: "1.35rem", fontWeight: 800, margin: "0 0 0.3rem" }}>
              {step === "success" ? "✓ Verified Successfully!" : step === "otp" ? "Enter OTP" : "Login to Your Account"}
            </h2>
            <p style={{ color: "#94A3B8", fontSize: "0.85rem", margin: 0 }}>
              {step === "success"
                ? "You are now logged in. Redirecting…"
                : step === "otp"
                  ? `OTP sent to +91 ${maskedPhone}`
                  : "We'll send a 6-digit OTP to your mobile number"
              }
            </p>
          </div>

          {/* ── Body ── */}
          <div style={{ padding: "1.75rem" }}>

            {/* ── STEP 1: Phone Entry ── */}
            {step === "phone" && (
              <form onSubmit={handleSendOtp}>
                <div style={{ marginBottom: "1.25rem" }}>
                  <label style={{
                    display: "block", fontSize: "0.82rem", fontWeight: 700,
                    color: "var(--text-muted)", marginBottom: "0.5rem"
                  }}>
                    Mobile Number
                  </label>
                  <div style={{
                    display: "flex", alignItems: "center",
                    border: "2px solid var(--border-color)",
                    borderRadius: "12px", overflow: "hidden",
                    background: "var(--bg-alt)",
                    transition: "border-color 0.15s",
                  }}
                    onFocus={(e) => e.currentTarget.style.borderColor = "#2563EB"}
                    onBlur={(e) => e.currentTarget.style.borderColor = "var(--border-color)"}
                  >
                    {/* Country code badge */}
                    <div style={{
                      padding: "0.85rem 0.9rem", background: "var(--bg-card)",
                      borderRight: "1px solid var(--border-color)",
                      display: "flex", alignItems: "center", gap: "0.4rem",
                      fontSize: "0.9rem", fontWeight: 700, color: "var(--text-dark)",
                      whiteSpace: "nowrap"
                    }}>
                      🇮🇳 +91
                    </div>
                    <input
                      id="otp-phone-input"
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      value={phone.replace(/\D/g, "").slice(0, 10)}
                      onChange={(e) => { setPhone(e.target.value); setLocalError(""); }}
                      placeholder="98765 43210"
                      autoFocus
                      required
                      style={{
                        flex: 1, border: "none", outline: "none",
                        padding: "0.85rem 1rem", fontSize: "1rem",
                        background: "transparent", color: "var(--text-dark)",
                        fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.04em"
                      }}
                    />
                  </div>
                </div>

                {localError && (
                  <div style={{
                    background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)",
                    borderRadius: "10px", padding: "0.65rem 0.9rem",
                    fontSize: "0.82rem", color: "#EF4444", marginBottom: "1.1rem"
                  }}>
                    {localError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  style={{
                    width: "100%", padding: "0.9rem",
                    background: isLoading ? "#94A3B8" : "linear-gradient(135deg, #2563EB, #1D4ED8)",
                    color: "#FFFFFF", border: "none", borderRadius: "12px",
                    fontSize: "1rem", fontWeight: 700, cursor: isLoading ? "not-allowed" : "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    gap: "0.6rem", boxShadow: "0 6px 20px rgba(37,99,235,0.3)",
                    transition: "all 0.2s ease",
                  }}
                >
                  {isLoading ? (
                    <>
                      <span style={{
                        width: "18px", height: "18px", border: "2px solid rgba(255,255,255,0.3)",
                        borderTopColor: "#FFFFFF", borderRadius: "50%",
                        display: "inline-block", animation: "spin 0.7s linear infinite"
                      }} />
                      Sending OTP…
                    </>
                  ) : (
                    <>
                      <Phone size={17} />
                      Send OTP via SMS
                      <ArrowRight size={17} />
                    </>
                  )}
                </button>

                <p style={{ textAlign: "center", fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "1rem" }}>
                  🔒 Secured by Google Firebase · Protected by reCAPTCHA
                </p>
              </form>
            )}

            {/* ── STEP 2: OTP Entry ── */}
            {step === "otp" && (
              <form onSubmit={handleVerifyOtp}>
                <label style={{
                  display: "block", fontSize: "0.82rem", fontWeight: 700,
                  color: "var(--text-muted)", marginBottom: "0.75rem", textAlign: "center"
                }}>
                  Enter the 6-digit OTP
                </label>

                {/* 6-box OTP input */}
                <div
                  style={{ display: "flex", gap: "0.5rem", justifyContent: "center", marginBottom: "1.25rem" }}
                  onPaste={handleOtpPaste}
                >
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      ref={(el) => (otpRefs.current[i] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      style={{
                        width: "46px", height: "54px",
                        textAlign: "center", fontSize: "1.4rem", fontWeight: 800,
                        border: digit ? "2px solid #2563EB" : "2px solid var(--border-color)",
                        borderRadius: "12px", outline: "none",
                        background: digit ? "rgba(37,99,235,0.06)" : "var(--bg-alt)",
                        color: "var(--text-dark)",
                        transition: "all 0.15s ease",
                        fontFamily: "monospace",
                      }}
                    />
                  ))}
                </div>

                {localError && (
                  <div style={{
                    background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)",
                    borderRadius: "10px", padding: "0.65rem 0.9rem",
                    fontSize: "0.82rem", color: "#EF4444", marginBottom: "1.1rem", textAlign: "center"
                  }}>
                    {localError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading || otp.join("").length < 6}
                  style={{
                    width: "100%", padding: "0.9rem",
                    background: (isLoading || otp.join("").length < 6)
                      ? "#94A3B8"
                      : "linear-gradient(135deg, #10B981, #059669)",
                    color: "#FFFFFF", border: "none", borderRadius: "12px",
                    fontSize: "1rem", fontWeight: 700,
                    cursor: (isLoading || otp.join("").length < 6) ? "not-allowed" : "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    gap: "0.6rem", boxShadow: "0 6px 20px rgba(16,185,129,0.25)",
                    transition: "all 0.2s ease",
                  }}
                >
                  {isLoading ? (
                    <>
                      <span style={{
                        width: "18px", height: "18px", border: "2px solid rgba(255,255,255,0.3)",
                        borderTopColor: "#FFFFFF", borderRadius: "50%",
                        display: "inline-block", animation: "spin 0.7s linear infinite"
                      }} />
                      Verifying…
                    </>
                  ) : (
                    <>
                      <ShieldCheck size={17} />
                      Verify & Login
                    </>
                  )}
                </button>

                {/* Resend row */}
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  marginTop: "1rem", flexWrap: "wrap", gap: "0.5rem"
                }}>
                  <button
                    type="button"
                    onClick={() => { setStep("phone"); setLocalError(""); setOtp(["","","","","",""]); }}
                    style={{
                      background: "none", border: "none", color: "var(--text-muted)",
                      cursor: "pointer", fontSize: "0.8rem", textDecoration: "underline"
                    }}
                  >
                    ← Change number
                  </button>

                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={countdown > 0 || isLoading}
                    style={{
                      background: "none", border: "none", cursor: countdown > 0 ? "not-allowed" : "pointer",
                      color: countdown > 0 ? "var(--text-muted)" : "#2563EB",
                      fontSize: "0.82rem", fontWeight: 600,
                      display: "flex", alignItems: "center", gap: "0.3rem"
                    }}
                  >
                    <RotateCw size={13} />
                    {countdown > 0 ? `Resend in ${countdown}s` : "Resend OTP"}
                  </button>
                </div>
              </form>
            )}

            {/* ── STEP 3: Success ── */}
            {step === "success" && (
              <div style={{ textAlign: "center", padding: "1.5rem 0 0.5rem" }}>
                <div style={{
                  width: "64px", height: "64px", borderRadius: "50%",
                  background: "rgba(16,185,129,0.1)", border: "3px solid #10B981",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 1rem",
                }}>
                  <CheckCircle2 size={32} color="#10B981" />
                </div>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                  Welcome! You are now logged in securely.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </>
  );
}

