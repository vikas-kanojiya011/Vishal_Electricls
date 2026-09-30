import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { MessageSquare, Bot, X, Send, Phone, ArrowRight, Zap, Sparkles } from "lucide-react";
import { servicesData } from "../../data/servicesData";

const INTENT_RULES = [
  {
    keywords: ["fan", "ceiling", "bldc", "regulator", "speed", "humming"],
    serviceId: "fan-installation-repair",
    serviceName: "Fan Installation & Repair",
    startingPrice: 300,
    reply: "We can definitely help with Fan Repair and speed regulators. Our technician carries genuine copper capacitors and BLDC tools."
  },
  {
    keywords: ["mcb", "breaker", "trip", "tripping", "short circuit", "spark", "sparking", "blackout", "fuse"],
    serviceId: "mcb-installation-replacement",
    serviceName: "MCB & Circuit Breaker Repair",
    startingPrice: 500,
    reply: "Breaker tripping or sparking is an urgent safety matter. We can dispatch a licensed wireman with digital insulation meters immediately."
  },
  {
    keywords: ["switch", "socket", "plug", "loose", "board", "touch"],
    serviceId: "switch-socket-installation",
    serviceName: "Switch & Socket Installation",
    startingPrice: 150,
    reply: "We handle repair, replacement, and child-safe shutter socket installation for all Anchor Roma and Legrand switchboards."
  },
  {
    keywords: ["light", "led", "bulb", "tube", "spotlight", "chandelier", "flicker", "flickering"],
    serviceId: "light-installation",
    serviceName: "Lighting & LED Fixtures",
    startingPrice: 200,
    reply: "We install and repair LED tube lights, decorative chandeliers, false ceiling spotlights, and resolve flickering issues."
  },
  {
    keywords: ["inverter", "battery", "ups", "backup", "tubular"],
    serviceId: "inverter-installation",
    serviceName: "Home Inverter Setup & Wiring",
    startingPrice: 1200,
    reply: "Our certified technicians handle pure sine wave inverters, battery rack setups, and dedicated emergency backup circuits."
  },
  {
    keywords: ["wire", "wiring", "concealed", "renovation", "burnt", "smell", "rewiring"],
    serviceId: "home-wiring",
    serviceName: "Home Concealed Rewiring",
    startingPrice: 1499,
    reply: "We provide complete home rewiring with ISI fire-retardant Polycab copper cables and zero-mess wall grooving."
  },
  {
    keywords: ["db", "panel", "distribution", "3 phase", "meter", "earthing", "load"],
    serviceId: "distribution-board-work",
    serviceName: "Distribution Board Organizing",
    startingPrice: 1800,
    reply: "We balance 3-phase loads, label neutral buses, and organize chaotic MCB distribution boards."
  }
];

const PRESET_QUICK_QUESTIONS = [
  "My ceiling fan is not working",
  "MCB trips repeatedly when AC turns on",
  "Switchboard has sparking smell",
  "Need LED spotlights installed in living room"
];

export default function ServiceAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! 👋 I'm your Vishal Electricals Service Assistant. What electrical problem are you facing in your home or office?",
      recommendation: null
    }
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleUserMessage = (userText) => {
    if (!userText.trim()) return;

    const lower = userText.toLowerCase();
    const matchedRule = INTENT_RULES.find((r) =>
      r.keywords.some((k) => lower.includes(k))
    );

    const userMsg = { sender: "user", text: userText };

    let botReply;
    if (matchedRule) {
      botReply = {
        sender: "bot",
        text: matchedRule.reply,
        recommendation: {
          serviceId: matchedRule.serviceId,
          serviceName: matchedRule.serviceName,
          price: matchedRule.startingPrice
        }
      };
    } else {
      botReply = {
        sender: "bot",
        text: "Thank you for describing the issue. For general electrical concerns, our technicians inspect on site starting from just ₹150. Would you like to book a visit or call our master electrician directly?",
        recommendation: {
          serviceId: "electrical-fault-repair",
          serviceName: "General Electrical Fault Diagnosis",
          price: 150
        }
      };
    }

    setMessages((prev) => [...prev, userMsg, botReply]);
    setInputMessage("");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleUserMessage(inputMessage);
  };

  return (
    <div className="service-assistant-wrapper" style={{ position: "fixed", bottom: "90px", right: "24px", zIndex: 999 }}>
      {/* Floating Toggle Bubble */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="assistant-bubble-btn"
          aria-label="Open Electrical Service Assistant"
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #0B132B 0%, #2563EB 100%)",
            color: "#FBBF24",
            border: "2px solid #F59E0B",
            boxShadow: "0 8px 24px rgba(37, 99, 235, 0.45)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "transform 0.25s ease, box-shadow 0.25s ease"
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <Bot size={28} />
          <span
            style={{
              position: "absolute",
              top: "-4px",
              right: "-4px",
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              background: "#10B981",
              border: "2px solid #FFFFFF"
            }}
          />
        </button>
      )}

      {/* Assistant Dialog Window */}
      {isOpen && (
        <div
          className="card"
          style={{
            width: "360px",
            maxWidth: "calc(100vw - 32px)",
            height: "500px",
            maxHeight: "80vh",
            borderRadius: "18px",
            boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.35)",
            border: "1px solid var(--border-medium)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden"
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "linear-gradient(135deg, #070B14 0%, #0B132B 60%, #1E3A8A 100%)",
              color: "#FFFFFF",
              padding: "1rem 1.25rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <div
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "8px",
                  background: "rgba(245, 158, 11, 0.2)",
                  color: "#FBBF24",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Bot size={20} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: "0.92rem", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                  <span>Service Assistant</span>
                  <Sparkles size={13} color="#FBBF24" />
                </div>
                <span style={{ fontSize: "0.7rem", color: "#94A3B8" }}>
                  Online · Instant Diagnosis
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close assistant"
              style={{
                background: "none",
                border: "none",
                color: "#94A3B8",
                cursor: "pointer",
                padding: "0.2rem"
              }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Chat Messages Body */}
          <div
            style={{
              flex: 1,
              padding: "1rem",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "0.85rem",
              background: "var(--bg-main)"
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                  maxWidth: "88%"
                }}
              >
                <div
                  style={{
                    padding: "0.75rem 0.95rem",
                    borderRadius: msg.sender === "user" ? "14px 14px 2px 14px" : "14px 14px 14px 2px",
                    background: msg.sender === "user" ? "#2563EB" : "var(--bg-card)",
                    color: msg.sender === "user" ? "#FFFFFF" : "var(--text-dark)",
                    fontSize: "0.86rem",
                    lineHeight: "1.45",
                    border: msg.sender === "user" ? "none" : "1px solid var(--border-light)",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.05)"
                  }}
                >
                  {msg.text}

                  {/* Recommendation Card with 3 Requested Options: Book Service | Call Now | WhatsApp */}
                  {msg.recommendation && (
                    <div
                      style={{
                        marginTop: "0.75rem",
                        padding: "0.75rem",
                        background: "var(--bg-alt)",
                        borderRadius: "10px",
                        border: "1px solid var(--border-light)"
                      }}
                    >
                      <div style={{ fontWeight: 700, fontSize: "0.82rem", color: "var(--text-dark)" }}>
                        Recommended: {msg.recommendation.serviceName}
                      </div>
                      <div style={{ fontSize: "0.78rem", color: "#F59E0B", fontWeight: 700, margin: "0.15rem 0 0.6rem" }}>
                        Starting from ₹{msg.recommendation.price}
                      </div>

                      <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                        <Link
                          to={`/book?service=${msg.recommendation.serviceId}`}
                          onClick={() => setIsOpen(false)}
                          className="btn btn-sm btn-gold"
                          style={{ width: "100%", fontSize: "0.78rem", padding: "0.35rem 0.6rem" }}
                        >
                          <Zap size={13} />
                          <span>Book Service</span>
                        </Link>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.35rem" }}>
                          <a
                            href="tel:+919004807180"
                            className="btn btn-sm btn-primary"
                            style={{ fontSize: "0.72rem", padding: "0.35rem" }}
                          >
                            <Phone size={12} />
                            <span>Call Now</span>
                          </a>

                          <a
                            href={`https://wa.me/919004807180?text=Hi%20Vishal%20Electricals%2C%20I%20need%20help%20with%20${encodeURIComponent(msg.recommendation.serviceName)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-sm btn-whatsapp"
                            style={{ fontSize: "0.72rem", padding: "0.35rem" }}
                          >
                            <MessageSquare size={12} />
                            <span>WhatsApp</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Preset Prompts */}
          {messages.length <= 2 && (
            <div style={{ padding: "0.5rem 0.75rem", background: "var(--bg-alt)", borderTop: "1px solid var(--border-light)" }}>
              <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: "0.3rem" }}>
                Suggested issues:
              </span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                {PRESET_QUICK_QUESTIONS.slice(0, 2).map((q, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleUserMessage(q)}
                    style={{
                      fontSize: "0.72rem",
                      padding: "0.2rem 0.5rem",
                      borderRadius: "999px",
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-light)",
                      color: "var(--text-dark)",
                      cursor: "pointer",
                      textAlign: "left"
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Bar */}
          <form
            onSubmit={handleFormSubmit}
            style={{
              padding: "0.65rem 0.85rem",
              background: "var(--bg-card)",
              borderTop: "1px solid var(--border-light)",
              display: "flex",
              gap: "0.5rem",
              alignItems: "center"
            }}
          >
            <input
              type="text"
              className="form-control"
              style={{
                fontSize: "0.85rem",
                padding: "0.45rem 0.75rem",
                borderRadius: "8px"
              }}
              placeholder="Describe your issue (e.g. fan, switch, mcb)..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="btn btn-sm btn-gold"
              style={{ padding: "0.45rem 0.75rem", borderRadius: "8px" }}
              aria-label="Send message"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
