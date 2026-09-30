import React, { useState } from "react";
import { useBooking } from "../context/BookingContext";
import { useNotification } from "../context/NotificationContext";
import AdminStats from "../components/admin/AdminStats";
import AnalyticsCharts from "../components/admin/AnalyticsCharts";
import AssignElectricianModal from "../components/admin/AssignElectricianModal";
import BookingDetailModal from "../components/admin/BookingDetailModal";
import { getGoogleMapsUrl } from "../data/serviceAreasData";
import {
  Calendar,
  BarChart3,
  Bell,
  Users,
  Search,
  Eye,
  UserCheck,
  CheckCircle2,
  Ban,
  ArrowRight,
  Filter,
  Phone,
  Clock,
  ShieldCheck,
  Navigation
} from "lucide-react";

export default function AdminDashboardPage() {
  const { bookings, electricians, updateBookingStatus, cancelBooking } = useBooking();
  const { notificationHistory } = useNotification();

  const [activeTab, setActiveTab] = useState("bookings"); // 'bookings' | 'analytics' | 'notifications' | 'electricians'
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Modals state
  const [selectedBookingForDetail, setSelectedBookingForDetail] = useState(null);
  const [selectedBookingForAssign, setSelectedBookingForAssign] = useState(null);

  // Filter bookings
  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = filterStatus === "All" || b.status === filterStatus;
    const cleanSearch = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !cleanSearch ||
      b.id.toLowerCase().includes(cleanSearch) ||
      b.customerName.toLowerCase().includes(cleanSearch) ||
      b.serviceName.toLowerCase().includes(cleanSearch) ||
      b.area.toLowerCase().includes(cleanSearch);
    return matchesStatus && matchesSearch;
  });

  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
        return "status-completed";
      case "Cancelled":
        return "status-cancelled";
      case "Work In Progress":
        return "status-progress";
      case "On the Way":
        return "status-ontheway";
      case "Electrician Assigned":
        return "status-assigned";
      default:
        return "status-booked";
    }
  };

  return (
    <div className="admin-layout">
      <div className="container">
        {/* Header Row */}
        <div className="admin-header-row">
          <div className="admin-title-group">
            <h1>Admin Control Center</h1>
            <p>Live management of electrical service bookings, technician dispatch & revenue</p>
          </div>

          <div className="admin-quick-actions">
            <span className="badge badge-green" style={{ padding: "0.5rem 0.9rem", fontSize: "0.85rem" }}>
              ● Live Dispatch Operations Active
            </span>
          </div>
        </div>

        {/* 6 Top KPI Cards */}
        <AdminStats />

        {/* Navigation Tabs */}
        <div className="admin-tabs">
          <button
            type="button"
            className={`admin-tab-btn ${activeTab === "bookings" ? "active" : ""}`}
            onClick={() => setActiveTab("bookings")}
          >
            <Calendar size={18} />
            <span>Booking Management ({bookings.length})</span>
          </button>

          <button
            type="button"
            className={`admin-tab-btn ${activeTab === "analytics" ? "active" : ""}`}
            onClick={() => setActiveTab("analytics")}
          >
            <BarChart3 size={18} />
            <span>Analytics & Reports</span>
          </button>

          <button
            type="button"
            className={`admin-tab-btn ${activeTab === "electricians" ? "active" : ""}`}
            onClick={() => setActiveTab("electricians")}
          >
            <Users size={18} />
            <span>Electrician Roster ({electricians.length})</span>
          </button>

          <button
            type="button"
            className={`admin-tab-btn ${activeTab === "notifications" ? "active" : ""}`}
            onClick={() => setActiveTab("notifications")}
          >
            <Bell size={18} />
            <span>Notifications Log ({notificationHistory.length})</span>
          </button>
        </div>

        {/* TAB 1: BOOKING MANAGEMENT */}
        {activeTab === "bookings" && (
          <div className="admin-table-card">
            {/* Table Toolbar with Filters and Search */}
            <div className="table-toolbar">
              <div className="table-filter-pills">
                {["All", "Booked", "Electrician Assigned", "On the Way", "Work In Progress", "Completed", "Cancelled"].map(
                  (st) => (
                    <button
                      key={st}
                      type="button"
                      className={`filter-pill ${filterStatus === st ? "active" : ""}`}
                      onClick={() => setFilterStatus(st)}
                    >
                      {st}
                    </button>
                  )
                )}
              </div>

              <div style={{ position: "relative", minWidth: "240px" }}>
                <Search
                  size={16}
                  style={{
                    position: "absolute",
                    left: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#94A3B8"
                  }}
                />
                <input
                  type="text"
                  className="form-control"
                  style={{ paddingLeft: "36px", paddingBottom: "0.4rem", paddingTop: "0.4rem", fontSize: "0.85rem" }}
                  placeholder="Search by ID, name, area..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Bookings Data Table */}
            <div className="table-responsive">
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>Customer & Contact</th>
                    <th>Service & Area</th>
                    <th>Date & Slot</th>
                    <th>Status</th>
                    <th>Assigned Electrician</th>
                    <th>Estimated</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.length === 0 ? (
                    <tr>
                      <td colSpan={8} style={{ textAlign: "center", padding: "2.5rem", color: "#64748B" }}>
                        No bookings match your current filter.
                      </td>
                    </tr>
                  ) : (
                    filteredBookings.map((b) => (
                      <tr key={b.id}>
                        <td>
                          <span style={{ fontFamily: "monospace", fontWeight: 800, color: "#0B192C" }}>
                            {b.id}
                          </span>
                          {b.isEmergency && (
                            <span className="badge badge-red" style={{ display: "block", marginTop: "2px", width: "fit-content" }}>
                              EMERGENCY
                            </span>
                          )}
                        </td>

                        <td>
                          <div style={{ fontWeight: 700, color: "#0B192C" }}>{b.customerName}</div>
                          <div style={{ fontSize: "0.8rem", color: "#64748B" }}>{b.phone}</div>
                        </td>

                        <td>
                          <div style={{ fontWeight: 600 }}>{b.serviceName}</div>
                          <div style={{ fontSize: "0.8rem", color: "#64748B", display: "flex", alignItems: "center", gap: "0.35rem" }}>
                            <span>{b.area} {b.pincode ? `(${b.pincode})` : ""}</span>
                            <a
                              href={getGoogleMapsUrl(b.address, "", b.area, b.pincode)}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Locate customer on Google Maps"
                              style={{ color: "#00B4D8", display: "inline-flex", alignItems: "center" }}
                            >
                              <Navigation size={12} />
                            </a>
                          </div>
                        </td>

                        <td>
                          <div style={{ fontSize: "0.85rem" }}>{b.bookingDate}</div>
                          <div style={{ fontSize: "0.75rem", color: "#64748B" }}>{b.timeSlot.split("(")[0]}</div>
                        </td>

                        <td>
                          <span className={`status-pill ${getStatusClass(b.status)}`}>
                            ● {b.status}
                          </span>
                        </td>

                        <td>
                          {b.assignedElectricianName ? (
                            <div>
                              <div style={{ fontWeight: 700, fontSize: "0.85rem" }}>{b.assignedElectricianName}</div>
                              <div style={{ fontSize: "0.75rem", color: "#64748B" }}>{b.assignedElectricianPhone}</div>
                            </div>
                          ) : (
                            <button
                              type="button"
                              className="btn btn-outline btn-sm"
                              style={{ fontSize: "0.75rem", padding: "0.25rem 0.5rem" }}
                              onClick={() => setSelectedBookingForAssign(b)}
                            >
                              + Assign Tech
                            </button>
                          )}
                        </td>

                        <td>
                          <strong style={{ color: "#F59E0B" }}>₹{b.estimatedPrice}</strong>
                        </td>

                        <td>
                          <div className="table-actions">
                            <button
                              type="button"
                              className="table-action-btn"
                              title="View & Manage Details"
                              onClick={() => setSelectedBookingForDetail(b)}
                            >
                              <Eye size={14} />
                              <span>View</span>
                            </button>

                            <button
                              type="button"
                              className="table-action-btn"
                              title="Assign Electrician"
                              onClick={() => setSelectedBookingForAssign(b)}
                            >
                              <UserCheck size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: ANALYTICS & CHARTS */}
        {activeTab === "analytics" && <AnalyticsCharts />}

        {/* TAB 3: ELECTRICIANS ROSTER */}
        {activeTab === "electricians" && (
          <div className="admin-table-card" style={{ padding: "2rem" }}>
            <h3 style={{ fontSize: "1.3rem", color: "#0B192C", marginBottom: "1.25rem" }}>
              Active Wiremen & Technicians on Duty
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
              {electricians.map((tech) => (
                <div
                  key={tech.id}
                  style={{
                    background: "#F8FAFC",
                    border: "1px solid #E2E8F0",
                    borderRadius: "12px",
                    padding: "1.5rem",
                    display: "flex",
                    gap: "1rem"
                  }}
                >
                  <img
                    src={tech.photo}
                    alt={tech.name}
                    style={{ width: "60px", height: "60px", borderRadius: "50%", objectFit: "cover" }}
                  />
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                      <h4 style={{ fontSize: "1.05rem", color: "#0B192C" }}>{tech.name}</h4>
                      <ShieldCheck size={16} color="#10B981" />
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "#00B4D8", fontWeight: 600 }}>
                      {tech.role}
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "#64748B", margin: "0.3rem 0" }}>
                      ⭐ {tech.rating} • {tech.experience} • {tech.completedJobs}+ jobs
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "#334155" }}>
                      <strong>Phone:</strong> {tech.phone}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "#64748B", marginTop: "0.3rem" }}>
                      Zones: {tech.zones.join(", ")}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: SYSTEM NOTIFICATIONS LOG */}
        {activeTab === "notifications" && (
          <div className="activity-feed-card">
            <h3 style={{ fontSize: "1.25rem", color: "#0B192C", marginBottom: "1.25rem" }}>
              System Activity & Dispatch Notifications
            </h3>
            <ul className="activity-list">
              {notificationHistory.map((notif) => (
                <li key={notif.id} className="activity-item">
                  <div
                    className="activity-icon-bubble"
                    style={{
                      background:
                        notif.type === "success"
                          ? "#ECFDF5"
                          : notif.type === "warning"
                            ? "#FFFBEB"
                            : notif.type === "danger"
                              ? "#FEF2F2"
                              : "#EFF6FF",
                      color:
                        notif.type === "success"
                          ? "#10B981"
                          : notif.type === "warning"
                            ? "#F59E0B"
                            : notif.type === "danger"
                              ? "#EF4444"
                              : "#00B4D8"
                    }}
                  >
                    <Bell size={18} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <strong style={{ fontSize: "0.95rem", color: "#0B192C" }}>{notif.title}</strong>
                      <span style={{ fontSize: "0.8rem", color: "#94A3B8" }}>{notif.time}</span>
                    </div>
                    <p style={{ fontSize: "0.85rem", color: "#64748B", marginTop: "0.2rem" }}>
                      {notif.message}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Modals */}
      <BookingDetailModal
        booking={selectedBookingForDetail}
        isOpen={Boolean(selectedBookingForDetail)}
        onClose={() => setSelectedBookingForDetail(null)}
        onOpenAssign={(b) => setSelectedBookingForAssign(b)}
      />

      <AssignElectricianModal
        booking={selectedBookingForAssign}
        isOpen={Boolean(selectedBookingForAssign)}
        onClose={() => setSelectedBookingForAssign(null)}
      />
    </div>
  );
}
