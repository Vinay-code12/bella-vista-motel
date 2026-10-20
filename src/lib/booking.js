// External booking provider (SiteMinder direct booking engine).
// Parameter names verified against the live provider on 19 Oct 2026:
// checkInDate / checkOutDate (YYYY-MM-DD), items[0][adults|children|infants],
// currency, locale. The bare property URL also works; the provider then
// defaults to today → tomorrow for 2 adults.
export const BOOKING_URL = 'https://book-directonline.com/properties/bellavistamotdirect';

// The largest published room occupancy is 4 guests (Quadruple Room and
// Two Bedroom Apartment: 2 adults & 2 children). One booking item = one room.
export const GUEST_LIMITS = { adults: { min: 1, max: 3 }, children: { min: 0, max: 2 }, total: 4 };

const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;

const pad = (n) => String(n).padStart(2, '0');

/** Formats a Date using its local calendar fields (no UTC conversion). */
export function toISODate(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/** Parses YYYY-MM-DD as a local calendar date; returns null when invalid. */
export function parseISODate(value) {
  const m = ISO_DATE.exec(value ?? '');
  if (!m) return null;
  const [y, mo, d] = [Number(m[1]), Number(m[2]) - 1, Number(m[3])];
  const date = new Date(y, mo, d);
  // Rejects rollovers such as 2026-02-30.
  return date.getFullYear() === y && date.getMonth() === mo && date.getDate() === d ? date : null;
}

export function addDays(value, days) {
  const date = parseISODate(value);
  if (!date) return '';
  date.setDate(date.getDate() + days);
  return toISODate(date);
}

export const today = () => toISODate(new Date());

/**
 * Validates a stay. Returns an object of field → message; empty when valid.
 * ISO date strings compare correctly as strings.
 */
export function validateStay({ checkIn, checkOut, adults, children }, now = today()) {
  const errors = {};
  if (!parseISODate(checkIn)) errors.checkIn = 'Choose a check-in date.';
  else if (checkIn < now) errors.checkIn = 'Check-in can’t be in the past.';

  if (!parseISODate(checkOut)) errors.checkOut = 'Choose a check-out date.';
  else if (!errors.checkIn && checkOut <= checkIn) errors.checkOut = 'Check-out must be after check-in.';

  const a = Number(adults);
  const c = Number(children);
  if (!Number.isInteger(a) || a < GUEST_LIMITS.adults.min || a > GUEST_LIMITS.adults.max) {
    errors.adults = `Choose ${GUEST_LIMITS.adults.min}–${GUEST_LIMITS.adults.max} adults.`;
  }
  if (!Number.isInteger(c) || c < GUEST_LIMITS.children.min || c > GUEST_LIMITS.children.max) {
    errors.children = `Choose ${GUEST_LIMITS.children.min}–${GUEST_LIMITS.children.max} children.`;
  } else if (!errors.adults && a + c > GUEST_LIMITS.total) {
    errors.children = `Our largest rooms sleep ${GUEST_LIMITS.total}. For more guests, add rooms on the booking page.`;
  }
  return errors;
}

export const defaultStay = () => ({ checkIn: today(), checkOut: addDays(today(), 1), adults: 2, children: 0 });

const isValidStay = (stay) => Boolean(stay) && Object.keys(validateStay(stay)).length === 0;

/** Whole nights between two valid ISO dates (DST-safe), or null. */
export function nightsBetween(checkIn, checkOut) {
  const a = parseISODate(checkIn);
  const b = parseISODate(checkOut);
  return a && b ? Math.round((b - a) / 86400000) : null;
}

// ---- Local booking page (/book/) ----
// The provider page can't be restyled or framed (X-Frame-Options: SAMEORIGIN),
// so every booking entry point leads to our own /book/ page first. It carries
// dates, guests and the room the visitor was viewing, then hands off to the
// provider with the verified parameters above.
export const BOOK_PATH = '/book/';

/** Link to /book/, optionally carrying a stay and the room the visitor was viewing. */
export function bookPageHref({ stay, room } = {}) {
  const params = new URLSearchParams();
  if (stay) {
    params.set('checkin', stay.checkIn);
    params.set('checkout', stay.checkOut);
    params.set('adults', String(stay.adults));
    params.set('children', String(stay.children));
  }
  if (room) params.set('room', room);
  const query = params.toString();
  return query ? `${BOOK_PATH}?${query}` : BOOK_PATH;
}

/** Reads a stay from /book/ query params; null unless complete and still valid (no stale dates). */
export function stayFromParams(params) {
  if (!params.get('checkin')) return null;
  const stay = {
    checkIn: params.get('checkin'),
    checkOut: params.get('checkout') ?? '',
    adults: Number(params.get('adults') ?? 2),
    children: Number(params.get('children') ?? 0),
  };
  return isValidStay(stay) ? stay : null;
}

// The last valid stay is kept for this browser tab so selections survive
// navigation between pages (e.g. Accommodation panel → room CTA → /book/).
const STORAGE_KEY = 'bellavista:stay';

export function rememberStay(stay) {
  if (!isValidStay(stay)) return;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(stay));
  } catch {
    /* storage unavailable: selections still travel in the /book/ URL */
  }
}

export function recallStay() {
  try {
    const stay = JSON.parse(window.sessionStorage.getItem(STORAGE_KEY));
    return isValidStay(stay) ? stay : null;
  } catch {
    return null;
  }
}

/**
 * Builds the provider URL for a validated stay. Without a stay it returns the
 * undated property page. Brackets are left unencoded to match the format the
 * provider itself produces.
 */
export function buildBookingUrl(stay) {
  if (!stay) return BOOKING_URL;
  const errors = validateStay(stay);
  if (Object.keys(errors).length) throw new Error('Invalid stay: ' + Object.values(errors).join(' '));
  const query = [
    'locale=en',
    `checkInDate=${stay.checkIn}`,
    `checkOutDate=${stay.checkOut}`,
    `items[0][adults]=${Number(stay.adults)}`,
    `items[0][children]=${Number(stay.children)}`,
    'items[0][infants]=0',
    'currency=AUD',
  ].join('&');
  return `${BOOKING_URL}?${query}`;
}
