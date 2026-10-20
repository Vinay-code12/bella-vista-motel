import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { nav, site } from '../data/site.js';
import { BOOK_PATH } from '../lib/booking.js';
import Icon from './Icon.jsx';
import './Header.css';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef(null);
  const menuRef = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.classList.add('menu-open');
    menuRef.current?.querySelector('a')?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
      // Keep Tab within the toggle + menu while open.
      if (e.key === 'Tab') {
        const items = [toggleRef.current, ...menuRef.current.querySelectorAll('a')];
        const i = items.indexOf(document.activeElement);
        const next = e.shiftKey ? (i <= 0 ? items.length - 1 : i - 1) : (i + 1) % items.length;
        e.preventDefault();
        items[next].focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      root.classList.remove('menu-open');
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <div className="utility">
        <div className="container utility__inner">
          <span>
            <Icon name="pin" size={15} /> {site.address.full}
          </span>
          <a href={`mailto:${site.email}`}>
            <Icon name="mail" size={15} /> {site.email}
          </a>
          <a href={`tel:${site.phones[0].tel}`}>
            <Icon name="phone" size={15} /> {site.phones[0].display}
          </a>
        </div>
      </div>

      <header className={`site-header${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
        <div className="container bar">
          <Link to="/" className="brand" aria-label="Bella Vista Motel — home">
            <img src="/logo.png" alt="" width="217" height="81" />
          </Link>

          <nav className="nav-desktop" aria-label="Primary">
            <ul>
              {nav.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} end={item.to === '/'}>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="bar__actions">
            <NavLink className="btn btn--solid btn--book" to={BOOK_PATH}>
              Book Now
            </NavLink>
            <button
              ref={toggleRef}
              type="button"
              className="menu-toggle"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <Icon name={open ? 'close' : 'menu'} size={24} />
              <span className="visually-hidden">{open ? 'Close menu' : 'Open menu'}</span>
            </button>
          </div>
        </div>

        <div id="mobile-menu" className="mobile-menu" ref={menuRef} aria-hidden={!open}>
          <nav aria-label="Mobile">
            <ol>
              {nav.map((item, i) => (
                <li key={item.to} style={{ '--i': i }}>
                  <NavLink to={item.to} end={item.to === '/'} tabIndex={open ? 0 : -1}>
                    <span className="mobile-menu__num">{String(i + 1).padStart(2, '0')}</span>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ol>
          </nav>
          <div className="mobile-menu__contact" style={{ '--i': nav.length }}>
            <NavLink to={BOOK_PATH} className="btn btn--solid" tabIndex={open ? 0 : -1}>
              Book Now
            </NavLink>
            <a href={`tel:${site.phones[0].tel}`} tabIndex={open ? 0 : -1}>
              <Icon name="phone" size={16} /> {site.phones[0].display}
            </a>
            <a href={`mailto:${site.email}`} tabIndex={open ? 0 : -1}>
              <Icon name="mail" size={16} /> {site.email}
            </a>
            <p>
              <Icon name="pin" size={16} /> {site.address.full}
            </p>
          </div>
        </div>
      </header>
    </>
  );
}
