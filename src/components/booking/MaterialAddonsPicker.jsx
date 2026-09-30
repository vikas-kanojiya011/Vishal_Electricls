import React from "react";
import { Plus, Minus, ShoppingBag } from "lucide-react";
import { materialsCatalog } from "../../data/materialsData";

export default function MaterialAddonsPicker({
  selectedMaterials = {},
  onQuantityChange
}) {
  const selectedCount = Object.values(selectedMaterials).reduce((sum, q) => sum + (q || 0), 0);
  const materialSubtotal = materialsCatalog.reduce((sum, item) => {
    const qty = selectedMaterials[item.id] || 0;
    return sum + (item.unitPrice * qty);
  }, 0);

  return (
    <div className="materials-picker-section" style={{ marginTop: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.85rem", flexWrap: "wrap", gap: "0.5rem" }}>
        <div>
          <label className="form-label" style={{ fontWeight: 700, fontSize: "1rem", margin: 0 }}>
            <ShoppingBag size={18} color="#F59E0B" />
            <span>Need Genuine ISI Materials? (Add-on Spares)</span>
          </label>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "0.15rem" }}>
            Add genuine switches, MCBs, wires, or LED bulbs. Delivered and fitted directly by our wireman.
          </p>
        </div>

        {selectedCount > 0 && (
          <div
            style={{
              fontSize: "0.85rem",
              fontWeight: 700,
              color: "#10B981",
              background: "rgba(16, 185, 129, 0.12)",
              padding: "0.3rem 0.75rem",
              borderRadius: "999px"
            }}
          >
            {selectedCount} item{selectedCount > 1 ? "s" : ""} (+₹{materialSubtotal.toLocaleString("en-IN")})
          </div>
        )}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "0.85rem"
        }}
      >
        {materialsCatalog.map((item) => {
          const qty = selectedMaterials[item.id] || 0;
          const isSelected = qty > 0;

          return (
            <div
              key={item.id}
              style={{
                border: isSelected
                  ? "2px solid #F59E0B"
                  : "1px solid var(--border-light)",
                background: isSelected
                  ? "rgba(245, 158, 11, 0.06)"
                  : "var(--bg-card)",
                borderRadius: "12px",
                padding: "0.85rem 1rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "0.6rem",
                transition: "all 0.2s ease"
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem" }}>
                  <span style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--text-dark)", lineHeight: "1.3" }}>
                    {item.name}
                  </span>
                  <span
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      background: "rgba(37, 99, 235, 0.12)",
                      color: "#2563EB",
                      padding: "0.15rem 0.45rem",
                      borderRadius: "6px",
                      whiteSpace: "nowrap"
                    }}
                  >
                    {item.badge}
                  </span>
                </div>
                <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", display: "block", marginTop: "0.2rem" }}>
                  {item.warranty} · {item.brand}
                </span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "0.4rem", borderTop: "1px solid var(--border-light)" }}>
                <div>
                  <span style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--text-dark)" }}>
                    ₹{item.unitPrice}
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}> / {item.unit}</span>
                </div>

                <div className="qty-counter" style={{ margin: 0 }}>
                  <button
                    type="button"
                    className="qty-btn"
                    onClick={() => onQuantityChange(item.id, Math.max(0, qty - 1))}
                    disabled={qty === 0}
                    aria-label={`Decrease ${item.name}`}
                  >
                    <Minus size={13} />
                  </button>
                  <span className="qty-display" style={{ minWidth: "24px", fontSize: "0.88rem" }}>
                    {qty}
                  </span>
                  <button
                    type="button"
                    className="qty-btn"
                    onClick={() => onQuantityChange(item.id, qty + 1)}
                    aria-label={`Increase ${item.name}`}
                  >
                    <Plus size={13} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
