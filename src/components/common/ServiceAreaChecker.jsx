import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  serviceAreasData,
  checkCoverage,
  searchCityAndArea,
  getAllCities,
  getAreasForCity,
  getPrimaryAreaForCity,
  autoGeneratePincode
} from "../../data/serviceAreasData";
import {
  MapPin,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  Users,
  ArrowRight,
  Sparkles,
  Copy,
  Check,
  Building2,
  Compass
} from "lucide-react";

export default function ServiceAreaChecker() {
  const [selectedCity, setSelectedCity] = useState("Mumbai");
  const [selectedArea, setSelectedArea] = useState("Borivali West");
  const [query, setQuery] = useState("Borivali West");
  const [result, setResult] = useState(() => checkCoverage("Borivali West", "Mumbai"));
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [copied, setCopied] = useState(false);

  const allCitiesList = useMemo(() => getAllCities(), []);
  const cityAreasList = useMemo(() => getAreasForCity(selectedCity), [selectedCity]);

  // Real-time suggestions based on current city and typed query
  const suggestions = useMemo(() => {
    return searchCityAndArea(query, selectedCity === "all" ? "" : selectedCity);
  }, [query, selectedCity]);

  const handleSearch = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!query.trim()) return;
    const res = checkCoverage(query, selectedCity === "all" ? "" : selectedCity);
    setResult(res);
    setShowSuggestions(false);
  };

  const handleCityFilterChange = (city) => {
    setSelectedCity(city);
    if (city === "all") {
      setSelectedArea("Borivali West");
      setQuery("Borivali West");
      const res = checkCoverage("Borivali West", "Mumbai");
      setResult(res);
      return;
    }
    const primary = getPrimaryAreaForCity(city);
    setSelectedArea(primary.name);
    setQuery(primary.name);
    const res = checkCoverage(primary.name, city);
    setResult(res);
    setShowSuggestions(false);
  };

  const handleAreaDropdownChange = (areaName) => {
    setSelectedArea(areaName);
    setQuery(areaName);
    const res = checkCoverage(areaName, selectedCity);
    setResult(res);
    setShowSuggestions(false);
  };

  const selectSuggestion = (item) => {
    setQuery(item.name);
    setSelectedArea(item.name);
    setSelectedCity(item.cityName);
    setShowSuggestions(false);
    const res = checkCoverage(item.name, item.cityName);
    setResult(res);
  };

  const selectQuickArea = (areaName, cityName = "Mumbai") => {
    setSelectedCity(cityName);
    setSelectedArea(areaName);
    setQuery(areaName);
    const res = checkCoverage(areaName, cityName);
    setResult(res);
    setShowSuggestions(false);
  };

  const handleCopyPincode = (pincode) => {
    if (!pincode) return;
    navigator.clipboard.writeText(pincode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="area-checker-card" id="service-area-checker">
      <div style={{ marginBottom: "1.5rem" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(37,99,235,0.08)", color: "#2563EB", padding: "4px 12px", borderRadius: "20px", fontSize: "0.82rem", fontWeight: 700, marginBottom: "0.5rem" }}>
          <Sparkles size={14} />
          <span>⚡ Automatic City, Area Name & 6-Digit Pincode Generator</span>
        </div>
        <h3 style={{ fontSize: "1.45rem", marginBottom: "0.4rem" }}>
          Select Any City & Area for Instant 6-Digit Pincode & Dispatch Status
        </h3>
        <p style={{ fontSize: "0.95rem", color: "var(--text-muted)" }}>
          Pick your city and locality from the dropdowns, or search. The verified postal pincode and technician ETA generate automatically!
        </p>
      </div>

      {/* Dual City & Area Dropdown Selector Controls */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0.75rem", marginBottom: "1rem" }}>
        {/* 1. City Dropdown */}
        <div>
          <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-dark)", display: "flex", alignItems: "center", gap: "4px", marginBottom: "0.35rem" }}>
            <Building2 size={14} color="#2563EB" />
            <span>Select City / State</span>
          </label>
          <select
            className="form-control"
            value={selectedCity}
            onChange={(e) => handleCityFilterChange(e.target.value)}
            style={{ fontWeight: 700, background: "var(--bg-card)", color: "var(--text-dark)", height: "46px" }}
          >
            <option value="all">🌍 All Cities (Pan-India)</option>
            {allCitiesList.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name} ({c.state}) {c.isPrimaryHub ? "★ Hub" : ""}
              </option>
            ))}
          </select>
        </div>

        {/* 2. Area Locality Dropdown for Chosen City (Auto-Changes Pincode) */}
        <div>
          <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-dark)", display: "flex", alignItems: "center", gap: "4px", marginBottom: "0.35rem" }}>
            <Compass size={14} color="#059669" />
            <span>Locality in {selectedCity} (Auto-Sets Pincode)</span>
          </label>
          <select
            className="form-control"
            value={selectedArea}
            onChange={(e) => handleAreaDropdownChange(e.target.value)}
            style={{ fontWeight: 600, background: "var(--bg-card)", color: "var(--text-dark)", height: "46px" }}
          >
            {cityAreasList.map((a) => (
              <option key={a.name} value={a.name}>
                {a.name} — Pin: {a.pincode}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Search Input with Auto-Suggest for Custom Landmarks / Pincodes */}
      <form onSubmit={handleSearch} className="checker-input-row" style={{ position: "relative" }}>
        <div style={{ position: "relative", flex: 1 }}>
          <MapPin
            size={18}
            style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#64748B" }}
          />
          <input
            type="text"
            className="form-control"
            style={{ paddingLeft: "42px", height: "48px" }}
            placeholder={`Or type custom area or 6-digit pincode in ${selectedCity === "all" ? "any city" : selectedCity}...`}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
          />

          {/* Autocomplete Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div
              className="area-suggestions-dropdown"
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                maxHeight: "240px",
                overflowY: "auto",
                background: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                borderRadius: "10px",
                boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
                zIndex: 200,
                marginTop: "4px"
              }}
            >
              {suggestions.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => selectSuggestion(item)}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0.65rem 0.9rem",
                    cursor: "pointer",
                    borderBottom: "1px solid var(--border-color)",
                    transition: "background 0.15s ease"
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-alt)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <MapPin size={15} color="#2563EB" />
                    <div>
                      <strong style={{ fontSize: "0.92rem", color: "var(--text-dark)" }}>{item.name}</strong>
                      <span style={{ color: "var(--text-muted)", fontSize: "0.82rem", marginLeft: "6px" }}>
                        ({item.cityName})
                      </span>
                    </div>
                  </div>
                  <span style={{ fontSize: "0.8rem", background: "rgba(16,185,129,0.12)", color: "#059669", padding: "2px 8px", borderRadius: "6px", fontWeight: 700 }}>
                    ⚡ Pin: {item.pincode}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <button type="submit" className="btn btn-primary" id="checker-search-btn" style={{ height: "48px" }}>
          <Search size={18} />
          <span>Auto-Generate Pincode</span>
        </button>
      </form>

      {/* 🚆 Mumbai Western Railway Corridor: Virar to Churchgate Express Track */}
      <div
        style={{
          marginTop: "1.25rem",
          padding: "1rem 1.15rem",
          borderRadius: "12px",
          background: "linear-gradient(135deg, rgba(37,99,235,0.06) 0%, rgba(14,165,233,0.06) 100%)",
          border: "1.5px solid rgba(37,99,235,0.2)"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.6rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "1.2rem" }}>🚆</span>
            <div>
              <span style={{ fontSize: "0.92rem", fontWeight: 800, color: "#1E3A8A", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Mumbai Western Railway Corridor Coverage (Virar to Churchgate)
              </span>
              <div style={{ fontSize: "0.78rem", color: "#475569" }}>
                Full doorstep coverage from Palghar/Thane MMR border all the way down to South Mumbai Terminus
              </div>
            </div>
          </div>
          <span
            style={{
              fontSize: "0.75rem",
              background: "#2563EB",
              color: "#FFFFFF",
              padding: "3px 10px",
              borderRadius: "20px",
              fontWeight: 700
            }}
          >
            ★ Full Corridor Active
          </span>
        </div>

        {/* Western Corridor Station Sequence Buttons */}
        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
          {[
            { area: "Virar West", pin: "401303", label: "Virar" },
            { area: "Vasai West", pin: "401201", label: "Vasai" },
            { area: "Mira Road", pin: "401107", label: "Mira Road" },
            { area: "Dahisar West", pin: "400068", label: "Dahisar" },
            { area: "Borivali East", pin: "400066", label: "Borivali East (Main Office - Sukkarwadi)" },
            { area: "Borivali West", pin: "400092", label: "Borivali West" },
            { area: "Kandivali West", pin: "400067", label: "Kandivali" },
            { area: "Malad West", pin: "400064", label: "Malad" },
            { area: "Goregaon West", pin: "400062", label: "Goregaon" },
            { area: "Andheri West", pin: "400053", label: "Andheri" },
            { area: "Vile Parle West", pin: "400056", label: "Vile Parle" },
            { area: "Bandra West", pin: "400050", label: "Bandra" },
            { area: "Dadar West", pin: "400028", label: "Dadar" },
            { area: "Lower Parel", pin: "400013", label: "Lower Parel" },
            { area: "Mumbai Central", pin: "400008", label: "Mumbai Central" },
            { area: "Churchgate", pin: "400020", label: "Churchgate" }
          ].map((stn) => {
            const isSelected = selectedCity === "Mumbai" && selectedArea.toLowerCase().includes(stn.label.toLowerCase().split(" ")[0]);
            return (
              <button
                key={stn.area}
                type="button"
                onClick={() => selectQuickArea(stn.area, "Mumbai")}
                style={{
                  padding: "4px 10px",
                  borderRadius: "8px",
                  border: isSelected ? "1.5px solid #2563EB" : "1px solid rgba(37,99,235,0.2)",
                  background: isSelected ? "#2563EB" : "#FFFFFF",
                  color: isSelected ? "#FFFFFF" : "#1E3A8A",
                  fontSize: "0.78rem",
                  fontWeight: isSelected ? 800 : 600,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  boxShadow: isSelected ? "0 2px 6px rgba(37,99,235,0.3)" : "none",
                  transition: "all 0.15s ease"
                }}
              >
                <span>{stn.label}</span>
                <span style={{ opacity: isSelected ? 0.9 : 0.65, fontSize: "0.72rem" }}>({stn.pin})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Select Pan-India Hubs */}
      <div style={{ marginTop: "1rem" }}>
        <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
          Other Metropolitan City Hubs:
        </span>
        <div className="quick-area-tags">
          {[
            { area: "Ghodbunder Road", city: "Thane" },
            { area: "Vashi", city: "Navi Mumbai" },
            { area: "Kothrud", city: "Pune" },
            { area: "Indiranagar", city: "Bengaluru" },
            { area: "Connaught Place", city: "Delhi / NCR" },
            { area: "HITEC City", city: "Hyderabad" },
            { area: "Navrangpura", city: "Ahmedabad" }
          ].map((item) => (
            <button
              key={item.area}
              type="button"
              className={`area-tag-btn ${selectedArea.toLowerCase() === item.area.toLowerCase() && selectedCity.toLowerCase() === item.city.toLowerCase() ? "active" : ""}`}
              onClick={() => selectQuickArea(item.area, item.city)}
            >
              <MapPin size={12} style={{ marginRight: "4px", display: "inline" }} />
              {item.area} ({item.city})
            </button>
          ))}
        </div>
      </div>

      {/* Result Display Box */}
      {result && (
        <div className={`checker-result-box ${result.available ? "available" : "unavailable"}`} style={{ marginTop: "1.5rem" }}>
          {result.available ? (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.75rem", marginBottom: "1rem" }}>
                <div className="result-badge-heading available" style={{ margin: 0 }}>
                  <CheckCircle2 size={24} color="#059669" />
                  <span>
                    Service Ready in {result.area}, {result.cityName}
                  </span>
                </div>

                {/* Prominent Auto-Generated Pincode Badge */}
                {result.generatedPincode && (
                  <div
                    style={{
                      background: "linear-gradient(135deg, #10B981, #059669)",
                      color: "#FFFFFF",
                      padding: "0.45rem 1rem",
                      borderRadius: "12px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      boxShadow: "0 4px 12px rgba(16,185,129,0.25)"
                    }}
                  >
                    <Sparkles size={16} />
                    <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>Auto-Generated Pincode:</span>
                    <strong style={{ fontSize: "1.15rem", letterSpacing: "1px", fontFamily: "monospace" }}>
                      {result.generatedPincode}
                    </strong>
                    <button
                      type="button"
                      onClick={() => handleCopyPincode(result.generatedPincode)}
                      style={{
                        background: "rgba(255,255,255,0.2)",
                        border: "none",
                        color: "#FFFFFF",
                        padding: "4px 8px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "0.75rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "3px"
                      }}
                      title="Copy Pincode"
                    >
                      {copied ? <Check size={12} /> : <Copy size={12} />}
                      <span>{copied ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                )}
              </div>

              <p style={{ color: "#065F46", fontSize: "0.95rem" }}>
                Great news! Our certified electrical technicians are operating in <strong>{result.area}, {result.cityName}</strong> with guaranteed 100% genuine spares & transparent billing.
              </p>

              <div className="result-meta-grid">
                <div className="result-meta-item">
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#065F46", fontWeight: 700 }}>
                    <Clock size={16} /> Est. Doorstep Arrival
                  </div>
                  <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0B192C", marginTop: "0.2rem" }}>
                    {result.avgArrival || "25 - 35 mins"}
                  </div>
                </div>

                <div className="result-meta-item">
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#065F46", fontWeight: 700 }}>
                    <Users size={16} /> Active Electricians
                  </div>
                  <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0B192C", marginTop: "0.2rem" }}>
                    {result.activeTechnicians || 4} Certified Technicians
                  </div>
                </div>

                <div className="result-meta-item">
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#065F46", fontWeight: 700 }}>
                    <Building2 size={16} /> Operating Hours
                  </div>
                  <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0B192C", marginTop: "0.2rem" }}>
                    7:00 AM – 7:00 PM Daily
                  </div>
                </div>
              </div>

              <div style={{ marginTop: "1.25rem", display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
                <Link
                  to={`/book?city=${encodeURIComponent(result.cityName)}&area=${encodeURIComponent(result.area)}&pincode=${encodeURIComponent(result.generatedPincode || "")}`}
                  className="btn btn-primary btn-sm"
                  id="book-area-direct-btn"
                >
                  <Sparkles size={16} />
                  <span>Book Doorstep Electrician in {result.area}</span>
                  <ArrowRight size={16} />
                </Link>
                <a href="tel:+919004807180" className="btn btn-outline btn-sm">
                  <span>Call Dispatch (+91 90048 07180)</span>
                </a>
              </div>
            </div>
          ) : (
            <div>
              <div className="result-badge-heading unavailable">
                <XCircle size={24} color="#DC2626" />
                <span>Currently outside our standard direct dispatch hubs.</span>
              </div>
              <p style={{ color: "#991B1B", fontSize: "0.95rem", marginBottom: "0.75rem" }}>
                {result.suggestion || "We could not find an exact match for this locality. You can still schedule an appointment or contact our dispatch desk."}
              </p>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <Link
                  to={`/book?city=${encodeURIComponent(selectedCity === "all" ? "Mumbai" : selectedCity)}&area=${encodeURIComponent(query)}`}
                  className="btn btn-primary btn-sm"
                >
                  <span>Submit Custom Doorstep Request</span>
                </Link>
                <a
                  href={`https://wa.me/919004807180?text=${encodeURIComponent(`Hi Vishal Electricals, I am looking for electrician service in ${query}, ${selectedCity}. Can you dispatch a technician?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp btn-sm"
                >
                  <span>Chat on WhatsApp (+91 90048 07180)</span>
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
