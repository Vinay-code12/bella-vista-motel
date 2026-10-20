import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { bookPageHref } from '../lib/booking.js';
import Img from './Img.jsx';
import Icon from './Icon.jsx';
import Lightbox from './Lightbox.jsx';
import './RoomSection.css';

export default function RoomSection({ room, index, total }) {
  const [active, setActive] = useState(0);
  const [viewer, setViewer] = useState(null);
  const closeViewer = useCallback(() => setViewer(null), []);
  const headingId = `${room.id}-title`;
  const number = String(index + 1).padStart(2, '0');

  return (
    <article id={room.id} className={`room${index % 2 ? ' room--flip' : ''}`} aria-labelledby={headingId} tabIndex={-1}>
      <div className="room__media" data-reveal>
        <button
          type="button"
          className="room__main frame zoom"
          onClick={() => setViewer(active)}
          aria-label={`View ${room.name} photos full screen, photo ${active + 1} of ${room.images.length}`}
        >
          <Img
            key={active}
            name={room.images[active].src}
            alt={room.images[active].alt}
            sizes="(min-width: 1080px) 52vw, 100vw"
          />
          <span className="room__expand" aria-hidden="true">
            <Icon name="expand" size={18} />
          </span>
        </button>
        <ul className="room__thumbs" role="list">
          {room.images.map((img, i) => (
            <li key={img.src + i}>
              <button
                type="button"
                className="frame"
                aria-pressed={i === active}
                aria-label={`Show photo ${i + 1} of ${room.images.length}: ${img.alt}`}
                onClick={() => setActive(i)}
              >
                <Img name={img.src} alt="" sizes="120px" />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="room__body">
        <p className="room__index" aria-hidden="true">
          {number}
          <span> / {String(total).padStart(2, '0')}</span>
        </p>
        <h2 id={headingId}>{room.name}</h2>

        <dl className="room__facts">
          <div>
            <dt>
              <Icon name="guests" size={18} /> Occupancy
            </dt>
            <dd>{room.occupancy}</dd>
          </div>
          <div>
            <dt>
              <Icon name="bed" size={18} /> {room.beds.label}
            </dt>
            <dd>{room.beds.value}</dd>
          </div>
        </dl>

        <h3 className="room__subhead">Room Features</h3>
        <ul className="room__features" role="list">
          {room.features.map((f) => (
            <li key={f}>
              <Icon name="check" size={16} /> {f}
            </li>
          ))}
        </ul>

        {room.sleeping && (
          <>
            <h3 className="room__subhead">Sleeping Arrangements</h3>
            <dl className="room__sleeping">
              {room.sleeping.map((s) => (
                <div key={s.space}>
                  <dt>{s.space}</dt>
                  <dd>{s.beds}</dd>
                </div>
              ))}
            </dl>
          </>
        )}

        {room.note && (
          <p className="room__note">
            <Icon name="note" size={18} />
            <span>
              <strong>Note:</strong> {room.note}
            </span>
          </p>
        )}

        <div className="room__cta">
          <Link className="btn btn--solid" to={bookPageHref({ room: room.id })}>
            Check availability <Icon name="arrow" size={18} />
          </Link>
          <p className="room__hint">Choose your dates next, then select this room type on our secure booking page.</p>
        </div>
      </div>

      <Lightbox
        images={room.images}
        index={viewer}
        onChange={setViewer}
        onClose={closeViewer}
        label={`${room.name} photos`}
      />
    </article>
  );
}
