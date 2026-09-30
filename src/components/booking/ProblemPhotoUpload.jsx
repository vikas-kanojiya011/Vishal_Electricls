import React, { useRef } from "react";
import { Camera, Upload, X, Check } from "lucide-react";

const COMMON_PROBLEM_PRESETS = [
  { id: "mcb", label: "MCB Problem", icon: "⚡" },
  { id: "switchboard", label: "Switchboard Problem", icon: "🔌" },
  { id: "wiring", label: "Wiring Problem", icon: "🪢" },
  { id: "fan", label: "Fan Problem", icon: "🌀" },
  { id: "light", label: "Light Problem", icon: "💡" },
  { id: "spark", label: "Sparking / Burnt Smell", icon: "🔥" }
];

export default function ProblemPhotoUpload({
  photoUrl,
  onPhotoChange,
  problemType,
  onProblemTypeChange
}) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Please upload a photo smaller than 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      onPhotoChange(uploadEvent.target?.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    onPhotoChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="problem-photo-card" style={{ marginTop: "1rem" }}>
      <div style={{ marginBottom: "0.85rem" }}>
        <label className="form-label" style={{ fontWeight: 700, fontSize: "0.95rem" }}>
          <Camera size={18} color="#F59E0B" />
          <span>Upload Problem Photo (Optional)</span>
        </label>
        <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "0.15rem" }}>
          Upload a photo of your damaged switch, tripping MCB, or burnt wire. This helps our technician prepare the exact genuine spares before visiting.
        </p>
      </div>

      {/* Quick Problem Tag Presets */}
      <div style={{ marginBottom: "1rem" }}>
        <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-dark)", display: "block", marginBottom: "0.45rem" }}>
          Select problem category:
        </span>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {COMMON_PROBLEM_PRESETS.map((preset) => {
            const isSelected = problemType === preset.label;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => onProblemTypeChange(isSelected ? "" : preset.label)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  padding: "0.35rem 0.75rem",
                  borderRadius: "999px",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  border: isSelected
                    ? "1.5px solid #F59E0B"
                    : "1px solid var(--border-light)",
                  background: isSelected ? "rgba(245, 158, 11, 0.12)" : "var(--bg-alt)",
                  color: isSelected ? "#D97706" : "var(--text-dark)",
                  transition: "all 0.2s ease"
                }}
              >
                <span>{preset.icon}</span>
                <span>{preset.label}</span>
                {isSelected && <Check size={13} color="#D97706" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Photo Uploader Box / Preview */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        style={{ display: "none" }}
        id="problem-photo-input"
      />

      {photoUrl ? (
        <div
          style={{
            position: "relative",
            borderRadius: "12px",
            overflow: "hidden",
            border: "1.5px solid #F59E0B",
            background: "rgba(245, 158, 11, 0.04)",
            padding: "0.75rem",
            display: "flex",
            alignItems: "center",
            gap: "1rem"
          }}
        >
          <img
            src={photoUrl}
            alt="Uploaded problem preview"
            style={{
              width: "80px",
              height: "80px",
              objectFit: "cover",
              borderRadius: "8px",
              border: "1px solid rgba(0,0,0,0.1)"
            }}
          />
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#10B981", fontWeight: 700, fontSize: "0.85rem" }}>
              <Check size={16} /> Photo Attached Successfully
            </div>
            <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", display: "block", marginTop: "0.2rem" }}>
              Our wireman will inspect this image before arrival.
            </span>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              style={{
                marginTop: "0.4rem",
                fontSize: "0.78rem",
                color: "#2563EB",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                textDecoration: "underline"
              }}
            >
              Change Photo
            </button>
          </div>

          <button
            type="button"
            onClick={handleRemovePhoto}
            aria-label="Remove photo"
            style={{
              background: "#FEE2E2",
              border: "none",
              color: "#EF4444",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.2s ease"
            }}
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click(); }}
          style={{
            border: "2px dashed var(--border-medium)",
            borderRadius: "12px",
            padding: "1.4rem 1rem",
            textAlign: "center",
            cursor: "pointer",
            background: "var(--bg-alt)",
            transition: "all 0.2s ease"
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#F59E0B")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border-medium)")}
        >
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              background: "rgba(245, 158, 11, 0.15)",
              color: "#F59E0B",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 0.6rem"
            }}
          >
            <Upload size={20} />
          </div>
          <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-dark)" }}>
            Click to upload or snap a photo with your phone
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>
            Supports JPG, PNG, WEBP (Max 5MB)
          </div>
        </div>
      )}
    </div>
  );
}
