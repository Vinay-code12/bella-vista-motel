import Icon from '../components/Icon.jsx';
import Img from '../components/Img.jsx';
import PageHero from '../components/PageHero.jsx';
import { attractionAlt, attractions } from '../data/attractions.js';
import usePageMeta from '../hooks/usePageMeta.js';
import './Attractions.css';

const withImage = attractions.filter((a) => a.image);
const textOnly = attractions.filter((a) => !a.image);

export default function Attractions() {
  usePageMeta(
    'Attractions',
    'Attractions near Bella Vista Motel, Kariong: The Australian Reptile Park, Somersby Falls, Glenworth Valley, Mount Penang Parklands, Central Coast beaches and more.',
  );

  return (
    <>
      <PageHero
        variant="full"
        kicker="Around Kariong"
        title="Attractions"
        crumb="Attractions"
        intro="The Central Coast has a lot to offer."
        image={{
          name: 'exterior-highway',
          alt: 'Bella Vista Motel from the Central Coast Highway, with road signs to Sydney, Newcastle, Gosford and Terrigal',
          position: '50% 60%',
        }}
      />

      <section className="section attr-index-wrap" aria-labelledby="attr-index-title">
        <div className="container attr-intro">
          <div>
            <p className="kicker" data-reveal>
              At a glance
            </p>
            <h2 id="attr-index-title" data-reveal style={{ '--d': 1 }}>
              {attractions.length} reasons to <em>explore</em>
            </h2>
          </div>
          <ol className="attr-index" role="list" data-reveal style={{ '--d': 2 }}>
            {attractions.map((a, i) => (
              <li key={a.id}>
                <a href={`#${a.id}`}>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  {a.title}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="attr-grid-wrap" aria-label="Attractions">
        <div className="container">
          <ul className="attr-grid" role="list">
            {withImage.map((a) => {
              const n = attractions.indexOf(a) + 1;
              return (
                <li key={a.id} id={a.id} tabIndex={-1}>
                  <article className={`attr-card${a.url ? ' attr-card--linked zoom' : ''}`} data-reveal>
                    <div className="attr-card__media frame">
                      <Img name={a.image} alt={attractionAlt[a.image]} sizes="(min-width: 1080px) 400px, (min-width: 640px) 46vw, 100vw" />
                    </div>
                    <div className="attr-card__body">
                      <span className="attr-card__num">{String(n).padStart(2, '0')}</span>
                      <h3>
                        {a.url ? (
                          <a href={a.url} target="_blank" rel="noopener noreferrer">
                            {a.title}
                            <span className="visually-hidden"> (opens in a new tab)</span>
                          </a>
                        ) : (
                          a.title
                        )}
                      </h3>
                      {a.url && (
                        <span className="attr-card__link" aria-hidden="true">
                          Visit website <Icon name="external" size={16} />
                        </span>
                      )}
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {textOnly.map((a) => (
        <section key={a.id} id={a.id} className="section getting-here" aria-labelledby={`${a.id}-title`} tabIndex={-1}>
          <div className="container getting-here__grid">
            <div className="getting-here__media frame" data-reveal="fade">
              <Img name="exterior-street" alt="Bella Vista Motel building seen from the highway" sizes="(min-width: 1080px) 50vw, 100vw" />
            </div>
            <div>
              <p className="kicker" data-reveal>
                Getting here · {String(attractions.indexOf(a) + 1).padStart(2, '0')}
              </p>
              <h2 id={`${a.id}-title`} data-reveal style={{ '--d': 1 }}>
                {a.title}
              </h2>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
