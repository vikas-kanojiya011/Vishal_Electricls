import React from "react";
import { useBooking } from "../../context/BookingContext";
import {
  Calendar,
  Clock,
  UserCheck,
  CheckCircle2,
  XCircle,
  IndianRupee
} from "lucide-react";

export default function AdminStats() {
  const { kpiStats } = useBooking();

  const stats = [
    {
      id: "total",
      label: "Total Bookings",
      value: kpiStats.total,
      icon: Calendar,
      variant: "total"
    },
    {
      id: "pending",
      label: "Pending Bookings",
      value: kpiStats.pending,
      icon: Clock,
      variant: "pending"
    },
    {
      id: "assigned",
      label: "Assigned Jobs",
      value: kpiStats.assigned,
      icon: UserCheck,
      variant: "assigned"
    },
    {
      id: "completed",
      label: "Completed Jobs",
      value: kpiStats.completed,
      icon: CheckCircle2,
      variant: "completed"
    },
    {
      id: "cancelled",
      label: "Cancelled Jobs",
      value: kpiStats.cancelled,
      icon: XCircle,
      variant: "cancelled"
    },
    {
      id: "revenue",
      label: "Total Revenue",
      value: `₹${kpiStats.totalRevenue.toLocaleString("en-IN")}`,
      icon: IndianRupee,
      variant: "revenue"
    }
  ];

  return (
    <div className="kpi-grid">
      {stats.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.id} className="kpi-card">
            <div className={`kpi-icon-wrap ${item.variant}`}>
              <Icon size={24} />
            </div>
            <div className="kpi-content">
              <span className="kpi-value">{item.value}</span>
              <span className="kpi-label">{item.label}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
