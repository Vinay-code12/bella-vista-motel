import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import BookingPanel from '../components/BookingPanel.jsx';
import Icon from '../components/Icon.jsx';
import Img from '../components/Img.jsx';
import PageHero from '../components/PageHero.jsx';
import {
  BOOKING_URL,
  buildBookingUrl,
  defaultStay,
  nightsBetween,
  parseISODate,
  recallStay,
  stayFromParams,
  validateStay,
} from '../lib/booking.js';
import { rooms } from '../data/rooms.js';
import { policies, site, stayTimes } from '../data/site.js';
import usePageMeta from '../hooks/usePageMeta.js';
import './Book.css';

const FORM_ID = 'book-stay';
const dateFormat = new Intl.DateTimeFormat('en-AU', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;
const fmtDate = (iso) => {
  const d = parseISODate(iso);
  return d ? dateFormat.format(d) : '—';
};

/**
 * Branded booking entry page. The provider's own page can't be restyled or
 * embedded, so guests choose dates and guests here and continue to the
 * provider for live rates, availability, room selection and confirmation.
 */
export default function Book() {
  usePageMeta(
    'Book Your Stay',
    'Book Bella Vista Motel, Kariong: choose your dates and guests, then continue to our secure booking page for live rates and availability.',
  );
  const [params] = useSearchParams();
  const room = rooms.find((r) => r.id === params.get('room')) ?? null;
  const [stay, setStay] = useState(() => stayFromParams(params) ?? recallStay() ?? defaultStay());
  const [status, setStatus] = useState('idle'); // idle | opening | slow

  // Coming back from the provider via the browser's back button restores this
  // page from cache; re-enable the button.
  useEffect(() => {
    const onShow = (e) => e.persisted && setStatus('idle');
    window.addEventListener('pageshow', onShow);
    return () => window.removeEventListener('pageshow', onShow);
  }, []);

  // If the provider hasn't taken over after a while, say so and allow a retry.
  useEffect(() => {
    if (status !== 'opening') return;
    const timer = setTimeout(() => setStatus('slow'), 12000);
    return () => clearTimeout(timer);
  }, [status]);

  const handOff = (valid) => {
    setStatus('opening');
    window.location.assign(buildBookingUrl(valid));
  };
  const pending = status === 'opening';

  const valid = Object.keys(validateStay(stay)).length === 0;
  const nights = valid ? nightsBetween(stay.checkIn, stay.checkOut) : null;
  const bookingPolicies = policies.filter((p) => p.title !== 'Facilities');

  return (
    <>
      <PageHero
        variant="type"
        kicker="Reservations"
        title={
          <>
            Book your <em>stay</em>
          </>
        }
        crumb="Book"
        intro="Choose your dates and guests, then continue to our secure booking page for live rates, availability and confirmation."
      />

      <div className="container book">
        <ol className="book-steps" role="list" aria-label="Booking steps">
          <li className="is-current" aria-current="step">
            <span className="book-steps__num">01</span>
            <span>
              Dates &amp; guests
              <small>On this page</small>
            </span>
          </li>
          <li>
            <span className="book-steps__num">02</span>
            <span>
              Room &amp; rate
              <small>Secure booking page</small>
            </span>
          </li>
          <li>
            <span className="book-steps__num">03</span>
            <span>
              Details &amp; confirmation
              <small>Secure booking page</small>
            </span>
          </li>
        </ol>

        <div className="book__form" data-reveal>
          <BookingPanel
            id={FORM_ID}
            variant="page"
            title="Your dates & guests"
            initialStay={stay}
            onStayChange={setStay}
            onValidSubmit={handOff}
            hideSubmit
            footnote="One room per search. For more than four guests, add rooms on the booking page."
          />
        </div>

        <aside className="book-summary" aria-labelledby="book-summary-title" data-reveal style={{ '--d': 1 }}>
          <h2 id="book-summary-title">Your stay</h2>
          <dl className="book-summary__list">
            <div>
              <dt>Check-in</dt>
              <dd>{valid ? fmtDate(stay.checkIn) : '—'}</dd>
            </div>
            <div>
              <dt>Check-out</dt>
              <dd>{valid ? fmtDate(stay.checkOut) : '—'}</dd>
            </div>
            <div>
              <dt>Length of stay</dt>
              <dd>{nights ? plural(nights, 'night') : '—'}</dd>
            </div>
            <div>
              <dt>Guests</dt>
              <dd>
                1 room · {plural(stay.adults, 'adult')}
                {stay.children > 0 && ` · ${stay.children === 1 ? '1 child' : `${stay.children} children`}`}
              </dd>
            </div>
            <div>
              <dt>Room</dt>
              <dd>
                {room ? room.name : 'Choose on the next step'}
                {room && <small>Select your room type on the next step.</small>}
              </dd>
            </div>
            <div>
              <dt>Rates</dt>
              <dd>
                Live rates in AUD
                <small>Shown with each rate’s payment terms on the next step.</small>
              </dd>
            </div>
          </dl>

          <button type="submit" form={FORM_ID} className="btn btn--solid book-summary__cta" disabled={pending}>
            {pending ? 'Opening secure booking…' : status === 'slow' ? 'Try again' : 'Check live availability'}
            {!pending && <Icon name="arrow" size={18} />}
          </button>
          <div role="status">
            {pending && <p className="visually-hidden">Opening our secure booking page.</p>}
            {status === 'slow' && (
              <p className="book-summary__slow">
                Our booking page is taking longer than expected to open. Please try again, or call us on{' '}
                <a href={`tel:${site.phones[0].tel}`}>{site.phones[0].display}</a>.
              </p>
            )}
          </div>
          <a className="book-summary__alt" href={BOOKING_URL}>
            Continue without dates
          </a>
          <p className="book-summary__fine">
            Your room, rate and reservation are completed on our booking provider’s secure site. A booking is
            confirmed only when you receive the booking provider’s confirmation.
          </p>

          <div className="book-summary__times">
            <p>
              <span>Check-in</span>
              {stayTimes.checkIn}
            </p>
            <p>
              <span>Check-out</span>
              {stayTimes.checkOut}
            </p>
          </div>

          <details className="book-policy">
            <summary>Booking &amp; cancellation policy</summary>
            {bookingPolicies.map((group) => (
              <div key={group.title}>
                <h3>{group.title}</h3>
                <ul role="list">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
            <Link to="/accommodation/#motel-policy">Full motel policy</Link>
          </details>

          <div className="book-help">
            <p>Prefer to book by phone or email?</p>
            <a href={`tel:${site.phones[0].tel}`}>
              <Icon name="phone" size={16} /> {site.phones[0].display}
            </a>
            <a href={`mailto:${site.email}`}>
              <Icon name="mail" size={16} /> {site.email}
            </a>
          </div>
        </aside>

        <section className="book-rooms" aria-labelledby="book-rooms-title">
          <div className="book-rooms__head">
            <h2 id="book-rooms-title">
              Our <em>rooms</em>
            </h2>
            <p className="muted">
              Live availability for every room type is shown on the next step, where room names may differ slightly.
            </p>
          </div>
          <ul className="book-rooms__list" role="list">
            {rooms.map((r, i) => (
              <li
                key={r.id}
                className={`book-room${room?.id === r.id ? ' is-selected' : ''}`}
                data-reveal
                style={{ '--d': i % 2 }}
              >
                <div className="book-room__media frame">
                  <Img name={r.preview} alt="" sizes="(min-width: 760px) 220px, 100vw" />
                </div>
                <div className="book-room__body">
                  {room?.id === r.id && <p className="book-room__tag">You were viewing this room</p>}
                  <h3>{r.name}</h3>
                  <p>
                    <Icon name="guests" size={16} /> {r.occupancy}
                  </p>
                  <p>
                    <Icon name="bed" size={16} />{' '}
                    {r.sleeping ? r.sleeping.map((s) => `${s.space}: ${s.beds}`).join(' · ') : r.beds.value}
                  </p>
                  {r.note && <p className="book-room__note">{r.note}</p>}
                  <Link className="link-arrow" to={`/accommodation/#${r.id}`}>
                    Room details <Icon name="arrow" size={16} />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
