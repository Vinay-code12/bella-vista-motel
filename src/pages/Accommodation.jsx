import BookingPanel from '../components/BookingPanel.jsx';
import Icon from '../components/Icon.jsx';
import PageHero from '../components/PageHero.jsx';
import RoomSection from '../components/RoomSection.jsx';
import { rooms } from '../data/rooms.js';
import { policies, stayTimes } from '../data/site.js';
import usePageMeta from '../hooks/usePageMeta.js';
import './Accommodation.css';

export default function Accommodation() {
  usePageMeta(
    'Accommodation',
    'Standard Double, Standard Twin/Triple and Quadruple rooms plus a self-contained Two Bedroom Apartment at Bella Vista Motel, Kariong. Occupancy, bed options, features and motel policy.',
  );

  return (
    <>
      <PageHero
        kicker="Rooms & apartment"
        title="Accommodation"
        crumb="Accommodation"
        intro="Experience comfort and convenience — stay in our versatile rooms with stunning Brisbane Waters views and top-notch facilities."
        image={{ name: 'twin-1', alt: 'Standard Twin/Triple room with a double and a single bed beside a large window' }}
        inset={{ name: 'view-water', alt: 'View over the treetops towards the water' }}
      >
        <p className="accom-qualifier">Some of our rooms feature views overlooking Brisbane Waters.</p>
      </PageHero>

      <section className="container accom-tools" aria-label="Rooms and availability">
        <nav className="room-index" aria-label="Room categories">
          <ol role="list">
            {rooms.map((room, i) => (
              <li key={room.id}>
                <a href={`#${room.id}`}>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  {room.name}
                </a>
              </li>
            ))}
            <li>
              <a href="#motel-policy">
                <span>05</span>
                Motel Policy
              </a>
            </li>
          </ol>
        </nav>
        <BookingPanel title="Check availability & rates" />
      </section>

      <div className="container">
        {rooms.map((room, i) => (
          <RoomSection key={room.id} room={room} index={i} total={rooms.length} />
        ))}
      </div>

      <section id="motel-policy" className="section policy" aria-labelledby="policy-title" tabIndex={-1}>
        <div className="container">
          <div className="policy__head">
            <p className="kicker" data-reveal>
              Before you stay
            </p>
            <h2 id="policy-title" data-reveal style={{ '--d': 1 }}>
              Motel <em>Policy</em>
            </h2>
          </div>

          <dl className="policy__times" data-reveal style={{ '--d': 1 }}>
            <div>
              <dt>
                <Icon name="clock" size={18} /> Check-in
              </dt>
              <dd>{stayTimes.checkIn}</dd>
            </div>
            <div>
              <dt>
                <Icon name="clock" size={18} /> Check-out
              </dt>
              <dd>{stayTimes.checkOut}</dd>
            </div>
          </dl>

          <div className="policy__grid">
            {policies.map((group, i) => (
              <section key={group.title} className="policy__group" data-reveal style={{ '--d': i % 3 }}>
                <h3>{group.title}</h3>
                <ul role="list">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
