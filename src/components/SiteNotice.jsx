import { useState } from 'react';
import { site } from '../data/site.js';
import Icon from './Icon.jsx';
import './SiteNotice.css';

const storageKey = `notice-dismissed:${site.notice.id}`;

function readDismissed() {
  try {
    return window.localStorage.getItem(storageKey) === '1';
  } catch {
    return false;
  }
}

/** Site-wide announcement carried over from the source popup. In-flow, never covers content. */
export default function SiteNotice() {
  const [hidden, setHidden] = useState(readDismissed);
  if (hidden) return null;

  const dismiss = () => {
    setHidden(true);
    try {
      window.localStorage.setItem(storageKey, '1');
    } catch {
      /* storage unavailable: dismissal lasts for this page view only */
    }
  };

  return (
    <div className="site-notice" role="region" aria-label="Notice">
      <div className="container site-notice__inner">
        <p>
          <span className="site-notice__label">Notice</span>
          {site.notice.text}
        </p>
        <button type="button" onClick={dismiss}>
          <Icon name="close" size={18} />
          <span className="visually-hidden">Dismiss notice</span>
        </button>
      </div>
    </div>
  );
}
