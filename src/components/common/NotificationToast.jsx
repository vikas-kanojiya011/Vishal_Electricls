import React from "react";
import { useNotification } from "../../context/NotificationContext";
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from "lucide-react";

export default function NotificationToast() {
  const { notifications, dismissNotification } = useNotification();

  if (!notifications || notifications.length === 0) return null;

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle2 size={20} className="toast-icon" />;
      case "warning":
        return <AlertTriangle size={20} className="toast-icon" />;
      case "danger":
        return <AlertCircle size={20} className="toast-icon" />;
      default:
        return <Info size={20} className="toast-icon" />;
    }
  };

  return (
    <div className="toast-container" aria-live="polite">
      {notifications.map((notif) => (
        <div key={notif.id} className={`toast-item ${notif.type || "info"}`}>
          {getIcon(notif.type)}
          <div className="toast-body">
            <div className="toast-title">{notif.title}</div>
            <div className="toast-message">{notif.message}</div>
          </div>
          <button
            className="toast-close"
            onClick={() => dismissNotification(notif.id)}
            aria-label="Dismiss notification"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
