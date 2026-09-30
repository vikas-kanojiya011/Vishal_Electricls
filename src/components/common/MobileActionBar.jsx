import React from "react";
import { Link } from "react-router-dom";
import { Phone, MessageSquare, Calendar } from "lucide-react";

export default function MobileActionBar() {
  return (
    <nav className="sticky-mobile-bar" aria-label="Mobile quick actions">
      <a
        href="tel:+919004807180"
        className="mobile-action-btn btn-call"
        id="mobile-action-call"
      >
        <Phone size={17} />
        <span>Call</span>
      </a>

      <a
        href="https://wa.me/919004807180?text=Hi%20Vishal%20Electricals%2C%20I%20need%20electrician%20service%20in%20Mumbai."
        target="_blank"
        rel="noopener noreferrer"
        className="mobile-action-btn btn-whatsapp"
        id="mobile-action-whatsapp"
      >
        <MessageSquare size={17} />
        <span>WhatsApp</span>
      </a>

      <Link
        to="/book"
        className="mobile-action-btn btn-gold"
        id="mobile-action-book"
      >
        <Calendar size={17} />
        <span>Book Now</span>
      </Link>
    </nav>
  );
}
