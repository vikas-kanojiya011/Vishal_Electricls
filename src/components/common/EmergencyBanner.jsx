import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, Phone, MessageSquare, Zap, Clock, ShieldAlert } from "lucide-react";

export default function EmergencyBanner() {
  return (
    <section className="section-sm" style={{ paddingBottom: "2rem" }}>
      <div className="container">
        <div className="emergency-banner-box">
          <div className="emergency-flex">
            <div className="emergency-content">
              <div className="emergency-tag">
                <AlertTriangle size={15} />
                <span>Rapid Response Team · 7:00 AM – 7:00 PM</span>
              </div>
              <h3>Urgent Electrical Problem? We’re Ready to Help.</h3>
              <p>
                Sparking MCBs, burnt wire smell, sudden power blackout, or electrical shocks? Our wiremen reach your doorstep across Western Mumbai within <strong>30 minutes</strong> during our daily operating hours (7:00 AM – 7:00 PM).
              </p>
              <div style={{ display: "flex", gap: "1.5rem", marginTop: "1rem", flexWrap: "wrap", fontSize: "0.85rem" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
                  <Clock size={16} /> Working Daily: 7:00 AM – 7:00 PM
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
                  <ShieldAlert size={16} /> Govt. Licensed Wiremen
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
                  <Zap size={16} /> Fully Equipped Toolkits & Spares
                </span>
              </div>
            </div>

            <div className="emergency-buttons">
              <a
                href="tel:+919004807180"
                className="btn btn-emergency"
                id="emergency-call-btn"
              >
                <Phone size={18} />
                <span>Call Helpline: +91 90048 07180</span>
              </a>

              <a
                href="https://wa.me/919004807180?text=Hi%20Vishal%20Electricals%2C%20I%20have%20an%20urgent%20electrical%20issue%20at%20my%20address%20in%20Mumbai.%20Please%20dispatch%20electrician."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
                id="emergency-wa-btn"
              >
                <MessageSquare size={18} />
                <span>WhatsApp Helpline</span>
              </a>

              <Link
                to="/book?emergency=true"
                className="btn btn-gold"
                id="emergency-book-btn"
              >
                <Zap size={18} />
                <span>Priority Booking (7 AM - 7 PM)</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
