import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { initialBookings } from "../data/sampleBookings";
import { electriciansData } from "../data/electriciansData";
import { initialReviewsData } from "../data/reviewsData";
import { useNotification } from "./NotificationContext";

const BookingContext = createContext();

const STORAGE_KEYS = {
  BOOKINGS: "ve_bookings_v1",
  REVIEWS: "ve_reviews_v1",
  ELECTRICIANS: "ve_electricians_v1",
  ADDRESSES: "ve_saved_addresses_v1"
};

const DEFAULT_ADDRESSES = [
  {
    id: "addr-1",
    label: "Home",
    flat: "Flat 402, Gokul Horizon",
    society: "Opp. Don Bosco High School",
    area: "Borivali East",
    city: "Mumbai",
    pincode: "400066",
    isDefault: true
  },
  {
    id: "addr-2",
    label: "Office",
    flat: "Unit 304, Techniplex Complex",
    society: "SV Road",
    area: "Goregaon West",
    city: "Mumbai",
    pincode: "400062",
    isDefault: false
  }
];

export const BookingProvider = ({ children }) => {
  const { showNotification } = useNotification();

  // Load from localStorage or defaults
  const [bookings, setBookings] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      return saved ? JSON.parse(saved) : initialBookings;
    } catch {
      return initialBookings;
    }
  });

  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      return saved ? JSON.parse(saved) : initialReviewsData;
    } catch {
      return initialReviewsData;
    }
  });

  const [electricians, setElectricians] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ELECTRICIANS);
      return saved ? JSON.parse(saved) : electriciansData;
    } catch {
      return electriciansData;
    }
  });

  const [savedAddresses, setSavedAddresses] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ADDRESSES);
      return saved ? JSON.parse(saved) : DEFAULT_ADDRESSES;
    } catch {
      return DEFAULT_ADDRESSES;
    }
  });

  const [customerProfile] = useState({
    name: "Priya Sharma",
    phone: "+91 98201 23456",
    memberSince: "Aug 2024",
    loyaltyPoints: 340,
    area: "Borivali East"
  });

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
    } catch (e) {
      console.error("Storage error:", e);
    }
  }, [bookings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
    } catch (e) {
      console.error("Storage error:", e);
    }
  }, [reviews]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ELECTRICIANS, JSON.stringify(electricians));
    } catch (e) {
      console.error("Storage error:", e);
    }
  }, [electricians]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ADDRESSES, JSON.stringify(savedAddresses));
    } catch (e) {
      console.error("Storage error:", e);
    }
  }, [savedAddresses]);

  // Generate unique Indian enterprise booking ID: VE2026 + 4-digit sequence
  const generateBookingId = () => {
    const currentYear = 2026;
    const existingNumbers = bookings
      .map(b => {
        const match = b.id && b.id.match(/^VE\d{4}(\d{4})$/);
        return match ? parseInt(match[1], 10) : 0;
      })
      .filter(num => !isNaN(num) && num > 0);

    const highest = existingNumbers.length > 0 ? Math.max(...existingNumbers) : 47;
    const nextNum = (highest + 1).toString().padStart(4, "0");
    return `VE${currentYear}${nextNum}`;
  };

  // Create a new booking
  const createBooking = (bookingInput) => {
    const newId = generateBookingId();
    const now = new Date();
    const timeFormatted = now.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }) + " " + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Handle chosen electrician if customer selected one
    const chosenTech = bookingInput.chosenElectricianId
      ? electricians.find(t => t.id === bookingInput.chosenElectricianId)
      : null;

    const initialStatus = chosenTech ? "Electrician Assigned" : "Booked";

    const newBooking = {
      id: newId,
      ...bookingInput,
      status: initialStatus,
      assignedElectricianId: chosenTech ? chosenTech.id : null,
      assignedElectricianName: chosenTech ? chosenTech.name : null,
      assignedElectricianPhone: chosenTech ? chosenTech.phone : null,
      materials: bookingInput.materials || [],
      materialTotal: Number(bookingInput.materialTotal) || 0,
      problemPhotoUrl: bookingInput.problemPhotoUrl || null,
      problemType: bookingInput.problemType || "",
      paymentMethod: bookingInput.paymentMethod || "Cash on Service",
      paymentStatus: bookingInput.paymentStatus || "Pending",
      discountAmount: Number(bookingInput.discountAmount) || 0,
      promoCode: bookingInput.promoCode || null,
      createdAt: now.toISOString(),
      statusHistory: [
        {
          status: "Booked",
          timestamp: timeFormatted,
          note: bookingInput.isEmergency 
            ? "EMERGENCY: Immediate priority dispatch requested" 
            : "Booking confirmed in system"
        },
        ...(chosenTech ? [{
          status: "Electrician Assigned",
          timestamp: timeFormatted,
          note: `Customer selected preferred technician: ${chosenTech.name} (${chosenTech.phone})`
        }] : [])
      ]
    };

    setBookings(prev => [newBooking, ...prev]);

    showNotification({
      title: "Booking Confirmed! 🎉",
      message: `Your Booking ID is ${newId}. You can track status live anytime!`,
      type: "success"
    });

    return newBooking;
  };

  // Assign an electrician to a booking
  const assignElectrician = (bookingId, electricianId) => {
    const technician = electricians.find(t => t.id === electricianId);
    if (!technician) return;

    const now = new Date();
    const timeFormatted = now.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short"
    }) + " " + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setBookings(prev =>
      prev.map(b => {
        if (b.id === bookingId) {
          const updatedHistory = [
            ...b.statusHistory,
            {
              status: "Electrician Assigned",
              timestamp: timeFormatted,
              note: `Assigned to ${technician.name} (${technician.phone})`
            }
          ];

          return {
            ...b,
            assignedElectricianId: technician.id,
            assignedElectricianName: technician.name,
            assignedElectricianPhone: technician.phone,
            status: b.status === "Booked" ? "Electrician Assigned" : b.status,
            statusHistory: updatedHistory
          };
        }
        return b;
      })
    );

    showNotification({
      title: "Electrician Assigned ⚡",
      message: `${technician.name} assigned to booking ${bookingId}`,
      type: "info"
    });
  };

  // Update Booking Status
  const updateBookingStatus = (bookingId, newStatus, customNote = "") => {
    const now = new Date();
    const timeFormatted = now.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short"
    }) + " " + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setBookings(prev =>
      prev.map(b => {
        if (b.id === bookingId) {
          let note = customNote;
          if (!note) {
            if (newStatus === "On the Way") note = "Technician en route to doorstep";
            else if (newStatus === "Work In Progress") note = "Service and testing in progress";
            else if (newStatus === "Completed") note = "Service completed & customer signed off";
            else if (newStatus === "Cancelled") note = "Booking cancelled";
            else note = `Status changed to ${newStatus}`;
          }

          const updatedHistory = [
            ...b.statusHistory,
            {
              status: newStatus,
              timestamp: timeFormatted,
              note
            }
          ];

          return {
            ...b,
            status: newStatus,
            statusHistory: updatedHistory
          };
        }
        return b;
      })
    );

    showNotification({
      title: `Booking #${bookingId} Updated`,
      message: `Status moved to "${newStatus}"`,
      type: newStatus === "Completed" ? "success" : newStatus === "Cancelled" ? "warning" : "info"
    });
  };

  // Cancel Booking
  const cancelBooking = (bookingId, reason = "Customer requested cancellation") => {
    updateBookingStatus(bookingId, "Cancelled", `Cancelled: ${reason}`);
  };

  // Update Payment Details
  const updatePayment = (bookingId, paymentData) => {
    const now = new Date();
    const timeFormatted = now.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }) + " " + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setBookings(prev =>
      prev.map(b => {
        if (b.id === bookingId) {
          const updatedHistory = [
            ...b.statusHistory,
            {
              status: b.status,
              timestamp: timeFormatted,
              note: `Online payment received (${paymentData.method || "Online Gateway"} - Ref: ${paymentData.transactionId || "Verified"})`
            }
          ];

          return {
            ...b,
            paymentMethod: paymentData.method || b.paymentMethod,
            paymentStatus: paymentData.status || "Paid Online (Verified)",
            transactionId: paymentData.transactionId || b.transactionId,
            paidAmount: paymentData.amount || b.estimatedPrice,
            paidAt: timeFormatted,
            statusHistory: updatedHistory
          };
        }
        return b;
      })
    );

    showNotification({
      title: "Payment Received! 💳",
      message: `Online payment of ₹${paymentData.amount || ""} verified successfully for #${bookingId}`,
      type: "success"
    });
  };

  // Add a Customer Review
  const addReview = (reviewInput) => {
    const newReview = {
      id: "rev-" + Date.now(),
      ...reviewInput,
      date: "Just now",
      verified: true
    };

    setReviews(prev => [newReview, ...prev]);

    showNotification({
      title: "Review Submitted! ⭐",
      message: "Thank you for sharing your feedback with Vishal Electricals!",
      type: "success"
    });

    return newReview;
  };

  // Find booking by ID (case insensitive search)
  const getBookingById = (bookingId) => {
    if (!bookingId) return null;
    const cleanId = bookingId.trim().toUpperCase();
    return bookings.find(b => b.id.toUpperCase() === cleanId) || null;
  };

  // Manage Saved Addresses
  const addSavedAddress = (newAddr) => {
    const entry = {
      id: "addr-" + Date.now(),
      ...newAddr
    };
    setSavedAddresses(prev => [...prev, entry]);
    showNotification({
      title: "Address Saved 🏠",
      message: `${entry.label} address added to your profile`,
      type: "success"
    });
  };

  const deleteSavedAddress = (id) => {
    setSavedAddresses(prev => prev.filter(a => a.id !== id));
    showNotification({
      title: "Address Removed",
      message: "Saved address has been deleted",
      type: "info"
    });
  };

  // Computed KPI stats for Admin Dashboard
  const kpiStats = useMemo(() => {
    const total = bookings.length;
    const pending = bookings.filter(b => b.status === "Booked").length;
    const assigned = bookings.filter(b => b.status === "Electrician Assigned" || b.status === "On the Way").length;
    const inProgress = bookings.filter(b => b.status === "Work In Progress").length;
    const completed = bookings.filter(b => b.status === "Completed").length;
    const cancelled = bookings.filter(b => b.status === "Cancelled").length;

    const totalRevenue = bookings
      .filter(b => b.status === "Completed")
      .reduce((sum, b) => sum + (Number(b.estimatedPrice) || 0) + (Number(b.materialTotal) || 0) - (Number(b.discountAmount) || 0), 0);

    const projectedRevenue = bookings
      .filter(b => b.status !== "Cancelled")
      .reduce((sum, b) => sum + (Number(b.estimatedPrice) || 0) + (Number(b.materialTotal) || 0) - (Number(b.discountAmount) || 0), 0);

    return {
      total,
      pending,
      assigned,
      inProgress,
      completed,
      cancelled,
      totalRevenue,
      projectedRevenue
    };
  }, [bookings]);

  return (
    <BookingContext.Provider
      value={{
        bookings,
        reviews,
        electricians,
        savedAddresses,
        customerProfile,
        createBooking,
        assignElectrician,
        updateBookingStatus,
        cancelBooking,
        updatePayment,
        addReview,
        getBookingById,
        addSavedAddress,
        deleteSavedAddress,
        kpiStats
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};
