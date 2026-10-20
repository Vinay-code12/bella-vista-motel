import { useEffect, useRef } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import SiteNotice from './components/SiteNotice.jsx';
import { nav } from './data/site.js';
import { BOOK_PATH } from './lib/booking.js';
import useReveal from './hooks/useReveal.js';
import Home from './pages/Home.jsx';
import Accommodation from './pages/Accommodation.jsx';
import Attractions from './pages/Attractions.jsx';
import Gallery from './pages/Gallery.jsx';
import Contact from './pages/Contact.jsx';
import Book from './pages/Book.jsx';
import NotFound from './pages/NotFound.jsx';

/** Scrolls to the top (or to #hash) on navigation and moves focus to <main>. */
function useRouteFocus(mainRef) {
  const { pathname, hash } = useLocation();
  const first = useRef(true);

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target) {
        target.scrollIntoView({ block: 'start' });
        if (!first.current) target.focus?.({ preventScroll: true });
        first.current = false;
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (!first.current) mainRef.current?.focus({ preventScroll: true });
    first.current = false;
  }, [pathname, hash, mainRef]);
}

/** Canonicalises /accommodation → /accommodation/ to match the source site's URLs. */
function useTrailingSlash() {
  const { pathname, search, hash } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (pathname !== '/' && !pathname.endsWith('/') && [...nav.map((n) => n.to), BOOK_PATH].includes(`${pathname}/`)) {
      navigate(`${pathname}/${search}${hash}`, { replace: true });
    }
  }, [pathname, search, hash, navigate]);
}

export default function App() {
  const mainRef = useRef(null);
  const { pathname } = useLocation();
  useTrailingSlash();
  useRouteFocus(mainRef);
  useReveal(pathname);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteNotice />
      <Header />
      <main id="main" ref={mainRef} tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/accommodation" element={<Accommodation />} />
          <Route path="/attractions" element={<Attractions />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/book" element={<Book />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
