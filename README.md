# Vishal Electricals — Professional Electrical Service Website

> **"Reliable Electrical Solutions at Your Doorstep"**

A modern, fully-featured electrical service management web application built with React + Vite for the Mumbai Western Suburbs market.

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+ and npm v9+

### Installation

```bash
# Clone or unzip the project
cd vishal-electricals

# Install all dependencies
npm install

# Start local development server
npm run dev
```

The app will be live at **http://localhost:5173/**

### Production Build

```bash
npm run build    # Outputs to /dist
npm run preview  # Preview production build locally
```

---

## 📁 Project Structure

```
vishal-electricals/
├── public/
│   └── favicon.svg                     # Custom lightning bolt SVG icon
├── src/
│   ├── assets/                         # Static files
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.jsx              # Sticky nav with mobile drawer
│   │   │   ├── Footer.jsx              # 4-column footer with links & contact
│   │   │   ├── MobileActionBar.jsx     # Sticky bottom bar (Call/WhatsApp/Book)
│   │   │   ├── EmergencyBanner.jsx     # 24/7 emergency CTA section
│   │   │   ├── ServiceAreaChecker.jsx  # Live Mumbai coverage checker
│   │   │   ├── PriceEstimator.jsx      # Dynamic quantity price calculator
│   │   │   ├── NotificationToast.jsx   # Stacked toast notification display
│   │   │   ├── ReviewModal.jsx         # Customer review submission form
│   │   │   ├── ServiceIcon.jsx         # Lucide icon name → component mapper
│   │   │   └── ScrollToTop.jsx         # Route transition auto-scroll
│   │   ├── booking/
│   │   │   └── MultiStepBooking.jsx    # 6-step booking wizard
│   │   ├── home/
│   │   │   ├── HeroSection.jsx         # Landing hero with dual CTAs
│   │   │   ├── PopularServices.jsx     # Top 6 service cards grid
│   │   │   ├── WhyChooseUs.jsx         # 6 trust pillars
│   │   │   ├── HowItWorks.jsx          # 4-step process flow
│   │   │   ├── ElectricianShowcase.jsx # Featured technician profiles
│   │   │   ├── CustomerReviews.jsx     # Verified review cards
│   │   │   └── RecentProjects.jsx      # Portfolio project preview
│   │   └── admin/
│   │       ├── AdminStats.jsx          # KPI dashboard metric cards
│   │       ├── AnalyticsCharts.jsx     # Weekly/monthly booking charts
│   │       ├── AssignElectricianModal.jsx # Tech allocation dialog
│   │       └── BookingDetailModal.jsx  # Full booking management panel
│   ├── context/
│   │   ├── BookingContext.jsx          # Booking/review state + localStorage
│   │   └── NotificationContext.jsx    # Toast alert state management
│   ├── data/
│   │   ├── servicesData.js             # 10 electrical services with pricing
│   │   ├── electriciansData.js         # 5 certified technician profiles
│   │   ├── sampleBookings.js           # Pre-loaded demo bookings (VE20260045+)
│   │   ├── reviewsData.js              # 6 verified customer reviews
│   │   ├── projectsData.js             # 6 portfolio project case studies
│   │   └── serviceAreasData.js         # Coverage map + checkCoverage() util
│   ├── pages/
│   │   ├── HomePage.jsx                # Landing page (all sections)
│   │   ├── ServicesPage.jsx            # Full catalog + estimator
│   │   ├── AboutPage.jsx               # Company story + all 5 techs
│   │   ├── ProjectsPage.jsx            # Filterable project gallery
│   │   ├── BookElectricianPage.jsx     # Booking wizard host
│   │   ├── TrackBookingPage.jsx        # Booking status tracker
│   │   ├── ContactPage.jsx             # Contact form + map visual
│   │   └── AdminDashboardPage.jsx      # Full admin control center
│   ├── styles/
│   │   ├── variables.css               # CSS custom properties / design tokens
│   │   ├── global.css                  # Base reset, typography, buttons
│   │   ├── components.css              # Component-specific styles
│   │   └── admin.css                   # Admin dashboard styles
│   ├── App.jsx                         # Router setup + context providers
│   └── main.jsx                        # React DOM mount entry
├── index.html                          # SEO meta tags + Google Fonts
├── vite.config.js
└── package.json
```

---

## ✨ Features

### 1. Smart 6-Step Service Booking
- **Step 1**: Select from 10 electrical services with starting rates
- **Step 2**: Choose service date (calendar picker)
- **Step 3**: Pick time slot (Morning/Midday/Afternoon/Evening/Emergency)
- **Step 4**: Customer contact details (name, mobile, email)
- **Step 5**: Full Mumbai doorstep address with area selector
- **Step 6**: Booking summary review + instant confirm
- Generates enterprise Booking IDs like `VE20260048`
- Persists in localStorage so bookings survive page refresh

### 2. Dynamic Price Estimator
- Interactive quantity stepper per service
- Live total calculation as you adjust units
- Covers Fan, Light, Switch, MCB, Fault Repair, Inverter, DB, and Wiring
- Includes mandatory "Final price may vary after inspection" disclaimer

### 3. Real-Time Booking Status Tracker
- Enter any Booking ID (try `VE20260045`)
- 5-stage progress stepper: Booked → Assigned → On the Way → In Progress → Completed
- Displays assigned technician photo, rating, and direct call button
- Timestamped activity log for each status transition

### 4. Mumbai Service Area Checker
- Type your locality or pincode to instantly check coverage
- Quick-select pill buttons for Dahisar, Borivali, Kandivali, Malad, Goregaon, Andheri
- Shows avg. arrival time and active technician count for covered areas
- Graceful fallback with WhatsApp special request for uncovered areas

### 5. Electrician Profiles
- 5 verified government-licensed technicians with photos
- Skills, license number, experience, rating, and completed jobs
- Available/Unavailable status badges

### 6. Admin Dashboard
- KPI cards: Total, Pending, Assigned, In Progress, Completed, Cancelled, Revenue
- Filterable booking management table (by status + search)
- One-click assign electrician / advance booking status / cancel
- Weekly bar chart analytics and service distribution breakdown
- Monthly revenue trend cards
- System notification activity feed

### 7. Customer Reviews
- Verified review cards with star ratings
- Write a Review modal form (published live to the reviews section)

### 8. Emergency Service Section
- Prominent red CTA with 30-min arrival guarantee
- Direct call, WhatsApp, and Emergency Booking buttons

### 9. Responsive Design
- Mobile-first CSS with desktop grid expansions
- Sticky bottom bar on mobile: **Call | WhatsApp | Book Now**
- Mobile navigation drawer with accordion-style links

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Deep Navy | `#0B192C` |
| Electric Cyan | `#00B4D8` |
| Safety Gold | `#F59E0B` |
| Emergency Red | `#EF4444` |
| Font Heading | Outfit (800) |
| Font Body | Plus Jakarta Sans |

---

## 🔮 Future Improvements

1. **Firebase / Supabase backend** for real-time booking persistence across devices
2. **SMS/WhatsApp OTP** for customer booking verification
3. **Google Maps integration** with live technician location tracking
4. **Payment gateway** (Razorpay/PhonePe) for advance booking deposits
5. **Push notifications** for status updates via service workers
6. **Technician mobile app** for on-field job management
7. **Admin analytics** export to Excel/PDF reports
8. **Multi-city expansion** beyond Mumbai Western Suburbs
9. **AI chatbot** for immediate service triage and FAQ responses
10. **Customer loyalty program** with discount tracking

---

## 📞 Demo Data

| Booking ID | Status | Technician |
|------------|--------|------------|
| VE20260045 | On the Way | Rajesh Kumar |
| VE20260044 | Work In Progress | Amit Sharma |
| VE20260043 | Completed | Suresh Patil |
| VE20260046 | Booked (Unassigned) | — |
| VE20260047 | Electrician Assigned | Vikram Rathore |
| VE20260042 | Cancelled | — |

---

© 2026 Vishal Electricals — Borivali West, Mumbai 400092
