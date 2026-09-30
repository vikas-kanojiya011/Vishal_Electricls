import {
  ALL_CITIES_DATA,
  ALL_INDIA_AREAS,
  getAllCities,
  getAreasForCity,
  getPrimaryAreaForCity,
  autoGeneratePincode,
  searchCityAndArea,
  getLocationByPincode
} from "./citiesPincodesData.js";

export {
  ALL_CITIES_DATA,
  ALL_INDIA_AREAS,
  getAllCities,
  getAreasForCity,
  getPrimaryAreaForCity,
  autoGeneratePincode,
  searchCityAndArea,
  getLocationByPincode
};

// Official Main Office & Central Command Desk Address
export const MAIN_OFFICE_ADDRESS = {
  name: "Vishal Electricals (Main Office & Workshop)",
  street: "Cartan Road No. 8, Sukkarwadi",
  locality: "Borivali East",
  city: "Mumbai",
  state: "Maharashtra",
  pincode: "400066",
  landmark: "Near Borivali East Railway Station & Sukkarwadi Bus Depot",
  fullAddress: "Cartan Road No. 8, Sukkarwadi, Borivali East, Mumbai, Maharashtra 400066",
  phone: "+91 90048 07180",
  email: "dispatch@vishalelectricals.com",
  operatingHours: "7:00 AM – 7:00 PM Daily",
  googleMapsUrl: "https://maps.google.com/?q=Cartan+Road+No+8+Sukkarwadi+Borivali+East+Mumbai+400066"
};

export const serviceAreasData = [
  // 🚆 North Western Corridor (Virar to Mira Road)
  {
    id: "virar-nalasopara",
    name: "Virar & Nalasopara",
    subZones: ["Virar West", "Virar East", "Nalasopara West", "Nalasopara East", "Bolinj", "Yazoo Park", "Achole", "Tulinj"],
    pincodes: ["401303", "401305", "401203", "401209"],
    status: "Service Available",
    isCovered: true,
    avgArrival: "30 - 45 mins",
    activeTechnicians: 4,
    emergencyAvailable: true
  },
  {
    id: "vasai-naigaon",
    name: "Vasai & Naigaon",
    subZones: ["Vasai West", "Vasai East", "Naigaon West", "Naigaon East", "Stella", "Babhola", "Evershine City", "Sunteck City"],
    pincodes: ["401201", "401202", "401207", "401208"],
    status: "Service Available",
    isCovered: true,
    avgArrival: "30 - 40 mins",
    activeTechnicians: 4,
    emergencyAvailable: true
  },
  {
    id: "mira-bhayandar",
    name: "Mira Road & Bhayandar",
    subZones: ["Mira Road East", "Bhayandar West", "Bhayandar East", "Shanti Nagar", "Beverly Park", "Maxus Mall", "Golden Nest", "Kanakia"],
    pincodes: ["401107", "401101", "401105"],
    status: "Service Available",
    isCovered: true,
    avgArrival: "25 - 35 mins",
    activeTechnicians: 5,
    emergencyAvailable: true
  },
  // 🏢 Central Hubs (Dahisar to Andheri)
  {
    id: "dahisar",
    name: "Dahisar",
    subZones: ["Dahisar West", "Dahisar East", "Rawalpada", "KandarPada", "Shailendra Nagar", "Ketkipada"],
    pincodes: ["400068"],
    status: "Service Available",
    isCovered: true,
    avgArrival: "20 - 30 mins",
    activeTechnicians: 4,
    emergencyAvailable: true
  },
  {
    id: "borivali",
    name: "Borivali (Main Office HQ)",
    subZones: [
      "Borivali East (Sukkarwadi / Cartan No. 8 - Main Office)",
      "Sukkarwadi",
      "Cartan Road No. 8",
      "Cartan No. 8",
      "Carten No. 8",
      "Cartan Road",
      "Borivali East",
      "Borivali West",
      "IC Colony",
      "Shimpoli",
      "Gorai",
      "Eksar",
      "Chikuwadi",
      "Magathane"
    ],
    pincodes: ["400066", "400092"],
    status: "Service Available",
    isCovered: true,
    avgArrival: "15 - 25 mins (Main Office HQ)",
    activeTechnicians: 8,
    emergencyAvailable: true,
    isHeadquarters: true
  },
  {
    id: "kandivali",
    name: "Kandivali",
    subZones: ["Kandivali West", "Kandivali East", "Mahavir Nagar", "Thakur Village", "Thakur Complex", "Lokhandwala Twp", "Charkop", "Poisar"],
    pincodes: ["400067", "400101"],
    status: "Service Available",
    isCovered: true,
    avgArrival: "20 - 30 mins",
    activeTechnicians: 5,
    emergencyAvailable: true
  },
  {
    id: "malad",
    name: "Malad",
    subZones: ["Malad West", "Malad East", "Link Road", "Mindspace", "Orlem", "Marve Road", "Dindoshi", "Oberoi Mall"],
    pincodes: ["400064", "400097"],
    status: "Service Available",
    isCovered: true,
    avgArrival: "25 - 35 mins",
    activeTechnicians: 5,
    emergencyAvailable: true
  },
  {
    id: "goregaon",
    name: "Goregaon & Ram Mandir",
    subZones: ["Goregaon West", "Goregaon East", "Ram Mandir", "Bangur Nagar", "Aarey Colony", "Gokuldham", "Motilal Nagar", "Oshiwara"],
    pincodes: ["400062", "400063", "400104"],
    status: "Service Available",
    isCovered: true,
    avgArrival: "25 - 35 mins",
    activeTechnicians: 4,
    emergencyAvailable: true
  },
  {
    id: "jogeshwari",
    name: "Jogeshwari",
    subZones: ["Jogeshwari West", "Jogeshwari East", "Behram Baug", "Majas Depot", "Relief Road"],
    pincodes: ["400060", "400102"],
    status: "Service Available",
    isCovered: true,
    avgArrival: "30 - 40 mins",
    activeTechnicians: 3,
    emergencyAvailable: true
  },
  {
    id: "andheri",
    name: "Andheri",
    subZones: ["Andheri West", "Andheri East", "Lokhandwala Complex", "Versova", "JB Nagar", "Marol", "Chakala", "SEEPZ", "MIDC"],
    pincodes: ["400053", "400058", "400069", "400099"],
    status: "Service Available",
    isCovered: true,
    avgArrival: "25 - 35 mins",
    activeTechnicians: 6,
    emergencyAvailable: true
  },
  {
    id: "vile-parle",
    name: "Vile Parle",
    subZones: ["Vile Parle West", "Vile Parle East", "Juhu Scheme", "Irla", "Prime Mall", "Domestic Airport"],
    pincodes: ["400056", "400057"],
    status: "Service Available",
    isCovered: true,
    avgArrival: "30 - 40 mins",
    activeTechnicians: 3,
    emergencyAvailable: true
  },
  // 🏢 Mid & South Western Corridor (Santacruz down to Churchgate)
  {
    id: "santacruz-khar",
    name: "Santacruz & Khar",
    subZones: ["Santacruz West", "Santacruz East", "Khar West", "Khar Road", "Linking Road", "Kalina", "Vakola"],
    pincodes: ["400054", "400055", "400052"],
    status: "Service Available",
    isCovered: true,
    avgArrival: "30 - 40 mins",
    activeTechnicians: 4,
    emergencyAvailable: true
  },
  {
    id: "bandra",
    name: "Bandra & BKC",
    subZones: ["Bandra West", "Bandra East", "Pali Hill", "Carter Road", "Bandstand", "BKC", "Bandra Kurla Complex"],
    pincodes: ["400050", "400051"],
    status: "Service Available",
    isCovered: true,
    avgArrival: "30 - 40 mins",
    activeTechnicians: 4,
    emergencyAvailable: true
  },
  {
    id: "mahim-dadar",
    name: "Mahim & Dadar",
    subZones: ["Dadar West", "Dadar East", "Mahim West", "Matunga Road", "Shivaji Park", "TT Circle", "Ranade Road"],
    pincodes: ["400028", "400014", "400016", "400019"],
    status: "Service Available",
    isCovered: true,
    avgArrival: "35 - 45 mins",
    activeTechnicians: 4,
    emergencyAvailable: true
  },
  {
    id: "lower-parel-worli",
    name: "Prabhadevi, Lower Parel & Worli",
    subZones: ["Prabhadevi", "Lower Parel", "Worli", "Worli Sea Face", "Kamala Mills", "High Street Phoenix", "Siddhivinayak"],
    pincodes: ["400025", "400013", "400018"],
    status: "Service Available",
    isCovered: true,
    avgArrival: "35 - 45 mins",
    activeTechnicians: 4,
    emergencyAvailable: true
  },
  {
    id: "mumbai-central-grant-road",
    name: "Mahalaxmi, Mumbai Central & Grant Road",
    subZones: ["Mahalaxmi", "Mumbai Central", "Grant Road", "Lamington Road", "Tardeo", "Nana Chowk", "Racecourse"],
    pincodes: ["400011", "400008", "400007"],
    status: "Service Available",
    isCovered: true,
    avgArrival: "35 - 50 mins",
    activeTechnicians: 3,
    emergencyAvailable: true
  },
  {
    id: "churchgate-marine-lines",
    name: "Churchgate, Marine Lines & Charni Road",
    subZones: ["Churchgate", "Marine Lines", "Charni Road", "Girgaon", "Marine Drive", "Nariman Point", "Fort", "Colaba", "Cuffe Parade", "Oval Maidan", "Chowpatty"],
    pincodes: ["400020", "400002", "400004", "400001", "400005"],
    status: "Service Available",
    isCovered: true,
    avgArrival: "35 - 50 mins",
    activeTechnicians: 4,
    emergencyAvailable: true
  }
];

export const checkCoverage = (query, cityName = "") => {
  if (!query && !cityName) return null;
  const clean = (query || "").trim().toLowerCase();
  const cleanCity = (cityName || "").trim();

  // If city is specified and not "all" and not "Mumbai", search in that city first
  if (cleanCity && cleanCity.toLowerCase() !== "all" && cleanCity.toLowerCase() !== "mumbai") {
    const cityMatches = searchCityAndArea(clean, cleanCity);
    if (cityMatches && cityMatches.length > 0) {
      const top = cityMatches[0];
      return {
        available: true,
        message: `Service Available in ${top.cityName}`,
        area: top.name,
        cityName: top.cityName,
        avgArrival: top.avgArrival || "Same-Day Dispatch",
        activeTechnicians: top.activeTechnicians || 3,
        pincodes: top.pincode,
        generatedPincode: top.pincode
      };
    }
    // If no direct query match, fall back to city's primary area
    const primary = getPrimaryAreaForCity(cleanCity);
    if (primary) {
      return {
        available: true,
        message: `Service Available in ${cleanCity}`,
        area: primary.name,
        cityName: cleanCity,
        avgArrival: "Same-Day Dispatch",
        activeTechnicians: 3,
        pincodes: primary.pincode,
        generatedPincode: primary.pincode
      };
    }
  }

  // 1. Search primary hubs in serviceAreasData (Mumbai direct hubs)
  if (!cleanCity || cleanCity.toLowerCase() === "mumbai" || cleanCity.toLowerCase() === "all") {
    const match = serviceAreasData.find(area => {
      if (area.name.toLowerCase().includes(clean) || clean.includes(area.name.toLowerCase())) return true;
      if (area.pincodes.some(pin => pin === clean)) return true;
      if (area.subZones.some(sub => sub.toLowerCase().includes(clean))) return true;
      return false;
    });

    if (match) {
      return {
        available: true,
        message: "Service Available",
        area: match.name,
        cityName: "Mumbai",
        avgArrival: match.avgArrival,
        activeTechnicians: match.activeTechnicians,
        pincodes: match.pincodes.join(", "),
        generatedPincode: match.pincodes[0]
      };
    }
  }

  // 2. Search all Indian cities and areas in ALL_INDIA_AREAS
  const allIndiaMatches = searchCityAndArea(clean, cleanCity === "all" ? "" : cleanCity);
  if (allIndiaMatches && allIndiaMatches.length > 0) {
    const top = allIndiaMatches[0];
    return {
      available: true,
      message: `Service Available in ${top.cityName}`,
      area: top.name,
      cityName: top.cityName,
      avgArrival: top.avgArrival || "Same-Day Dispatch",
      activeTechnicians: top.activeTechnicians || 3,
      pincodes: top.pincode,
      generatedPincode: top.pincode
    };
  }

  return {
    available: false,
    message: "Currently outside our standard direct dispatch hubs.",
    area: query || cityName,
    suggestion: "You can still submit a doorstep booking or call our dispatch desk at +91 90048 07180 for customized technician scheduling."
  };
};

// Direct mapping of Mumbai Western Corridor (Virar to Churchgate) and suburbs to primary pincodes
export const AREA_PINCODE_MAP = {
  // Western Line Corridor (North to South)
  "Virar": "401303",
  "Virar West": "401303",
  "Virar East": "401305",
  "Nalasopara": "401203",
  "Nalasopara West": "401203",
  "Nalasopara East": "401209",
  "Vasai": "401201",
  "Vasai West": "401201",
  "Vasai East": "401202",
  "Naigaon": "401207",
  "Naigaon West": "401207",
  "Naigaon East": "401208",
  "Bhayandar": "401101",
  "Bhayandar West": "401101",
  "Bhayandar East": "401105",
  "Mira Road": "401107",
  "Mira Road East": "401107",
  "Mira Road West": "401107",
  "Dahisar": "400068",
  "Dahisar East": "400068",
  "Dahisar West": "400068",
  "Borivali": "400066",
  "Borivali East": "400066",
  "Borivali West": "400092",
  "Sukkarwadi": "400066",
  "Cartan Road": "400066",
  "Cartan Road No. 8": "400066",
  "Cartan No. 8": "400066",
  "Carten No. 8": "400066",
  "Carten Road": "400066",
  "Carton No 8": "400066",
  "Kandivali": "400067",
  "Kandivali East": "400101",
  "Kandivali West": "400067",
  "Malad": "400064",
  "Malad East": "400097",
  "Malad West": "400064",
  "Goregaon": "400062",
  "Goregaon East": "400063",
  "Goregaon West": "400062",
  "Ram Mandir": "400104",
  "Oshiwara": "400102",
  "Jogeshwari": "400102",
  "Jogeshwari East": "400060",
  "Jogeshwari West": "400102",
  "Andheri": "400053",
  "Andheri East": "400069",
  "Andheri West": "400053",
  "Versova": "400061",
  "Lokhandwala": "400053",
  "Vile Parle": "400057",
  "Vile Parle East": "400057",
  "Vile Parle West": "400056",
  "Juhu": "400049",
  "Santacruz": "400054",
  "Santacruz West": "400054",
  "Santacruz East": "400055",
  "Khar": "400052",
  "Khar Road": "400052",
  "Khar West": "400052",
  "Bandra": "400050",
  "Bandra West": "400050",
  "Bandra East": "400051",
  "BKC": "400051",
  "Mahim": "400016",
  "Mahim West": "400016",
  "Matunga Road": "400019",
  "Dadar": "400028",
  "Dadar West": "400028",
  "Dadar East": "400014",
  "Shivaji Park": "400028",
  "Prabhadevi": "400025",
  "Elphinstone": "400025",
  "Lower Parel": "400013",
  "Worli": "400018",
  "Mahalaxmi": "400011",
  "Mumbai Central": "400008",
  "Grant Road": "400007",
  "Charni Road": "400004",
  "Girgaon": "400004",
  "Marine Lines": "400002",
  "Churchgate": "400020",
  "Marine Drive": "400020",
  "Fort": "400001",
  "Nariman Point": "400021",
  "Colaba": "400005",
  "Cuffe Parade": "400005",
  "Bandra & Santacruz": "400050"
};

// Reverse mapping from 6-digit pincode to Mumbai zone/area name
export const PINCODE_AREA_MAP = {
  // North Western Line
  "401303": "Virar West",
  "401305": "Virar East",
  "401203": "Nalasopara West",
  "401209": "Nalasopara East",
  "401201": "Vasai West",
  "401202": "Vasai East",
  "401207": "Naigaon West",
  "401208": "Naigaon East",
  "401101": "Bhayandar West",
  "401105": "Bhayandar East",
  "401107": "Mira Road",
  // Western Suburbs
  "400068": "Dahisar",
  "400066": "Borivali East",
  "400092": "Borivali West",
  "400067": "Kandivali West",
  "400101": "Kandivali East",
  "400064": "Malad West",
  "400097": "Malad East",
  "400062": "Goregaon West",
  "400063": "Goregaon East",
  "400104": "Ram Mandir / Goregaon",
  "400102": "Jogeshwari West",
  "400060": "Jogeshwari East",
  "400053": "Andheri West",
  "400058": "Andheri West (SV Road)",
  "400069": "Andheri East",
  "400099": "Andheri East (Airport)",
  "400056": "Vile Parle West",
  "400057": "Vile Parle East",
  "400049": "Juhu",
  "400054": "Santacruz West",
  "400055": "Santacruz East",
  "400052": "Khar Road / Khar West",
  "400050": "Bandra West",
  "400051": "Bandra East (BKC)",
  // South Mumbai Corridor
  "400016": "Mahim West",
  "400019": "Matunga Road",
  "400028": "Dadar West (Shivaji Park)",
  "400014": "Dadar East",
  "400025": "Prabhadevi",
  "400013": "Lower Parel",
  "400018": "Worli",
  "400011": "Mahalaxmi",
  "400008": "Mumbai Central",
  "400007": "Grant Road",
  "400004": "Charni Road / Girgaon",
  "400002": "Marine Lines",
  "400020": "Churchgate",
  "400021": "Nariman Point",
  "400001": "Fort",
  "400005": "Colaba / Cuffe Parade"
};

/**
 * Automatically generates/returns the 6-digit pincode for an area name or search query.
 */
export const getPincodeForArea = (areaName, cityName = "") => {
  if (!areaName || typeof areaName !== "string") return "400066";
  const clean = areaName.trim();

  // 0. If already a 6-digit pincode, return directly
  if (/^\d{6}$/.test(clean)) {
    return clean;
  }

  // 1. Direct dictionary lookup
  if (AREA_PINCODE_MAP[clean]) {
    return AREA_PINCODE_MAP[clean];
  }

  // 2. Full Multi-City Auto-Generate Pincode
  return autoGeneratePincode(cityName, clean);
};

/**
 * Returns the matching locality/area for a 6-digit pincode across all cities.
 */
export const getAreaForPincode = (pincode) => {
  if (!pincode) return null;
  const pin = pincode.toString().trim();
  const loc = getLocationByPincode(pin);
  if (loc) return loc.name;
  if (PINCODE_AREA_MAP[pin]) {
    return PINCODE_AREA_MAP[pin];
  }
  const match = serviceAreasData.find(a => a.pincodes.includes(pin));
  return match ? match.name : null;
};

// Complete structured list of Mumbai Western Corridor localities for clean select dropdowns
export const MUMBAI_LOCALITIES = [
  // 🚆 Virar to Churchgate Western Corridor Sequence
  { name: "Virar West", label: "Virar West (401303)", pincode: "401303" },
  { name: "Virar East", label: "Virar East (401305)", pincode: "401305" },
  { name: "Nalasopara West", label: "Nalasopara West (401203)", pincode: "401203" },
  { name: "Nalasopara East", label: "Nalasopara East (401209)", pincode: "401209" },
  { name: "Vasai West", label: "Vasai West (401201)", pincode: "401201" },
  { name: "Vasai East", label: "Vasai East (401202)", pincode: "401202" },
  { name: "Naigaon West", label: "Naigaon West (401207)", pincode: "401207" },
  { name: "Naigaon East", label: "Naigaon East (401208)", pincode: "401208" },
  { name: "Bhayandar West", label: "Bhayandar West (401101)", pincode: "401101" },
  { name: "Bhayandar East", label: "Bhayandar East (401105)", pincode: "401105" },
  { name: "Mira Road", label: "Mira Road (401107)", pincode: "401107" },
  { name: "Dahisar West", label: "Dahisar West (400068)", pincode: "400068" },
  { name: "Dahisar East", label: "Dahisar East (400068)", pincode: "400068" },
  { name: "Borivali East", label: "Borivali East - Sukkarwadi / Cartan No. 8 (Main Office - 400066)", pincode: "400066" },
  { name: "Borivali West", label: "Borivali West (400092)", pincode: "400092" },
  { name: "Kandivali West", label: "Kandivali West (400067)", pincode: "400067" },
  { name: "Kandivali East", label: "Kandivali East (400101)", pincode: "400101" },
  { name: "Malad West", label: "Malad West (400064)", pincode: "400064" },
  { name: "Malad East", label: "Malad East (400097)", pincode: "400097" },
  { name: "Goregaon West", label: "Goregaon West (400062)", pincode: "400062" },
  { name: "Goregaon East", label: "Goregaon East (400063)", pincode: "400063" },
  { name: "Ram Mandir / Oshiwara", label: "Ram Mandir / Oshiwara (400104)", pincode: "400104" },
  { name: "Jogeshwari West", label: "Jogeshwari West (400102)", pincode: "400102" },
  { name: "Jogeshwari East", label: "Jogeshwari East (400060)", pincode: "400060" },
  { name: "Andheri West", label: "Andheri West (400053)", pincode: "400053" },
  { name: "Andheri East", label: "Andheri East (400069)", pincode: "400069" },
  { name: "Vile Parle West", label: "Vile Parle West (400056)", pincode: "400056" },
  { name: "Vile Parle East", label: "Vile Parle East (400057)", pincode: "400057" },
  { name: "Santacruz West", label: "Santacruz West (400054)", pincode: "400054" },
  { name: "Santacruz East", label: "Santacruz East (400055)", pincode: "400055" },
  { name: "Khar Road / Khar West", label: "Khar Road / Khar West (400052)", pincode: "400052" },
  { name: "Bandra West", label: "Bandra West (400050)", pincode: "400050" },
  { name: "Bandra East / BKC", label: "Bandra East / BKC (400051)", pincode: "400051" },
  { name: "Mahim West", label: "Mahim West (400016)", pincode: "400016" },
  { name: "Matunga Road", label: "Matunga Road (400019)", pincode: "400019" },
  { name: "Dadar West", label: "Dadar West (400028)", pincode: "400028" },
  { name: "Dadar East", label: "Dadar East (400014)", pincode: "400014" },
  { name: "Prabhadevi", label: "Prabhadevi (400025)", pincode: "400025" },
  { name: "Lower Parel", label: "Lower Parel (400013)", pincode: "400013" },
  { name: "Worli", label: "Worli (400018)", pincode: "400018" },
  { name: "Mahalaxmi", label: "Mahalaxmi (400011)", pincode: "400011" },
  { name: "Mumbai Central", label: "Mumbai Central (400008)", pincode: "400008" },
  { name: "Grant Road", label: "Grant Road (400007)", pincode: "400007" },
  { name: "Charni Road / Girgaon", label: "Charni Road / Girgaon (400004)", pincode: "400004" },
  { name: "Marine Lines", label: "Marine Lines (400002)", pincode: "400002" },
  { name: "Churchgate", label: "Churchgate (400020)", pincode: "400020" },
  { name: "Fort / Nariman Point", label: "Fort / Nariman Point (400001)", pincode: "400001" },
  { name: "Colaba / Cuffe Parade", label: "Colaba / Cuffe Parade (400005)", pincode: "400005" }
];

// Expanded searchable database of Mumbai areas, sub-zones, and popular landmarks across Virar to Churchgate
export const MUMBAI_ALL_SUBZONES = [
  // 🚆 Virar (401303 / 401305)
  { name: "Virar", parentArea: "Virar", pincode: "401303", keywords: "virar station west east bolinj viva college agashi arnala" },
  { name: "Virar West", parentArea: "Virar", pincode: "401303", keywords: "virar west bolinj yazoo park viva college arnala beach road" },
  { name: "Virar East", parentArea: "Virar", pincode: "401305", keywords: "virar east manvelpada phoolpada chandansar jivdani temple" },
  { name: "Bolinj", parentArea: "Virar", pincode: "401303", keywords: "bolinj virar west agashi road viva college" },

  // 🚆 Nalasopara (401203 / 401209)
  { name: "Nalasopara", parentArea: "Nalasopara", pincode: "401203", keywords: "nalasopara station west east sopara" },
  { name: "Nalasopara West", parentArea: "Nalasopara", pincode: "401203", keywords: "nalasopara west sriprastha samel pada nilemore patankar park" },
  { name: "Nalasopara East", parentArea: "Nalasopara", pincode: "401209", keywords: "nalasopara east achole road central park tulinj road dhaniv baug" },

  // 🚆 Vasai (401201 / 401202)
  { name: "Vasai", parentArea: "Vasai", pincode: "401201", keywords: "vasai station west east fort stella babhola" },
  { name: "Vasai West", parentArea: "Vasai", pincode: "401201", keywords: "vasai west stella babhola manickpur kaul heritage bhabha hospital" },
  { name: "Vasai East", parentArea: "Vasai", pincode: "401202", keywords: "vasai east evershine city waliv fatherwadi gokhivare" },

  // 🚆 Naigaon (401207 / 401208)
  { name: "Naigaon", parentArea: "Naigaon", pincode: "401207", keywords: "naigaon station west east sunteck" },
  { name: "Naigaon West", parentArea: "Naigaon", pincode: "401207", keywords: "naigaon west mariam nagar umela station road" },
  { name: "Naigaon East", parentArea: "Naigaon", pincode: "401208", keywords: "naigaon east sunteck city juchandra mittal enclave" },

  // 🚆 Bhayandar (401101 / 401105)
  { name: "Bhayandar", parentArea: "Bhayandar", pincode: "401101", keywords: "bhayandar station west east maxus golden nest" },
  { name: "Bhayandar West", parentArea: "Bhayandar", pincode: "401101", keywords: "bhayandar west maxus mall 150 feet road temba hospital station road" },
  { name: "Bhayandar East", parentArea: "Bhayandar", pincode: "401105", keywords: "bhayandar east golden nest navghar indralok jesal park deepak hospital" },

  // 🚆 Mira Road (401107)
  { name: "Mira Road", parentArea: "Mira Road", pincode: "401107", keywords: "mira road station shanti nagar beverly park poonam sagar silver park kanakia lodha" },
  { name: "Mira Road East", parentArea: "Mira Road", pincode: "401107", keywords: "mira road east shanti park jangid enclave silver park rna broadway" },

  // 🚆 Dahisar (400068)
  { name: "Dahisar", parentArea: "Dahisar", pincode: "400068", keywords: "dahisar station rly market" },
  { name: "Dahisar East", parentArea: "Dahisar", pincode: "400068", keywords: "dahisar east rawalpada anand nagar ketkipada" },
  { name: "Dahisar West", parentArea: "Dahisar", pincode: "400068", keywords: "dahisar west kandarpada shailendra nagar link road" },
  { name: "Rawalpada", parentArea: "Dahisar", pincode: "400068", keywords: "rawalpada dahisar east" },
  { name: "Kandarpada", parentArea: "Dahisar", pincode: "400068", keywords: "kandarpada dahisar west" },
  { name: "Shailendra Nagar", parentArea: "Dahisar", pincode: "400068", keywords: "shailendra nagar dahisar east" },
  { name: "Anand Nagar (Dahisar)", parentArea: "Dahisar", pincode: "400068", keywords: "anand nagar check naka toll" },

  // 🚆 Borivali (400066 / 400092) - Main Office: Cartan Road No. 8, Sukkarwadi
  { name: "Borivali", parentArea: "Borivali", pincode: "400066", keywords: "borivali boriwali station west east main office" },
  { name: "Borivali East", parentArea: "Borivali", pincode: "400066", keywords: "borivali east cartan road no 8 sukkarwadi carten no 8 main office hq national park magathane omkareshwar rajendra nagar" },
  { name: "Sukkarwadi", parentArea: "Borivali", pincode: "400066", keywords: "sukkarwadi cartan no 8 carten no 8 borivali east main office head office bus station station road" },
  { name: "Cartan Road No. 8", parentArea: "Borivali", pincode: "400066", keywords: "cartan no 8 carten no 8 cartan road sukkarwadi borivali east central command desk workshop main office" },
  { name: "Borivali West", parentArea: "Borivali", pincode: "400092", keywords: "borivali west shimpoli ic colony gorai eksar chikuwadi vazira naka" },
  { name: "IC Colony", parentArea: "Borivali", pincode: "400066", keywords: "ic colony borivali west holy cross extension" },
  { name: "Shimpoli", parentArea: "Borivali", pincode: "400092", keywords: "shimpoli road kastur park borivali west" },
  { name: "Gorai", parentArea: "Borivali", pincode: "400092", keywords: "gorai 1 gorai 2 creek pagoda borivali west" },
  { name: "Eksar", parentArea: "Borivali", pincode: "400092", keywords: "eksar road borivali west devidas lane" },
  { name: "Chikuwadi", parentArea: "Borivali", pincode: "400092", keywords: "chikuwadi link road borivali west" },
  { name: "Magathane", parentArea: "Borivali", pincode: "400066", keywords: "magathane depot borivali east tata power" },
  { name: "National Park (SGNP)", parentArea: "Borivali", pincode: "400066", keywords: "sgnp borivali east kanheri caves" },

  // 🚆 Kandivali (400067 / 400101)
  { name: "Kandivali", parentArea: "Kandivali", pincode: "400067", keywords: "kandivali station west east" },
  { name: "Kandivali West", parentArea: "Kandivali", pincode: "400067", keywords: "kandivali west mahavir nagar charkop shankar lane dhanukar wadi" },
  { name: "Kandivali East", parentArea: "Kandivali", pincode: "400101", keywords: "kandivali east thakur village thakur complex lokhandwala township alika nagar samata nagar" },
  { name: "Mahavir Nagar", parentArea: "Kandivali", pincode: "400067", keywords: "mahavir nagar dahanukar wadi kandivali west" },
  { name: "Charkop", parentArea: "Kandivali", pincode: "400067", keywords: "charkop sector 1 to 9 kandivali west mhb colony" },
  { name: "Thakur Village", parentArea: "Kandivali", pincode: "400101", keywords: "thakur village kandivali east national park boundary" },
  { name: "Thakur Complex", parentArea: "Kandivali", pincode: "400101", keywords: "thakur complex 90 feet road kandivali east" },
  { name: "Lokhandwala Township", parentArea: "Kandivali", pincode: "400101", keywords: "lokhandwala township kandivali east akurli road" },
  { name: "Poisar", parentArea: "Kandivali", pincode: "400067", keywords: "poisar sv road kandivali west bus depot" },

  // 🚆 Malad (400064 / 400097)
  { name: "Malad", parentArea: "Malad", pincode: "400064", keywords: "malad west east station" },
  { name: "Malad West", parentArea: "Malad", pincode: "400064", keywords: "malad west link road mindspace orlem marve chincholi sunder nagar" },
  { name: "Malad East", parentArea: "Malad", pincode: "400097", keywords: "malad east dindoshi pathanwadi daftary road kurar village" },
  { name: "Mindspace", parentArea: "Malad", pincode: "400064", keywords: "mindspace infinity mall link road malad west" },
  { name: "Orlem", parentArea: "Malad", pincode: "400064", keywords: "orlem church marve road malad west" },
  { name: "Marve Road", parentArea: "Malad", pincode: "400064", keywords: "marve road aksa beach malad west" },
  { name: "Dindoshi", parentArea: "Malad", pincode: "400097", keywords: "dindoshi court oberoi mall malad east film city road" },
  { name: "Evershine Nagar", parentArea: "Malad", pincode: "400064", keywords: "evershine nagar malad west" },

  // 🚆 Goregaon (400062 / 400063) & Ram Mandir (400104)
  { name: "Goregaon", parentArea: "Goregaon", pincode: "400062", keywords: "goregaon station west east" },
  { name: "Goregaon West", parentArea: "Goregaon", pincode: "400062", keywords: "goregaon west bangur nagar motilal nagar link road sv road prem nagar" },
  { name: "Goregaon East", parentArea: "Goregaon", pincode: "400063", keywords: "goregaon east aarey milk colony gokuldham film city dindoshi nagar nagari nivara" },
  { name: "Ram Mandir", parentArea: "Goregaon", pincode: "400104", keywords: "ram mandir station mrinal tai gore flyover oshiwara link road" },
  { name: "Bangur Nagar", parentArea: "Goregaon", pincode: "400062", keywords: "bangur nagar link road goregaon west inorbit mall" },
  { name: "Aarey Colony", parentArea: "Goregaon", pincode: "400065", keywords: "aarey milk colony royal palms unit goregaon east" },
  { name: "Gokuldham", parentArea: "Goregaon", pincode: "400063", keywords: "gokuldham yashodham krishna vatika goregaon east" },
  { name: "Motilal Nagar", parentArea: "Goregaon", pincode: "400062", keywords: "motilal nagar 1 2 3 goregaon west" },

  // 🚆 Jogeshwari (400102 / 400060)
  { name: "Jogeshwari", parentArea: "Jogeshwari", pincode: "400102", keywords: "jogeshwari west east caves" },
  { name: "Jogeshwari West", parentArea: "Jogeshwari", pincode: "400102", keywords: "jogeshwari west oshiwara behram baug sv road" },
  { name: "Jogeshwari East", parentArea: "Jogeshwari", pincode: "400060", keywords: "jogeshwari east majas depot meghwadi sarvodaya nagar" },
  { name: "Oshiwara", parentArea: "Jogeshwari", pincode: "400102", keywords: "oshiwara furniture market link road jogeshwari west" },

  // 🚆 Andheri (400053 / 400058 / 400069 / 400099)
  { name: "Andheri", parentArea: "Andheri", pincode: "400053", keywords: "andheri station metro west east" },
  { name: "Andheri West", parentArea: "Andheri", pincode: "400053", keywords: "andheri west lokhandwala versova dn nagar veera desai four bungalows seven bungalows" },
  { name: "Andheri East", parentArea: "Andheri", pincode: "400069", keywords: "andheri east jb nagar marol chakala sakinaka midc seepz sahar airport" },
  { name: "Lokhandwala Complex", parentArea: "Andheri", pincode: "400053", keywords: "lokhandwala complex market back road andheri west" },
  { name: "Versova", parentArea: "Andheri", pincode: "400061", keywords: "versova beach yari road kalyan complex andheri west" },
  { name: "JB Nagar", parentArea: "Andheri", pincode: "400059", keywords: "jb nagar metro station tarun bharat andheri east" },
  { name: "Marol", parentArea: "Andheri", pincode: "400059", keywords: "marol naka marol military road fire brigade andheri east" },
  { name: "Chakala", parentArea: "Andheri", pincode: "400099", keywords: "chakala midc cigfil solitaire park andheri east" },
  { name: "Sakinaka", parentArea: "Andheri", pincode: "400072", keywords: "sakinaka junction metro 90 feet road andheri east" },

  // 🚆 Vile Parle (400056 / 400057)
  { name: "Vile Parle", parentArea: "Vile Parle", pincode: "400057", keywords: "vile parle parle station west east" },
  { name: "Vile Parle West", parentArea: "Vile Parle", pincode: "400056", keywords: "vile parle west irla juhu scheme sv road cooper hospital" },
  { name: "Vile Parle East", parentArea: "Vile Parle", pincode: "400057", keywords: "vile parle east subhash road nehru road domestic airport" },
  { name: "Juhu", parentArea: "Vile Parle", pincode: "400049", keywords: "juhu beach juhu tara road isckon palm grove hotel" },
  { name: "Irla", parentArea: "Vile Parle", pincode: "400056", keywords: "irla market prime mall vile parle west" },

  // 🚆 Santacruz & Khar (400054 / 400055 / 400052)
  { name: "Santacruz", parentArea: "Santacruz", pincode: "400054", keywords: "santacruz west east station" },
  { name: "Santacruz West", parentArea: "Santacruz", pincode: "400054", keywords: "santacruz west linking road tagore road khira nagar" },
  { name: "Santacruz East", parentArea: "Santacruz", pincode: "400055", keywords: "santacruz east vakola kalina cst road prabhat colony" },
  { name: "Kalina", parentArea: "Santacruz", pincode: "400098", keywords: "kalina mumbai university cst road santacruz east" },
  { name: "Khar Road", parentArea: "Khar", pincode: "400052", keywords: "khar road station linking road khar danda 14th road madhu park khar west" },
  { name: "Khar West", parentArea: "Khar", pincode: "400052", keywords: "khar west linking road ramkrishna mission unnat nagar" },

  // 🚆 Bandra (400050 / 400051)
  { name: "Bandra", parentArea: "Bandra", pincode: "400050", keywords: "bandra west east bkc station" },
  { name: "Bandra West", parentArea: "Bandra", pincode: "400050", keywords: "bandra west hill road linking road pali hill carter road bandstand bandra reclamation" },
  { name: "Bandra East", parentArea: "Bandra", pincode: "400051", keywords: "bandra east bkc bandra kurla complex kalanagar government colony" },
  { name: "BKC (Bandra Kurla Complex)", parentArea: "Bandra", pincode: "400051", keywords: "bkc mca icici trident mmrda grounds bandra east" },

  // 🚆 Mahim & Matunga Road (400016 / 400019)
  { name: "Mahim", parentArea: "Mahim", pincode: "400016", keywords: "mahim station west lj road cadell road mahim dargah paradise cinema" },
  { name: "Mahim West", parentArea: "Mahim", pincode: "400016", keywords: "mahim west mori road lady jamshedji road" },
  { name: "Matunga Road", parentArea: "Mahim", pincode: "400019", keywords: "matunga road station ruparel college senapati bapat marg" },

  // 🚆 Dadar (400028 / 400014)
  { name: "Dadar", parentArea: "Dadar", pincode: "400028", keywords: "dadar west east station shivaji park tt circle plaza ranade road" },
  { name: "Dadar West", parentArea: "Dadar", pincode: "400028", keywords: "dadar west shivaji park ranade road plaza cinema sena bhavan kirtikar market" },
  { name: "Dadar East", parentArea: "Dadar", pincode: "400014", keywords: "dadar east tt circle hindmata chitra cinema swaminarayan temple" },
  { name: "Shivaji Park", parentArea: "Dadar", pincode: "400028", keywords: "shivaji park ground scouts pavilion catering college dadar west" },

  // 🚆 Prabhadevi, Lower Parel & Worli (400025 / 400013 / 400018)
  { name: "Prabhadevi", parentArea: "Prabhadevi", pincode: "400025", keywords: "prabhadevi siddhivinayak temple elphinstone station khed galli" },
  { name: "Lower Parel", parentArea: "Lower Parel", pincode: "400013", keywords: "lower parel high street phoenix palladium kamala mills mathuradas mill" },
  { name: "Worli", parentArea: "Worli", pincode: "400018", keywords: "worli sea face atria mall nehru science centre nehru planetarium bdd chawls" },

  // 🚆 Mahalaxmi, Mumbai Central & Grant Road (400011 / 400008 / 400007)
  { name: "Mahalaxmi", parentArea: "Mahalaxmi", pincode: "400011", keywords: "mahalaxmi race course dhobi ghat saat rasta jacob circle" },
  { name: "Mumbai Central", parentArea: "Mumbai Central", pincode: "400008", keywords: "mumbai central station maratha mandir bellasis road nair hospital tardeo" },
  { name: "Grant Road", parentArea: "Grant Road", pincode: "400007", keywords: "grant road lamington road electronics market nana chowk bhatia hospital" },

  // 🚆 Charni Road, Marine Lines & Churchgate (400004 / 400002 / 400020 / 400001 / 400005)
  { name: "Charni Road", parentArea: "Charni Road", pincode: "400004", keywords: "charni road girgaon chowpatty opera house cp tank hinduja college" },
  { name: "Girgaon", parentArea: "Charni Road", pincode: "400004", keywords: "girgaon chowpatty khadilkar road prarthana samaj" },
  { name: "Marine Lines", parentArea: "Marine Lines", pincode: "400002", keywords: "marine lines station metro cinema princess street dhobi talao kalbadevi" },
  { name: "Churchgate", parentArea: "Churchgate", pincode: "400020", keywords: "churchgate station oval maidan marine drive brabourne stadium veer nariman road kc college hr college" },
  { name: "Marine Drive", parentArea: "Churchgate", pincode: "400020", keywords: "marine drive queens necklace sea promenade nariman point churchgate" },
  { name: "Fort", parentArea: "Churchgate", pincode: "400001", keywords: "fort flora fountain cst bse bombay stock exchange ballard estate kala ghoda" },
  { name: "Nariman Point", parentArea: "Churchgate", pincode: "400021", keywords: "nariman point ncpa express towers air india building vidhin bhavan" },
  { name: "Colaba", parentArea: "Churchgate", pincode: "400005", keywords: "colaba causeway gateway of india taj hotel strand cinema" },
  { name: "Cuffe Parade", parentArea: "Churchgate", pincode: "400005", keywords: "cuffe parade world trade centre badhwar park president hotel" }
];

/**
 * Searches ANY Mumbai area or sub-zone by name, locality, or pincode.
 * Returns up to 12 matching localities with automatic pincodes.
 */
export const searchMumbaiAreas = (searchTerm) => {
  if (!searchTerm || typeof searchTerm !== "string" || searchTerm.trim().length === 0) {
    return MUMBAI_ALL_SUBZONES.slice(0, 10);
  }
  const clean = searchTerm.toLowerCase().trim();
  const matches = MUMBAI_ALL_SUBZONES.filter((item) => {
    return (
      item.name.toLowerCase().includes(clean) ||
      item.parentArea.toLowerCase().includes(clean) ||
      item.pincode.includes(clean) ||
      (item.keywords && item.keywords.includes(clean))
    );
  });

  return matches.slice(0, 12);
};

// Mumbai GPS Coordinate Reference Centroids for Auto-Detecting Customer Location (Virar to Churchgate Corridor)
export const MUMBAI_COORDINATES_MAP = [
  { name: "Virar West", pincode: "401303", lat: 19.467, lng: 72.805 },
  { name: "Nalasopara West", pincode: "401203", lat: 19.418, lng: 72.808 },
  { name: "Vasai West", pincode: "401201", lat: 19.364, lng: 72.812 },
  { name: "Mira Road", pincode: "401107", lat: 19.281, lng: 72.856 },
  { name: "Dahisar", pincode: "400068", lat: 19.255, lng: 72.859 },
  { name: "Borivali East", pincode: "400066", lat: 19.232, lng: 72.864 },
  { name: "Borivali West", pincode: "400092", lat: 19.231, lng: 72.845 },
  { name: "Kandivali West", pincode: "400067", lat: 19.206, lng: 72.842 },
  { name: "Kandivali East", pincode: "400101", lat: 19.207, lng: 72.868 },
  { name: "Malad West", pincode: "400064", lat: 19.186, lng: 72.836 },
  { name: "Malad East", pincode: "400097", lat: 19.183, lng: 72.862 },
  { name: "Goregaon West", pincode: "400062", lat: 19.163, lng: 72.837 },
  { name: "Goregaon East", pincode: "400063", lat: 19.165, lng: 72.862 },
  { name: "Jogeshwari West", pincode: "400102", lat: 19.139, lng: 72.841 },
  { name: "Andheri West", pincode: "400053", lat: 19.119, lng: 72.832 },
  { name: "Andheri East", pincode: "400069", lat: 19.117, lng: 72.865 },
  { name: "Vile Parle", pincode: "400057", lat: 19.098, lng: 72.848 },
  { name: "Santacruz", pincode: "400054", lat: 19.083, lng: 72.841 },
  { name: "Bandra West", pincode: "400050", lat: 19.055, lng: 72.833 },
  { name: "Bandra East", pincode: "400051", lat: 19.062, lng: 72.855 },
  { name: "Dadar West", pincode: "400028", lat: 19.019, lng: 72.843 },
  { name: "Lower Parel", pincode: "400013", lat: 18.995, lng: 72.830 },
  { name: "Mumbai Central", pincode: "400008", lat: 18.969, lng: 72.819 },
  { name: "Churchgate", pincode: "400020", lat: 18.932, lng: 72.827 }
];

/**
 * Resolves user GPS coordinates (latitude & longitude) to the closest Mumbai locality.
 */
export const matchCoordinatesToMumbaiArea = (userLat, userLng) => {
  let closest = MUMBAI_COORDINATES_MAP[0];
  let minDistance = Infinity;

  for (const loc of MUMBAI_COORDINATES_MAP) {
    const dLat = userLat - loc.lat;
    const dLng = userLng - loc.lng;
    const distSq = dLat * dLat + dLng * dLng;
    if (distSq < minDistance) {
      minDistance = distSq;
      closest = loc;
    }
  }

  return closest;
};

/**
 * Returns a direct Google Maps navigation URL for a customer doorstep address.
 */
export const getGoogleMapsUrl = (flat, society, area, pincode) => {
  const query = `${flat || ""} ${society || ""}, ${area || ""}, Mumbai - ${pincode || ""}`.trim();
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
};


