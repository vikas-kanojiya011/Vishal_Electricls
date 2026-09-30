import React, { createContext, useContext, useState, useCallback } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [notificationHistory, setNotificationHistory] = useState([
    {
      id: "hist-1",
      type: "success",
      title: "Booking Confirmed",
      message: "Booking #VE20260045 created for Borivali West",
      time: "10:15 AM"
    },
    {
      id: "hist-2",
      type: "info",
      title: "Electrician Assigned",
      message: "Rajesh Kumar allocated to #VE20260045",
      time: "10:30 AM"
    },
    {
      id: "hist-3",
      type: "warning",
      title: "Status Update",
      message: "Rajesh Kumar is on the way to Shimpoli Road",
      time: "11:00 AM"
    }
  ]);

  const showNotification = useCallback(({ title, message, type = "info", duration = 4500 }) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    const newNotif = { id, title, message, type };

    setNotifications(prev => [newNotif, ...prev.slice(0, 3)]); // Keep max 4 visible

    // Append to admin history
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setNotificationHistory(prev => [
      { id: "hist-" + id, type, title, message, time: timeString },
      ...prev
    ]);

    if (duration > 0) {
      setTimeout(() => {
        setNotifications(prev => prev.filter(item => item.id !== id));
      }, duration);
    }
  }, []);

  const dismissNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(item => item.id !== id));
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        notificationHistory,
        showNotification,
        dismissNotification
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};
