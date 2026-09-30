import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import { useAuth } from "../context/AuthContext";
import DigitalInvoiceModal from "../components/common/DigitalInvoiceModal";
import OnlinePaymentModal from "../components/common/OnlinePaymentModal";
import OtpLoginModal from "../components/common/OtpLoginModal";
import {
  getAllCities,
  getAreasForCity,
  getPrimaryAreaForCity,
  autoGeneratePincode,
  getLocationByPincode
} from "../data/serviceAreasData";
import {
  Calendar,
  Clock,
  RotateCw,
  FileText,
  MapPin,
  User,
  CreditCard,
  Heart,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Zap,
  Star,
  ArrowRight
} from "lucide-react";

export default function CustomerDashboardPage() {
  const navigate = useNavigate();
  const { isAuthenticated, currentUser, logout } = useAuth();
  const [
    showLoginModal, setShowLoginModal
  ] = useState(false);
  const {
    bookings,
    savedAddresses,
    addSavedAddress,
    deleteSavedAddress,
    customerProfile,
    updatePayment
  } = useBooking();

  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedInvoiceBooking, setSelectedInvoiceBooking] = useState(null);
  const [selectedPayBooking, setSelectedPayBooking] = useState(null);

  // New address modal / form state with automatic City, Area & Pincode sync
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [newLabel, setNewLabel] = useState("Home");
  const [newFlat, setNewFlat] = useState("");
  const [newSociety, setNewSociety] = useState("");
  const [newCity, setNewCity] = useState("Mumbai");
  const [newArea, setNewArea] = useState("Borivali West");
  const [newPin, setNewPin] = useState("400092");

  const allCitiesList = useMemo(() => getAllCities(), []);
  const currentCityAreas = useMemo(() => getAreasForCity(newCity), [newCity]);

  const handleCityChange = (city) => {
    setNewCity(city);
    const primary = getPrimaryAreaForCity(city);
    setNewArea(primary.name);
    setNewPin(primary.pincode);
  };

  const handleAreaChange = (areaName) => {
    setNewArea(areaName);
    const matched = currentCityAreas.find((a) => a.name === areaName);
    if (matched) {
      setNewPin(matched.pincode);
    } else {
      const pin = autoGeneratePincode(newCity, areaName);
      if (pin) setNewPin(pin);
    }
  };

  const handlePinChange = (pinVal) => {
    const cleaned = pinVal.replace(/\D/g, "").slice(0, 6);
    setNewPin(cleaned);
    if (cleaned.length === 6) {
      const loc = getLocationByPincode(cleaned);
      if (loc) {
        setNewCity(loc.cityName);
        setNewArea(loc.name);
      }
    }
  };

  // Separate bookings into upcoming and previous
  const upcomingBookings = bookings.filter(
    (b) => b.status !== "Completed" && b.status !== "Cancelled"
  );
  const previousBookings = bookings.filter(
    (b) => b.status === "Completed" || b.status === "Cancelled"
  );

  const handleRepeatBooking = (booking) => {
    navigate(`/book?service=${booking.serviceId}&qty=${booking.quantity || 1}&area=${booking.area || "Borivali East"}`);
  };

  const handleSaveNewAddress = (e) => {
    e.preventDefault();
    if (!newFlat.trim() || !newSociety.trim()) return;

    addSavedAddress({
      label: newLabel,
      flat: newFlat.trim(),
      society: newSociety.trim(),
      area: newArea,
      city: newCity,
      pincode: newPin
    });

    setNewFlat("");
    setNewSociety("");
    setShowAddAddressModal(false);
  };

  const favoriteServicesList = [
    { id: "mcb-installation-replacement", name: "MCB & Breaker Replacement", price: 500, icon: "⚡" },
    { id: "fan-installation-repair", name: "Ceiling Fan Installation / Repair", price: 300, icon: "🌀" },
    { id: "switch-socket-installation", name: "Switch & Socket Installation", price: 150, icon: "🔌" },
    { id: "light-installation", name: "Lighting & Spotlight Repair", price: 200, icon: "💡" }
  ];

  return (
    <div className="customer-dashboard-page" style={{ padding: "3rem 1.5rem 5rem" }}>
      <div className="container" style={{ maxWidth: "1100px" }}>

        {/* ── AUTH GATE: Show login prompt if not authenticated ── */}
        {!isAuthenticated ? (
          <div style={{
            minHeight: "60vh",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <div style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-color)",
              borderRadius: "24px",
              padding: "3rem 2.5rem",
              maxWidth: "460px",
              width: "100%",
              textAlign: "center",
              boxShadow: "0 16px 48px rgba(0,0,0,0.12)"
            }}>
              <div style={{
                width: "72px", height: "72px", borderRadius: "50%",
                background: "linear-gradient(135deg, #0B132B, #1E3A5F)",
                border: "2px solid rgba(245,158,11,0.4)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 1.5rem",
                fontSize: "2rem"
              }}>
                🔐
              </div>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.5rem", color: "var(--text-dark)" }}>
                Login Required
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", marginBottom: "1.75rem", lineHeight: 1.6 }}>
                Your Customer Dashboard is protected. Please verify your mobile number with a one-time OTP to access your bookings, invoices, and saved addresses.
              </p>
              <button
                id="dashboard-login-btn"
                onClick={() => setShowLoginModal(true)}
                style={{
                  width: "100%", padding: "0.95rem",
                  background: "linear-gradient(135deg, #2563EB, #1D4ED8)",
                  color: "#FFFFFF", border: "none", borderRadius: "14px",
                  fontSize: "1rem", fontWeight: 700, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  gap: "0.6rem", boxShadow: "0 6px 20px rgba(37,99,235,0.3)"
                }}
              >
                📱 Login with Mobile OTP
              </button>
              <p style={{ marginTop: "1rem", fontSize: "0.75rem", color: "var(--text-muted)" }}>
                🔒 Secured by Google Firebase · Zero-cost OTP verification
              </p>
            </div>
            <OtpLoginModal
              isOpen={showLoginModal}
              onClose={() => setShowLoginModal(false)}
              onSuccess={() => setShowLoginModal(false)}
            />
          </div>
        ) : (
          <>
          {/* Welcome Header */}
          <div
          style={{
            background: "linear-gradient(135deg, #070B14 0%, #0B132B 60%, #131E3D 100%)",
            color: "#FFFFFF",
            padding: "2.25rem",
            borderRadius: "18px",
            marginBottom: "2.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1.5rem",
            boxShadow: "0 12px 32px rgba(0, 0, 0, 0.25)"
          }}
        >
          <div>
            <span className="badge badge-gold" style={{ marginBottom: "0.5rem" }}>
              Verified Customer Portal
            </span>
            <h1 style={{ fontSize: "2rem", color: "#FFFFFF", marginBottom: "0.3rem" }}>
              Welcome Back, {customerProfile.name}! 👋
            </h1>
            <p style={{ color: "#CBD5E1", fontSize: "0.95rem", margin: 0 }}>
              Primary Contact: <strong>{customerProfile.phone}</strong> · Member since {customerProfile.memberSince} · {customerProfile.area}
            </p>
          </div>

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <Link to="/book" className="btn btn-gold btn-lg">
              <Zap size={18} />
              <span>Book New Service</span>
            </Link>
          </div>
        </div>

        {/* Quick Metric Stats Row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
            marginBottom: "2rem"
          }}
        >
          <div className="card" style={{ padding: "1.25rem", borderRadius: "14px" }}>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>Active Bookings</div>
            <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "#2563EB", marginTop: "0.2rem" }}>
              {upcomingBookings.length}
            </div>
            <span style={{ fontSize: "0.75rem", color: "#10B981" }}>Live tracking active</span>
          </div>

          <div className="card" style={{ padding: "1.25rem", borderRadius: "14px" }}>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>Services Completed</div>
            <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "#F59E0B", marginTop: "0.2rem" }}>
              {previousBookings.filter(b => b.status === "Completed").length}
            </div>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>100% safety certified</span>
          </div>

          <div className="card" style={{ padding: "1.25rem", borderRadius: "14px" }}>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>Saved Addresses</div>
            <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--text-dark)", marginTop: "0.2rem" }}>
              {savedAddresses.length}
            </div>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Mumbai residences</span>
          </div>

          <div className="card" style={{ padding: "1.25rem", borderRadius: "14px" }}>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>Safety Reward Points</div>
            <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "#10B981", marginTop: "0.2rem" }}>
              {customerProfile.loyaltyPoints} pts
            </div>
            <span style={{ fontSize: "0.75rem", color: "#10B981" }}>₹100 coupon unlocked</span>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div
          className="dashboard-tabs"
          style={{
            display: "flex",
            gap: "0.5rem",
            overflowX: "auto",
            paddingBottom: "0.75rem",
            marginBottom: "2rem",
            borderBottom: "1px solid var(--border-light)"
          }}
        >
          {[
            { id: "upcoming", label: "Upcoming Bookings", icon: Clock },
            { id: "previous", label: "Previous Services", icon: RotateCw },
            { id: "invoices", label: "Digital Invoices", icon: FileText },
            { id: "addresses", label: "Saved Addresses", icon: MapPin },
            { id: "payments", label: "Payment History", icon: CreditCard },
            { id: "favorites", label: "Favorite Services", icon: Heart },
            { id: "profile", label: "Profile & Settings", icon: User }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.45rem",
                  padding: "0.6rem 1.1rem",
                  borderRadius: "10px",
                  fontSize: "0.88rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  border: isActive ? "2px solid #F59E0B" : "1px solid transparent",
                  background: isActive ? "rgba(245, 158, 11, 0.12)" : "var(--bg-card)",
                  color: isActive ? "#F59E0B" : "var(--text-dark)",
                  whiteSpace: "nowrap",
                  transition: "all 0.2s ease"
                }}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ── TAB 1: Upcoming Bookings ── */}
        {activeTab === "upcoming" && (
          <div>
            {upcomingBookings.length === 0 ? (
              <div className="card" style={{ padding: "3rem", textAlign: "center", borderRadius: "16px" }}>
                <CheckCircle2 size={42} color="#10B981" style={{ margin: "0 auto 0.75rem" }} />
                <h3 style={{ fontSize: "1.25rem", color: "var(--text-dark)" }}>No Pending or Active Bookings</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
                  All your past services are complete. Need an electrician for repairs or installation?
                </p>
                <Link to="/book" className="btn btn-gold">
                  <span>Book an Electrician</span>
                </Link>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {upcomingBookings.map((b) => (
                  <div
                    key={b.id}
                    className="card"
                    style={{
                      padding: "1.5rem",
                      borderRadius: "16px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: "1rem",
                      borderLeft: "4px solid #F59E0B"
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.3rem" }}>
                        <span style={{ fontFamily: "monospace", fontWeight: 800, color: "#2563EB", fontSize: "1.05rem" }}>
                          #{b.id}
                        </span>
                        <span className="badge badge-gold">● {b.status}</span>
                      </div>
                      <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-dark)", margin: "0.2rem 0" }}>
                        {b.serviceName}
                      </h4>
                      <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: 0 }}>
                        📅 Scheduled: {b.bookingDate} • {b.timeSlot}<br />
                        📍 Address: {b.address}, {b.area}
                      </p>
                    </div>

                    <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", alignItems: "center" }}>
                      {!b.paymentStatus?.toLowerCase().includes("paid") && (
                        <button
                          type="button"
                          onClick={() => setSelectedPayBooking(b)}
                          className="btn btn-gold btn-sm"
                        >
                          <CreditCard size={14} />
                          <span>Pay Online</span>
                        </button>
                      )}

                      <Link to={`/track?id=${b.id}`} className="btn btn-primary btn-sm">
                        <span>Track Live Status</span>
                        <ArrowRight size={15} />
                      </Link>

                      <button
                        type="button"
                        onClick={() => setSelectedInvoiceBooking(b)}
                        className="btn btn-outline btn-sm"
                      >
                        <FileText size={14} />
                        <span>Invoice</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── TAB 2: Previous Services (with "Book This Service Again") ── */}
        {activeTab === "previous" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {previousBookings.map((b) => (
              <div
                key={b.id}
                className="card"
                style={{
                  padding: "1.5rem",
                  borderRadius: "16px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "1rem"
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.3rem" }}>
                    <span style={{ fontFamily: "monospace", fontWeight: 800, color: "var(--text-muted)", fontSize: "0.95rem" }}>
                      #{b.id}
                    </span>
                    <span className={`badge ${b.status === "Completed" ? "badge-green" : "badge-red"}`}>
                      {b.status}
                    </span>
                  </div>
                  <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-dark)", margin: "0.2rem 0" }}>
                    {b.serviceName} (Qty: {b.quantity || 1})
                  </h4>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: 0 }}>
                    Completed on: {b.bookingDate} · Amount: ₹{b.estimatedPrice} · {b.area}
                  </p>
                </div>

                <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
                  {/* 🔁 Repeat Service Button as requested */}
                  <button
                    type="button"
                    onClick={() => handleRepeatBooking(b)}
                    className="btn btn-gold btn-sm"
                    style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
                  >
                    <RotateCw size={14} />
                    <span>Book This Service Again</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedInvoiceBooking(b)}
                    className="btn btn-outline btn-sm"
                  >
                    <FileText size={14} />
                    <span>View Invoice</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── TAB 3: Digital Invoices ── */}
        {activeTab === "invoices" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {bookings.map((b) => (
              <div
                key={b.id}
                className="card"
                style={{
                  padding: "1.25rem 1.5rem",
                  borderRadius: "14px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "1rem"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "10px",
                      background: "rgba(37, 99, 235, 0.12)",
                      color: "#2563EB",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0
                    }}
                  >
                    <FileText size={22} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--text-dark)" }}>
                      Tax Invoice #{b.id}
                    </div>
                    <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                      {b.serviceName} · ₹{b.estimatedPrice} · {b.bookingDate}
                    </span>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    type="button"
                    onClick={() => setSelectedInvoiceBooking(b)}
                    className="btn btn-sm btn-gold"
                  >
                    <span>View & Download Invoice</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── TAB 4: Saved Addresses ── */}
        {activeTab === "addresses" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <h3 style={{ fontSize: "1.25rem", color: "var(--text-dark)" }}>Saved Mumbai Addresses</h3>
              <button
                type="button"
                onClick={() => setShowAddAddressModal(true)}
                className="btn btn-sm btn-primary"
              >
                <Plus size={15} />
                <span>Add New Address</span>
              </button>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "1.25rem"
              }}
            >
              {savedAddresses.map((addr) => (
                <div
                  key={addr.id}
                  className="card"
                  style={{
                    padding: "1.5rem",
                    borderRadius: "14px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                  }}
                >
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                      <span className="badge badge-blue">
                        <MapPin size={12} /> {addr.label}
                      </span>
                      {addr.isDefault && <span className="badge badge-green">Default</span>}
                    </div>
                    <h4 style={{ fontSize: "1rem", color: "var(--text-dark)", margin: "0.3rem 0" }}>
                      {addr.flat}
                    </h4>
                    <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: "1.5" }}>
                      {addr.society}, {addr.area}, {addr.city} - {addr.pincode}
                    </p>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem", paddingTop: "0.75rem", borderTop: "1px solid var(--border-light)" }}>
                    <Link
                      to={`/book?area=${addr.area}`}
                      style={{ fontSize: "0.85rem", color: "#2563EB", fontWeight: 700 }}
                    >
                      Book at this address →
                    </Link>
                    <button
                      type="button"
                      onClick={() => deleteSavedAddress(addr.id)}
                      style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer", padding: "0.2rem" }}
                      aria-label="Delete address"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB 5: Payment History ── */}
        {activeTab === "payments" && (
          <div className="card" style={{ padding: "1.5rem", borderRadius: "16px" }}>
            <h3 style={{ fontSize: "1.2rem", marginBottom: "1rem", color: "var(--text-dark)" }}>Payment History & Invoices</h3>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
              <thead>
                <tr style={{ background: "var(--bg-alt)", textAlign: "left" }}>
                  <th style={{ padding: "0.75rem 1rem" }}>Booking ID</th>
                  <th style={{ padding: "0.75rem 1rem" }}>Service</th>
                  <th style={{ padding: "0.75rem 1rem" }}>Method</th>
                  <th style={{ padding: "0.75rem 1rem" }}>Amount</th>
                  <th style={{ padding: "0.75rem 1rem" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id} style={{ borderBottom: "1px solid var(--border-light)" }}>
                    <td style={{ padding: "0.75rem 1rem", fontFamily: "monospace", fontWeight: 700 }}>#{b.id}</td>
                    <td style={{ padding: "0.75rem 1rem" }}>{b.serviceName}</td>
                    <td style={{ padding: "0.75rem 1rem" }}>{b.paymentMethod || "Cash on Service"}</td>
                    <td style={{ padding: "0.75rem 1rem", fontWeight: 700 }}>₹{b.estimatedPrice}</td>
                    <td style={{ padding: "0.75rem 1rem" }}>
                      <span className={`badge ${b.paymentStatus === "Paid" ? "badge-green" : "badge-gold"}`}>
                        {b.paymentStatus || "Due After Work"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ── TAB 6: Favorite Services ── */}
        {activeTab === "favorites" && (
          <div>
            <h3 style={{ fontSize: "1.25rem", color: "var(--text-dark)", marginBottom: "1rem" }}>Quick 1-Click Booking</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1.25rem" }}>
              {favoriteServicesList.map((svc) => (
                <div key={svc.id} className="card" style={{ padding: "1.25rem", borderRadius: "14px" }}>
                  <div style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>{svc.icon}</div>
                  <h4 style={{ fontSize: "1rem", color: "var(--text-dark)", marginBottom: "0.2rem" }}>{svc.name}</h4>
                  <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", display: "block", marginBottom: "1rem" }}>
                    Starting from ₹{svc.price}
                  </span>
                  <Link to={`/book?service=${svc.id}`} className="btn btn-gold btn-sm" style={{ width: "100%" }}>
                    <span>Book Service</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB 7: Profile & Contact ── */}
        {activeTab === "profile" && (
          <div className="card" style={{ padding: "2rem", borderRadius: "16px", maxWidth: "600px" }}>
            <h3 style={{ fontSize: "1.25rem", color: "var(--text-dark)", marginBottom: "1.25rem" }}>Customer Profile</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", fontSize: "0.95rem" }}>
              <div>
                <span style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>Full Name:</span>
                <div style={{ fontWeight: 700, color: "var(--text-dark)" }}>{customerProfile.name}</div>
              </div>
              <div>
                <span style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>Verified Mobile:</span>
                <div style={{ fontWeight: 700, color: "var(--text-dark)" }}>{customerProfile.phone}</div>
              </div>
              <div>
                <span style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>Registered Locality:</span>
                <div style={{ fontWeight: 700, color: "var(--text-dark)" }}>{customerProfile.area}, Mumbai</div>
              </div>
              <div>
                <span style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>Member Status:</span>
                <div style={{ fontWeight: 700, color: "#10B981" }}>Gold Safe Home Member (Since {customerProfile.memberSince})</div>
              </div>
            </div>
          </div>
        )}

        {/* Add Address Modal */}
        {showAddAddressModal && (
          <div
            className="modal-overlay"
            onClick={() => setShowAddAddressModal(false)}
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
              className="card"
              onClick={(e) => e.stopPropagation()}
              style={{ padding: "2rem", maxWidth: "480px", width: "100%", borderRadius: "16px" }}
            >
              <h3 style={{ fontSize: "1.3rem", color: "var(--text-dark)", marginBottom: "1rem" }}>Add New Mumbai Address</h3>
              <form onSubmit={handleSaveNewAddress}>
                <div className="form-group">
                  <label className="form-label">Label (e.g. Home, Office, Parents Flat)</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    value={newLabel}
                    onChange={(e) => setNewLabel(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Flat / House No.</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="e.g. Flat 601, C-Wing"
                    value={newFlat}
                    onChange={(e) => setNewFlat(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Society / Building Name</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="e.g. Raheja Residency"
                    value={newSociety}
                    onChange={(e) => setNewSociety(e.target.value)}
                  />
                </div>
                {/* City & Area Selection (Auto-generates Pincode) */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div className="form-group">
                    <label className="form-label" style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>City / Region *</span>
                      <span style={{ fontSize: "0.72rem", color: "#2563EB", fontWeight: 700 }}>23+ Cities</span>
                    </label>
                    <select
                      className="form-control"
                      value={newCity}
                      onChange={(e) => handleCityChange(e.target.value)}
                      style={{ fontWeight: 700, background: "var(--bg-card)", color: "var(--text-dark)" }}
                    >
                      {allCitiesList.map((c) => (
                        <option key={c.name} value={c.name}>
                          {c.name} ({c.state})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>Area Locality *</span>
                      <span style={{ fontSize: "0.72rem", color: "#059669", fontWeight: 700 }}>Auto-Pincode</span>
                    </label>
                    <select
                      className="form-control"
                      value={newArea}
                      onChange={(e) => handleAreaChange(e.target.value)}
                      style={{ fontWeight: 600, background: "var(--bg-card)", color: "var(--text-dark)" }}
                    >
                      {currentCityAreas.map((a) => (
                        <option key={a.name} value={a.name}>
                          {a.name} ({a.pincode})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Auto-Generated Pincode Field with Instant Verification */}
                <div className="form-group">
                  <label className="form-label" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span>Pincode (Auto-Generated) *</span>
                    <span style={{ fontSize: "0.75rem", color: "#059669", fontWeight: 700 }}>⚡ Auto-Synced</span>
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      className="form-control"
                      value={newPin}
                      onChange={(e) => handlePinChange(e.target.value)}
                      placeholder="6-digit postal pincode"
                      style={{ fontWeight: 800, letterSpacing: "1px", color: "var(--text-dark)" }}
                    />
                    {newPin && newPin.length === 6 && (
                      <span
                        style={{
                          position: "absolute",
                          right: "12px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "#059669",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          pointerEvents: "none"
                        }}
                      >
                        ✓ Verified Zone
                      </span>
                    )}
                  </div>
                </div>

                <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end", marginTop: "1rem" }}>
                  <button type="button" onClick={() => setShowAddAddressModal(false)} className="btn btn-outline">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-gold">
                    Save Address
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Digital Invoice Modal */}
        {selectedInvoiceBooking && (
          <DigitalInvoiceModal
            booking={selectedInvoiceBooking}
            isOpen={!!selectedInvoiceBooking}
            onClose={() => setSelectedInvoiceBooking(null)}
          />
        )}

        {/* Online Payment Modal */}
        {selectedPayBooking && (
          <OnlinePaymentModal
            isOpen={!!selectedPayBooking}
            onClose={() => setSelectedPayBooking(null)}
            amount={((Number(selectedPayBooking.estimatedPrice) || 0) + (Number(selectedPayBooking.materialTotal) || 0) - (Number(selectedPayBooking.discountAmount) || 0))}
            serviceName={selectedPayBooking.serviceName}
            bookingId={selectedPayBooking.id}
            onPaymentSuccess={(paymentResult) => {
              updatePayment(selectedPayBooking.id, {
                method: paymentResult.method,
                status: "Paid Online (Verified)",
                transactionId: paymentResult.transactionId,
                amount: paymentResult.amount
              });
              setSelectedPayBooking(null);
            }}
          />
          </>
        )}
      </div>
    </div>
  );
}
