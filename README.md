# Bella Vista Motel — website

A React (Vite) redesign of https://www.bellavistamotel.com.au/. It keeps all of the existing site's content and URL paths (`/`, `/accommodation/`, `/attractions/`, `/gallery/`, `/contact-us/`), plus a branded booking step at `/book/`.

`CONTENT_CHECKLIST.md` maps every piece of source content, image and link to its place in this site. It also records what couldn't be verified.

## Run it

Requires Node `^20.19` or `>=22.12`.

```bash
npm ci            # install exact locked versions
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run preview   # serve dist/ at http://localhost:4173
npm run lint
npm run images    # regenerate optimised photos (only after changing assets-src/)
```

## Project layout

```
assets-src/            original property photographs (renamed; see CONTENT_CHECKLIST.md)
public/images/         generated responsive WebP renditions (npm run images)
public/logo.png        existing motel logo (217×81 — the only size available)
scripts/optimize-images.mjs
src/
  data/                all migrated content: site.js (contact, hours, policies, notice),
                       rooms.js, attractions.js, gallery.js, images.json (generated)
  lib/booking.js       booking URL builder + date/guest validation
  components/          Header, Footer, SiteNotice, BookingPanel, RoomSection, Lightbox,
                       PageHero, Img (responsive images), Icon
  hooks/               useReveal (scroll reveals), usePageMeta (title/description)
  pages/               Home, Accommodation, Attractions, Gallery, Contact, Book, NotFound
```

To edit text, rooms, policies, hours, phone numbers or the pool notice, change `src/data/`. Every page reads from there.

## Booking

Booking stays with the motel's existing provider, SiteMinder (`https://book-directonline.com/properties/bellavistamotdirect`). This site doesn't take bookings, payments or check availability itself.

### Why there is a local `/book/` page

The provider's page (the orange "Bellavista Motel – Availability" screen) is SiteMinder's own website, so this React project can't restyle it:

- It's a separate origin, so our CSS and fonts don't apply.
- It sends `X-Frame-Options: SAMEORIGIN` and `frame-ancestors 'self'`, so it can't be embedded either.

The branded booking step therefore lives on our side at `/book/` (`src/pages/Book.jsx`). There, guests:

1. choose dates and guests;
2. see a live summary (dates, nights, guests, the room they were viewing, check-in/out times, the booking and cancellation policy, and phone/email);
3. press **Check live availability**, which hands off to the provider with the verified parameters.

Room choice, live rates, guest details and any payment happen on the provider's site. Nothing here shows a reservation as confirmed.

### Provider-side branding (done in SiteMinder, not in code)

SiteMinder documents two settings, under **Direct booking → Configuration → Branding**, then **Publish changes**:

- **Theme colour (hex):** recommended `#26342A`, the site's forest green, used for buttons and the top menu.
- **Booking engine banner:** for example `assets-src/exterior-reception.jpg`.

Fonts, layout and custom CSS aren't among the documented options.

### Entry points

All of these go to `/book/`:

| Entry point | Carries |
|---|---|
| Header "Book Now" (desktop and mobile menu) | Last valid stay (from this browser tab) |
| Footer "Book Now" | Last valid stay |
| Room "Check availability" (×4, Accommodation) | `?room=<id>` plus last valid stay |
| Booking panels (Home and Accommodation) | `?checkin=&checkout=&adults=&children=` |

- **Saved selections:** the last valid stay is kept in `sessionStorage`. Past or invalid dates are discarded on both URL and storage reads, so stale dates never carry forward.
- **Room interest:** the room is shown and highlighted on `/book/` only. The provider has no verified room-level deep link, and its room names differ ("Standard Double", "Triple or Twin", "Family Room", "2 BRM Apt"). Guests pick the room type on the provider's page.

### Handoff parameters

`locale`, `checkInDate`, `checkOutDate` (local `YYYY-MM-DD`), `items[0][adults]`, `items[0][children]`, `items[0][infants]=0` and `currency=AUD`. These were confirmed against the live provider in a real Chrome session on 19 Oct 2026. "Continue without dates" opens the undated property page, where the provider defaults to today → tomorrow for 2 adults.

### Validation and states

- **Validation:**
  - check-in can't be in the past;
  - check-out must be after check-in;
  - 1–3 adults and 0–2 children, at most 4 guests in total.
- **States:**
  - while handing off, the button shows "Opening secure booking…";
  - if the provider hasn't taken over after 12 seconds, a "taking longer than expected" message appears with Try again and the phone number;
  - the button resets when the guest comes back with the browser's Back button.

The provider blocks automated/headless browsers (HTTP 403). If you need to re-test it, use a normal browser.

## AI concierge (Home page)

The Home page has an "AI concierge" section, `src/components/AiConcierge.jsx`, that uses the motel's ElevenLabs Conversational AI agent.

- **Agent:** the ID is `site.aiAgentId` in `src/data/site.js`. The agent itself (prompt, voice, knowledge, terms) is managed in the ElevenLabs dashboard.
- **Widget script:** it's ElevenLabs' official widget, pinned to `@elevenlabs/convai-widget-embed@0.19.0` and loaded only on the Home page. It's removed when the visitor navigates away, which ends any open conversation.
- **Floating panel:** it sits bottom-right, using the `full` variant on desktop and the smaller `compact` variant on phones. The footer gets extra bottom padding on Home so its last line isn't hidden behind it.
- **"Chat with our concierge" button:** it opens the widget's chat panel via the widget's `elevenlabs-agent:expand` event. That event isn't in ElevenLabs' public docs, which is one reason the version is pinned; re-test the button if you upgrade the widget. While the script loads, the button shows "Loading concierge…". If the script can't load, the button is disabled and a message offers phone and email instead.
- **Consent:** before a call starts, the widget shows the agent's recording terms. The section also states that guests are talking to an AI.
- **Portrait:** `public/concierge-avatar.svg` is an original illustration, not a photo of a real person, so it doesn't present a stranger's face as the AI. The widget uses the same image as its avatar (`avatar-image-url`). To use a licensed photo instead, replace that file or change `AVATAR` in the component.
- **Widget colours** (black buttons by default) are set in the ElevenLabs dashboard, not here. For a closer match, set the button colour to `#26342A`.

## Enquiry form — integration needed

The old form posted to WordPress/Divi, and React can't use that endpoint. **No submission service is configured yet.**

- **Default (no service):** the form validates the fields, then opens the visitor's email app with the message addressed to bellavistamotel@bigpond.com. It never claims the message was sent. It tells the visitor to press send and gives the direct email address and phone number.
- **To deliver messages directly:** set `VITE_ENQUIRY_ENDPOINT` (see `.env.example`) at build time. Point it at an HTTPS endpoint that accepts JSON `{ name, email, subject, message }` and returns 2xx on success, such as a Formspree form or your own serverless function. The form shows a sending state, and it shows success only on a 2xx response. On any error it keeps the visitor's input and shows the email and phone alternatives. Keep any secret keys on the server, never in this frontend.

## Hosting (single-page app rewrites)

Nested routes such as `/accommodation/` need every path to serve `index.html`:

- **Netlify:** `public/_redirects` is included.
- **Vercel:** `vercel.json` is included.
- **Apache:** add to `.htaccess`:
  `FallbackResource /index.html`
- **Nginx:** `location / { try_files $uri $uri/ /index.html; }`

`npm run preview` already does this locally.

## Design notes

- **Palette:** ivory/sand backgrounds, deep forest green, charcoal text and restrained brass accents. All colours are tokens in `src/styles/global.css`, and text colours pass WCAG AA on their backgrounds.
- **Type:** Fraunces for display and DM Sans for body text (Google Fonts).
- **Photography:** only the motel's own photos are used. Each is served as WebP at several widths and is never upscaled past its original size, so the low-resolution attraction photos (550px) are kept small. The hero image loads eagerly; everything else lazy-loads.
- **Motion:** gentle reveals (IntersectionObserver), a CSS-only hero parallax (only where scroll-driven animations are supported), hover zoom on pointer devices only and a mobile menu transition. Content is never hidden if JavaScript or IntersectionObserver is unavailable. With `prefers-reduced-motion`, animation is disabled.
- **Accessibility:**
  - skip link and visible focus states;
  - focus moves to the main content on route change;
  - mobile menu has a focus trap and closes with Escape;
  - lightbox is a native `<dialog>` with arrow keys, Escape, swipe and focus return;
  - form fields are labelled and errors are linked to their fields.

## Known content questions for the motel

See the end of `CONTENT_CHECKLIST.md`. In short:

- Is +61 2 4340 2250 a current number? It appears only on the old Contact page.
- The booking provider lists "Triple or Twin" as sleeping 2, while the website says up to 3 adults.
- "Stunning Brisbane Waters views" vs "some of our rooms feature views".
- When should the pool renovation notice come down? It lives in `src/data/site.js`.
- Can you supply a higher-resolution or vector logo?
