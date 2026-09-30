import React from "react";
import { Link } from "react-router-dom";
import { Zap, Phone, MessageSquare, ShieldCheck, Clock, CheckCircle2, Award, ArrowRight } from "lucide-react";
import StarRating from "../common/StarRating";

export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-glow-1"></div>
      <div className="hero-glow-2"></div>

      <div className="container">
        <div className="hero-grid">
          {/* Hero Left Content */}
          <div>
            <div className="hero-badge-pill">
              <Zap size={16} fill="#F59E0B" color="#F59E0B" />
              <span>Government-Certified Wiremen & Contractors</span>
            </div>

            <h1 className="hero-title">
              Professional Electrical Services at <span className="highlight">Your Doorstep</span>
            </h1>

            <p className="hero-description">
              Expert residential & commercial electrical solutions across the Mumbai Western Corridor — from Virar to Churchgate. From sudden short-circuit emergency repairs to luxury concealed wiring and distribution panels—delivered on time with zero hassle.
            </p>

            {/* CTAs */}
            <div className="hero-actions-row">
              <Link to="/book" className="btn btn-gold btn-lg" id="hero-book-btn">
                <span>Book an Electrician</span>
                <ArrowRight size={18} />
              </Link>

              <Link to="/book?emergency=true" className="btn btn-emergency btn-lg" id="hero-emergency-btn">
                <Zap size={18} />
                <span>Urgent Service (7 AM – 7 PM)</span>
              </Link>

              <a href="tel:+919004807180" className="btn btn-call btn-lg" id="hero-call-btn">
                <Phone size={18} />
                <span>Call Now</span>
              </a>

              <a
                href="https://wa.me/919004807180?text=Hi%20Vishal%20Electricals%2C%20I%20would%20like%20to%20book%20an%20electrician%20for%20my%20home."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-lg"
                id="hero-whatsapp-btn"
              >
                <MessageSquare size={18} />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="hero-trust-bar">
              <div className="trust-item">
                <CheckCircle2 size={18} />
                <span>10,000+ Mumbai Homes Served</span>
              </div>
              <div className="trust-item">
                <Clock size={18} />
                <span>Working Daily: 7:00 AM – 7:00 PM</span>
              </div>
              <div className="trust-item">
                <ShieldCheck size={18} />
                <span>30-Day Post Service Warranty</span>
              </div>
            </div>
          </div>

          {/* Hero Right Visual Showcase */}
          <div className="hero-card-wrapper">
            <div className="hero-visual-card">
              <div className="hero-card-header">
                <div>
                  <h3 className="hero-card-title">Live Dispatch Status</h3>
                  <span style={{ fontSize: "0.8rem", color: "#38BDF8" }}>
                    ● 18 Certified Electricians on Active Duty
                  </span>
                </div>
                <span className="badge badge-gold">Mumbai HQ</span>
              </div>

              <div className="hero-quick-features">
                <div className="quick-feature-box">
                  <div className="quick-feature-icon">
                    <Clock size={20} />
                  </div>
                  <div className="quick-feature-info">
                    <h4>Rapid Doorstep Arrival</h4>
                    <p>Average 25–35 mins across Virar to Churchgate Corridor (Borivali HQ, Andheri, Bandra, Dadar & South Mumbai)</p>
                  </div>
                </div>

                <div className="quick-feature-box">
                  <div className="quick-feature-icon">
                    <ShieldCheck size={20} />
                  </div>
                  <div className="quick-feature-info">
                    <h4>Safety & License Guarantee</h4>
                    <p>PWD Wireman licensed technicians with calibrated testing meters</p>
                  </div>
                </div>

                <div className="quick-feature-box">
                  <div className="quick-feature-icon">
                    <Award size={20} />
                  </div>
                  <div className="quick-feature-info">
                    <h4>Fixed & Transparent Pricing</h4>
                    <p>Starting at just ₹150. No hidden charges or inspection surprises</p>
                  </div>
                </div>
              </div>

              {/* Floating review badge */}
              <div className="floating-badge" style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "10px",
                    background: "rgba(245, 158, 11, 0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#F59E0B",
                    flexShrink: 0
                  }}
                >
                  <Award size={24} />
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                    <span style={{ fontWeight: 800, fontSize: "0.98rem", color: "#0B192C" }}>4.9 / 5.0</span>
                    <StarRating rating={4.9} size={13} />
                  </div>
                  <span style={{ fontSize: "0.74rem", color: "#64748B", fontWeight: 600 }}>
                    1,420+ Verified Mumbai Reviews
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
