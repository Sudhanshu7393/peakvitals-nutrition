export interface PostOfficeItem {
  name: string;
  branchType?: string;
  district: string;
  state: string;
  block?: string;
}

export interface PincodeInfo {
  pincode: string;
  valid: boolean;
  area: string;
  district: string;
  state: string;
  formattedLocation: string;
  postOffices?: PostOfficeItem[];
  selectedPostOffice?: string;
  isLocal: boolean;
  deliveryTime: string;
  courierPartner: string;
  codAvailable: boolean;
  freeShippingAvailable: boolean;
  message: string;
}

// In-memory cache to avoid redundant API calls
const cache = new Map<string, PincodeInfo>();

// Curated 3-digit Indian Sorting Hub fallback mapping
const POSTAL_3DIGIT_MAP: Record<string, { district: string; state: string; isLocal: boolean }> = {
  "232": { district: "Chandauli", state: "Uttar Pradesh", isLocal: true },
  "221": { district: "Varanasi", state: "Uttar Pradesh", isLocal: true },
  "231": { district: "Mirzapur", state: "Uttar Pradesh", isLocal: false },
  "233": { district: "Ghazipur", state: "Uttar Pradesh", isLocal: false },
  "222": { district: "Jaunpur", state: "Uttar Pradesh", isLocal: false },
  "277": { district: "Ballia", state: "Uttar Pradesh", isLocal: false },
  "274": { district: "Deoria", state: "Uttar Pradesh", isLocal: false },
  "275": { district: "Mau", state: "Uttar Pradesh", isLocal: false },
  "276": { district: "Azamgarh", state: "Uttar Pradesh", isLocal: false },
  "273": { district: "Gorakhpur", state: "Uttar Pradesh", isLocal: false },
  "272": { district: "Basti", state: "Uttar Pradesh", isLocal: false },
  "271": { district: "Gonda", state: "Uttar Pradesh", isLocal: false },
  "230": { district: "Pratapgarh", state: "Uttar Pradesh", isLocal: false },
  "211": { district: "Prayagraj", state: "Uttar Pradesh", isLocal: false },
  "212": { district: "Fatehpur", state: "Uttar Pradesh", isLocal: false },
  "224": { district: "Ayodhya", state: "Uttar Pradesh", isLocal: false },
  "225": { district: "Barabanki", state: "Uttar Pradesh", isLocal: false },
  "226": { district: "Lucknow", state: "Uttar Pradesh", isLocal: false },
  "227": { district: "Amethi", state: "Uttar Pradesh", isLocal: false },
  "228": { district: "Sultanpur", state: "Uttar Pradesh", isLocal: false },
  "229": { district: "Raebareli", state: "Uttar Pradesh", isLocal: false },
  "208": { district: "Kanpur Nagar", state: "Uttar Pradesh", isLocal: false },
  "209": { district: "Kanpur Dehat", state: "Uttar Pradesh", isLocal: false },
  "201": { district: "Noida / Ghaziabad", state: "Uttar Pradesh", isLocal: false },
  "202": { district: "Aligarh", state: "Uttar Pradesh", isLocal: false },
  "203": { district: "Bulandshahr", state: "Uttar Pradesh", isLocal: false },
  "204": { district: "Hathras", state: "Uttar Pradesh", isLocal: false },
  "205": { district: "Mainpuri", state: "Uttar Pradesh", isLocal: false },
  "206": { district: "Etawah", state: "Uttar Pradesh", isLocal: false },
  "207": { district: "Etah", state: "Uttar Pradesh", isLocal: false },
  "241": { district: "Hardoi", state: "Uttar Pradesh", isLocal: false },
  "242": { district: "Shahjahanpur", state: "Uttar Pradesh", isLocal: false },
  "243": { district: "Bareilly", state: "Uttar Pradesh", isLocal: false },
  "244": { district: "Moradabad", state: "Uttar Pradesh", isLocal: false },
  "245": { district: "Hapur", state: "Uttar Pradesh", isLocal: false },
  "246": { district: "Bijnor", state: "Uttar Pradesh", isLocal: false },
  "247": { district: "Saharanpur", state: "Uttar Pradesh", isLocal: false },
  "250": { district: "Meerut", state: "Uttar Pradesh", isLocal: false },
  "251": { district: "Muzaffarnagar", state: "Uttar Pradesh", isLocal: false },
  "261": { district: "Sitapur", state: "Uttar Pradesh", isLocal: false },
  "262": { district: "Pilibhit", state: "Uttar Pradesh", isLocal: false },
  "281": { district: "Mathura", state: "Uttar Pradesh", isLocal: false },
  "282": { district: "Agra", state: "Uttar Pradesh", isLocal: false },
  "283": { district: "Firozabad", state: "Uttar Pradesh", isLocal: false },
  "284": { district: "Jhansi", state: "Uttar Pradesh", isLocal: false },
  "285": { district: "Jalaun", state: "Uttar Pradesh", isLocal: false },

  "110": { district: "New Delhi", state: "Delhi", isLocal: false },
  "121": { district: "Faridabad", state: "Haryana", isLocal: false },
  "122": { district: "Gurugram", state: "Haryana", isLocal: false },
  "124": { district: "Rohtak", state: "Haryana", isLocal: false },
  "131": { district: "Sonipat", state: "Haryana", isLocal: false },
  "132": { district: "Panipat", state: "Haryana", isLocal: false },
  "133": { district: "Ambala", state: "Haryana", isLocal: false },
  "160": { district: "Chandigarh", state: "Chandigarh", isLocal: false },

  "248": { district: "Dehradun", state: "Uttarakhand", isLocal: false },
  "249": { district: "Haridwar", state: "Uttarakhand", isLocal: false },
  "263": { district: "Nainital", state: "Uttarakhand", isLocal: false },

  "800": { district: "Patna", state: "Bihar", isLocal: false },
  "801": { district: "Patna Rural", state: "Bihar", isLocal: false },
  "802": { district: "Bhojpur (Ara)", state: "Bihar", isLocal: false },
  "803": { district: "Nalanda", state: "Bihar", isLocal: false },
  "812": { district: "Bhagalpur", state: "Bihar", isLocal: false },
  "821": { district: "Rohtas (Sasaram)", state: "Bihar", isLocal: false },
  "823": { district: "Gaya", state: "Bihar", isLocal: false },
  "841": { district: "Saran (Chapra)", state: "Bihar", isLocal: false },
  "842": { district: "Muzaffarpur", state: "Bihar", isLocal: false },
  "848": { district: "Samastipur", state: "Bihar", isLocal: false },
  "834": { district: "Ranchi", state: "Jharkhand", isLocal: false },
  "831": { district: "Jamshedpur", state: "Jharkhand", isLocal: false },
  "826": { district: "Dhanbad", state: "Jharkhand", isLocal: false },

  "302": { district: "Jaipur", state: "Rajasthan", isLocal: false },
  "313": { district: "Udaipur", state: "Rajasthan", isLocal: false },
  "324": { district: "Kota", state: "Rajasthan", isLocal: false },
  "342": { district: "Jodhpur", state: "Rajasthan", isLocal: false },

  "400": { district: "Mumbai", state: "Maharashtra", isLocal: false },
  "401": { district: "Thane", state: "Maharashtra", isLocal: false },
  "411": { district: "Pune", state: "Maharashtra", isLocal: false },
  "440": { district: "Nagpur", state: "Maharashtra", isLocal: false },
  "380": { district: "Ahmedabad", state: "Gujarat", isLocal: false },
  "395": { district: "Surat", state: "Gujarat", isLocal: false },

  "452": { district: "Indore", state: "Madhya Pradesh", isLocal: false },
  "462": { district: "Bhopal", state: "Madhya Pradesh", isLocal: false },
  "492": { district: "Raipur", state: "Chhattisgarh", isLocal: false },

  "500": { district: "Hyderabad", state: "Telangana", isLocal: false },
  "560": { district: "Bengaluru", state: "Karnataka", isLocal: false },
  "600": { district: "Chennai", state: "Tamil Nadu", isLocal: false },
  "682": { district: "Kochi", state: "Kerala", isLocal: false },
  "700": { district: "Kolkata", state: "West Bengal", isLocal: false },
};

export async function lookupIndianPincode(pincode: string): Promise<PincodeInfo> {
  const cleanPin = pincode.replace(/\D/g, "").slice(0, 6);

  if (cleanPin.length !== 6 || !/^[1-9][0-9]{5}$/.test(cleanPin)) {
    return {
      pincode: cleanPin,
      valid: false,
      area: "",
      district: "",
      state: "",
      formattedLocation: "Invalid 6-digit Pincode",
      isLocal: false,
      deliveryTime: "N/A",
      courierPartner: "N/A",
      codAvailable: false,
      freeShippingAvailable: false,
      message: "Please enter a valid 6-digit Indian Postal Pincode.",
    };
  }

  // Check memory cache
  if (cache.has(cleanPin)) {
    return cache.get(cleanPin)!;
  }

  // 1. Call our local Next.js API route first (handles India Post, Zippopotam, and fallbacks server-side)
  try {
    const res = await fetch(`/api/pincode?pincode=${cleanPin}`, {
      signal: AbortSignal.timeout(4000),
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.valid) {
        cache.set(cleanPin, data);
        return data;
      }
    }
  } catch {
    // API route fetch failed or running outside browser
  }

  // 2. Direct India Post fetch from client if API route wasn't reached
  try {
    const res = await fetch(`https://api.postalpincode.in/pincode/${cleanPin}`, {
      signal: AbortSignal.timeout(3500),
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data[0]?.Status === "Success" && data[0]?.PostOffice?.length > 0) {
        const po = data[0].PostOffice[0];
        const areaName = po.Name || "";
        const districtName = po.District || "";
        const stateName = po.State || "";
        const isLocal = cleanPin.startsWith("232") || cleanPin.startsWith("221");

        const result: PincodeInfo = {
          pincode: cleanPin,
          valid: true,
          area: areaName,
          district: districtName,
          state: stateName,
          formattedLocation: `${areaName ? areaName + ", " : ""}${districtName}, ${stateName}`,
          isLocal: false,
          deliveryTime: "🚚 2 to 4 Days (All India Express Air Courier)",
          courierPartner: "BlueDart / Delhivery / Xpressbees Air",
          codAvailable: false,
          freeShippingAvailable: true,
          message: `All India Delivery active! Orders to ${districtName} are dispatched via Express Courier.`,
        };
        cache.set(cleanPin, result);
        return result;
      }
    }
  } catch {
    // Ignore
  }

  // 3. Fallback using 3-digit curated mapping
  const prefix3 = cleanPin.slice(0, 3);
  const match3 = POSTAL_3DIGIT_MAP[prefix3];

  const district = match3?.district || "Delivery Hub";
  const state = match3?.state || "India";
  const formatted = `${district}, ${state}`;

  const fallbackResult: PincodeInfo = {
    pincode: cleanPin,
    valid: true,
    area: district,
    district,
    state,
    formattedLocation: formatted,
    isLocal: false,
    deliveryTime: "🚚 2 to 4 Days Express Delivery",
    courierPartner: "Express Air Delivery (BlueDart / Delhivery)",
    codAvailable: false,
    freeShippingAvailable: true,
    message: `All India Serviceable! We deliver Peakvitals Pre-Workout to ${formatted}.`,
  };

  cache.set(cleanPin, fallbackResult);
  return fallbackResult;
}

// GPS Location Reverse Geocoding helper
export async function reverseGeocodeCoords(lat: number, lon: number): Promise<PincodeInfo | null> {
  try {
    const res = await fetch(`/api/pincode?lat=${lat}&lon=${lon}`, {
      signal: AbortSignal.timeout(4500),
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.valid && data.pincode) {
        cache.set(data.pincode, data);
        return data;
      }
    }
  } catch (err) {
    console.error("GPS Reverse Geocode Error:", err);
  }
  return null;
}
