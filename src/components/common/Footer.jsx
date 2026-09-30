import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, MessageSquare, Clock, ShieldCheck, Heart } from "lucide-react";
import BrandLogo from "./BrandLogo";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Col 1: Brand & Bio */}
          <div className="footer-col">
            <Link to="/" style={{ textDecoration: "none", display: "inline-block", marginBottom: "1.2rem" }}>
              <BrandLogo variant="footer" size="md" />
            </Link>

            <p style={{ fontSize: "0.9rem", color: "#94A3B8", marginTop: "0.5rem", lineHeight: "1.65" }}>
              Government-licensed electrical contractors serving residential, commercial, and industrial clients across Mumbai’s Western Suburbs for over 12 years. We guarantee transparent pricing, genuine ISI spares, and 100% human safety compliance.
            </p>

            <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.25rem", flexWrap: "wrap" }}>
              <span className="badge badge-gold" style={{ background: "rgba(245, 158, 11, 0.15)", color: "#FBBF24" }}>
                <ShieldCheck size={14} /> PWD Wireman Licensed
              </span>
              <span className="badge badge-blue" style={{ background: "rgba(37, 99, 235, 0.2)", color: "#60A5FA" }}>
                ISO 9001:2015 Safety
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/services">All Services & Pricing</Link></li>
              <li><Link to="/book">Book an Electrician</Link></li>
              <li><Link to="/track">Track Booking Status</Link></li>
              <li><Link to="/about">Our Certified Technicians</Link></li>
              <li><Link to="/projects">Projects & Gallery</Link></li>
              <li><Link to="/contact">Contact & Helpdesk</Link></li>
              <li><Link to="/admin">Admin Portal</Link></li>
            </ul>
          </div>

          {/* Col 3: Service Areas */}
          <div className="footer-col">
            <h4>Western Line Corridor</h4>
            <ul>
              <li><Link to="/contact">Virar, Vasai & Naigaon</Link></li>
              <li><Link to="/contact">Mira Road & Bhayandar</Link></li>
              <li><Link to="/contact">Borivali (HQ) & Dahisar</Link></li>
              <li><Link to="/contact">Kandivali, Malad & Goregaon</Link></li>
              <li><Link to="/contact">Jogeshwari & Andheri</Link></li>
              <li><Link to="/contact">Vile Parle, Santacruz & Khar</Link></li>
              <li><Link to="/contact">Bandra & BKC</Link></li>
              <li><Link to="/contact">Dadar, Lower Parel & Churchgate</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact & Hotline */}
          <div className="footer-col">
            <h4>Direct Hotline & Support</h4>
            <div className="footer-contact-item">
              <MapPin size={18} />
              <span>Cartan Road No. 8, Sukkarwadi, Borivali East, Mumbai, Maharashtra 400066</span>
            </div>
            <div className="footer-contact-item">
              <Phone size={18} color="#F59E0B" />
              <div>
                <strong>Customer Hotline:</strong> <a href="tel:+919004807180" style={{ color: "#FFFFFF", fontWeight: 700 }}>+91 90048 07180</a>
                <br />
                <span style={{ fontSize: "0.8rem", color: "#F59E0B" }}>⚡ Working Hours: 7:00 AM – 7:00 PM Daily</span>
              </div>
            </div>
            <div className="footer-contact-item">
              <MessageSquare size={18} color="#22C55E" />
              <div>
                <strong>WhatsApp Support:</strong>{" "}
                <a
                  href="https://wa.me/919004807180?text=Hi%20Vishal%20Electricals%2C%20I%20need%20assistance%20with%20electrical%20service."
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#4ADE80", fontWeight: 700 }}
                >
                  +91 90048 07180
                </a>
                <br />
                <span style={{ fontSize: "0.8rem", color: "#86EFAC" }}>Instant Chat & Photo Consultation</span>
              </div>
            </div>
            <div className="footer-contact-item">
              <Clock size={18} />
              <span>Working Hours: 7:00 AM – 7:00 PM<br />Open All 7 Days a Week (Mon – Sun)</span>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>© 2026 Vishal Electricals. All rights reserved. Reliable Electrical Solutions at Your Doorstep.</p>
          <p style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
            Engineered with <Heart size={14} color="#EF4444" fill="#EF4444" /> for Mumbai households
          </p>
        </div>
      </div>
    </footer>
  );
}
