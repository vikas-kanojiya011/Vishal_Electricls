import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Tag, Check, Copy, ArrowRight, ShieldCheck, Gift, Percent, Sparkles } from "lucide-react";
import { customerOffers } from "../data/offersData";

export default function OffersPage() {
  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopy = (code) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="offers-page" style={{ padding: "3.5rem 1.5rem 5rem" }}>
      <div className="container" style={{ maxWidth: "1080px" }}>
        {/* Header */}
        <div className="section-header" style={{ marginBottom: "3rem" }}>
          <div className="section-badge gold">
            <Gift size={14} />
            <span>Customer Offers & Savings</span>
          </div>
          <h1 style={{ fontSize: "2.3rem", marginBottom: "0.5rem" }}>
            Exclusive Deals & Maintenance Packages
          </h1>
          <p>
            Save on your next doorstep electrical repair, home inspection, or annual society maintenance contract.
          </p>
        </div>

        {/* Offers Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "1.5rem"
          }}
        >
          {customerOffers.map((offer) => {
            const isCopied = copiedCode === offer.code;

            return (
              <div
                key={offer.id}
                className="card"
                style={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  border: "1px solid var(--border-light)",
                  position: "relative",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease"
                }}
              >
                {/* Top Banner Stripe */}
                <div
                  style={{
                    background: `linear-gradient(135deg, ${offer.color}, #0B132B)`,
                    padding: "1.25rem 1.5rem",
                    color: "#FFFFFF",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <div>
                    <span style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", opacity: 0.9 }}>
                      {offer.category}
                    </span>
                    <h3 style={{ fontSize: "1.25rem", color: "#FFFFFF", margin: "0.2rem 0 0", fontWeight: 800 }}>
                      {offer.discount}
                    </h3>
                  </div>

                  <span
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 800,
                      background: "rgba(255, 255, 255, 0.2)",
                      padding: "0.2rem 0.6rem",
                      borderRadius: "999px",
                      backdropFilter: "blur(4px)"
                    }}
                  >
                    {offer.badge}
                  </span>
                </div>

                {/* Body Content */}
                <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-dark)", marginBottom: "0.4rem" }}>
                      {offer.title}
                    </h4>
                    <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: "1.5", marginBottom: "1rem" }}>
                      {offer.description}
                    </p>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-light)", display: "block", marginBottom: "1.25rem" }}>
                      ⚡ {offer.terms}
                    </span>
                  </div>

                  {/* Coupon Code Block & Action */}
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "0.6rem 0.85rem",
                        background: "var(--bg-alt)",
                        borderRadius: "10px",
                        border: "1.5px dashed var(--border-medium)",
                        marginBottom: "1rem"
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                        <Tag size={15} color="#F59E0B" />
                        <span style={{ fontFamily: "monospace", fontSize: "1.05rem", fontWeight: 800, color: "var(--text-dark)", letterSpacing: "0.05em" }}>
                          {offer.code}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleCopy(offer.code)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: isCopied ? "#10B981" : "#2563EB",
                          fontSize: "0.8rem",
                          fontWeight: 700,
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.3rem"
                        }}
                      >
                        {isCopied ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy</>}
                      </button>
                    </div>

                    <Link
                      to={`/book?promo=${offer.code}`}
                      className="btn btn-gold"
                      style={{ width: "100%" }}
                    >
                      <span>Claim Offer & Book</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Commercial & Society Enquiry Strip */}
        <div
          style={{
            marginTop: "3.5rem",
            padding: "2rem",
            background: "linear-gradient(135deg, #070B14 0%, #0B132B 100%)",
            color: "#FFFFFF",
            borderRadius: "16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1.5rem"
          }}
        >
          <div>
            <span className="badge badge-gold" style={{ marginBottom: "0.5rem" }}>
              Housing Society & Corporate AMC
            </span>
            <h3 style={{ fontSize: "1.4rem", color: "#FFFFFF", marginBottom: "0.3rem" }}>
              Need a Custom Electrical Contract for Your Building?
            </h3>
            <p style={{ color: "#CBD5E1", fontSize: "0.95rem", margin: 0 }}>
              We manage over 45 housing societies in Dahisar, Borivali, and Kandivali with dedicated 7 AM to 7 PM priority wireman coverage.
            </p>
          </div>

          <a href="tel:+919004807180" className="btn btn-gold btn-lg">
            <span>Call AMC Desk: +91 90048 07180</span>
          </a>
        </div>
      </div>
    </div>
  );
}
