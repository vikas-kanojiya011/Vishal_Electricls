import React, { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import {
  Phone, Calendar, X, Clock,
  Home, Wrench, Users, Briefcase, Headphones, LayoutDashboard, Activity, Gift, User, LogIn, LogOut
} from "lucide-react";
import BrandLogo from "./BrandLogo";
import ThemeToggle from "./ThemeToggle";
import OtpLoginModal from "./OtpLoginModal";
import { useAuth } from "../../context/AuthContext";

const NAV_LINKS = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/services", label: "Services", icon: Wrench },
  { to: "/offers", label: "Offers", icon: Gift },
  { to: "/track", label: "Track Status", icon: Activity },
  { to: "/dashboard", label: "Dashboard", icon: User },
  { to: "/contact", label: "Contact", icon: Headphones },
  { to: "/admin", label: "Admin", icon: LayoutDashboard },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, currentUser, logout } = useAuth();

  // Close drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  // Scroll shadow effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header className={`site-header${scrolled ? " scrolled" : ""}`}>
        <div className="container nav-container">

          {/* ── Brand ── */}
          <Link to="/" className="brand-logo" id="brand-logo-nav" style={{ textDecoration: "none" }}>
            <BrandLogo variant="header" size="md" />
          </Link>

          {/* ── Desktop Nav Links ── */}
          <nav aria-label="Main navigation">
            <ul className="nav-links">
              {NAV_LINKS.map(({ to, label, end }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={end}
                    className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* ── Desktop Actions ── */}
          <div className="nav-actions">
            {/* Theme Toggle Button */}
            <ThemeToggle />

            <a
              href="tel:+919004807180"
              className="nav-emergency-pill"
              title="Working Hours: 7:00 AM – 7:00 PM Daily"
            >
              <span className="pill-dot" />
              <Clock size={13} />
              <span>7 AM – 7 PM Daily</span>
            </a>

            <Link to="/book" className="nav-book-btn" id="nav-book-btn">
              <Calendar size={15} />
              <span>Book Now</span>
            </Link>

            {/* Login / User Info */}
            {isAuthenticated ? (
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{
                  fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 600,
                  background: "var(--bg-alt)", border: "1px solid var(--border-color)",
                  padding: "4px 10px", borderRadius: "8px", maxWidth: "120px",
                  overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"
                }}>
                  {currentUser.phoneNumber || "Logged In"}
                </span>
                <button
                  id="nav-logout-btn"
                  onClick={logout}
                  title="Logout"
                  style={{
                    display: "flex", alignItems: "center", gap: "0.3rem",
                    background: "transparent", border: "1px solid var(--border-color)",
                    borderRadius: "8px", padding: "5px 10px", cursor: "pointer",
                    color: "var(--text-muted)", fontSize: "0.78rem", fontWeight: 600,
                    transition: "all 0.15s ease"
                  }}
                >
                  <LogOut size={14} />
                  Logout
                </button>
              </div>
            ) : (
              <button
                id="nav-login-btn"
                onClick={() => setOtpModalOpen(true)}
                style={{
                  display: "flex", alignItems: "center", gap: "0.4rem",
                  background: "var(--bg-card)", border: "1.5px solid var(--border-medium)",
                  borderRadius: "10px", padding: "6px 14px", cursor: "pointer",
                  color: "var(--text-dark)", fontSize: "0.82rem", fontWeight: 700,
                  transition: "all 0.15s ease"
                }}
              >
                <LogIn size={15} />
                Login
              </button>
            )}

            {/* Mobile hamburger */}
            <button
              className={`mobile-menu-toggle${mobileOpen ? " open" : ""}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
            >
              <span className="hamburger-bar" />
              <span className="hamburger-bar" />
              <span className="hamburger-bar" />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Drawer Overlay ── */}
      {mobileOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── Mobile Drawer ── */}
      <div className={`mobile-nav-drawer${mobileOpen ? " open" : ""}`} aria-hidden={!mobileOpen}>
        {/* Drawer Header */}
        <div className="drawer-header">
          <Link to="/" onClick={() => setMobileOpen(false)} style={{ textDecoration: "none" }}>
            <BrandLogo variant="drawer" size="sm" />
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <ThemeToggle />
            <button
              className="drawer-close-btn"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Nav Items */}
        <nav aria-label="Mobile navigation">
          <ul className="mobile-nav-list">
            {NAV_LINKS.map(({ to, label, icon: Icon, end }) => (
              <li key={to} className="mobile-nav-item">
                <NavLink
                  to={to}
                  end={end}
                  className={({ isActive }) => `mobile-nav-link${isActive ? " active" : ""}`}
                >
                  <span className="mobile-nav-icon">
                    <Icon size={18} />
                  </span>
                  <span>{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Divider */}
        <div className="drawer-divider" />

        {/* CTA Buttons */}
        <div className="mobile-nav-actions">
          <a href="tel:+919004807180" className="mobile-cta-btn emergency">
            <Phone size={17} />
            <div>
              <strong>Service Helpline</strong>
              <span>+91 90048 07180 · 7 AM – 7 PM</span>
            </div>
          </a>
          <Link to="/book" className="mobile-cta-btn book">
            <Calendar size={17} />
            <div>
              <strong>Book an Electrician</strong>
              <span>Fast Appointment Online</span>
            </div>
          </Link>
        </div>
        {/* Mobile Login / Logout row */}
        <div style={{ padding: "0 1rem 1rem" }}>
          {isAuthenticated ? (
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{
                flex: 1, background: "var(--bg-alt)", border: "1px solid var(--border-color)",
                borderRadius: "10px", padding: "0.65rem 0.9rem"
              }}>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 600 }}>Logged in as</div>
                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-dark)", marginTop: "1px" }}>
                  {currentUser.phoneNumber || "Verified User"}
                </div>
              </div>
              <button
                onClick={() => { logout(); setMobileOpen(false); }}
                style={{
                  display: "flex", alignItems: "center", gap: "0.4rem",
                  background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)",
                  borderRadius: "10px", padding: "0.65rem 0.9rem", cursor: "pointer",
                  color: "#EF4444", fontSize: "0.82rem", fontWeight: 700
                }}
              >
                <LogOut size={15} />
                Logout
              </button>
            </div>
          ) : (
            <button
              id="mobile-login-btn"
              onClick={() => { setOtpModalOpen(true); setMobileOpen(false); }}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: "0.75rem",
                background: "linear-gradient(135deg, #2563EB, #1D4ED8)",
                color: "#FFFFFF", border: "none", borderRadius: "12px",
                padding: "0.85rem 1.1rem", cursor: "pointer", fontWeight: 700,
                fontSize: "0.92rem",
              }}
            >
              <LogIn size={18} />
              <div style={{ textAlign: "left" }}>
                <strong>Login to Your Account</strong>
                <span style={{ display: "block", fontSize: "0.75rem", opacity: 0.85, fontWeight: 400 }}>Verify with mobile OTP</span>
              </div>
            </button>
          )}
        </div>
      </div>

      {/* OTP Login Modal */}
      <OtpLoginModal
        isOpen={otpModalOpen}
        onClose={() => setOtpModalOpen(false)}
        onSuccess={() => setOtpModalOpen(false)}
      />
    </>
  );
}
