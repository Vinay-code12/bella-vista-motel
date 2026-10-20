import { useCallback, useState } from 'react';
import Icon from '../components/Icon.jsx';
import Img from '../components/Img.jsx';
import Lightbox from '../components/Lightbox.jsx';
import PageHero from '../components/PageHero.jsx';
import { gallery } from '../data/gallery.js';
import usePageMeta from '../hooks/usePageMeta.js';
import './Gallery.css';

export default function Gallery() {
  usePageMeta('Gallery', 'Photographs of Bella Vista Motel in Kariong: rooms, apartment, pool, gardens and the motel grounds.');
  const [viewer, setViewer] = useState(null);
  const closeViewer = useCallback(() => setViewer(null), []);

  return (
    <>
      <PageHero
        variant="type"
        kicker={`${gallery.length} photographs`}
        title={
          <>
            Gallery<span className="gallery-title-dot">.</span>
          </>
        }
        crumb="Gallery"
        intro="Experience comfort and convenience — stay in our versatile rooms with stunning Brisbane Waters views and top-notch facilities."
      />

      <section className="gallery-wrap" aria-label="Photographs">
        <div className="container">
          <ul className="gallery-grid" role="list">
            {gallery.map((img, i) => (
              <li key={img.src} className="gallery-grid__item">
                <button
                  type="button"
                  className="gallery-grid__btn frame zoom"
                  onClick={() => setViewer(i)}
                  aria-label={`View photo ${i + 1} of ${gallery.length} full screen: ${img.alt}`}
                  data-reveal
                  style={{ '--d': i % 3 }}
                >
                  <Img name={img.src} alt="" sizes="(min-width: 1080px) 55vw, (min-width: 640px) 50vw, 100vw" />
                  <span className="gallery-grid__expand" aria-hidden="true">
                    <Icon name="expand" size={18} />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Lightbox images={gallery} index={viewer} onChange={setViewer} onClose={closeViewer} label="Gallery photos" />
    </>
  );
}
