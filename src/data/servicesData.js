export const servicesData = [
  {
    id: "home-wiring",
    name: "Home Wiring",
    category: "Wiring & Installations",
    startingPrice: 1499,
    priceUnit: "per room / circuit",
    shortDesc: "Complete concealed and open copper wiring with ISI grade fire-resistant cables and proper earthing.",
    fullDesc: "Expert electrical wiring for new flats, renovations, and rewiring of aged or damaged circuits. We use Havells/Polycab FRLS copper wires, strictly following Indian Electricity Rules with copper plate earthing for 100% human safety.",
    features: [
      "ISI-certified fire-retardant (FRLS) cables",
      "Proper phase-neutral-earth load segregation",
      "Chemical / copper plate earthing testing",
      "30-day post-service wiring warranty"
    ],
    estimatedTime: "4 - 8 Hours",
    warranty: "90 Days Service Warranty",
    icon: "Zap",
    popular: true,
    badge: "Most Booked"
  },
  {
    id: "electrical-fault-repair",
    name: "Electrical Fault Repair",
    category: "Emergency & Repair",
    startingPrice: 299,
    priceUnit: "per inspection & repair",
    shortDesc: "Rapid fault isolation for frequent tripping, short circuits, burnt wire smell, or dead sockets.",
    fullDesc: "Got a sudden blackout or spark from your wall? Our certified technicians trace faults with digital multimeters and megger testers to safely isolate and resolve short circuits within 45 minutes.",
    features: [
      "Pinpoint thermal and insulation resistance test",
      "Neutral fault & phase imbalance repair",
      "Short circuit & spark resolution",
      "Fast response within 30-45 mins (7 AM – 7 PM)"
    ],
    estimatedTime: "30 - 90 Mins",
    warranty: "30 Days Warranty",
    icon: "AlertTriangle",
    popular: true,
    badge: "7 AM – 7 PM Daily"
  },
  {
    id: "fan-installation-repair",
    name: "Fan Installation & Repair",
    category: "Appliance & Fixtures",
    startingPrice: 300,
    priceUnit: "per fan",
    shortDesc: "Installation, bearing change, winding test, and speed regulator repair for ceiling, exhaust & BLDC fans.",
    fullDesc: "Complete setup for all ceiling fans, heavy-duty exhaust fans, and modern energy-efficient BLDC fans (Atomberg, Havells, Crompton) with remote pairing and rod anchoring.",
    features: [
      "Ceiling hook anchor & safety pin verification",
      "BLDC controller & remote setup",
      "Wobble correction & noise balancing",
      "Capacitor and regulator replacement"
    ],
    estimatedTime: "30 - 45 Mins",
    warranty: "30 Days Warranty",
    icon: "Fan",
    popular: true,
    badge: "Quick Service"
  },
  {
    id: "light-installation",
    name: "Light Installation",
    category: "Appliance & Fixtures",
    startingPrice: 200,
    priceUnit: "per light unit",
    shortDesc: "LED spotlights, chandelier assembly, false-ceiling cove lights, decorative strip lights & batten setup.",
    fullDesc: "Transform your home ambience with precision lighting installation. We handle luxury chandeliers, magnetic track lights, profile LEDs, false-ceiling fixtures, and exterior waterproof wall lights.",
    features: [
      "False ceiling profile strip cutting & fitting",
      "Chandelier load-tested ceiling anchoring",
      "Driver / SMPS load calculation",
      "Neat concealed wiring without surface damage"
    ],
    estimatedTime: "30 - 60 Mins",
    warranty: "30 Days Warranty",
    icon: "Lightbulb",
    popular: true,
    badge: "Popular"
  },
  {
    id: "switch-socket-installation",
    name: "Switch & Socket Installation",
    category: "Wiring & Installations",
    startingPrice: 150,
    priceUnit: "per switchboard point",
    shortDesc: "Modular switch, 16A power socket for AC/Geyser, USB sockets, and smart Wi-Fi switchboard setup.",
    fullDesc: "Upgrade your old bakelite switchboards to modern modular switches (Anchor, Roma, Legrand, Goldmedal). We safely wire 6A/16A points, dedicated AC power sockets with DP switches, and touch-sensitive smart switches.",
    features: [
      "Modular plate & gang box replacement",
      "Dedicated heavy load line for AC / Geyser / Microwave",
      "Smart switchboard Wi-Fi integration",
      "Tight terminal connections to stop arcing"
    ],
    estimatedTime: "20 - 45 Mins",
    warranty: "30 Days Warranty",
    icon: "Power",
    popular: true,
    badge: "Essential"
  },
  {
    id: "mcb-installation-replacement",
    name: "MCB Installation/Replacement",
    category: "Safety & Distribution",
    startingPrice: 500,
    priceUnit: "per MCB / RCCB pole",
    shortDesc: "Trip protection MCBs, RCCB shock prevention, and Isolators to prevent fire and device damage.",
    fullDesc: "If your MCB is constantly tripping or heating up, it signals dangerous overload or leakage. We test current draw and install genuine Schneider/Legrand/L&T B-curve or C-curve MCBs and 30mA RCCBs.",
    features: [
      "30mA RCCB / ELCB human shock protection",
      "Proper amperage calibration (6A, 10A, 16A, 25A, 32A, 63A)",
      "Busbar connection cleanup & tightening",
      "Trip-curve diagnosis against spurious tripping"
    ],
    estimatedTime: "45 - 60 Mins",
    warranty: "60 Days Warranty",
    icon: "ShieldAlert",
    popular: true,
    badge: "Safety Essential"
  },
  {
    id: "distribution-board-work",
    name: "Distribution Board Work",
    category: "Safety & Distribution",
    startingPrice: 1800,
    priceUnit: "per DB box upgrade",
    shortDesc: "Single phase / 3-phase DB box organizing, circuit labeling, surge protection (SPD), and phase balancing.",
    fullDesc: "Overhaul tangled, dangerous junction boxes into neat, color-coded, labeled modern distribution enclosures. Essential for homes with multiple split ACs, modular kitchens, and high load electrical appliances.",
    features: [
      "Single phase to 3-phase DB distribution",
      "Surge Protection Device (SPD) lightning arrestor",
      "Neat color-coded comb busbar wiring",
      "Laminated circuit directory chart on DB door"
    ],
    estimatedTime: "2 - 4 Hours",
    warranty: "90 Days Warranty",
    icon: "Sliders",
    popular: false,
    badge: "High Load"
  },
  {
    id: "inverter-installation",
    name: "Inverter Installation",
    category: "Backup Power",
    startingPrice: 1200,
    priceUnit: "per unit setup",
    shortDesc: "Sine-wave home inverter, tubular battery setup, inverter bypass switch & critical load separation.",
    fullDesc: "Seamless power backup installation for Luminous, Microtek, and Exide inverter setups. We separate dedicated lighting/fan lines so your inverter runs efficiently without tripping on heavy appliances.",
    features: [
      "Inverter line load separation from main grid",
      "Safe acid/tubular battery rack mounting & terminal greasing",
      "Manual bypass rotary switch installation",
      "Short-circuit output safety check"
    ],
    estimatedTime: "1 - 2 Hours",
    warranty: "60 Days Warranty",
    icon: "BatteryCharging",
    popular: true,
    badge: "Power Backup"
  },
  {
    id: "commercial-electrical-work",
    name: "Commercial Electrical Work",
    category: "Commercial & Industrial",
    startingPrice: 2499,
    priceUnit: "starting base estimate",
    shortDesc: "Retail shops, offices, clinics & restaurants electrical wiring, server UPS lines, and 3-phase load setups.",
    fullDesc: "End-to-end commercial electrical solutions in Mumbai. We cater to IT workspaces, retail showrooms, co-working facilities, and commercial kitchens requiring uninterrupted power, server lines, and aesthetic illumination.",
    features: [
      "3-Phase industrial load balancing & CT meter testing",
      "Dedicated server rack & UPS isolated lines",
      "Emergency lighting & exit sign automation",
      "Energy audit & power factor correction consultation"
    ],
    estimatedTime: "Custom Schedule",
    warranty: "180 Days Warranty",
    icon: "Building2",
    popular: false,
    badge: "Commercial"
  },
  {
    id: "new-building-electrical-work",
    name: "New Building Electrical Work",
    category: "Commercial & Industrial",
    startingPrice: 4999,
    priceUnit: "starting per apartment / unit",
    shortDesc: "Concealed slab piping during construction, wall chasing, main riser cable laying, and meter room setup.",
    fullDesc: "Complete turnkey electrical contracting for architects, builders, and society redevelopments across Mumbai Western Suburbs. From slab casting conduit pipes to final luxury switch fit-outs.",
    features: [
      "Slab PVC conduit laying & ceiling junction boxes",
      "Precision wall chasing with dust-free grooving machines",
      "Society main meter room & busduct installation",
      "PWD / Electrical Inspector liaison & compliance"
    ],
    estimatedTime: "Project Based",
    warranty: "1 Year Turnkey Warranty",
    icon: "Hammer",
    popular: false,
    badge: "Turnkey Project"
  }
];

export const serviceCategories = [
  "All Services",
  "Wiring & Installations",
  "Appliance & Fixtures",
  "Emergency & Repair",
  "Safety & Distribution",
  "Backup Power",
  "Commercial & Industrial"
];
