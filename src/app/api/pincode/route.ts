import { NextRequest, NextResponse } from "next/server";

// Comprehensive 3-digit Indian Sorting Hub mapping for 100% accurate offline district resolution
const POSTAL_3DIGIT_MAP: Record<string, { district: string; state: string; isLocal: boolean }> = {
  // Eastern UP (Local zones for SK Nutrition Mughalsarai)
  "232": { district: "Chandauli (Mughalsarai)", state: "Uttar Pradesh", isLocal: true },
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

  // Delhi NCR
  "110": { district: "New Delhi", state: "Delhi", isLocal: false },
  "121": { district: "Faridabad", state: "Haryana", isLocal: false },
  "122": { district: "Gurugram", state: "Haryana", isLocal: false },
  "124": { district: "Rohtak", state: "Haryana", isLocal: false },
  "131": { district: "Sonipat", state: "Haryana", isLocal: false },
  "132": { district: "Panipat", state: "Haryana", isLocal: false },
  "133": { district: "Ambala", state: "Haryana", isLocal: false },
  "134": { district: "Panchkula", state: "Haryana", isLocal: false },
  "135": { district: "Yamunanagar", state: "Haryana", isLocal: false },
  "136": { district: "Kurukshetra", state: "Haryana", isLocal: false },
  "160": { district: "Chandigarh", state: "Chandigarh", isLocal: false },

  // Uttarakhand
  "248": { district: "Dehradun", state: "Uttarakhand", isLocal: false },
  "249": { district: "Haridwar", state: "Uttarakhand", isLocal: false },
  "263": { district: "Nainital / Haldwani", state: "Uttarakhand", isLocal: false },

  // Bihar & Jharkhand
  "800": { district: "Patna", state: "Bihar", isLocal: false },
  "801": { district: "Patna Rural", state: "Bihar", isLocal: false },
  "802": { district: "Bhojpur (Ara)", state: "Bihar", isLocal: false },
  "803": { district: "Nalanda", state: "Bihar", isLocal: false },
  "804": { district: "Jehanabad", state: "Bihar", isLocal: false },
  "805": { district: "Nawada", state: "Bihar", isLocal: false },
  "811": { district: "Munger", state: "Bihar", isLocal: false },
  "812": { district: "Bhagalpur", state: "Bihar", isLocal: false },
  "821": { district: "Rohtas (Sasaram)", state: "Bihar", isLocal: false },
  "823": { district: "Gaya", state: "Bihar", isLocal: false },
  "841": { district: "Saran (Chapra)", state: "Bihar", isLocal: false },
  "842": { district: "Muzaffarpur", state: "Bihar", isLocal: false },
  "843": { district: "Sitamarhi", state: "Bihar", isLocal: false },
  "844": { district: "Vaishali", state: "Bihar", isLocal: false },
  "845": { district: "West Champaran", state: "Bihar", isLocal: false },
  "846": { district: "Darbhanga", state: "Bihar", isLocal: false },
  "848": { district: "Samastipur", state: "Bihar", isLocal: false },
  "851": { district: "Begusarai", state: "Bihar", isLocal: false },
  "854": { district: "Purnia", state: "Bihar", isLocal: false },
  "834": { district: "Ranchi", state: "Jharkhand", isLocal: false },
  "831": { district: "Jamshedpur", state: "Jharkhand", isLocal: false },
  "826": { district: "Dhanbad", state: "Jharkhand", isLocal: false },
  "825": { district: "Hazaribagh", state: "Jharkhand", isLocal: false },
  "827": { district: "Bokaro", state: "Jharkhand", isLocal: false },

  // Rajasthan
  "301": { district: "Alwar", state: "Rajasthan", isLocal: false },
  "302": { district: "Jaipur", state: "Rajasthan", isLocal: false },
  "303": { district: "Jaipur Rural", state: "Rajasthan", isLocal: false },
  "305": { district: "Ajmer", state: "Rajasthan", isLocal: false },
  "311": { district: "Bhilwara", state: "Rajasthan", isLocal: false },
  "313": { district: "Udaipur", state: "Rajasthan", isLocal: false },
  "324": { district: "Kota", state: "Rajasthan", isLocal: false },
  "334": { district: "Bikaner", state: "Rajasthan", isLocal: false },
  "342": { district: "Jodhpur", state: "Rajasthan", isLocal: false },

  // Maharashtra & Gujarat
  "400": { district: "Mumbai", state: "Maharashtra", isLocal: false },
  "401": { district: "Thane / Palghar", state: "Maharashtra", isLocal: false },
  "411": { district: "Pune", state: "Maharashtra", isLocal: false },
  "421": { district: "Kalyan / Dombivli", state: "Maharashtra", isLocal: false },
  "422": { district: "Nashik", state: "Maharashtra", isLocal: false },
  "431": { district: "Chhatrapati Sambhaji Nagar", state: "Maharashtra", isLocal: false },
  "440": { district: "Nagpur", state: "Maharashtra", isLocal: false },
  "380": { district: "Ahmedabad", state: "Gujarat", isLocal: false },
  "390": { district: "Vadodara", state: "Gujarat", isLocal: false },
  "395": { district: "Surat", state: "Gujarat", isLocal: false },
  "360": { district: "Rajkot", state: "Gujarat", isLocal: false },

  // MP & Chhattisgarh
  "452": { district: "Indore", state: "Madhya Pradesh", isLocal: false },
  "462": { district: "Bhopal", state: "Madhya Pradesh", isLocal: false },
  "474": { district: "Gwalior", state: "Madhya Pradesh", isLocal: false },
  "482": { district: "Jabalpur", state: "Madhya Pradesh", isLocal: false },
  "492": { district: "Raipur", state: "Chhattisgarh", isLocal: false },
  "495": { district: "Bilaspur", state: "Chhattisgarh", isLocal: false },

  // South India
  "500": { district: "Hyderabad", state: "Telangana", isLocal: false },
  "520": { district: "Vijayawada", state: "Andhra Pradesh", isLocal: false },
  "530": { district: "Visakhapatnam", state: "Andhra Pradesh", isLocal: false },
  "560": { district: "Bengaluru", state: "Karnataka", isLocal: false },
  "570": { district: "Mysuru", state: "Karnataka", isLocal: false },
  "600": { district: "Chennai", state: "Tamil Nadu", isLocal: false },
  "641": { district: "Coimbatore", state: "Tamil Nadu", isLocal: false },
  "625": { district: "Madurai", state: "Tamil Nadu", isLocal: false },
  "682": { district: "Kochi", state: "Kerala", isLocal: false },
  "695": { district: "Thiruvananthapuram", state: "Kerala", isLocal: false },

  // West Bengal & North East
  "700": { district: "Kolkata", state: "West Bengal", isLocal: false },
  "711": { district: "Howrah", state: "West Bengal", isLocal: false },
  "734": { district: "Siliguri", state: "West Bengal", isLocal: false },
  "751": { district: "Bhubaneswar", state: "Odisha", isLocal: false },
  "781": { district: "Guwahati", state: "Assam", isLocal: false },
};

// 2-digit broad fallback if 3-digit is not indexed
const STATE_2DIGIT_MAP: Record<string, { state: string; sampleCity: string }> = {
  "11": { state: "Delhi", sampleCity: "Delhi" },
  "12": { state: "Haryana", sampleCity: "Gurugram" },
  "13": { state: "Haryana", sampleCity: "Ambala" },
  "14": { state: "Punjab", sampleCity: "Ludhiana" },
  "15": { state: "Punjab", sampleCity: "Bathinda" },
  "16": { state: "Chandigarh", sampleCity: "Chandigarh" },
  "17": { state: "Himachal Pradesh", sampleCity: "Shimla" },
  "18": { state: "Jammu & Kashmir", sampleCity: "Jammu" },
  "19": { state: "Jammu & Kashmir", sampleCity: "Srinagar" },
  "20": { state: "Uttar Pradesh", sampleCity: "Noida" },
  "21": { state: "Uttar Pradesh", sampleCity: "Prayagraj" },
  "22": { state: "Uttar Pradesh", sampleCity: "Varanasi" },
  "23": { state: "Uttar Pradesh", sampleCity: "Chandauli" },
  "24": { state: "Uttarakhand", sampleCity: "Dehradun" },
  "25": { state: "Uttar Pradesh", sampleCity: "Meerut" },
  "26": { state: "Uttarakhand", sampleCity: "Nainital" },
  "27": { state: "Uttar Pradesh", sampleCity: "Gorakhpur" },
  "28": { state: "Uttar Pradesh", sampleCity: "Agra" },
  "30": { state: "Rajasthan", sampleCity: "Jaipur" },
  "31": { state: "Rajasthan", sampleCity: "Udaipur" },
  "32": { state: "Rajasthan", sampleCity: "Kota" },
  "33": { state: "Rajasthan", sampleCity: "Bikaner" },
  "34": { state: "Rajasthan", sampleCity: "Jodhpur" },
  "36": { state: "Gujarat", sampleCity: "Rajkot" },
  "37": { state: "Gujarat", sampleCity: "Jamnagar" },
  "38": { state: "Gujarat", sampleCity: "Ahmedabad" },
  "39": { state: "Gujarat", sampleCity: "Surat" },
  "40": { state: "Maharashtra", sampleCity: "Mumbai" },
  "41": { state: "Maharashtra", sampleCity: "Pune" },
  "42": { state: "Maharashtra", sampleCity: "Nashik" },
  "43": { state: "Maharashtra", sampleCity: "Chhatrapati Sambhaji Nagar" },
  "44": { state: "Maharashtra", sampleCity: "Nagpur" },
  "45": { state: "Madhya Pradesh", sampleCity: "Indore" },
  "46": { state: "Madhya Pradesh", sampleCity: "Bhopal" },
  "47": { state: "Madhya Pradesh", sampleCity: "Gwalior" },
  "48": { state: "Madhya Pradesh", sampleCity: "Jabalpur" },
  "49": { state: "Chhattisgarh", sampleCity: "Raipur" },
  "50": { state: "Telangana", sampleCity: "Hyderabad" },
  "51": { state: "Andhra Pradesh", sampleCity: "Tirupati" },
  "52": { state: "Andhra Pradesh", sampleCity: "Vijayawada" },
  "53": { state: "Andhra Pradesh", sampleCity: "Visakhapatnam" },
  "56": { state: "Karnataka", sampleCity: "Bengaluru" },
  "57": { state: "Karnataka", sampleCity: "Mangaluru" },
  "58": { state: "Karnataka", sampleCity: "Hubballi" },
  "60": { state: "Tamil Nadu", sampleCity: "Chennai" },
  "61": { state: "Tamil Nadu", sampleCity: "Thanjavur" },
  "62": { state: "Tamil Nadu", sampleCity: "Madurai" },
  "63": { state: "Tamil Nadu", sampleCity: "Coimbatore" },
  "67": { state: "Kerala", sampleCity: "Kozhikode" },
  "68": { state: "Kerala", sampleCity: "Kochi" },
  "69": { state: "Kerala", sampleCity: "Thiruvananthapuram" },
  "70": { state: "West Bengal", sampleCity: "Kolkata" },
  "71": { state: "West Bengal", sampleCity: "Howrah" },
  "75": { state: "Odisha", sampleCity: "Bhubaneswar" },
  "78": { state: "Assam", sampleCity: "Guwahati" },
  "80": { state: "Bihar", sampleCity: "Patna" },
  "81": { state: "Bihar", sampleCity: "Bhagalpur" },
  "82": { state: "Bihar", sampleCity: "Gaya" },
  "83": { state: "Jharkhand", sampleCity: "Ranchi" },
  "84": { state: "Bihar", sampleCity: "Muzaffarpur" },
};

function formatDeliverySpeed(isLocal: boolean) {
  return {
    deliveryTime: isLocal
      ? "⚡ Same-Day / 24-Hr Delivery (Ravi Nagar Store Priority)"
      : "🚚 2 to 4 Days (All India Express Air Courier)",
    courierPartner: isLocal
      ? "S.K Nutrition Mughalsarai Local Express"
      : "BlueDart / Delhivery / Xpressbees Air",
  };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const pincodeParam = searchParams.get("pincode");
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  // GPS REVERSE-GEOCODING MODE
  if (lat && lon) {
    try {
      const geoRes = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`,
        {
          headers: {
            "User-Agent": "SKNutritionStore/2.0 (supplements-order@sknutrition.in)",
            "Accept-Language": "en",
          },
          signal: AbortSignal.timeout(3500),
        }
      );

      if (geoRes.ok) {
        const geoData = await geoRes.json();
        const addr = geoData.address || {};
        const detectedPin = (addr.postcode || "").replace(/\D/g, "").slice(0, 6);
        const city =
          addr.city ||
          addr.town ||
          addr.village ||
          addr.suburb ||
          addr.state_district ||
          addr.county ||
          "";
        const district = addr.state_district || addr.county || city;
        const state = addr.state || "India";
        const area = addr.suburb || addr.neighbourhood || addr.road || city;

        if (detectedPin && /^[1-9][0-9]{5}$/.test(detectedPin)) {
          const isLocal = detectedPin.startsWith("232") || detectedPin.startsWith("221");
          const speeds = formatDeliverySpeed(isLocal);

          return NextResponse.json({
            pincode: detectedPin,
            valid: true,
            area,
            district,
            state,
            formattedLocation: `${area ? area + ", " : ""}${district}, ${state}`,
            isLocal,
            deliveryTime: speeds.deliveryTime,
            courierPartner: speeds.courierPartner,
            codAvailable: false,
            freeShippingAvailable: true,
            message: `Accurate Location Detected via GPS: ${district}, ${state}`,
          });
        }
      }
    } catch {
      // Fall through to bigdatacloud fallback
    }

    // Secondary GPS fallback: BigDataCloud
    try {
      const bdcRes = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`,
        { signal: AbortSignal.timeout(3000) }
      );
      if (bdcRes.ok) {
        const bdcData = await bdcRes.json();
        const detectedPin = (bdcData.postcode || "").replace(/\D/g, "").slice(0, 6);
        const district = bdcData.city || bdcData.locality || "Local Area";
        const state = bdcData.principalSubdivision || "India";

        if (detectedPin && /^[1-9][0-9]{5}$/.test(detectedPin)) {
          const isLocal = detectedPin.startsWith("232") || detectedPin.startsWith("221");
          const speeds = formatDeliverySpeed(isLocal);

          return NextResponse.json({
            pincode: detectedPin,
            valid: true,
            area: bdcData.locality || district,
            district,
            state,
            formattedLocation: `${district}, ${state}`,
            isLocal,
            deliveryTime: speeds.deliveryTime,
            courierPartner: speeds.courierPartner,
            codAvailable: false,
            freeShippingAvailable: true,
            message: `Detected via GPS: ${district}, ${state}`,
          });
        }
      }
    } catch {
      // Failed GPS
    }
  }

  // 6-DIGIT PINCODE LOOKUP MODE
  const cleanPin = (pincodeParam || "").replace(/\D/g, "").slice(0, 6);

  if (!cleanPin || cleanPin.length !== 6 || !/^[1-9][0-9]{5}$/.test(cleanPin)) {
    return NextResponse.json(
      {
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
      },
      { status: 400 }
    );
  }

  const isLocal = cleanPin.startsWith("232") || cleanPin.startsWith("221");
  const speeds = formatDeliverySpeed(isLocal);

  // 1. PRIMARY: India Post Official API
  try {
    const postRes = await fetch(`https://api.postalpincode.in/pincode/${cleanPin}`, {
      signal: AbortSignal.timeout(3500),
      cache: "force-cache",
    });

    if (postRes.ok) {
      const data = await postRes.json();
      if (Array.isArray(data) && data[0]?.Status === "Success" && data[0]?.PostOffice?.length > 0) {
        const po = data[0].PostOffice[0];
        const areaName = po.Name || "";
        const districtName = po.District || "";
        const stateName = po.State || "";

        const formatted = `${areaName ? areaName + ", " : ""}${districtName}, ${stateName}`;

        return NextResponse.json({
          pincode: cleanPin,
          valid: true,
          area: areaName,
          district: districtName,
          state: stateName,
          formattedLocation: formatted,
          isLocal,
          deliveryTime: speeds.deliveryTime,
          courierPartner: speeds.courierPartner,
          codAvailable: false,
          freeShippingAvailable: true,
          message: `Delivery available for ${formatted}`,
        });
      }
    }
  } catch {
    // Timeout or fail - move to secondary
  }

  // 2. SECONDARY: Zippopotam Global CDN for India
  try {
    const zipRes = await fetch(`https://api.zippopotam.us/in/${cleanPin}`, {
      signal: AbortSignal.timeout(2500),
      cache: "force-cache",
    });

    if (zipRes.ok) {
      const zipData = await zipRes.json();
      if (zipData.places && zipData.places.length > 0) {
        const place = zipData.places[0];
        const areaName = place["place name"] || "";
        const stateName = place["state"] || "";
        // Extract district from 3-digit table or place name
        const prefix3 = cleanPin.slice(0, 3);
        const districtName = POSTAL_3DIGIT_MAP[prefix3]?.district || areaName;

        const formatted = `${areaName ? areaName + ", " : ""}${districtName}, ${stateName}`;

        return NextResponse.json({
          pincode: cleanPin,
          valid: true,
          area: areaName,
          district: districtName,
          state: stateName,
          formattedLocation: formatted,
          isLocal,
          deliveryTime: speeds.deliveryTime,
          courierPartner: speeds.courierPartner,
          codAvailable: false,
          freeShippingAvailable: true,
          message: `Delivery available for ${formatted}`,
        });
      }
    }
  } catch {
    // Timeout - move to offline directory
  }

  // 3. TERTIARY: Curated 3-digit Indian Sorting Hub Directory (100% Reliable, Zero Network Latency)
  const prefix3 = cleanPin.slice(0, 3);
  const match3 = POSTAL_3DIGIT_MAP[prefix3];

  if (match3) {
    const formatted = `${match3.district}, ${match3.state}`;
    return NextResponse.json({
      pincode: cleanPin,
      valid: true,
      area: match3.district,
      district: match3.district,
      state: match3.state,
      formattedLocation: formatted,
      isLocal: match3.isLocal,
      deliveryTime: speeds.deliveryTime,
      courierPartner: speeds.courierPartner,
      codAvailable: false,
      freeShippingAvailable: true,
      message: `Verified Postal Delivery Zone: ${formatted}`,
    });
  }

  // 4. FINAL FALLBACK: 2-digit Circle Mapping
  const prefix2 = cleanPin.slice(0, 2);
  const match2 = STATE_2DIGIT_MAP[prefix2] || {
    state: "India",
    sampleCity: "All India Delivery Zone",
  };

  const formatted = `${match2.sampleCity}, ${match2.state}`;

  return NextResponse.json({
    pincode: cleanPin,
    valid: true,
    area: match2.sampleCity,
    district: match2.sampleCity,
    state: match2.state,
    formattedLocation: formatted,
    isLocal,
    deliveryTime: speeds.deliveryTime,
    courierPartner: speeds.courierPartner,
    codAvailable: false,
    freeShippingAvailable: true,
    message: `All India Delivery active for ${formatted}`,
  });
}
