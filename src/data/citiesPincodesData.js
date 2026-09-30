/**
 * Comprehensive All-India Cities, Areas, and Pincodes Database.
 * Supports auto-generating pincodes from city name, area name, or keywords.
 */

export const ALL_CITIES_DATA = [
  {
    cityName: "Mumbai",
    state: "Maharashtra",
    isPrimaryHub: true,
    avgArrival: "20 - 35 mins (Primary Hub)",
    activeTechnicians: 8,
    areas: [
      // 🚆 Mumbai Western Line Corridor: Virar to Churchgate
      { name: "Virar West", pincode: "401303", keywords: "virar west bolinj yazoo park arnala road viva college station" },
      { name: "Virar East", pincode: "401305", keywords: "virar east manvelpada phoolpada station road viva college" },
      { name: "Nalasopara West", pincode: "401203", keywords: "nalasopara west sriprastha samel pada nilemore patankar park" },
      { name: "Nalasopara East", pincode: "401209", keywords: "nalasopara east achole road central park tulinj road dhaniv baug" },
      { name: "Vasai West", pincode: "401201", keywords: "vasai west stella babhola manickpur kaul heritage bhabha hospital" },
      { name: "Vasai East", pincode: "401202", keywords: "vasai east evershine city waliv fatherwadi gokhivare" },
      { name: "Naigaon West", pincode: "401207", keywords: "naigaon west mariam nagar umela station road" },
      { name: "Naigaon East", pincode: "401208", keywords: "naigaon east sunteck city juchandra mittal enclave" },
      { name: "Bhayandar West", pincode: "401101", keywords: "bhayandar west maxus mall 150 feet road temba hospital station road" },
      { name: "Bhayandar East", pincode: "401105", keywords: "bhayandar east golden nest navghar indralok jesal park deepak hospital" },
      { name: "Mira Road East", pincode: "401107", keywords: "mira road shanti nagar beverly park poonam sagar silver park kanakia lodha aqua" },
      { name: "Dahisar West", pincode: "400068", keywords: "dahisar west kandarpada shailendra nagar link road" },
      { name: "Dahisar East", pincode: "400068", keywords: "dahisar east rawalpada anand nagar check naka ketkipada" },
      { name: "Borivali West", pincode: "400092", keywords: "borivali west shimpoli gorai ic colony eksar chikuwadi vazira naka" },
      { name: "Borivali East (Sukkarwadi / Cartan No. 8 - Main Office)", pincode: "400066", keywords: "borivali east cartan road no 8 carten no 8 sukkarwadi main office hq national park sgnp magathane omkareshwar rajendra nagar kulupwadi" },
      { name: "Sukkarwadi (Borivali East)", pincode: "400066", keywords: "sukkarwadi cartan no 8 carten road borivali east main office central hq bus station" },
      { name: "Kandivali West", pincode: "400067", keywords: "kandivali west mahavir nagar charkop poisar dahanukar wadi shankar lane" },
      { name: "Kandivali East", pincode: "400101", keywords: "kandivali east thakur village thakur complex lokhandwala township alika nagar" },
      { name: "Malad West", pincode: "400064", keywords: "malad west mindspace orlem marve road link road chincholi bunder evershine" },
      { name: "Malad East", pincode: "400097", keywords: "malad east dindoshi pathanwadi daftary road kurar village oberoi mall" },
      { name: "Goregaon West", pincode: "400062", keywords: "goregaon west bangur nagar motilal nagar link road sv road inorbit mall" },
      { name: "Goregaon East", pincode: "400063", keywords: "goregaon east gokuldham film city aarey colony dindoshi nagari nivara" },
      { name: "Ram Mandir / Oshiwara", pincode: "400104", keywords: "ram mandir oshiwara station sv road link road relience" },
      { name: "Jogeshwari West", pincode: "400102", keywords: "jogeshwari west oshiwar behram baug sv road relief road millat nagar" },
      { name: "Jogeshwari East", pincode: "400060", keywords: "jogeshwari east majas depot meghwadi sarvodaya caves road" },
      { name: "Andheri West", pincode: "400053", keywords: "andheri west lokhandwala versova veera desai dn nagar four bungalows" },
      { name: "Andheri East", pincode: "400069", keywords: "andheri east marol chakala jb nagar seepz midc sakinaka airport" },
      { name: "Vile Parle West", pincode: "400056", keywords: "vile parle west juhu scheme irla prime mall sv road cooper hospital" },
      { name: "Vile Parle East", pincode: "400057", keywords: "vile parle east subhash road nehru road domestic airport parle tilak" },
      { name: "Santacruz West", pincode: "400054", keywords: "santacruz west linking road tagore road khira nagar juhu tara" },
      { name: "Santacruz East", pincode: "400055", keywords: "santacruz east kalina vakola cst road mumbai university" },
      { name: "Khar West / Khar Road", pincode: "400052", keywords: "khar west khar road linking road khar danda 14th road madhu park" },
      { name: "Bandra West", pincode: "400050", keywords: "bandra west hill road linking road pali hill carter road bandstand" },
      { name: "Bandra East / BKC", pincode: "400051", keywords: "bandra east bkc bandra kurla complex kalanagar govt colony" },
      { name: "Mahim", pincode: "400016", keywords: "mahim west lj road paradise cinema cadell road lady jamshedji road" },
      { name: "Matunga Road", pincode: "400019", keywords: "matunga road ruparel college shivaji park senapati bapat" },
      { name: "Dadar West", pincode: "400028", keywords: "dadar west shivaji park ranade road plaza cinema chhabildas sena bhavan" },
      { name: "Dadar East", pincode: "400014", keywords: "dadar east hindmata tt circle swami narayan temple khodadad circle" },
      { name: "Prabhadevi / Elphinstone", pincode: "400025", keywords: "prabhadevi elphinstone siddhivinayak temple twin towers cadell road senapati bapat" },
      { name: "Lower Parel", pincode: "400013", keywords: "lower parel high street phoenix palladium kamala mills mathuradas mills peninsula" },
      { name: "Worli", pincode: "400018", keywords: "worli sea face atria mall nehru planetarium bdd chawl worli naka" },
      { name: "Mahalaxmi / Jacob Circle", pincode: "400011", keywords: "mahalaxmi racecourse saat rasta keshavrao khadye dhobi ghat jacob circle" },
      { name: "Mumbai Central", pincode: "400008", keywords: "mumbai central maratha mandir nair hospital bellasis road tardeo station" },
      { name: "Grant Road", pincode: "400007", keywords: "grant road lamington road nana chowk bhatia hospital sleater road foras" },
      { name: "Charni Road / Girgaon", pincode: "400004", keywords: "charni road girgaon chowpatty opera house cp tank prarthana samaj hinduja" },
      { name: "Marine Lines", pincode: "400002", keywords: "marine lines princess street metro cinema dhobi talao kalbadevi marine drive" },
      { name: "Churchgate", pincode: "400020", keywords: "churchgate station oval maidan brabourne stadium marine drive veer nariman kc college" },
      { name: "Fort / Nariman Point", pincode: "400001", keywords: "fort nariman point flora fountain cst bse ballard estate reserve bank" },
      { name: "Colaba / Cuffe Parade", pincode: "400005", keywords: "colaba cuffe parade gateway of india strand wtc colaba causeway" },
      // Eastern / Central Suburbs
      { name: "Powai", pincode: "400076", keywords: "hiranandani gardens iit bombay lake l&t gate" },
      { name: "Ghatkopar West", pincode: "400086", keywords: "lbs marg r city mall amrut nagar" },
      { name: "Ghatkopar East", pincode: "400077", keywords: "pant nagar garodia nagar station" },
      { name: "Mulund West", pincode: "400080", keywords: "lbs marg model town sarvodaya nagar" },
      { name: "Mulund East", pincode: "400081", keywords: "mithagar road kelkar college" },
      { name: "Chembur", pincode: "400071", keywords: "diamond garden pestom sagar sindhi society rcf" },
      { name: "Kurla West", pincode: "400070", keywords: "phoenix marketcity lbs marg station" }
    ]
  },
  {
    cityName: "Thane",
    state: "Maharashtra",
    avgArrival: "30 - 45 mins",
    activeTechnicians: 5,
    areas: [
      { name: "Thane West (Naupada / Station)", pincode: "400601", keywords: "naupada ram maruti road gokhale station" },
      { name: "Majiwada", pincode: "400601", keywords: "viviana mall lodha i-think rustomjee" },
      { name: "Ghodbunder Road", pincode: "400615", keywords: "waghbil brahmand kasarvadavali ovala gaimukh" },
      { name: "Vartak Nagar", pincode: "400606", keywords: "kores pokhran road 1 vedant complex" },
      { name: "Hiranandani Estate", pincode: "400607", keywords: "patlipada hiranandani estate rodash amphi tcs" },
      { name: "Kasarvadavali", pincode: "400615", keywords: "hypercity ghodbunder road dmart" },
      { name: "Kopri (Thane East)", pincode: "400603", keywords: "thane east station kopri colony daulat nagar" },
      { name: "Wagle Estate", pincode: "400604", keywords: "road no 16 midc industrial passport office" },
      { name: "Kalwa", pincode: "400605", keywords: "manisha nagar shastri nagar kalwa bridge" }
    ]
  },
  {
    cityName: "Navi Mumbai",
    state: "Maharashtra",
    avgArrival: "35 - 50 mins",
    activeTechnicians: 4,
    areas: [
      { name: "Vashi", pincode: "400703", keywords: "sector 17 inorbit rly station apmc market arena" },
      { name: "Nerul", pincode: "400706", keywords: "sector 19 dy patil palm beach road jewel" },
      { name: "Kharghar", pincode: "400710", keywords: "utsav chowk sector 20 central park golf course" },
      { name: "CBD Belapur", pincode: "400614", keywords: "sector 11 station konkan bhavan croma" },
      { name: "Seawoods", pincode: "400706", keywords: "grand central mall sector 40 sector 42" },
      { name: "Airoli", pincode: "400708", keywords: "mindspace it park sector 5 sector 8 mulund bridge" },
      { name: "Ghansoli", pincode: "400701", keywords: "reliance corporate park rcp station sector 4" },
      { name: "Koparkhairane", pincode: "400709", keywords: "sector 14 d-mart station mahavir nagar" },
      { name: "Sanpada", pincode: "400705", keywords: "millennium tower palm beach moraj" },
      { name: "Panvel", pincode: "410206", keywords: "khanda colony old panvel new panvel station" }
    ]
  },
  {
    cityName: "Pune",
    state: "Maharashtra",
    avgArrival: "Same-Day Dispatch",
    activeTechnicians: 4,
    areas: [
      { name: "Kothrud", pincode: "411038", keywords: "paud road chandani chowk karve statue mit" },
      { name: "Shivaji Nagar", pincode: "411005", keywords: "fc road jm road agriculture college coep" },
      { name: "Viman Nagar", pincode: "411014", keywords: "phoenix marketcity symbiosis airport road" },
      { name: "Hinjewadi", pincode: "411057", keywords: "phase 1 phase 2 phase 3 it park wipro infosys" },
      { name: "Baner", pincode: "411045", keywords: "pashan link road balewadi high street dmart" },
      { name: "Wakad", pincode: "411057", keywords: "dange chowk bhumkar chowk datta mandir" },
      { name: "Hadapsar", pincode: "411028", keywords: "magarpatta city amanora seasons mall sp infocity" },
      { name: "Aundh", pincode: "411007", keywords: "iti road bremen chowk westend mall dp road" },
      { name: "Kalyani Nagar", pincode: "411006", keywords: "east avenue bishop school jogger park bridge" },
      { name: "Koregaon Park", pincode: "411001", keywords: "north main road lane 5 osho ashram german bakery" },
      { name: "Pimpri Chinchwad", pincode: "411018", keywords: "pcmc station telco morwadi tata motors" }
    ]
  },
  {
    cityName: "Delhi / NCR",
    state: "Delhi",
    avgArrival: "Same-Day Dispatch",
    activeTechnicians: 5,
    areas: [
      { name: "Connaught Place", pincode: "110001", keywords: "cp rajiv chowk inner circle barakhamba" },
      { name: "Karol Bagh", pincode: "110005", keywords: "gandhi nagar pusa road ajmal khan market" },
      { name: "Hauz Khas", pincode: "110016", keywords: "hauz khas village iit flyover siri fort" },
      { name: "Saket", pincode: "110017", keywords: "select citywalk max hospital pvr anupam press enclave" },
      { name: "Dwarka", pincode: "110075", keywords: "sector 6 sector 10 sector 21 metro vegas mall" },
      { name: "Rohini", pincode: "110085", keywords: "sector 7 sector 9 sector 13 rithala metro" },
      { name: "Lajpat Nagar", pincode: "110024", keywords: "central market defence colony flyover ring road" },
      { name: "Noida Sector 18", pincode: "201301", keywords: "atta market wave mall dlf mall of india" },
      { name: "Noida Sector 62", pincode: "201309", keywords: "fortis hospital it hub electronic city metro" },
      { name: "Gurgaon Cyber City", pincode: "122002", keywords: "dlf cyber hub mg road sikanderpur metro" },
      { name: "Gurgaon Golf Course Road", pincode: "122003", keywords: "sector 54 sector 56 one horizon center" }
    ]
  },
  {
    cityName: "Bengaluru",
    state: "Karnataka",
    avgArrival: "Same-Day Dispatch",
    activeTechnicians: 5,
    areas: [
      { name: "Koramangala", pincode: "560034", keywords: "sony world junction forum mall 4th block 5th block" },
      { name: "Indiranagar", pincode: "560038", keywords: "100 feet road 12th main cmh road metro" },
      { name: "Whitefield", pincode: "560066", keywords: "itpl hope farm phoenix marketcity vr bengaluru" },
      { name: "HSR Layout", pincode: "560102", keywords: "sector 1 sector 2 sector 7 27th main bda complex" },
      { name: "Electronic City", pincode: "560100", keywords: "phase 1 infosys wipro elevated tollway phase 2" },
      { name: "Jayanagar", pincode: "560041", keywords: "4th block shopping complex 9th block south end" },
      { name: "Malleshwaram", pincode: "560003", keywords: "sampige road margosa road mantri square 8th cross" },
      { name: "Bellandur", pincode: "560103", keywords: "outer ring road ecospace ecoworld central mall" },
      { name: "Marathahalli", pincode: "560037", keywords: "bridge kalamandir orr junction spice garden" }
    ]
  },
  {
    cityName: "Hyderabad",
    state: "Telangana",
    avgArrival: "Same-Day Dispatch",
    activeTechnicians: 4,
    areas: [
      { name: "Banjara Hills", pincode: "500034", keywords: "road no 1 road no 12 gvk one care hospital" },
      { name: "Jubilee Hills", pincode: "500033", keywords: "road no 36 road no 45 checkpost peddamma temple" },
      { name: "Hitec City", pincode: "500081", keywords: "cyber towers mindspace inorbit mall t-hub" },
      { name: "Gachibowli", pincode: "500032", keywords: "orly stadium iiot wipro junction bio diversity" },
      { name: "Madhapur", pincode: "500081", keywords: "aavasa durgam cheruvu cable bridge metro" },
      { name: "Kukatpally", pincode: "500072", keywords: "kphb colony jntu forum sujana mall" },
      { name: "Secunderabad", pincode: "500003", keywords: "railway station clock tower pg road paradise" }
    ]
  },
  {
    cityName: "Ahmedabad",
    state: "Gujarat",
    avgArrival: "Same-Day Dispatch",
    activeTechnicians: 3,
    areas: [
      { name: "Navrangpura", pincode: "380009", keywords: "c g road gujarat university law garden mithakhali" },
      { name: "Satellite", pincode: "380015", keywords: "jodhpur cross road shivranjani isro star bazaar" },
      { name: "SG Highway", pincode: "380054", keywords: "iskcon cross road thaltej gota vaishnodevi" },
      { name: "Vastrapur", pincode: "380015", keywords: "iim ahmedabad vastrapur lake alpha one mall" },
      { name: "Bodakdev", pincode: "380054", keywords: "judges bungalow road sindhu bhavan rajpath club" },
      { name: "Maninagar", pincode: "380008", keywords: "kankaria lake railway station pushpakunj" }
    ]
  },
  {
    cityName: "Kolkata",
    state: "West Bengal",
    avgArrival: "Same-Day Dispatch",
    activeTechnicians: 3,
    areas: [
      { name: "Salt Lake (Bidhannagar)", pincode: "700091", keywords: "sector 1 sector 2 sector 5 it hub city centre 1" },
      { name: "New Town", pincode: "700156", keywords: "action area 1 eco park axis mall chinar park" },
      { name: "Park Street", pincode: "700016", keywords: "flurys allen park camac street st xaviers" },
      { name: "Ballygunge", pincode: "700019", keywords: "gariahat ballygunge circular road quest mall" },
      { name: "Howrah", pincode: "711101", keywords: "howrah station bridge shibpur mall" }
    ]
  },
  {
    cityName: "Chennai",
    state: "Tamil Nadu",
    avgArrival: "Same-Day Dispatch",
    activeTechnicians: 3,
    areas: [
      { name: "T. Nagar", pincode: "600017", keywords: "pond bazaar usman road panagal park ranganathan" },
      { name: "Anna Nagar", pincode: "600040", keywords: "tower park roundtana 2nd avenue chintamani" },
      { name: "Adyar", pincode: "600020", keywords: "kasturba nagar gandhi nagar lb road besant nagar" },
      { name: "Velachery", pincode: "600042", keywords: "phoenix marketcity bypass road station" },
      { name: "OMR (Old Mahabalipuram Rd)", pincode: "600096", keywords: "thoraipakkam sholinganallur tidel park" }
    ]
  },
  {
    cityName: "Surat",
    state: "Gujarat",
    avgArrival: "Same-Day Dispatch",
    activeTechnicians: 3,
    areas: [
      { name: "Adajan", pincode: "395009", keywords: "adajan patia honey park star bazaar pal" },
      { name: "Vesu", pincode: "395007", keywords: "vip road someshwara vr mall university" },
      { name: "Varachha", pincode: "395006", keywords: "diamond market hirabaug mini bazaar poddar" },
      { name: "Piplod", pincode: "395007", keywords: "dumas road rahulraj mall svnit big bazaar" }
    ]
  },
  {
    cityName: "Jaipur",
    state: "Rajasthan",
    avgArrival: "Same-Day Dispatch",
    activeTechnicians: 3,
    areas: [
      { name: "Malviya Nagar", pincode: "302017", keywords: "gt world trade park gaurav tower calgiri" },
      { name: "Vaishali Nagar", pincode: "302021", keywords: "national handloom amrapali circle queens road" },
      { name: "Mansarovar", pincode: "302020", keywords: "metro station varun path thadi market" },
      { name: "C-Scheme", pincode: "302001", keywords: "statue circle m i road ahimsa circle" }
    ]
  },
  {
    cityName: "Lucknow",
    state: "Uttar Pradesh",
    avgArrival: "Same-Day Dispatch",
    activeTechnicians: 2,
    areas: [
      { name: "Gomti Nagar", pincode: "226010", keywords: "patrakarpuram vibhuti khand patel nagar lulu mall" },
      { name: "Hazratganj", pincode: "226001", keywords: "ganj market mg road halwasiya court" },
      { name: "Aliganj", pincode: "226024", keywords: "kapoorthala purania dande mandir" },
      { name: "Indira Nagar", pincode: "226016", keywords: "munshipulia c-block bhootnath market" }
    ]
  },
  {
    cityName: "Chandigarh",
    state: "Chandigarh",
    avgArrival: "Same-Day Dispatch",
    activeTechnicians: 2,
    areas: [
      { name: "Sector 17", pincode: "160017", keywords: "plaza bridge market isbt central" },
      { name: "Sector 35", pincode: "160035", keywords: "market aroma hotel jw marriott" },
      { name: "Mohali (Phase 7 / 8)", pincode: "160062", keywords: "industrial area it park phase 7 pca stadium" },
      { name: "Panchkula Sector 7", pincode: "134109", keywords: "sector 7 market bela vista majri chowk" }
    ]
  },
  {
    cityName: "Indore",
    state: "Madhya Pradesh",
    avgArrival: "Same-Day Dispatch",
    activeTechnicians: 2,
    areas: [
      { name: "Vijay Nagar", pincode: "452010", keywords: "c21 mall mangal city ab road scheme 54" },
      { name: "Palasia", pincode: "452001", keywords: "old palasia new palasia 56 dukan chappan" },
      { name: "Bhawarkua", pincode: "452001", keywords: "tower square holkar college bholaram" }
    ]
  },
  {
    cityName: "Nagpur",
    state: "Maharashtra",
    avgArrival: "Same-Day Dispatch",
    activeTechnicians: 2,
    areas: [
      { name: "Dharampeth", pincode: "440010", keywords: "coffee house square ram nagar whc road" },
      { name: "Civil Lines", pincode: "440001", keywords: "high court rbi square zero mile walker street" },
      { name: "Sitabuldi", pincode: "440012", keywords: "main road metro station railway station interchange" }
    ]
  },
  {
    cityName: "Nashik",
    state: "Maharashtra",
    avgArrival: "Same-Day Dispatch",
    activeTechnicians: 2,
    areas: [
      { name: "College Road", pincode: "422005", keywords: "byk college bhonsala circle canada corner" },
      { name: "Indira Nagar", pincode: "422009", keywords: "jogging track pathardi phata mumbai highway" },
      { name: "Panchavati", pincode: "422003", keywords: "godavari ghat ramkund sita gumpha" }
    ]
  },
  {
    cityName: "Bhopal",
    state: "Madhya Pradesh",
    avgArrival: "Same-Day Dispatch",
    activeTechnicians: 2,
    areas: [
      { name: "MP Nagar", pincode: "462011", keywords: "zone 1 zone 2 db city mall chetak bridge" },
      { name: "Arera Colony", pincode: "462016", keywords: "e-1 e-2 e-3 10 no market shahpura" },
      { name: "Kolar Road", pincode: "462042", keywords: "sarvadharm mandakini chuna bhatti" }
    ]
  },
  {
    cityName: "Patna",
    state: "Bihar",
    avgArrival: "Same-Day Dispatch",
    activeTechnicians: 2,
    areas: [
      { name: "Kankarbagh", pincode: "800020", keywords: "tempo stand tiwary bechar lohia nagar" },
      { name: "Boring Road", pincode: "800001", keywords: "boring canal road anandpuri nageshwar colony" },
      { name: "Bailey Road", pincode: "800014", keywords: "saguna more rukanpura raja bazar jagdeo path" }
    ]
  },
  {
    cityName: "Vadodara",
    state: "Gujarat",
    avgArrival: "Same-Day Dispatch",
    activeTechnicians: 2,
    areas: [
      { name: "Alkapuri", pincode: "390007", keywords: "rc dutt road railway station race course" },
      { name: "Manjalpur", pincode: "390011", keywords: "shreyas vidyalaya eva mall makarpura road" },
      { name: "Gotri", pincode: "390021", keywords: "sevasi road vasna road iscon temple" }
    ]
  },
  {
    cityName: "Coimbatore",
    state: "Tamil Nadu",
    avgArrival: "Same-Day Dispatch",
    activeTechnicians: 2,
    areas: [
      { name: "RS Puram", pincode: "641002", keywords: "db road thiruvenkatasamy road brookefields" },
      { name: "Gandhipuram", pincode: "641012", keywords: "cross cut road 100 feet road bus stand" },
      { name: "Peelamedu", pincode: "641004", keywords: "avianshi road psg tech fun republic mall airport" }
    ]
  },
  {
    cityName: "Kochi",
    state: "Kerala",
    avgArrival: "Same-Day Dispatch",
    activeTechnicians: 2,
    areas: [
      { name: "Edappally", pincode: "682024", keywords: "lulu mall toll junction amrita metro" },
      { name: "MG Road", pincode: "682016", keywords: "maharajas college shenoys jose junction metro" },
      { name: "Kakkanad (InfoPark)", pincode: "682030", keywords: "smartcity infopark phase 1 collectorate rajagiri" }
    ]
  },
  {
    cityName: "Visakhapatnam",
    state: "Andhra Pradesh",
    avgArrival: "Same-Day Dispatch",
    activeTechnicians: 2,
    areas: [
      { name: "MVP Colony", pincode: "530017", keywords: "sector 1 sector 3 sector 5 ushodaya junction" },
      { name: "Siripuram", pincode: "530003", keywords: "andhra university dutt island waltair uplands" },
      { name: "Gajuwaka", pincode: "530026", keywords: "steel plant bhel bclang bjp junction" }
    ]
  }
];

// Flat list of all areas across all cities for lightning-fast unified lookups
export const ALL_INDIA_AREAS = ALL_CITIES_DATA.flatMap((city) =>
  city.areas.map((area) => ({
    ...area,
    cityName: city.cityName,
    state: city.state,
    fullDisplay: `${area.name}, ${city.cityName} (${area.pincode})`,
    avgArrival: city.avgArrival,
    activeTechnicians: city.activeTechnicians,
    isPrimaryHub: !!city.isPrimaryHub
  }))
);

/**
 * Returns structured metadata for all supported cities.
 */
export const getAllCities = () =>
  ALL_CITIES_DATA.map((c) => ({
    name: c.cityName,
    cityName: c.cityName,
    state: c.state,
    isPrimaryHub: !!c.isPrimaryHub,
    avgArrival: c.avgArrival,
    activeTechnicians: c.activeTechnicians,
    areasCount: c.areas.length,
    areas: c.areas
  }));

/**
 * Returns all areas belonging to a specific city with fuzzy matching.
 */
/**
 * Robust city lookup ensuring exact matches take strict precedence over partial matches.
 */
export const findCity = (cityName) => {
  if (!cityName) return null;
  const clean = cityName.toLowerCase().trim();
  // 1. Exact match
  let cityObj = ALL_CITIES_DATA.find((c) => c.cityName.toLowerCase() === clean);
  if (cityObj) return cityObj;
  // 2. Slash-separated (e.g. "Delhi" -> "Delhi / NCR")
  cityObj = ALL_CITIES_DATA.find((c) => {
    const parts = c.cityName.toLowerCase().split("/").map((p) => p.trim());
    return parts.includes(clean);
  });
  if (cityObj) return cityObj;
  // 3. Starts with prefix
  cityObj = ALL_CITIES_DATA.find((c) => c.cityName.toLowerCase().startsWith(clean) || clean.startsWith(c.cityName.toLowerCase()));
  if (cityObj) return cityObj;
  // 4. City contains clean query (e.g. "NCR" -> "Delhi / NCR")
  return ALL_CITIES_DATA.find((c) => c.cityName.toLowerCase().includes(clean)) || null;
};

/**
 * Returns all areas belonging to a specific city.
 */
export const getAreasForCity = (cityName) => {
  const cityObj = findCity(cityName);
  return cityObj ? cityObj.areas : [];
};

/**
 * Returns the primary (default/top) area object for a given city with its pincode.
 */
export const getPrimaryAreaForCity = (cityName) => {
  const areas = getAreasForCity(cityName);
  if (areas && areas.length > 0) {
    return areas[0];
  }
  return { name: "Central Hub", pincode: "400066" };
};

/**
 * Automatically generates the 6-digit Pincode from a city name and/or area name.
 * Searches with high-tolerance fuzzy matching (exact, sub-strings, keywords, or landmark).
 *
 * Example:
 * - ("Mumbai", "Borivali West") -> "400092"
 * - ("Pune", "Hinjewadi") -> "411057"
 * - ("Bengaluru", "Whitefield") -> "560066"
 * - ("", "Koramangala") -> "560034"
 */
export const autoGeneratePincode = (cityName, areaName) => {
  const cleanCity = (cityName || "").trim().toLowerCase();
  const cleanArea = (areaName || "").trim().toLowerCase();

  if (!cleanArea && !cleanCity) return "400066";

  // 1. Direct match with both city and area
  if (cleanCity && cleanArea) {
    const cityMatch = findCity(cleanCity);
    if (cityMatch) {
      const areaMatch = cityMatch.areas.find(
        (a) =>
          a.name.toLowerCase() === cleanArea ||
          a.name.toLowerCase().includes(cleanArea) ||
          cleanArea.includes(a.name.toLowerCase()) ||
          (a.keywords && a.keywords.includes(cleanArea))
      );
      if (areaMatch) return areaMatch.pincode;
    }
  }

  // 2. Match across all areas regardless of city if area is specified
  if (cleanArea) {
    const directArea = ALL_INDIA_AREAS.find(
      (a) =>
        a.name.toLowerCase() === cleanArea ||
        cleanArea.includes(a.name.toLowerCase()) ||
        a.name.toLowerCase().includes(cleanArea)
    );
    if (directArea) return directArea.pincode;

    // Keyword match
    const keywordArea = ALL_INDIA_AREAS.find(
      (a) => a.keywords && a.keywords.includes(cleanArea)
    );
    if (keywordArea) return keywordArea.pincode;
  }

  // 3. If only city is specified, return primary hub pincode for that city
  if (cleanCity) {
    const cityObj = findCity(cleanCity);
    if (cityObj && cityObj.areas.length > 0) {
      return cityObj.areas[0].pincode;
    }
  }

  return "400066"; // Fallback to Borivali Hub
};

/**
 * Universal search function across all cities, areas, landmarks, and pincodes.
 * Returns up to 15 matching location suggestions with auto-generated pincodes.
 */
export const searchCityAndArea = (query, filterCity = "") => {
  if (!query && !filterCity) {
    return ALL_INDIA_AREAS.slice(0, 10);
  }

  const cleanQuery = (query || "").trim().toLowerCase();
  const cleanFilter = (filterCity || "").trim().toLowerCase();

  let dataset = ALL_INDIA_AREAS;
  if (cleanFilter && cleanFilter !== "all") {
    dataset = dataset.filter(
      (item) =>
        item.cityName.toLowerCase() === cleanFilter ||
        item.cityName.toLowerCase().includes(cleanFilter) ||
        cleanFilter.includes(item.cityName.toLowerCase())
    );
  }

  if (!cleanQuery) {
    return dataset.slice(0, 12);
  }

  // If query is numeric (checking for pincode search)
  if (/^\d+$/.test(cleanQuery)) {
    return dataset
      .filter((item) => item.pincode.startsWith(cleanQuery) || item.pincode.includes(cleanQuery))
      .slice(0, 12);
  }

  return dataset
    .filter((item) => {
      const matchName = item.name.toLowerCase().includes(cleanQuery);
      const matchCity = item.cityName.toLowerCase().includes(cleanQuery);
      const matchPin = item.pincode.includes(cleanQuery);
      const matchKey = item.keywords && item.keywords.includes(cleanQuery);
      return matchName || matchCity || matchPin || matchKey;
    })
    .slice(0, 15);
};

/**
 * Reverse lookup: Find City and Area given a 6-digit Pincode.
 */
export const getLocationByPincode = (pincode) => {
  if (!pincode) return null;
  const pin = pincode.toString().trim();
  return ALL_INDIA_AREAS.find((item) => item.pincode === pin) || null;
};
