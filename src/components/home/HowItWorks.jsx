import React from "react";
import { Link } from "react-router-dom";
import { CalendarCheck, UserCheck, Wrench, ShieldCheck, ArrowRight } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      icon: CalendarCheck,
      title: "Book Online or Call",
      desc: "Pick your electrical service, preferred date & time slot in 60 seconds with our smart booking wizard."
    },
    {
      num: "02",
      icon: UserCheck,
      title: "Verified Electrician Assigned",
      desc: "Get an instant booking ID with technician profile details, photo, and direct phone contact."
    },
    {
      num: "03",
      icon: Wrench,
      title: "Doorstep Service & Inspection",
      desc: "Technician arrives in uniform equipped with digital testers, safety gear, and genuine ISI materials."
    },
    {
      num: "04",
      icon: ShieldCheck,
      title: "Testing & 30-Day Warranty",
      desc: "Comprehensive load testing, clean cleanup, easy payment via UPI/Cash, and 30-day service guarantee."
    }
  ];

  return (
    <section className="section" style={{ backgroundColor: "#F8FAFC" }}>
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <span>Simple 4-Step Process</span>
          </div>
          <h2 className="section-title">How It Works</h2>
          <p className="section-desc">
            Getting professional electrical service for your home or office in Mumbai has never been this straightforward.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "2rem"
          }}
        >
          {steps.map((st, idx) => {
            const Icon = st.icon;
            return (
              <div
                key={idx}
                className="card"
                style={{
                  padding: "2.2rem 1.75rem",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "1.25rem",
                    right: "1.5rem",
                    fontSize: "2.2rem",
                    fontWeight: 800,
                    fontFamily: "var(--font-heading)",
                    color: "rgba(11, 25, 44, 0.08)"
                  }}
                >
                  {st.num}
                </div>

                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "14px",
                    background: "linear-gradient(135deg, #0B192C 0%, #1E3E62 100%)",
                    color: "#F59E0B",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.5rem"
                  }}
                >
                  <Icon size={28} />
                </div>

                <h3 style={{ fontSize: "1.15rem", marginBottom: "0.6rem", color: "#0B192C" }}>
                  {st.title}
                </h3>
                <p style={{ fontSize: "0.9rem", color: "#64748B", lineHeight: "1.6" }}>
                  {st.desc}
                </p>
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <Link to="/book" className="btn btn-gold btn-lg">
            <span>Book Your Service Slot Now</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
