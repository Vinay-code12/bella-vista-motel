import { Link } from 'react-router-dom';
import AiConcierge from '../components/AiConcierge.jsx';
import BookingPanel from '../components/BookingPanel.jsx';
import Icon from '../components/Icon.jsx';
import Img from '../components/Img.jsx';
import { attractionAlt, attractions, nearby } from '../data/attractions.js';
import { rooms } from '../data/rooms.js';
import { groupDining, highlights, inRoomAmenities, site, stayTimes, testimonial } from '../data/site.js';
import usePageMeta from '../hooks/usePageMeta.js';
import './Home.css';

const attractionById = Object.fromEntries(attractions.map((a) => [a.id, a]));

export default function Home() {
  usePageMeta(
    null,
    'Bella Vista Motel in Kariong on the NSW Central Coast: 25 rooms including a two bedroom apartment, 7 km from Gosford CBD and about an hour’s drive to Sydney and Newcastle.',
  );

  return (
    <>
      {/* Hero */}
      <section className="home-hero on-dark">
        <div className="home-hero__media frame">
          <Img
            name="exterior-reception"
            alt="Bella Vista Motel’s two-storey building and reception, with guests’ cars parked out front"
            sizes="100vw"
            position="62% 50%"
            priority
          />
        </div>
        <div className="container home-hero__content">
          <p className="kicker">Kariong · NSW Central Coast</p>
          <h1 className="display">
            <span className="home-hero__welcome">Welcome to</span> Bella <em>Vista</em> Motel
          </h1>
          <p className="home-hero__sub">
            7 km from Gosford CBD and approximately 1 hour drive to Sydney and Newcastle.
          </p>
        </div>
      </section>

      <div className="container home-booking">
        <BookingPanel variant="hero" />
      </div>

      {/* Introduction */}
      <section className="section intro" aria-labelledby="intro-title">
        <div className="container intro__grid">
          <div className="intro__text">
            <p className="kicker" data-reveal>
              Welcome to Bella Vista Motel
            </p>
            <h2 id="intro-title" data-reveal style={{ '--d': 1 }}>
              Experience Comfort, <em>Elegance,</em> and Serenity
            </h2>
            <div className="intro__copy" data-reveal style={{ '--d': 2 }}>
              <p className="lead">
                At Bella Vista Motel, we endeavor to make your stay as comfortable as possible, offering you value
                for money. We are situated on the beautiful NSW Central Coast in Kariong, 7 km from Gosford CBD and
                approximately 1 hour drive to Sydney and Newcastle.
              </p>
              <p>
                We have 25 rooms of various configurations including 1 two bedroom apartment to suit your
                accommodation needs. Some of our rooms feature views overlooking Brisbane Waters. Our facilities
                include an outdoor swimming pool (seasonal), BBQ facilities, free Wi‑Fi, and 3 EV chargers for the
                general public.
              </p>
              <p>
                The Central Coast has a lot to offer – we are about 5 minutes’ drive from The Australian Reptile Park
                and Somersby Falls, 2 minutes’ walk to Mount Penang Parklands, close to National Parks and beaches
                including Terrigal.
              </p>
              <Link className="link-arrow" to="/accommodation/">
                Explore the rooms <Icon name="arrow" size={18} />
              </Link>
            </div>
          </div>

          <div className="intro__visual">
            <div className="intro__main frame" data-reveal="fade">
              <Img
                name="exterior-courtyard"
                alt="Motel building and driveway beneath the Bella Vista Motel sign"
                sizes="(min-width: 1080px) 40vw, 100vw"
                position="40% 50%"
              />
            </div>
            <div className="intro__inset frame" data-reveal style={{ '--d': 2 }}>
              <Img name="reception" alt="Reception desk in front of a patterned feature wall" sizes="(min-width: 1080px) 18vw, 45vw" />
            </div>
            <p className="intro__caption" aria-hidden="true">
              Bella Vista
            </p>
          </div>
        </div>

        <div className="container">
          <ul className="highlights" role="list">
            {highlights.map((h, i) => (
              <li key={h.label} data-reveal style={{ '--d': i }}>
                <span className="highlights__value">{h.value}</span>
                <span className="highlights__label">{h.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Rooms preview */}
      <section className="section rooms-preview" aria-labelledby="rooms-title">
        <div className="container">
          <header className="section-head">
            <p className="kicker" data-reveal>
              Accommodation
            </p>
            <h2 id="rooms-title" data-reveal style={{ '--d': 1 }}>
              Discover our <em>rooms</em>
            </h2>
            <Link className="link-arrow section-head__link" to="/accommodation/" data-reveal style={{ '--d': 2 }}>
              All room details <Icon name="arrow" size={18} />
            </Link>
          </header>

          <ul className="rooms-preview__grid" role="list">
            {rooms.map((room, i) => (
              <li key={room.id} className={`rooms-preview__item rooms-preview__item--${i + 1}`} data-reveal style={{ '--d': i % 2 }}>
                <Link to={`/accommodation/#${room.id}`} className="room-card zoom">
                  <span className="room-card__media frame">
                    <Img name={room.preview} alt="" sizes="(min-width: 1080px) 45vw, (min-width: 640px) 50vw, 100vw" />
                  </span>
                  <span className="room-card__text">
                    <span className="room-card__num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="room-card__name">{room.name}</span>
                    <span className="room-card__meta">{room.occupancy}</span>
                    <span className="room-card__more">
                      View room <Icon name="arrow" size={16} />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* In-room amenities */}
      <section className="section amenities on-dark" aria-labelledby="amenities-title">
        <div className="container amenities__grid">
          <div>
            <p className="kicker" data-reveal>
              In-room amenities
            </p>
            <h2 id="amenities-title" data-reveal style={{ '--d': 1 }}>
              Thoughtful <em>essentials</em>
            </h2>
            <p className="amenities__note" data-reveal style={{ '--d': 2 }}>
              Each room’s full feature list is on the{' '}
              <Link to="/accommodation/">Accommodation</Link> page.
            </p>
          </div>
          <ul className="amenities__list" role="list">
            {inRoomAmenities.map((a, i) => (
              <li key={a.label} data-reveal style={{ '--d': i % 4 }}>
                <Icon name={a.icon} size={34} />
                <span>{a.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Facilities */}
      <section className="section gateway" aria-labelledby="gateway-title">
        <div className="container">
          <header className="section-head">
            <p className="kicker" data-reveal>
              Facilities
            </p>
            <h2 id="gateway-title" data-reveal style={{ '--d': 1 }}>
              Your Perfect <em>Gateway</em>
            </h2>
          </header>

          <div className="gateway__grid">
            <figure className="gateway__item gateway__item--pool" data-reveal>
              <div className="frame">
                <Img name="pool" alt="Outdoor swimming pool with sun loungers, surrounded by trees" sizes="(min-width: 1080px) 42vw, 100vw" />
                <span className="tag">{site.notice.text}</span>
              </div>
              <figcaption>
                <span className="gateway__label">Outdoor Swimming Pool</span>
                <span className="muted">Seasonal</span>
              </figcaption>
            </figure>
            <figure className="gateway__item gateway__item--bbq" data-reveal style={{ '--d': 1 }}>
              <div className="frame">
                <Img name="garden-bbq" alt="Garden with flowerbeds, a statue, a covered barbecue and a gazebo" sizes="(min-width: 1080px) 28vw, 100vw" />
              </div>
              <figcaption>
                <span className="gateway__label">BBQ Facilities</span>
              </figcaption>
            </figure>
            <figure className="gateway__item gateway__item--rooms" data-reveal style={{ '--d': 2 }}>
              <div className="frame">
                <Img name="apartment-bedroom" alt="Bedroom with two made-up beds under a coastal artwork" sizes="(min-width: 1080px) 28vw, 100vw" />
              </div>
              <figcaption>
                <span className="gateway__label">Accommodation</span>
              </figcaption>
            </figure>

            <ul className="gateway__list" role="list" data-reveal style={{ '--d': 2 }}>
              <li>
                <span>Free Wi‑Fi</span>
              </li>
              <li>
                <span>EV chargers</span>
                <span className="muted">3 EV charger stations for the general public</span>
              </li>
              <li>
                <span>Guest laundry</span>
                <span className="muted">Charges apply</span>
              </li>
              <li>
                <span>Check-in / check-out</span>
                <span className="muted">
                  Check-in {stayTimes.checkIn} · Check-out {stayTimes.checkOut}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Local area */}
      <section className="section local" aria-labelledby="local-title">
        <div className="container local__grid">
          <div className="local__intro">
            <p className="kicker" data-reveal>
              The local area
            </p>
            <h2 id="local-title" data-reveal style={{ '--d': 1 }}>
              The Central Coast has a lot <em>to offer</em>
            </h2>
            <p className="lead" data-reveal style={{ '--d': 2 }}>
              Close to National Parks and beaches including Terrigal.
            </p>
            <Link className="link-arrow" to="/attractions/" data-reveal style={{ '--d': 3 }}>
              See all {attractions.length} attractions <Icon name="arrow" size={18} />
            </Link>
          </div>

          <ol className="local__list" role="list">
            {nearby.map((n, i) => {
              const a = attractionById[n.id];
              return (
                <li key={n.id} data-reveal style={{ '--d': i }}>
                  <Link to={`/attractions/#${n.id}`} className="local__card zoom">
                    <span className="local__media frame">
                      <Img name={a.image} alt={attractionAlt[a.image]} sizes="(min-width: 1080px) 260px, (min-width: 640px) 45vw, 100vw" />
                    </span>
                    <span className="local__distance">{n.distance}</span>
                    <span className="local__name">{n.label}</span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <AiConcierge />

      {/* Testimonial */}
      <section className="section testimonial" aria-labelledby="testimonial-title">
        <div className="container testimonial__inner">
          <h2 id="testimonial-title" className="kicker" data-reveal>
            Hear what our past guests have to say
          </h2>
          <figure data-reveal style={{ '--d': 1 }}>
            <blockquote>
              <p>{testimonial.quote}</p>
            </blockquote>
            <figcaption>— {testimonial.author}</figcaption>
          </figure>
        </div>
      </section>

      {/* Group dining */}
      <section className="section dining on-dark" aria-labelledby="dining-title">
        <div className="container dining__grid">
          <p className="dining__number" aria-hidden="true" data-reveal>
            {groupDining.seating}
          </p>
          <div>
            <p className="kicker" data-reveal>
              Group bookings
            </p>
            <h2 id="dining-title" data-reveal style={{ '--d': 1 }}>
              Restaurant open for <em>group bookings</em>
            </h2>
            <p className="dining__text" data-reveal style={{ '--d': 2 }}>
              {groupDining.text} Seating for {groupDining.seating} people.
            </p>
            <div className="dining__actions" data-reveal style={{ '--d': 3 }}>
              <Link className="btn btn--light" to="/contact-us/">
                Enquire <Icon name="arrow" size={18} />
              </Link>
              <a className="btn btn--ghost-light" href={`tel:${site.phones[0].tel}`}>
                <Icon name="phone" size={18} /> {site.phones[0].display}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Find us */}
      <section className="section find" aria-labelledby="find-title">
        <div className="container find__grid">
          <figure className="find__media" data-reveal="fade">
            <div className="frame">
              <Img
                name="exterior-highway"
                alt="Bella Vista Motel from the Central Coast Highway, with road signs to Sydney, Newcastle, Gosford and Terrigal"
                sizes="(min-width: 1080px) 55vw, 100vw"
              />
            </div>
            <figcaption>First motel after taking Gosford exit off M1</figcaption>
          </figure>
          <div className="find__text">
            <p className="kicker" data-reveal>
              Find us
            </p>
            <h2 id="find-title" data-reveal style={{ '--d': 1 }}>
              5 Central Coast <em>Highway</em>
            </h2>
            <address data-reveal style={{ '--d': 2 }}>
              <p>{site.address.full}</p>
              <p>
                {site.phones
                  .filter((p) => p.footer)
                  .map((p, i) => (
                    <span key={p.tel}>
                      {i > 0 && ' · '}
                      <a href={`tel:${p.tel}`}>{p.display}</a>
                    </span>
                  ))}
              </p>
              <p>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </p>
            </address>
            <div className="find__actions" data-reveal style={{ '--d': 3 }}>
              <a className="btn btn--solid" href={site.map.directions} target="_blank" rel="noopener noreferrer">
                Get directions <Icon name="external" size={18} />
                <span className="visually-hidden"> (opens Google Maps in a new tab)</span>
              </a>
              <Link className="btn" to="/contact-us/">
                Contact &amp; hours
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
