import React from "react";
import {
  Zap,
  AlertTriangle,
  Fan,
  Lightbulb,
  Power,
  ShieldAlert,
  Sliders,
  BatteryCharging,
  Building2,
  Hammer,
  Wrench
} from "lucide-react";

export default function ServiceIcon({ name, size = 26, className = "" }) {
  switch (name) {
    case "Zap":
      return <Zap size={size} className={className} />;
    case "AlertTriangle":
      return <AlertTriangle size={size} className={className} />;
    case "Fan":
      return <Fan size={size} className={className} />;
    case "Lightbulb":
      return <Lightbulb size={size} className={className} />;
    case "Power":
      return <Power size={size} className={className} />;
    case "ShieldAlert":
      return <ShieldAlert size={size} className={className} />;
    case "Sliders":
      return <Sliders size={size} className={className} />;
    case "BatteryCharging":
      return <BatteryCharging size={size} className={className} />;
    case "Building2":
      return <Building2 size={size} className={className} />;
    case "Hammer":
      return <Hammer size={size} className={className} />;
    default:
      return <Wrench size={size} className={className} />;
  }
}
