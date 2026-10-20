import { Link } from 'react-router-dom';
import { nav, site } from '../data/site.js';
import { BOOK_PATH } from '../lib/booking.js';
import Icon from './Icon.jsx';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer on-dark">
      <div className="container footer__cta" data-reveal>
        <p className="footer__title">
          Stay a while on the <em>Central Coast</em>
        </p>
        <div className="footer__cta-actions">
          <Link className="btn btn--light" to={BOOK_PATH}>
            Book Now <Icon name="arrow" size={18} />
          </Link>
          <a className="btn btn--ghost-light" href={`tel:${site.phones[0].tel}`}>
            <Icon name="phone" size={18} /> Call {site.phones[0].display}
          </a>
        </div>
      </div>

      <div className="container footer__grid">
        <div className="footer__brand">
          <span className="footer__logo">
            <img src="/logo.png" alt="Bella Vista Motel" width="217" height="81" loading="lazy" />
          </span>
        </div>

        <nav aria-label="Quick links">
          <h2 className="footer__heading">Quick Links</h2>
          <ul role="list">
            {nav.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="footer__heading">Address</h2>
          <address>
            <p>
              <Icon name="pin" size={18} />
              <a href={site.map.view} target="_blank" rel="noopener noreferrer">
                {site.address.full}
                <span className="visually-hidden"> (opens Google Maps in a new tab)</span>
              </a>
            </p>
            <p>
              <Icon name="phone" size={18} />
              <span className="footer__stack">
                {site.phones
                  .filter((p) => p.footer)
                  .map((p) => (
                    <a key={p.tel} href={`tel:${p.tel}`}>
                      {p.display}
                    </a>
                  ))}
              </span>
            </p>
            <p>
              <Icon name="mail" size={18} />
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
          </address>
        </div>
      </div>

      <div className="footer__base">
        <div className="container">
          <p>© {year} Bella Vista Motel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
