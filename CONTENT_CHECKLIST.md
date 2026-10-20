# Source content checklist

Source: https://www.bellavistamotel.com.au/ — audited 19 Oct 2026 (rendered at 1440px and 390px with headless Chrome, plus raw HTML, sitemap and WordPress REST page index).

Public pages found (sitemap + `wp-json/wp/v2/pages`): `/`, `/accommodation/`, `/attractions/`, `/gallery/`, `/contact-us/`, plus one Divi popup post (`/dnxte_popup/pool-renovation/`). No blog posts.

Status: ✅ migrated · ⚠️ migrated with a recorded note · ⛔ not migrated (reason given)

Data lives in `src/data/` (`site.js`, `rooms.js`, `attractions.js`, `gallery.js`). Image renames are listed at the end.

---

## Global (header, footer, notice)

| Source section | Content | Links / assets | New destination | Status |
|---|---|---|---|---|
| Top bar | 5 Central Coast Highway Kariong NSW 2250 · bellavistamotel@bigpond.com | — | Header utility bar (desktop), footer, Contact | ✅ |
| Top bar social | Facebook, Twitter, LinkedIn icons | All three `href="#"` — no real destination | Not shown | ⛔ No profiles exist to link to |
| Logo | Bella Vista Motel logo | `Bella-Vista-Motel-logo-1-1.png` (217×81, only size available) | Header + footer, `public/logo.png` | ⚠️ Displayed at ≤ native height; it is low-resolution so it looks soft on high-DPI screens. A vector/2× logo is needed for crisp rendering |
| Nav | HOME, ACCOMMODATION, ATTRACTIONS, GALLERY, CONTACT US | Same-site URLs | Header nav + mobile menu, identical paths | ✅ |
| Header "Book Now" | Divi JS link | `book-directonline.com/properties/bellavistamotdirect?…checkInDate=2025-03-08&checkOutDate=2025-03-09…` (stale dates) | Header "Book Now" → undated property URL; booking panel builds dated URL | ⚠️ Stale dates dropped (see Booking) |
| Popup (every page, on load) | "Swimming pool is under renovation" (popup post dated 6 Oct 2026) | — | Dismissible site notice + note on pool facility | ✅ |
| Footer quick links | Home, Accommodation, Attraction, Gallery, Contact Us | Same-site URLs | Footer | ✅ ("Attraction" shown as "Attractions") |
| Footer address | 5 Central Coast Highway Kariong NSW 2250 · +61 2 4340 1108 · +61 2 4340 1173 · bellavistamotel@bigpond.com | — | Footer (tel:/mailto: links) | ✅ |
| Footer copyright | © Copyright 2025. All Rights Reserved. | — | "© {current year} Bella Vista Motel. All rights reserved." | ✅ |

## Home `/` → `/`

| Source section | Content | Links / assets | New destination | Status |
|---|---|---|---|---|
| Hero | WELCOME TO BELLA VISTA MOTEL | bg `BMotel-Slider-1-.jpg` | Home hero | ✅ |
| Intro heading | Experience Comfort, Elegance, and Serenity | — | Home intro | ✅ |
| Intro p1 | Welcome… value for money. NSW Central Coast in Kariong, 7 km from Gosford CBD, approx. 1 hour drive to Sydney and Newcastle | `slider1-2.jpg` | Home intro | ✅ |
| Intro p2 | 25 rooms of various configurations incl. 1 two bedroom apartment; some rooms feature views overlooking Brisbane Waters; outdoor swimming pool (seasonal), BBQ facilities, free Wi‑Fi, 3 EV chargers for general public; ~5 min drive to The Australian Reptile Park and Somersby Falls; 2 min walk to Mount Penang Parklands; close to National Parks and beaches incl. Terrigal | — | Home intro + facts strip | ✅ |
| "EXPLORE MORE" button | — | `href=""` (no destination) | "Explore the rooms" → `/accommodation` | ⚠️ Source button had no target; mapped to internal page |
| Amenity icons | Bar Fridge, Toiletries, Free Wifi, Microwave, DVD Players, Iron / Ironing Board, Toaster, LCD HD TV | `1-*.png` icons | Home "In every room" list (redrawn as inline SVG line icons) | ✅ |
| Discover our rooms (slider) | Standard Double Room, Standard Twin / Triple Room, Quadruple Room, Two Bedroom Apartment | `blur-2`, `blur-4`, `blur-1`, `blur-3` | Home room preview → `/accommodation/#room-id` | ⚠️ The `blur-*` files are ~30% darkened copies (made for text overlays) of `4-min`, `22-min-1`, `2-min-1`, `11-min-1-1` (pixel-correlation 1.0). The same shots are used from the undarkened originals |
| Your Perfect Gateway | OUTDOOR SWIMMING POOL, BBQ FACILITIES, ACCOMMODATION | `Im-5AB`, `Im-6-1-1`, `Im-5A` (370×560 crops) | Home facilities section | ⚠️ Higher-resolution photos of the same subjects used (`48-min` pool, `…_5675` BBQ/garden, `11-min-1-1` room); pool tagged "under renovation" |
| Testimonial | "The staff were friendly and the experience has been very pleasing. It has been a real pleasure working with you. Keep up the good work 🙂!" — Adam Lyttle | quote icon | Home testimonial | ✅ |
| Group dining band | "Restaurent open for group bookings and we can provide all meals. Seating for 60 people." | — | Home group dining section | ✅ (spelling corrected to "Restaurant") |

## Accommodation `/accommodation/` → `/accommodation`

| Source section | Content | Links / assets | New destination | Status |
|---|---|---|---|---|
| Hero | Accommodation · HOME / ACCOMMODATION | bg `Slider-2-1024x555-1.jpg` | Page hero + breadcrumb | ✅ |
| Intro | "Experience comfort and convenience stay in our versatile rooms with stunning brisbane waters views and top-notch facilities." | — | Accommodation intro | ⚠️ Conflict recorded: Home says *some* rooms have Brisbane Waters views. Text kept, qualifier shown alongside |
| Standard Double Room | Occupancy: Up to 2 Adults · Bed Options: Double or Queen bed · Features: Tea & Coffee Making Facilities; Toaster & Microwave; Bar Fridge; Hair Dryer & Toiletries; LCD HD TV & DVD Player (on request); Iron & Ironing Board; Reverse Cycle Air Conditioning; Free WiFi | `51-min`, `4-min`, `48-min` (pool), `24-min` · BOOK NOW (stale dated URL) | Room section `#standard-double` | ✅ |
| Standard Twin/Triple Room | Up to 3 Adults · Double and Single bed · same 8 features | `22-min-1`, `30-min`, `bathroom-min`, `40-min` | `#standard-twin-triple` | ✅ |
| Quadruple Room | Up to 2 Adults & 2 Children · Either two Double beds or a Double and Bunk bed, depending on availability · same 8 features · Note: Rooms are compact and best suited for budget-conscious families. | `bathroom-min-1` (duplicate of `bathroom-min`), `36-min`, `2-min-1`, `41-min` | `#quadruple` | ✅ |
| Two Bedroom Apartment | Up to 2 Adults & 2 Children · Self-Contained Unit with Full Amenities · Full Kitchen; Spacious Dining & Lounge Area; LCD HD TV & DVD Player; Hair Dryer & Toiletries; Towels & Linen Available on Request; Free WiFi · Sleeping: Room 1 Queen Bed; Room 2 Double & Single Bed; Lounge Area Additional Single Bed | `3-min`, `5-min`, `10-min`, `12-min`, `51-min-1` (duplicate of `51-min`), `21-min`, `17-min`, `11-min-1-1` | `#two-bedroom-apartment` | ✅ |
| Room BOOK NOW ×4 | — | All four identical: `…?checkInDate=2025-03-12&checkOutDate=2025-03-13&items[0][adults]=2…` | "Check availability" → undated property URL (dated search via the booking panel at the top of the page) | ⚠️ Same property-level link for every room (provider has no verified room deep link) |
| Motel Policy | Credit card at reservation for deposit; remaining payment at check-in; security bond may be requested at check-in and returned at check-out if no damage · 72 hours cancellation policy and admin fee charged; within 72 hours first night charged · All rooms non-smoking, additional charges if smoking in room; smoking only in designated area · After hours check-in available, contact us to make arrangements · Check-in from 1pm · Check-out 10 am, charges apply for late checkout · 3 EV chargers for general public · Guest Laundry facilities available (charges apply) | — | Accommodation "Motel policy" (all items visible, grouped) + Home/Contact stay essentials | ✅ |

## Attractions `/attractions/` → `/attractions`

Source shows a sidebar list (order below) and a 21-card grid; 8 items have real external links, 13 have an inactive "More Info". Card images were hot-linked from `bellavista.comxdesign.com.au` (staging host; its TLS certificate failed from curl). Identical 550×314 copies on the live domain were used. No source item has a description or travel time beyond its title.

| # | Item (source text) | Source link | New | Status |
|---|---|---|---|---|
| 1 | Water Fall Cafe | https://waterfallcafe.com.au/ (200) | Card, external link | ✅ |
| 2 | Closest motel to 'The Australian Reptile Park | https://www.reptilepark.com.au/ (200) | Card, external link | ✅ (stray quote removed) |
| 3 | 7KM from Gosford CBD | "More Info" with no link | Card, no button | ⚠️ Inactive "More Info" omitted |
| 4 | Somersby Falls | none | Card, no button | ⚠️ same |
| 5 | Central Coast's Pristine Beaches | none | Card, no button | ⚠️ same |
| 6 | Central Coast Stadium | none | Card, no button | ⚠️ same |
| 7 | Glenworth Valley (15 minutes drive) | https://glenworth.com.au/ (Cloudflare challenge to automation; site live) | Card, external link | ✅ |
| 8 | Mount Penang Parklands & Gardens | https://www.hccdc.nsw.gov.au/projects/mount-penang-parklands (200) | Card, external link | ✅ |
| 9 | A number of Golf ranges | none | Card, no button | ⚠️ |
| 10 | Tree Top Adventure Park | https://treetopsadventure.com.au/ (200) | Card, external link | ✅ |
| 11 | Brisbane Water Cruises | none | Card, no button | ⚠️ |
| 12 | Ferry to Palm Beach | none | Card, no button | ⚠️ |
| 13 | Bushwalking | none | Card, no button | ⚠️ |
| 14 | Gosford Race Club | none | Card, no button | ⚠️ |
| 15 | Henry Kendall Cottage | none | Card, no button | ⚠️ |
| 16 | Art Galleries | none | Card, no button | ⚠️ |
| 17 | Somersby Gardens | https://somersbygardens.com.au/ (200) | Card, external link | ✅ |
| 18 | The Japanese Gardens | none | Card, no button | ⚠️ |
| 19 | Linton Gardens | https://www.lintongardens.com.au/ (200) | Card, external link | ✅ |
| 20 | Central Coast Tourism | https://www.visitcentralcoast.com.au/ (redirects to lovecentralcoast.com) | Card, external link (source URL kept) | ✅ |
| 21 | First motel after taking Gosford exit off M1 | none; image was a duplicate of The Japanese Gardens photo | Location fact (text only) | ⚠️ Misleading duplicate image not reused |

## Gallery `/gallery/` → `/gallery`

Intro text (same as Accommodation intro) kept. 20 images, all accessible, migrated in source order with lightbox. No captions or categories exist in the source, so **no filters** were added.

`4-min`, `UNADJUSTEDNONRAW_thumb_5675`, `44-min`, `21-min`, `30-min`, `7-min-1`, `5-min`, `b-cn` (558×419, low-res), `2-min-1`, `41-min-1024x768-1`, `3-min`, `48-min`, `27-min`, `36-min`, `thumb_P8121022`, `23-min`, `slider1-2`, `42-min`, `Slider-2-1024x555-1`, `UNADJUSTEDNONRAW_thumb_5672` — ✅ all 20.

## Contact `/contact-us/` → `/contact-us`

| Source section | Content | New | Status |
|---|---|---|---|
| Location | 5 Central Coast Highway Kariong NSW 2250 | Contact card + directions link | ✅ |
| Phone | +61 2 4340 1108 · +61 2 4340 1173 · +61 2 4340 2250 | Contact (all three, `tel:` links) | ⚠️ Third number appears only on Contact (not footer) and repeats the postcode digits. Kept as published; worth confirming with the motel |
| Email | bellavistamotel@bigpond.com | `mailto:` link | ✅ |
| Business hours | Monday – Friday: 8.00 am to 9-30 pm · Saturday – 8.00 am to 6 pm · Sunday – 8.00 am to 7 pm | Contact hours table | ✅ ("9-30 pm" formatted as "9.30 pm") |
| Map | Google Maps embed of 5 Central Coast Hwy, Kariong NSW 2250 | Same embed URL (lazy iframe) + Google Maps directions link | ✅ |
| Form | "Please fill the form to email us" · Name, Email Address, Subject, Message · Send | Same fields, validated | ⚠️ Source Divi/WordPress endpoint cannot be used from React. See README "Enquiry form" |

## Booking

| Check | Result |
|---|---|
| Undated `https://book-directonline.com/properties/bellavistamotdirect` | ✅ Verified in a real Chrome session 19 Oct 2026. The provider defaults to today → tomorrow, 2 adults, AUD |
| `checkInDate`, `checkOutDate` (YYYY-MM-DD), `items[0][adults]`, `items[0][children]`, `items[0][infants]`, `currency`, `locale` | ✅ Verified: 2026‑11‑20 → 2026‑11‑22, 3 adults + 1 child was reflected in the UI and the availability API |
| Room-specific deep link | ⛔ Not verified, so not used. Provider room names differ from website names (provider: "Standard Double", "Triple or Twin", "Family Room", "2 BRM Apt") |
| Provider vs website occupancy | ⚠️ Provider lists "Sleeps 2" for "Triple or Twin"; website says up to 3 adults. Website text kept; motel should reconcile |
| Headless/automated requests | Blocked by provider WAF (403 → `/404`). Only real browsers can verify |
| Provider page styling | ⛔ Not possible from this project: separate origin, `X-Frame-Options: SAMEORIGIN` / `frame-ancestors 'self'` (no embedding). SiteMinder's documented branding = theme colour (hex) + banner image, set in the motel's SiteMinder account |
| Local booking step | ✅ `/book/` (added 20 Oct 2026): every Book Now / Check availability / room CTA leads here; dates, guests and room-of-interest carried; hands off to the provider with the verified parameters |
| Payment terms | ⚠️ Provider shows "Book now, pay later" per rate; motel policy says a credit card deposit is required at reservation. Both shown in their own places, not reconciled — motel to confirm |

## Image rename map (`assets-src/` → original)

exterior-reception ← BMotel-Slider-1- · exterior-highway ← BMotel-Slider-2 · exterior-street ← Slider-2-1024x555-1 · exterior-courtyard ← slider1-2 · exterior-wing ← b-cn · reception ← thumb_P8121022 · pool ← 48-min · garden-bbq ← UNADJUSTEDNONRAW_thumb_5675 · garden-lawn ← UNADJUSTEDNONRAW_thumb_5672 · view-water ← 36-min · double-1 ← 51-min (= 51-min-1) · double-2 ← 4-min (= blur-2, undarkened) · double-3 ← 24-min · twin-1 ← 22-min-1 (full size of 22-min-1-980x735; = blur-4, undarkened) · kitchenette ← 30-min · bathroom ← bathroom-min (= bathroom-min-1) · twin-2 ← 40-min · quad-1 ← 2-min-1 (= blur-1, undarkened) · quad-2 ← 41-min · apartment-lounge-1 ← 3-min · apartment-lounge-2 ← 5-min · apartment-dining ← 10-min · apartment-lounge-3 ← 12-min · apartment-bathroom-1 ← 21-min · apartment-bathroom-2 ← 17-min · apartment-bedroom ← 11-min-1-1 (= blur-3, undarkened) · room-a ← 44-min · room-b ← 7-min-1 · room-c ← 41-min-1024x768-1 · dining-setting ← 27-min · kitchen ← 23-min · room-desk ← 42-min · attr-* ← attraction images (same file names).

Not migrated (decorative or superseded): Divi amenity PNG icons (redrawn as SVG), quote-mark PNG `9603824.png`, smiley GIF (replaced by 🙂 character), 370×560 home crops (`Im-*`) and darkened `blur-*` slider copies (both superseded by the original photographs).

## Final completeness review (19–20 Oct 2026)

| Page | Result |
|---|---|
| Home | All sections present: hero, intro (both paragraphs verbatim), facts, 4 room previews, 8 amenities, facilities (pool + renovation notice, BBQ, accommodation, Wi‑Fi, EV, laundry, check-in/out), local area (source distances only), testimonial, group dining, location, footer |
| Accommodation | 4 rooms with occupancy, beds, all features, Quadruple note, apartment sleeping arrangements; 12 policy statements; check-in/out times |
| Attractions | 21/21 items; 8/8 source links preserved; 13 inactive "More Info" omitted rather than faked |
| Gallery | 20/20 images with lightbox; no invented categories |
| Contact | Address, 3 phones, email, hours, map embed + directions, Name/Email Address/Subject/Message form |

Automated check: 116/116 key source strings found in the rendered new pages.

Still unverified / needs the motel's input: the third phone number (+61 2 4340 2250), the Twin/Triple occupancy mismatch with the booking provider, the "Brisbane Waters views" wording vs "some rooms", how long the pool renovation notice should stay, a higher-resolution logo, and an enquiry-form submission service (see README).
