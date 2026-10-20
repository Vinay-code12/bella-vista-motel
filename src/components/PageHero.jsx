import { Link } from 'react-router-dom';
import Img from './Img.jsx';
import './PageHero.css';

/**
 * Inner-page hero. Variants:
 *  - split: editorial title beside a framed photograph (optionally layered with `inset`)
 *  - full:  full-bleed photograph with the title set over a shaded base (needs a ≥1600px image)
 *  - type:  typographic only, for pages that are themselves image-led
 */
export default function PageHero({ variant = 'split', kicker, title, intro, crumb, image, inset, children }) {
  const breadcrumb = (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li aria-current="page">{crumb}</li>
      </ol>
    </nav>
  );

  if (variant === 'full') {
    return (
      <section className="page-hero page-hero--full on-dark">
        <div className="page-hero__media frame">
          <Img name={image.name} alt={image.alt} position={image.position} sizes="100vw" priority />
        </div>
        <div className="container page-hero__content">
          {breadcrumb}
          {kicker && <p className="kicker">{kicker}</p>}
          <h1>{title}</h1>
          {intro && <p className="page-hero__intro">{intro}</p>}
          {children}
        </div>
      </section>
    );
  }

  return (
    <section className={`page-hero page-hero--${variant}`}>
      <div className="container page-hero__grid">
        <div className="page-hero__text">
          {breadcrumb}
          {kicker && <p className="kicker">{kicker}</p>}
          <h1>{title}</h1>
          {intro && <p className="lead page-hero__intro">{intro}</p>}
          {children}
        </div>
        {image && (
          <div className="page-hero__visual">
            <div className="page-hero__frame frame">
              <Img
                name={image.name}
                alt={image.alt}
                position={image.position}
                sizes="(min-width: 1080px) 46vw, 100vw"
                priority
              />
            </div>
            {inset && (
              <div className="page-hero__inset frame" data-reveal style={{ '--d': 3 }}>
                <Img name={inset.name} alt={inset.alt} sizes="(min-width: 1080px) 18vw, 40vw" />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
