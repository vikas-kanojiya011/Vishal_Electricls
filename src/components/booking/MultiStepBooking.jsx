import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useBooking } from "../../context/BookingContext";
import { servicesData } from "../../data/servicesData";
import { materialsCatalog } from "../../data/materialsData";
import {
  searchCityAndArea,
  getAllCities,
  getAreasForCity,
  autoGeneratePincode,
  getLocationByPincode,
  matchCoordinatesToMumbaiArea
} from "../../data/serviceAreasData";
import ServiceIcon from "../common/ServiceIcon";
import ProblemPhotoUpload from "./ProblemPhotoUpload";
import MaterialAddonsPicker from "./MaterialAddonsPicker";
import ElectricianPicker from "./ElectricianPicker";
import PaymentSelectionUI from "./PaymentSelectionUI";
import DigitalInvoiceModal from "../common/DigitalInvoiceModal";
import {
  Calendar,
  Clock,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Zap,
  FileText,
  Sparkles,
  Search,
  Crosshair,
  Check,
  Tag
} from "lucide-react";

const TIME_SLOTS = [
  { id: "morning", label: "Early Morning", time: "07:00 AM - 10:00 AM", isEmergency: false },
  { id: "midday", label: "Midday", time: "10:00 AM - 01:00 PM", isEmergency: false },
  { id: "afternoon", label: "Afternoon", time: "01:00 PM - 04:00 PM", isEmergency: false },
  { id: "evening", label: "Evening", time: "04:00 PM - 07:00 PM", isEmergency: false },
  { id: "emergency", label: "⚡ Priority Same-Day (7 AM – 7 PM)", time: "Fastest doorstep dispatch during working hours", isEmergency: true }
];

export default function MultiStepBooking() {
  const [searchParams] = useSearchParams();
  const { createBooking, electricians, customerProfile } = useBooking();

  // Current Step: 1 to 6
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const initialServiceId = searchParams.get("service") || "mcb-installation-replacement";
  const isEmergencyParam = searchParams.get("emergency") === "true";
  const cityParam = searchParams.get("city") || "Mumbai";
  const areaParam = searchParams.get("area") || "Borivali West";
  const pinParam = searchParams.get("pincode") || "";
  const promoParam = searchParams.get("promo") || "";

  const [selectedServiceId, setSelectedServiceId] = useState(initialServiceId);
  const [quantity, setQuantity] = useState(parseInt(searchParams.get("qty") || "1", 10));

  // Photo upload state
  const [problemPhotoUrl, setProblemPhotoUrl] = useState(null);
  const [problemType, setProblemType] = useState("");

  // Material Add-ons state
  const [selectedMaterials, setSelectedMaterials] = useState({});

  // Date default tomorrow or today if emergency
  const todayStr = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [selectedSlot, setSelectedSlot] = useState(isEmergencyParam ? "emergency" : "morning");

  // Customer info
  const [customerName, setCustomerName] = useState(customerProfile?.name || "");
  const [phone, setPhone] = useState(customerProfile?.phone?.replace(/\D/g, "") || "");

  // Address info with automatic city, area & pincode generation
  const [flatNumber, setFlatNumber] = useState("");
  const [society, setSociety] = useState("");
  const [selectedCity, setSelectedCity] = useState(cityParam);
  const [selectedArea, setSelectedArea] = useState(areaParam);
  const [areaSearchText, setAreaSearchText] = useState(areaParam);
  const [showAreaSuggestions, setShowAreaSuggestions] = useState(false);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsStatus, setGpsStatus] = useState(null);
  const [landmark, setLandmark] = useState("");
  const [pincode, setPincode] = useState(() => pinParam || autoGeneratePincode(cityParam, areaParam) || "400092");

  // Electrician & Payment
  const [chosenElectricianId, setChosenElectricianId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("UPI Instant Payment (QR / Apps)");
  const [onlinePaymentData, setOnlinePaymentData] = useState(null);

  // Promo Code
  const [promoCodeInput, setPromoCodeInput] = useState(promoParam);
  const [appliedPromo, setAppliedPromo] = useState(promoParam ? "FIRST100" : null);

  // Completed booking state & modal
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [errors, setErrors] = useState({});

  // Auto-switch to emergency slot if emergency param present
  useEffect(() => {
    if (isEmergencyParam) {
      setSelectedSlot("emergency");
      setSelectedDate(todayStr);
    }
  }, [isEmergencyParam, todayStr]);

  // Sync city, area and automatic pincode from URL if provided
  useEffect(() => {
    const cityQuery = searchParams.get("city");
    const areaQuery = searchParams.get("area");
    const pinQuery = searchParams.get("pincode");

    if (cityQuery) {
      setSelectedCity(cityQuery);
    }
    if (areaQuery) {
      setSelectedArea(areaQuery);
      setAreaSearchText(areaQuery);
    }
    if (pinQuery) {
      setPincode(pinQuery);
    } else if (areaQuery || cityQuery) {
      const generated = autoGeneratePincode(cityQuery || "Mumbai", areaQuery || "Borivali West");
      if (generated) setPincode(generated);
    }
  }, [searchParams]);

  const currentService = servicesData.find((s) => s.id === selectedServiceId) || servicesData[0];
  const serviceTotal = (currentService.startingPrice || 300) * quantity;

  // Materials computation
  const handleMaterialQtyChange = (id, qty) => {
    setSelectedMaterials(prev => ({ ...prev, [id]: qty }));
  };

  const materialsList = useMemo(() => {
    return materialsCatalog
      .filter(m => (selectedMaterials[m.id] || 0) > 0)
      .map(m => ({
        id: m.id,
        name: m.name,
        qty: selectedMaterials[m.id],
        unitPrice: m.unitPrice,
        subtotal: m.unitPrice * selectedMaterials[m.id]
      }));
  }, [selectedMaterials]);

  const materialsTotal = useMemo(() => {
    return materialsList.reduce((sum, m) => sum + m.subtotal, 0);
  }, [materialsList]);

  // Discount computation
  const discountAmount = appliedPromo === "FIRST100" ? 100 : appliedPromo === "FESTIVE299" ? 150 : 0;
  const estimatedTotal = Math.max(150, serviceTotal + materialsTotal - discountAmount);
  const activeSlotObj = TIME_SLOTS.find((s) => s.id === selectedSlot) || TIME_SLOTS[0];

  // Dynamic Real-time City & Area Search with Auto-generated Pincode
  const allCitiesList = useMemo(() => getAllCities(), []);
  const currentCityAreas = useMemo(() => getAreasForCity(selectedCity), [selectedCity]);

  const areaSuggestions = useMemo(() => {
    return searchCityAndArea(areaSearchText, selectedCity);
  }, [areaSearchText, selectedCity]);

  // When city changes: automatically pick primary area and generate pincode
  const handleCityChange = (newCity) => {
    setSelectedCity(newCity);
    const areas = getAreasForCity(newCity);
    if (areas && areas.length > 0) {
      const matched = areas.find(a => a.name.toLowerCase() === selectedArea.toLowerCase());
      const chosenArea = matched || areas[0];
      setSelectedArea(chosenArea.name);
      setAreaSearchText(chosenArea.name);
      setPincode(chosenArea.pincode);
      setGpsStatus({
        type: "success",
        text: `⚡ Auto-Generated: ${chosenArea.name}, ${newCity} — Pincode: ${chosenArea.pincode}`
      });
      setTimeout(() => setGpsStatus(null), 4000);
    } else {
      const pin = autoGeneratePincode(newCity, "");
      if (pin) setPincode(pin);
    }
    setErrors((prev) => ({ ...prev, city: undefined, area: undefined, pincode: undefined }));
  };

  // Direct selection of an area from the city's area dropdown
  const handleAreaDropdownSelect = (areaName) => {
    if (!areaName) return;
    const matched = currentCityAreas.find(a => a.name === areaName);
    if (matched) {
      setSelectedArea(matched.name);
      setAreaSearchText(matched.name);
      setPincode(matched.pincode);
      setGpsStatus({
        type: "success",
        text: `⚡ Auto-Generated Pincode: ${matched.pincode} (${matched.name})`
      });
      setTimeout(() => setGpsStatus(null), 3500);
    } else {
      setSelectedArea(areaName);
      setAreaSearchText(areaName);
      const pin = autoGeneratePincode(selectedCity, areaName);
      if (pin) setPincode(pin);
    }
    setErrors((prev) => ({ ...prev, area: undefined, pincode: undefined }));
  };

  // 1-Click quick select for popular city & area hubs
  const handleQuickCityAreaPill = (cityName, areaName, pin) => {
    setSelectedCity(cityName);
    setSelectedArea(areaName);
    setAreaSearchText(areaName);
    setPincode(pin);
    setGpsStatus({
      type: "success",
      text: `⚡ Auto-Selected: ${areaName}, ${cityName} (${pin})`
    });
    setTimeout(() => setGpsStatus(null), 3500);
    setErrors((prev) => ({ ...prev, city: undefined, area: undefined, pincode: undefined }));
  };

  // 1-Click Auto-Fill Demo Profile & Address
  const handleQuickAutoFillAll = () => {
    setCustomerName("Priya Sharma");
    setPhone("9820123456");
    setFlatNumber("Flat 402, Gokul Horizon");
    setSociety("Opp. Don Bosco High School");
    setSelectedCity("Mumbai");
    setSelectedArea("Borivali West");
    setAreaSearchText("Borivali West");
    setPincode("400092");
    setLandmark("Near Shimpoli Signal");
    setGpsStatus({
      type: "success",
      text: "⚡ Auto-Filled Customer Name, Phone, Address, City & Pincode (400092)!"
    });
    setTimeout(() => setGpsStatus(null), 4000);
    setErrors({});
  };

  const handleAreaSearchChange = (inputVal) => {
    setAreaSearchText(inputVal);
    setSelectedArea(inputVal);
    setShowAreaSuggestions(true);
    // Automatically generate 6-digit pincode in real-time as user types
    const autoPin = autoGeneratePincode(selectedCity, inputVal);
    if (autoPin) {
      setPincode(autoPin);
    }
    setErrors((prev) => ({ ...prev, area: undefined, pincode: undefined }));
  };

  const handleSelectSuggestion = (item) => {
    setSelectedArea(item.name);
    setSelectedCity(item.cityName);
    setAreaSearchText(item.name);
    setPincode(item.pincode);
    setShowAreaSuggestions(false);
    setGpsStatus({ type: "success", text: `✓ Auto-Pincode Verified: ${item.name}, ${item.cityName} (${item.pincode})` });
    setTimeout(() => setGpsStatus(null), 3500);
    setErrors((prev) => ({ ...prev, area: undefined, pincode: undefined, city: undefined }));
  };

  // Reverse lookup: if customer changes pincode directly, automatically sync area and city
  const handlePincodeChange = (inputPin) => {
    const cleaned = inputPin.replace(/\D/g, "").slice(0, 6);
    setPincode(cleaned);
    if (cleaned.length === 6) {
      const loc = getLocationByPincode(cleaned);
      if (loc) {
        setSelectedCity(loc.cityName);
        setSelectedArea(loc.name);
        setAreaSearchText(loc.name);
        setGpsStatus({ type: "success", text: `⚡ Pincode Matched: ${loc.name}, ${loc.cityName}` });
        setTimeout(() => setGpsStatus(null), 3500);
      }
    }
    setErrors((prev) => ({ ...prev, pincode: undefined }));
  };

  // Locate Customer via GPS
  const handleLocateCustomer = () => {
    if (!navigator.geolocation) {
      setGpsStatus({ type: "error", text: "Geolocation is not supported by your device." });
      return;
    }
    setGpsLoading(true);
    setGpsStatus({ type: "info", text: "Locating customer via GPS radar..." });

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const matched = matchCoordinatesToMumbaiArea(latitude, longitude);
        if (matched) {
          setSelectedCity("Mumbai");
          setSelectedArea(matched.name);
          setAreaSearchText(matched.name);
          setPincode(matched.pincode);
          setGpsLoading(false);
          setGpsStatus({
            type: "success",
            text: `🎯 Customer Located: ${matched.name}, Mumbai (Pincode: ${matched.pincode})`
          });
          setTimeout(() => setGpsStatus(null), 5000);
          setErrors((prev) => ({ ...prev, area: undefined, pincode: undefined, city: undefined }));
        }
      },
      () => {
        setGpsLoading(false);
        setSelectedCity("Mumbai");
        setSelectedArea("Borivali East");
        setAreaSearchText("Borivali East");
        setPincode("400066");
        setGpsStatus({
          type: "info",
          text: "GPS permission needed. Defaulted to Western Mumbai Hub (Borivali 400066)."
        });
        setTimeout(() => setGpsStatus(null), 4000);
      },
      { timeout: 9000, enableHighAccuracy: true }
    );
  };

  // Validation per step
  const validateStep = (step) => {
    const errs = {};
    if (step === 1) {
      if (!selectedServiceId) errs.service = "Please select a service";
      if (quantity < 1) errs.quantity = "Quantity must be at least 1";
    } else if (step === 2) {
      if (!selectedDate) errs.date = "Please select a service date";
      if (!selectedSlot) errs.slot = "Please select a preferred time slot";
    } else if (step === 4) {
      if (!customerName.trim()) errs.name = "Full name is required";
      if (!phone.trim() || phone.replace(/\D/g, "").length < 10) errs.phone = "Valid 10-digit mobile number required";
      if (!flatNumber.trim()) errs.flat = "Flat / House number is required";
      if (!society.trim()) errs.society = "Building / Society name is required";
      if (!selectedCity) errs.city = "Please select city";
      if (!selectedArea) errs.area = "Please specify area / locality";
      if (!pincode.trim() || pincode.trim().length !== 6) errs.pincode = "Valid 6-digit pincode is required (auto-generated)";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 6));
      window.scrollTo({ top: 120, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  const handleApplyPromo = () => {
    const code = promoCodeInput.trim().toUpperCase();
    if (code === "FIRST100" || code === "FESTIVE299") {
      setAppliedPromo(code);
      setErrors((prev) => ({ ...prev, promo: undefined }));
    } else {
      setErrors((prev) => ({ ...prev, promo: "Invalid coupon. Try FIRST100 for ₹100 off!" }));
    }
  };

  const handleFinalBooking = (e) => {
    e.preventDefault();
    if (!validateStep(4)) {
      setCurrentStep(4);
      return;
    }

    const isEmergency = selectedSlot === "emergency";

    const bookingPayload = {
      customerName: customerName.trim(),
      phone: phone.trim().startsWith("+91") ? phone.trim() : `+91 ${phone.trim()}`,
      email: "",
      serviceId: currentService.id,
      serviceName: currentService.name,
      quantity,
      estimatedPrice: serviceTotal,
      materialTotal: materialsTotal,
      materials: materialsList,
      problemPhotoUrl,
      problemType,
      chosenElectricianId,
      paymentMethod: onlinePaymentData ? `Online (${onlinePaymentData.method})` : paymentMethod,
      paymentStatus: onlinePaymentData ? "Paid Online (Verified)" : "Pending",
      transactionId: onlinePaymentData?.transactionId || null,
      paidAt: onlinePaymentData?.paidAt || null,
      discountAmount,
      promoCode: appliedPromo,
      bookingDate: selectedDate,
      timeSlot: `${activeSlotObj.label} (${activeSlotObj.time})`,
      address: `${flatNumber}, ${society}`,
      city: selectedCity,
      area: selectedArea,
      pincode,
      landmark,
      problemNotes: problemNotes.trim() || (problemType ? `Reported issue: ${problemType}` : "Standard inspection requested."),
      isEmergency
    };

    const newBooking = createBooking(bookingPayload);
    setConfirmedBooking(newBooking);
  };

  // SUCCESS CONFIRMATION SCREEN
  if (confirmedBooking) {
    const chosenTech = confirmedBooking.assignedElectricianId
      ? electricians.find(t => t.id === confirmedBooking.assignedElectricianId)
      : null;

    return (
      <div className="container" style={{ maxWidth: "760px", padding: "3rem 1.5rem" }}>
        <div className="card" style={{ padding: "3rem 2rem", textAlign: "center" }}>
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              background: "rgba(16, 185, 129, 0.15)",
              color: "#10B981",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.5rem"
            }}
          >
            <CheckCircle2 size={42} />
          </div>

          <h2 style={{ fontSize: "2rem", color: "var(--text-dark)", marginBottom: "0.5rem" }}>
            Booking Confirmed & Live!
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", marginBottom: "1.75rem" }}>
            Our operations team has registered your request. An SMS & WhatsApp update has been sent to <strong>{confirmedBooking.phone}</strong>.
          </p>

          <div
            style={{
              background: "var(--bg-alt)",
              borderRadius: "16px",
              padding: "1.5rem",
              marginBottom: "2rem",
              display: "inline-block",
              border: "1.5px dashed #F59E0B"
            }}
          >
            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
              Your Enterprise Booking ID
            </span>
            <div
              style={{
                fontSize: "2.2rem",
                fontFamily: "monospace",
                fontWeight: 800,
                color: "#F59E0B",
                letterSpacing: "0.05em",
                margin: "0.3rem 0"
              }}
            >
              {confirmedBooking.id}
            </div>
            <span style={{ fontSize: "0.8rem", color: "#10B981", fontWeight: 600 }}>
              ✓ Instant technician allocation in progress
            </span>
          </div>

          {/* Technician allocation preview */}
          {chosenTech && (
            <div
              style={{
                background: "var(--bg-alt)",
                borderRadius: "12px",
                padding: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "1.5rem",
                textAlign: "left"
              }}
            >
              <img
                src={chosenTech.photo}
                alt={chosenTech.name}
                style={{ width: "50px", height: "50px", borderRadius: "10px", objectFit: "cover" }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--text-dark)" }}>
                  Assigned Electrician: {chosenTech.name}
                </div>
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                  {chosenTech.experience} · ⚡ {chosenTech.phone}
                </span>
              </div>
              <span className="badge badge-gold">Selected Specialist</span>
            </div>
          )}

          <div className="summary-review-card" style={{ textAlign: "left", marginBottom: "2rem" }}>
            <table className="summary-data-table">
              <tbody>
                <tr>
                  <td>Service Booked</td>
                  <td>{confirmedBooking.serviceName} (Qty: {confirmedBooking.quantity})</td>
                </tr>
                {confirmedBooking.materials && confirmedBooking.materials.length > 0 && (
                  <tr>
                    <td>Materials Included</td>
                    <td>{confirmedBooking.materials.map(m => `${m.name} × ${m.qty}`).join(", ")}</td>
                  </tr>
                )}
                <tr>
                  <td>Scheduled For</td>
                  <td>{confirmedBooking.bookingDate} • {confirmedBooking.timeSlot}</td>
                </tr>
                <tr>
                  <td>Service Address</td>
                  <td>{confirmedBooking.address}, {confirmedBooking.area}, {confirmedBooking.city || "Mumbai"} - {confirmedBooking.pincode}</td>
                </tr>
                <tr>
                  <td>Payment Mode & Status</td>
                  <td>
                    {confirmedBooking.paymentStatus === "Paid Online (Verified)" ? (
                      <div>
                        <span style={{ color: "#10B981", fontWeight: 800, display: "inline-flex", alignItems: "center", gap: "4px" }}>
                          <CheckCircle2 size={15} /> Paid Online ({confirmedBooking.paymentMethod})
                        </span>
                        <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontFamily: "monospace", marginTop: "2px" }}>
                          TXN ID: {confirmedBooking.transactionId || "VE-ONLINE"}
                        </div>
                      </div>
                    ) : (
                      <span><strong>{confirmedBooking.paymentMethod}</strong> (Pay After Service)</span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Estimated Bill</td>
                  <td style={{ color: "#F59E0B", fontWeight: 800, fontSize: "1.1rem" }}>
                    ₹{((Number(confirmedBooking.estimatedPrice) || 0) + (Number(confirmedBooking.materialTotal) || 0) - (Number(confirmedBooking.discountAmount) || 0)).toLocaleString("en-IN")}{" "}
                    <small style={{ fontWeight: 400, color: "var(--text-muted)" }}>(Final after inspection)</small>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
            <Link
              to={`/track?id=${confirmedBooking.id}`}
              className="btn btn-primary btn-lg"
              id="track-booking-direct-btn"
            >
              <span>Track Live Booking Status</span>
              <ArrowRight size={18} />
            </Link>

            <button
              type="button"
              onClick={() => setShowInvoiceModal(true)}
              className="btn btn-gold btn-lg"
            >
              <FileText size={18} />
              <span>View Digital Invoice</span>
            </button>

            <Link to="/dashboard" className="btn btn-outline btn-lg">
              <span>Go to My Dashboard</span>
            </Link>
          </div>
        </div>

        {/* Digital Invoice Modal */}
        <DigitalInvoiceModal
          booking={confirmedBooking}
          isOpen={showInvoiceModal}
          onClose={() => setShowInvoiceModal(false)}
        />
      </div>
    );
  }

  // MULTI-STEP WIZARD TITLES
  const stepTitles = [
    "Service & Photo",
    "Date & Time",
    "Spares Add-ons",
    "Mumbai Address",
    "Tech & Payment",
    "Confirm Order"
  ];

  return (
    <div className="container" style={{ maxWidth: "940px", padding: "3rem 1.5rem 5rem" }}>
      <div className="section-header" style={{ marginBottom: "2.5rem" }}>
        <div className="section-badge gold">
          <Zap size={14} />
          <span>Doorstep Electrical Booking</span>
        </div>
        <h1 style={{ fontSize: "2.3rem", marginBottom: "0.5rem" }}>Book a Certified Electrician</h1>
        <p>Expert PWD-licensed technicians at your doorstep. Transparent rates, genuine ISI spares, and 30-day warranty.</p>
      </div>

      <div className="booking-wizard-card">
        {/* Stepper Header */}
        <div className="wizard-stepper-header">
          {stepTitles.map((title, idx) => {
            const stepNum = idx + 1;
            const isActive = currentStep === stepNum;
            const isCompleted = currentStep > stepNum;

            return (
              <div
                key={idx}
                className={`stepper-step ${isActive ? "active" : ""} ${isCompleted ? "completed" : ""}`}
              >
                <div className="step-bubble">
                  {isCompleted ? <CheckCircle2 size={18} /> : stepNum}
                </div>
                <span>{title}</span>
              </div>
            );
          })}
        </div>

        {/* Wizard Body */}
        <div className="wizard-body">
          {/* STEP 1: Select Service + Photo Upload */}
          {currentStep === 1 && (
            <div>
              <h3 style={{ fontSize: "1.4rem", marginBottom: "0.4rem" }}>Step 1: Choose Service & Upload Photo</h3>
              <p style={{ fontSize: "0.95rem", marginBottom: "1.5rem" }}>
                Select required service, points needed, and optionally attach a photo of the damaged switch or tripping MCB.
              </p>

              <div className="wizard-services-grid">
                {servicesData.map((svc) => (
                  <div
                    key={svc.id}
                    className={`select-service-item ${selectedServiceId === svc.id ? "selected" : ""}`}
                    onClick={() => setSelectedServiceId(svc.id)}
                  >
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "10px",
                        background: selectedServiceId === svc.id ? "var(--color-primary-navy)" : "var(--bg-alt)",
                        color: selectedServiceId === svc.id ? "#F59E0B" : "#2563EB",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0
                      }}
                    >
                      <ServiceIcon name={svc.icon} size={22} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--text-dark)" }}>
                        {svc.name}
                      </div>
                      <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                        Starting from ₹{svc.startingPrice}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quantity Counter */}
              <div
                style={{
                  marginTop: "1.5rem",
                  padding: "1.25rem",
                  background: "var(--bg-alt)",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "1rem"
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: "1rem", color: "var(--text-dark)" }}>
                    Number of Service Points / Units:
                  </div>
                  <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                    Base rate: ₹{currentService.startingPrice} × {quantity} = <strong>₹{serviceTotal}</strong>
                  </span>
                </div>

                <div className="qty-counter">
                  <button
                    type="button"
                    className="qty-btn"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="qty-display">{quantity}</span>
                  <button
                    type="button"
                    className="qty-btn"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* 📸 Upload Problem Photo Section */}
              <ProblemPhotoUpload
                photoUrl={problemPhotoUrl}
                onPhotoChange={setProblemPhotoUrl}
                problemType={problemType}
                onProblemTypeChange={setProblemType}
              />
            </div>
          )}

          {/* STEP 2: Schedule Date & Time Slot */}
          {currentStep === 2 && (
            <div>
              <h3 style={{ fontSize: "1.4rem", marginBottom: "0.4rem" }}>Step 2: Choose Arrival Date & Time</h3>
              <p style={{ fontSize: "0.95rem", marginBottom: "1.5rem" }}>
                Select when you want the electrician to arrive at your address.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                <div className="form-group">
                  <label className="form-label">
                    <Calendar size={16} />
                    <span>Select Service Date *</span>
                  </label>
                  <input
                    type="date"
                    required
                    min={todayStr}
                    className="form-control"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                  {errors.date && <span style={{ color: "#EF4444", fontSize: "0.8rem" }}>{errors.date}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <Clock size={16} />
                    <span>Select Arrival Slot *</span>
                  </label>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                    {TIME_SLOTS.map((slot) => (
                      <div
                        key={slot.id}
                        onClick={() => setSelectedSlot(slot.id)}
                        style={{
                          border: selectedSlot === slot.id ? "2px solid #F59E0B" : "1px solid var(--border-light)",
                          background: selectedSlot === slot.id ? "rgba(245, 158, 11, 0.08)" : "var(--bg-card)",
                          padding: "0.75rem 1rem",
                          borderRadius: "10px",
                          cursor: "pointer",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center"
                        }}
                      >
                        <div>
                          <strong style={{ fontSize: "0.9rem", color: slot.isEmergency ? "#EF4444" : "var(--text-dark)" }}>
                            {slot.label}
                          </strong>
                          <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", display: "block" }}>
                            {slot.time}
                          </span>
                        </div>
                        {selectedSlot === slot.id && <Check size={16} color="#F59E0B" />}
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "#64748B", marginTop: "0.5rem", display: "flex", alignItems: "center", gap: "0.35rem" }}>
                    <Clock size={14} color="#F59E0B" />
                    <span>Working Hours: <strong>7:00 AM – 7:00 PM Daily</strong> (Mon – Sun)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Electrical Material Add-ons */}
          {currentStep === 3 && (
            <div>
              <h3 style={{ fontSize: "1.4rem", marginBottom: "0.4rem" }}>Step 3: Genuine Electrical Materials (Optional)</h3>
              <p style={{ fontSize: "0.95rem", marginBottom: "1rem" }}>
                Need new switches, MCB breakers, or LED bulbs? Add them here—our wireman delivers authentic ISI products with warranty.
              </p>

              <MaterialAddonsPicker
                selectedMaterials={selectedMaterials}
                onQuantityChange={handleMaterialQtyChange}
              />
            </div>
          )}

          {/* STEP 4: Customer Details & Mumbai Address */}
          {currentStep === 4 && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.75rem", marginBottom: "1rem" }}>
                <div>
                  <h3 style={{ fontSize: "1.4rem", marginBottom: "0.2rem" }}>Step 4: Customer Details & Doorstep Address</h3>
                  <p style={{ fontSize: "0.95rem", margin: 0, color: "var(--text-muted)" }}>
                    Enter your contact info and service address. City, locality and 6-digit pincode generate automatically.
                  </p>
                </div>

                {/* 1-Click Quick Auto-Fill Action Buttons */}
                <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
                  <button
                    type="button"
                    onClick={handleQuickAutoFillAll}
                    className="btn btn-sm btn-gold"
                    title="Fill sample customer profile and address instantly"
                  >
                    <Sparkles size={14} />
                    <span>⚡ 1-Click Auto-Fill Demo</span>
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline"
                    onClick={handleLocateCustomer}
                    disabled={gpsLoading}
                    title="Auto-detect via GPS"
                  >
                    <Crosshair size={13} className={gpsLoading ? "spin-icon" : ""} />
                    <span>{gpsLoading ? "Locating..." : "📍 Quick GPS"}</span>
                  </button>
                </div>
              </div>

              {/* 🚆 Mumbai Western Corridor (Virar to Churchgate) Quick Station Pills */}
              <div
                style={{
                  background: "linear-gradient(135deg, rgba(37,99,235,0.06) 0%, rgba(14,165,233,0.06) 100%)",
                  padding: "0.75rem 1rem",
                  borderRadius: "12px",
                  border: "1.5px solid rgba(37,99,235,0.2)",
                  marginBottom: "0.85rem"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                  <span style={{ fontSize: "0.76rem", fontWeight: 800, color: "#1E3A8A", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "4px" }}>
                    <span>🚆</span>
                    <span>Mumbai Western Corridor (Virar to Churchgate Coverage):</span>
                  </span>
                  <span style={{ fontSize: "0.7rem", color: "#2563EB", fontWeight: 700 }}>
                    1-Click Auto-Sets Pincode
                  </span>
                </div>
                <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                  {[
                    { city: "Mumbai", area: "Virar West", pin: "401303", label: "Virar" },
                    { city: "Mumbai", area: "Vasai West", pin: "401201", label: "Vasai" },
                    { city: "Mumbai", area: "Mira Road", pin: "401107", label: "Mira Road" },
                    { city: "Mumbai", area: "Borivali East", pin: "400066", label: "Borivali East (Sukkarwadi HQ)" },
                    { city: "Mumbai", area: "Borivali West", pin: "400092", label: "Borivali West" },
                    { city: "Mumbai", area: "Kandivali West", pin: "400067", label: "Kandivali" },
                    { city: "Mumbai", area: "Malad West", pin: "400064", label: "Malad" },
                    { city: "Mumbai", area: "Goregaon West", pin: "400062", label: "Goregaon" },
                    { city: "Mumbai", area: "Andheri West", pin: "400053", label: "Andheri" },
                    { city: "Mumbai", area: "Bandra West", pin: "400050", label: "Bandra" },
                    { city: "Mumbai", area: "Dadar West", pin: "400028", label: "Dadar" },
                    { city: "Mumbai", area: "Lower Parel", pin: "400013", label: "Lower Parel" },
                    { city: "Mumbai", area: "Churchgate", pin: "400020", label: "Churchgate" }
                  ].map((hub) => (
                    <button
                      key={hub.area}
                      type="button"
                      onClick={() => handleQuickCityAreaPill(hub.city, hub.area, hub.pin)}
                      style={{
                        padding: "3px 9px",
                        borderRadius: "8px",
                        border: selectedCity === hub.city && selectedArea === hub.area ? "1.5px solid #2563EB" : "1px solid rgba(37,99,235,0.25)",
                        background: selectedCity === hub.city && selectedArea === hub.area ? "#2563EB" : "#FFFFFF",
                        color: selectedCity === hub.city && selectedArea === hub.area ? "#FFFFFF" : "#1E3A8A",
                        fontSize: "0.76rem",
                        fontWeight: selectedCity === hub.city && selectedArea === hub.area ? 800 : 600,
                        cursor: "pointer",
                        boxShadow: selectedCity === hub.city && selectedArea === hub.area ? "0 2px 6px rgba(37,99,235,0.3)" : "none"
                      }}
                    >
                      {hub.label} ({hub.pin})
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Select Popular Pan-India Hubs */}
              <div
                style={{
                  background: "var(--bg-alt)",
                  padding: "0.6rem 0.9rem",
                  borderRadius: "10px",
                  border: "1px solid var(--border-color)",
                  marginBottom: "1.5rem"
                }}
              >
                <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: "0.35rem" }}>
                  Other Major City Hubs:
                </span>
                <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                  {[
                    { city: "Pune", area: "Kothrud", pin: "411038" },
                    { city: "Bengaluru", area: "Whitefield", pin: "560066" },
                    { city: "Delhi / NCR", area: "Connaught Place", pin: "110001" },
                    { city: "Hyderabad", area: "HITEC City", pin: "500081" },
                    { city: "Thane", area: "Ghodbunder Road", pin: "400615" },
                    { city: "Ahmedabad", area: "Navrangpura", pin: "380009" }
                  ].map((hub) => (
                    <button
                      key={hub.area}
                      type="button"
                      onClick={() => handleQuickCityAreaPill(hub.city, hub.area, hub.pin)}
                      style={{
                        padding: "2px 8px",
                        borderRadius: "6px",
                        border: selectedCity === hub.city && selectedArea === hub.area ? "1.5px solid #2563EB" : "1px solid var(--border-color)",
                        background: selectedCity === hub.city && selectedArea === hub.area ? "rgba(37,99,235,0.12)" : "var(--bg-card)",
                        color: selectedCity === hub.city && selectedArea === hub.area ? "#2563EB" : "var(--text-dark)",
                        fontSize: "0.74rem",
                        fontWeight: selectedCity === hub.city && selectedArea === hub.area ? 700 : 500,
                        cursor: "pointer"
                      }}
                    >
                      {hub.city} • {hub.area} ({hub.pin})
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                <div className="form-group">
                  <label className="form-label">Customer Full Name *</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="e.g. Priya Sharma"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                  {errors.name && <span style={{ color: "#EF4444", fontSize: "0.8rem" }}>{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number (10-Digit Mobile) *</label>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span style={{ padding: "0.75rem 0.9rem", background: "var(--bg-alt)", border: "1.5px solid var(--border-light)", borderRight: "none", borderRadius: "10px 0 0 10px", fontWeight: 700 }}>
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      className="form-control"
                      style={{ borderRadius: "0 10px 10px 0" }}
                      placeholder="9820123456"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    />
                  </div>
                  {errors.phone && <span style={{ color: "#EF4444", fontSize: "0.8rem" }}>{errors.phone}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Flat / House / Shop No. *</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="e.g. Flat 402, Gokul Horizon"
                    value={flatNumber}
                    onChange={(e) => setFlatNumber(e.target.value)}
                  />
                  {errors.flat && <span style={{ color: "#EF4444", fontSize: "0.8rem" }}>{errors.flat}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Building / Society / Road *</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="e.g. Opp. Don Bosco High School"
                    value={society}
                    onChange={(e) => setSociety(e.target.value)}
                  />
                  {errors.society && <span style={{ color: "#EF4444", fontSize: "0.8rem" }}>{errors.society}</span>}
                </div>

                {/* City Selection Dropdown (Auto-changes Area & Pincode) */}
                <div className="form-group">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                    <label className="form-label" style={{ marginBottom: 0 }}>City / Region *</label>
                    <span style={{ fontSize: "0.75rem", color: "#2563EB", fontWeight: 700 }}>
                      ⚡ 17+ Cities Supported
                    </span>
                  </div>
                  <select
                    className="form-control"
                    value={selectedCity}
                    onChange={(e) => handleCityChange(e.target.value)}
                    style={{ fontWeight: 700, background: "var(--bg-card)", color: "var(--text-dark)", height: "46px" }}
                  >
                    {allCitiesList.map((city) => (
                      <option key={city.name} value={city.name}>
                        {city.name} ({city.state}) {city.isPrimaryHub ? "★ Direct Hub" : ""}
                      </option>
                    ))}
                  </select>
                  {errors.city && <span style={{ color: "#EF4444", fontSize: "0.8rem" }}>{errors.city}</span>}
                </div>

                {/* Area Dropdown for Chosen City (Auto-changes Pincode) */}
                <div className="form-group">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                    <label className="form-label" style={{ marginBottom: 0 }}>
                      Select Area in {selectedCity} *
                    </label>
                    <span style={{ fontSize: "0.75rem", color: "#059669", fontWeight: 700 }}>
                      Auto Pincode Link
                    </span>
                  </div>
                  <select
                    className="form-control"
                    value={selectedArea}
                    onChange={(e) => handleAreaDropdownSelect(e.target.value)}
                    style={{ fontWeight: 600, background: "var(--bg-card)", color: "var(--text-dark)", height: "46px" }}
                  >
                    {currentCityAreas.map((area) => (
                      <option key={area.name} value={area.name}>
                        {area.name} — Pin: {area.pincode}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Area Search Input with Real-Time Suggestions & GPS */}
                <div className="form-group area-search-container" style={{ position: "relative" }}>
                  <label className="form-label" style={{ marginBottom: "0.4rem" }}>
                    <Search size={15} style={{ display: "inline", marginRight: "4px", color: "#2563EB" }} />
                    Or Type / Search Any Locality
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder={`Search area in ${selectedCity} (e.g. ${selectedCity === "Mumbai" ? "Borivali, Kandivali, Malad" : selectedCity === "Bengaluru" ? "Indiranagar, Koramangala, Whitefield" : selectedCity === "Delhi" ? "Connaught Place, Saket, Dwarka" : "Main Market"})...`}
                    value={areaSearchText}
                    onChange={(e) => handleAreaSearchChange(e.target.value)}
                    onFocus={() => setShowAreaSuggestions(true)}
                  />
                  {errors.area && <span style={{ color: "#EF4444", fontSize: "0.8rem" }}>{errors.area}</span>}

                  {showAreaSuggestions && areaSuggestions.length > 0 && (
                    <div
                      className="area-suggestions-dropdown"
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        right: 0,
                        maxHeight: "220px",
                        overflowY: "auto",
                        background: "var(--bg-card)",
                        border: "1px solid var(--border-color)",
                        borderRadius: "10px",
                        boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
                        zIndex: 150,
                        marginTop: "4px"
                      }}
                    >
                      {areaSuggestions.map((item, idx) => (
                        <div
                          key={idx}
                          className="suggestion-item"
                          onClick={() => handleSelectSuggestion(item)}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "0.6rem 0.85rem",
                            cursor: "pointer",
                            borderBottom: "1px solid var(--border-color)"
                          }}
                        >
                          <div>
                            <strong>{item.name}</strong>, <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>{item.cityName}</span>
                          </div>
                          <span style={{ fontSize: "0.8rem", background: "rgba(37,99,235,0.1)", color: "#2563EB", padding: "2px 8px", borderRadius: "8px", fontWeight: 700 }}>
                            ⚡ Pin: {item.pincode}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {gpsStatus && (
                    <div
                      style={{
                        marginTop: "0.5rem",
                        padding: "0.45rem 0.75rem",
                        borderRadius: "8px",
                        fontSize: "0.82rem",
                        fontWeight: 600,
                        background: gpsStatus.type === "error" ? "rgba(239,68,68,0.1)" : "rgba(16,185,129,0.1)",
                        color: gpsStatus.type === "error" ? "#DC2626" : "#059669",
                        border: `1px solid ${gpsStatus.type === "error" ? "rgba(239,68,68,0.2)" : "rgba(16,185,129,0.2)"}`
                      }}
                    >
                      {gpsStatus.text}
                    </div>
                  )}
                </div>

                {/* Auto-Generated Pincode Field */}
                <div className="form-group">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                    <label className="form-label" style={{ marginBottom: 0 }}>Pincode (Auto-Generated) *</label>
                    <span style={{ fontSize: "0.75rem", color: "#059669", fontWeight: 700, display: "flex", alignItems: "center", gap: "4px" }}>
                      <Sparkles size={13} /> Auto-Generated
                    </span>
                  </div>
                  <div style={{ position: "relative" }}>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      className="form-control"
                      value={pincode}
                      onChange={(e) => handlePincodeChange(e.target.value)}
                      placeholder="6-digit pincode"
                      style={{ fontWeight: 800, letterSpacing: "1px", color: "var(--text-dark)", height: "46px" }}
                    />
                    {pincode && pincode.length === 6 && (
                      <span
                        style={{
                          position: "absolute",
                          right: "12px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "#059669",
                          fontSize: "0.78rem",
                          fontWeight: 700,
                          pointerEvents: "none"
                        }}
                      >
                        ✓ Verified Zone
                      </span>
                    )}
                  </div>
                  {errors.pincode && <span style={{ color: "#EF4444", fontSize: "0.8rem" }}>{errors.pincode}</span>}
                </div>

                <div className="form-group" style={{ gridColumn: "span 2" }}>
                  <label className="form-label">Nearby Landmark (Optional)</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Near Shimpoli Signal / Opp. ICICI Bank"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Choose Electrician & Payment UI */}
          {currentStep === 5 && (
            <div>
              <h3 style={{ fontSize: "1.4rem", marginBottom: "0.4rem" }}>Step 5: Electrician & Payment Options</h3>
              <p style={{ fontSize: "0.95rem", marginBottom: "1.5rem" }}>
                Select your preferred technician and how you would like to pay after work is done.
              </p>

              {/* 🧑🔧 Electrician Picker */}
              <ElectricianPicker
                selectedTechId={chosenElectricianId}
                onSelectTech={setChosenElectricianId}
                serviceZone={selectedArea}
              />

              {/* 💳 Payment Selection UI */}
              <PaymentSelectionUI
                selectedMethod={paymentMethod}
                onSelectMethod={setPaymentMethod}
                amount={estimatedTotal}
                serviceName={currentService.name}
                onlinePaymentData={onlinePaymentData}
                onOnlinePaymentSuccess={setOnlinePaymentData}
              />
            </div>
          )}

          {/* STEP 6: Review & Final Confirmation */}
          {currentStep === 6 && (
            <div>
              <h3 style={{ fontSize: "1.4rem", marginBottom: "0.4rem" }}>Step 6: Review Summary & Place Booking</h3>
              <p style={{ fontSize: "0.95rem", marginBottom: "1.5rem" }}>
                Double check your booking details, promo code, and estimated total before confirming.
              </p>

              <div className="summary-review-card">
                <table className="summary-data-table">
                  <tbody>
                    <tr>
                      <td>Service & Labour</td>
                      <td>
                        <strong>{currentService.name}</strong> × {quantity} (₹{serviceTotal})
                      </td>
                    </tr>
                    {problemType && (
                      <tr>
                        <td>Reported Issue</td>
                        <td><span className="badge badge-gold">{problemType}</span></td>
                      </tr>
                    )}
                    {problemPhotoUrl && (
                      <tr>
                        <td>Attached Photo</td>
                        <td>
                          <img
                            src={problemPhotoUrl}
                            alt="Attached issue"
                            style={{ width: "48px", height: "48px", borderRadius: "6px", objectFit: "cover" }}
                          />
                        </td>
                      </tr>
                    )}
                    {materialsList.length > 0 && (
                      <tr>
                        <td>Spares Added ({materialsList.length})</td>
                        <td>
                          {materialsList.map(m => (
                            <div key={m.id} style={{ fontSize: "0.85rem" }}>
                              {m.name} × {m.qty} (₹{m.subtotal})
                            </div>
                          ))}
                        </td>
                      </tr>
                    )}
                    <tr>
                      <td>Scheduled Arrival</td>
                      <td>{selectedDate} • {activeSlotObj.label} ({activeSlotObj.time})</td>
                    </tr>
                    <tr>
                      <td>Service Address</td>
                      <td>{flatNumber}, {society}, {selectedArea}, {selectedCity || "Mumbai"} - {pincode}</td>
                    </tr>
                    <tr>
                      <td>Payment Mode</td>
                      <td>
                        {onlinePaymentData ? (
                          <div>
                            <span style={{ color: "#10B981", fontWeight: 800, display: "inline-flex", alignItems: "center", gap: "4px" }}>
                              <CheckCircle2 size={15} /> Paid Online ({onlinePaymentData.method})
                            </span>
                            <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontFamily: "monospace" }}>
                              TXN Ref: {onlinePaymentData.transactionId}
                            </div>
                          </div>
                        ) : (
                          <span><strong>{paymentMethod}</strong> (Pay After Service)</span>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>Estimated Grand Total</td>
                      <td style={{ fontSize: "1.25rem", color: "#F59E0B", fontWeight: 800 }}>
                        ₹{estimatedTotal.toLocaleString("en-IN")}{" "}
                        <small style={{ fontWeight: 400, color: "var(--text-muted)", fontSize: "0.8rem" }}>
                          (Final bill verified on site)
                        </small>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Promo Code Box */}
              <div
                style={{
                  marginTop: "1.25rem",
                  padding: "1rem",
                  background: "var(--bg-alt)",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  flexWrap: "wrap"
                }}
              >
                <Tag size={18} color="#F59E0B" />
                <span style={{ fontSize: "0.9rem", fontWeight: 700 }}>Have a Promo Code?</span>
                <input
                  type="text"
                  placeholder="e.g. FIRST100"
                  value={promoCodeInput}
                  onChange={(e) => setPromoCodeInput(e.target.value)}
                  style={{
                    padding: "0.4rem 0.8rem",
                    borderRadius: "6px",
                    border: "1px solid var(--border-medium)",
                    background: "var(--bg-card)",
                    color: "var(--text-dark)",
                    fontSize: "0.85rem"
                  }}
                />
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="btn btn-sm btn-gold"
                >
                  Apply Code
                </button>
                {appliedPromo && (
                  <span style={{ fontSize: "0.82rem", color: "#10B981", fontWeight: 700 }}>
                    ✓ Applied: {appliedPromo} (-₹{discountAmount})
                  </span>
                )}
                {errors.promo && (
                  <span style={{ fontSize: "0.8rem", color: "#EF4444" }}>{errors.promo}</span>
                )}
              </div>
            </div>
          )}

          {/* Wizard Footer Buttons */}
          <div className="wizard-footer" style={{ marginTop: "2rem" }}>
            {currentStep > 1 ? (
              <button type="button" className="btn btn-outline" onClick={prevStep}>
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>
            ) : <div />}

            {currentStep < 6 ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={nextStep}
                id="wizard-next-btn"
              >
                <span>Continue to Step {currentStep + 1}</span>
                <ArrowRight size={16} />
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-gold btn-lg"
                onClick={handleFinalBooking}
                id="wizard-confirm-booking-btn"
              >
                <CheckCircle2 size={18} />
                <span>
                  {onlinePaymentData
                    ? `Confirm Booking (Paid Online ₹${estimatedTotal})`
                    : `Confirm & Place Booking (₹${estimatedTotal})`}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
