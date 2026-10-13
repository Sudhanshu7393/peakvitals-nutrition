# PEAKVITALS NUTRITION — Official Brand Store (`peakvitals-nutrition-store`)

Official Direct-to-Athlete E-Commerce Website for **Peakvitals Pvt. Ltd.** (**Peakvitals Nutrition Pre-Workout — 250g / 35 Servings**).

---

## 🏢 Brand & Regulatory Information Configured
- **Brand Name:** PEAKVITALS NUTRITION (*Be The Boss Of Your Workout*)
- **Marketed By:** Peakvitals Pvt. Ltd.
- **Manufactured At:** Bioxent Health and Nutrition Pvt. Ltd. *(An ISO 9001 & GMP Certified Company)*
- **FSSAI Lic. No.:** `12723999000427`
- **Official Order & Support WhatsApp / Phone:** `+91 76519 18284` (`7651918284`)
- **Official Email:** `Peakvitalsnutrition@gmail.com`
- **Current Batch & MRP:** Batch `PVPW/02/26` • MFD `FEB/2026` • Official Box MRP `₹1,999/-` (Incl. of all taxes)

---

## 🚀 Key Website Features
1. **Official Product Catalog (2 Flavours):**
   - **Peakvitals Pre-Workout — Green Apple Flavour (250g / 35 Servings)** — `₹1,999`
   - **Peakvitals Pre-Workout — Tangy Orange Flavour (250g / 35 Servings)** — `₹1,999`
2. **100% Transparent Label & 5-Side 3D Studio Box Inspector:**
   - Complete 14-Row Nutrition Facts Table (`7g Serving Size`, `8 Kcal`, `1.5g L-Citrulline Malate`, `2g Arginine AKG`, `2g Beta-Alanine`, `195mg Natural Caffeine`, `200mg Theanine`, `150mg N-Acetyl L-Tyrosine`, `140mg Taurine`, `110mg Betaine Anhydrous`, `200mg Tryptophan`, `100mg Choline Bitartrate`, `5mg Piperine`, `Vit B1 & B6`).
   - Interactive 5-Side Studio Dabba Gallery (`Front Label`, `Nutrition Facts`, `FSSAI & Certifications`, `Suggested Use & MRP`, `Key Benefits Panel`).
3. **Live All-India PIN Code Delivery Checker (`/api/pincode`):**
   - Real-time lookup across 28,000+ Indian Postal PIN codes showing City, District, State, and estimated Express Air Dispatch timeline (2–4 Business Days).
4. **Shopping Cart, Checkout & Direct WhatsApp Order Integration:**
   - Generates structured Order IDs (`PV-XXXXXX`), saves order history locally for the **Track My Order (`PV-ID`)** lookup, and opens a pre-formatted WhatsApp order invoice directly to `7651918284`.

---

## 🛠️ Where to Edit Store Details in the Future

| What to Update | File Path |
| :--- | :--- |
| **Phone, WhatsApp Number, Email, Support Hours** | `src/data/config.ts` |
| **Product Prices, Flavours, Nutrition Facts, Batch No., FSSAI** | `src/data/peakvitalsProducts.ts` |
| **Brand Vector Logo (Flexed Bicep + Dumbbell & Triangle A)** | `src/components/PeakvitalsLogo.tsx` |
| **Product Studio Images (Green Apple & Tangy Orange)** | `public/images/peakvitals_trans/` |
| **5-Side Studio Box Label Images** | `public/images/box_sides/` |

---

## 💻 Running the Project Locally

### Prerequisites
- **Node.js** `v18.18+` or `v20+` installed.

### Commands
```bash
# 1. Install dependencies
npm install

# 2. Start local development server (http://localhost:3000)
npm run dev

# 3. Create optimized production build
npm run build

# 4. Run production server
npm start
```

---

## 🌐 Deployment & Hosting (Vercel / Custom Domain)
1. Push this repository to the company's GitHub account or connect it directly to **[Vercel](https://vercel.com)**.
2. In Vercel Dashboard → **Settings → Domains**, add the company's official domain (e.g., `peakvitals.in` or `peakvitals.com`).
3. Every `git push` to the `main` branch automatically builds and deploys the live website with zero downtime.
