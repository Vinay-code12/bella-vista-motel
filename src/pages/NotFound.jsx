import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import usePageMeta from '../hooks/usePageMeta.js';
import { nav } from '../data/site.js';

export default function NotFound() {
  usePageMeta('Page not found');
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 820 }}>
        <p className="kicker">404</p>
        <h1 style={{ marginTop: '1.25rem' }}>
          This page has <em>moved on</em>
        </h1>
        <p className="lead" style={{ marginTop: '1.5rem' }}>
          The page you’re looking for doesn’t exist. Try one of these instead:
        </p>
        <ul role="list" style={{ display: 'grid', gap: '0.5rem', marginTop: '2rem' }}>
          {nav.map((item) => (
            <li key={item.to}>
              <Link className="link-arrow" to={item.to}>
                {item.label} <Icon name="arrow" size={16} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
