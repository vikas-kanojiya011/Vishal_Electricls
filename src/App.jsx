import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { NotificationProvider } from "./context/NotificationContext";
import { BookingProvider } from "./context/BookingContext";
import { AuthProvider } from "./context/AuthContext";

// Styling System
import "./styles/variables.css";
import "./styles/global.css";
import "./styles/components.css";
import "./styles/admin.css";

// Layout & Common Components
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import MobileActionBar from "./components/common/MobileActionBar";
import NotificationToast from "./components/common/NotificationToast";
import ScrollToTop from "./components/common/ScrollToTop";
import ServiceAssistant from "./components/common/ServiceAssistant";
import PageLoader from "./components/common/PageLoader";

// Direct Load Critical Landing Page
import HomePage from "./pages/HomePage";

// Code-Split On-Demand Pages for Optimal Production Performance
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const BookElectricianPage = lazy(() => import("./pages/BookElectricianPage"));
const TrackBookingPage = lazy(() => import("./pages/TrackBookingPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const AdminDashboardPage = lazy(() => import("./pages/AdminDashboardPage"));
const CustomerDashboardPage = lazy(() => import("./pages/CustomerDashboardPage"));
const OffersPage = lazy(() => import("./pages/OffersPage"));

export default function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <AuthProvider>
          <BookingProvider>
          <BrowserRouter>
            <ScrollToTop />
            <NotificationToast />

            {/* Desktop & Mobile Header with Theme Toggle */}
            <Navbar />

            {/* Page Routing with Suspense Loading Fallback */}
            <main>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/projects" element={<ProjectsPage />} />
                  <Route path="/offers" element={<OffersPage />} />
                  <Route path="/dashboard" element={<CustomerDashboardPage />} />
                  <Route path="/book" element={<BookElectricianPage />} />
                  <Route path="/track" element={<TrackBookingPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/admin" element={<AdminDashboardPage />} />
                  {/* Fallback route */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Suspense>
            </main>

            {/* Floating AI Electrical Service Assistant */}
            <ServiceAssistant />

            {/* Site Footer */}
            <Footer />

            {/* Sticky Mobile Bottom Bar: Call | WhatsApp | Book Now */}
            <MobileActionBar />
          </BrowserRouter>
          </BookingProvider>
        </AuthProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}
