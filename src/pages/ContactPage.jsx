import React, { useState } from "react";
import { useNotification } from "../context/NotificationContext";
import {
  MapPin,
  Phone,
  Clock,
  MessageSquare,
  Send,
  CheckCircle2,
  ShieldCheck,
  Navigation
} from "lucide-react";

import { MUMBAI_LOCALITIES } from "../data/serviceAreasData";

export default function ContactPage() {
  const { showNotification } = useNotification();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("Borivali (400066)");
  const [subject, setSubject] = useState("General Electrical Enquiry");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;

    setSubmitted(true);
    showNotification({
      title: "Enquiry Sent! 📩",
      message: "Thank you for contacting Vishal Electricals. Our coordinator will call you back within 15 minutes.",
      type: "success"
    });
  };

  return (
    <div className="contact-page">
      {/* Header */}
      <section className="section-sm" style={{ background: "linear-gradient(135deg, #070E1B 0%, #0B192C 100%)", color: "#FFFFFF" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <div className="section-badge gold">
            <Phone size={14} />
            <span>Direct Desk Support</span>
          </div>
          <h1 style={{ color: "#FFFFFF", marginBottom: "0.75rem" }}>Contact Vishal Electricals</h1>
          <p style={{ color: "#CBD5E1", maxWidth: "680px", margin: "0 auto", fontSize: "1.1rem" }}>
            Need immediate technician dispatch, an on-site commercial survey, or have an electrical query? Reach our Borivali HQ team directly.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section" style={{ backgroundColor: "#F8FAFC" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1.3fr", gap: "3rem", marginBottom: "4rem" }}>
            {/* Left: Contact Info & Hours */}
            <div>
              <h2 style={{ fontSize: "1.8rem", color: "#0B192C", marginBottom: "1.25rem" }}>
                Get In Touch With Our Dispatch Desk
              </h2>
              <p style={{ color: "#64748B", fontSize: "1rem", lineHeight: "1.6", marginBottom: "2rem" }}>
                Our operations team coordinates technician dispatch 7 days a week from 7:00 AM to 7:00 PM. For sudden repairs or scheduled installations, call our direct helpline.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {/* Address */}
                <div className="card" style={{ padding: "1.25rem 1.5rem", display: "flex", gap: "1.2rem", alignItems: "flex-start" }}>
                  <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: "rgba(0, 180, 216, 0.12)", color: "#00B4D8", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: "1rem", color: "#0B192C", marginBottom: "0.2rem" }}>Main Office & Central Workshop</h4>
                    <p style={{ fontSize: "0.9rem", color: "#475569" }}>
                      Cartan Road No. 8, Sukkarwadi, Borivali East, Mumbai, Maharashtra 400066
                    </p>
                    <span style={{ fontSize: "0.8rem", color: "#00B4D8", fontWeight: 600, display: "inline-block", marginTop: "0.25rem" }}>
                      Landmark: Near Borivali East Railway Station & Sukkarwadi Bus Station
                    </span>
                  </div>
                </div>

                {/* Hotline */}
                <div className="card" style={{ padding: "1.25rem 1.5rem", display: "flex", gap: "1.2rem", alignItems: "flex-start" }}>
                  <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: "#EFF6FF", color: "#0284C7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Phone size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: "1rem", color: "#0B192C", marginBottom: "0.2rem" }}>Phone & Dispatch Helpline</h4>
                    <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0B192C" }}>
                      <a href="tel:+919004807180">+91 90048 07180</a>
                    </div>
                    <span style={{ fontSize: "0.8rem", color: "#F59E0B", fontWeight: 600 }}>
                      ⚡ Working Hours: 7:00 AM – 7:00 PM Daily
                    </span>
                  </div>
                </div>

                {/* WhatsApp Support */}
                <div className="card" style={{ padding: "1.25rem 1.5rem", display: "flex", gap: "1.2rem", alignItems: "flex-start" }}>
                  <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: "#DCFCE7", color: "#16A34A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <MessageSquare size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: "1rem", color: "#0B192C", marginBottom: "0.2rem" }}>WhatsApp Direct Support</h4>
                    <a
                      href="https://wa.me/919004807180?text=Hi%20Vishal%20Electricals%2C%20I%20need%20assistance%20with%20electrical%20work."
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: "0.95rem", color: "#16A34A", fontWeight: 700 }}
                    >
                      Chat on WhatsApp (+91 90048 07180)
                    </a>
                    <div style={{ fontSize: "0.85rem", color: "#64748B", marginTop: "0.3rem" }}>
                      ⚡ Instant photo consultation & quick technician dispatch
                    </div>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="card" style={{ padding: "1.25rem 1.5rem", display: "flex", gap: "1.2rem", alignItems: "flex-start" }}>
                  <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: "#FFFBEB", color: "#D97706", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Clock size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: "1rem", color: "#0B192C", marginBottom: "0.2rem" }}>Operational Working Hours</h4>
                    <p style={{ fontSize: "0.9rem", color: "#475569" }}>
                      <strong>Daily Operating Hours:</strong> Monday – Sunday: 7:00 AM – 7:00 PM<br />
                      <strong>Doorstep Service Area:</strong> Virar to Churchgate (Mumbai Western Railway Corridor)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div>
              <div className="card" style={{ padding: "2.5rem" }}>
                <h3 style={{ fontSize: "1.45rem", color: "#0B192C", marginBottom: "0.4rem" }}>
                  Send an Enquiry or Service Request
                </h3>
                <p style={{ color: "#64748B", fontSize: "0.95rem", marginBottom: "1.75rem" }}>
                  Fill out your details below and our service manager will contact you promptly.
                </p>

                {submitted ? (
                  <div style={{ padding: "3rem 1.5rem", textAlign: "center", background: "#ECFDF5", borderRadius: "12px", border: "1px solid #A7F3D0" }}>
                    <CheckCircle2 size={48} color="#10B981" style={{ margin: "0 auto 1rem" }} />
                    <h4 style={{ fontSize: "1.3rem", color: "#065F46", marginBottom: "0.4rem" }}>
                      Enquiry Received!
                    </h4>
                    <p style={{ color: "#047857", fontSize: "0.95rem", marginBottom: "1.5rem" }}>
                      Our technician coordinator will call you back at <strong>{phone}</strong> shortly.
                    </p>
                    <button
                      type="button"
                      className="btn btn-outline btn-sm"
                      onClick={() => setSubmitted(false)}
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                      <div className="form-group">
                        <label className="form-label">Full Name *</label>
                        <input
                          type="text"
                          required
                          className="form-control"
                          placeholder="e.g. Vikas Kanojiya"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Phone Number *</label>
                        <input
                          type="tel"
                          required
                          maxLength={10}
                          className="form-control"
                          placeholder="e.g. 9820123456"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                        />
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                      <div className="form-group">
                        <label className="form-label">Mumbai Area / Locality</label>
                        <select
                          className="form-select"
                          value={area}
                          onChange={(e) => setArea(e.target.value)}
                        >
                          {MUMBAI_LOCALITIES.map((loc) => (
                            <option key={loc.name} value={loc.label}>
                              {loc.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Subject / Service Type</label>
                        <input
                          type="text"
                          className="form-control"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Message / Work Description *</label>
                      <textarea
                        required
                        className="form-control"
                        rows={4}
                        placeholder="Please describe what needs repair or installation..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary btn-lg"
                      style={{ width: "100%", marginTop: "0.5rem" }}
                      id="contact-submit-btn"
                    >
                      <Send size={18} />
                      <span>Send Message to Dispatch Desk</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Google Maps Visual Frame & Service Hubs */}
          <div className="card" style={{ overflow: "hidden" }}>
            <div style={{ padding: "1.5rem 2rem", background: "#0B192C", color: "#FFFFFF", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <h3 style={{ fontSize: "1.2rem", color: "#FFFFFF" }}>Mumbai Western Corridor HQ & Coverage Map</h3>
                <span style={{ fontSize: "0.85rem", color: "#94A3B8" }}>
                  Main Office: Cartan Road No. 8, Sukkarwadi, Borivali East • Rapid Dispatch across Virar to Churchgate
                </span>
              </div>
              <a
                href="https://maps.google.com/?q=Cartan+Road+No+8+Sukkarwadi+Borivali+East+Mumbai+400066"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold btn-sm"
              >
                <Navigation size={15} />
                <span>Open in Google Maps</span>
              </a>
            </div>

            <div style={{ height: "340px", width: "100%", background: "#0F172A", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ position: "absolute", inset: 0, opacity: 0.25, background: "radial-gradient(#38BDF8 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
              <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "2rem" }}>
                <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(245, 158, 11, 0.2)", border: "2px solid #F59E0B", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem", color: "#F59E0B" }}>
                  <MapPin size={32} />
                </div>
                <h4 style={{ fontSize: "1.4rem", color: "#FFFFFF", marginBottom: "0.4rem" }}>
                  Vishal Electricals Main Office & Command Desk
                </h4>
                <p style={{ color: "#CBD5E1", fontSize: "0.95rem" }}>
                  Cartan Road No. 8, Sukkarwadi, Borivali East, Mumbai - 400066
                </p>
                <div style={{ display: "flex", justifyContent: "center", gap: "0.6rem", flexWrap: "wrap", marginTop: "1rem" }}>
                  {["Borivali East HQ (400066)", "Virar Hub (401303)", "Vasai Hub (401201)", "Mira Road (401107)", "Borivali West (400092)", "Andheri Hub (400053)", "Bandra Hub (400050)", "Dadar Hub (400028)", "Churchgate (400020)"].map((hub) => (
                    <span key={hub} className="badge badge-blue" style={{ background: "rgba(56, 189, 248, 0.2)", color: "#38BDF8" }}>
                      ● {hub}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
