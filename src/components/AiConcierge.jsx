import { useEffect, useState } from 'react';
import { site } from '../data/site.js';
import Icon from './Icon.jsx';
import './AiConcierge.css';

// Official ElevenLabs widget, pinned so its behaviour can't change underneath us.
const WIDGET_SRC = 'https://unpkg.com/@elevenlabs/convai-widget-embed@0.19.0/dist/index.js';
const AVATAR = '/concierge-avatar.svg';

let widgetLoading = null;

/** Loads the widget script once; resolves when <elevenlabs-convai> is defined. */
function loadWidget() {
  if (customElements.get('elevenlabs-convai')) return Promise.resolve();
  widgetLoading ??= new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = WIDGET_SRC;
    script.async = true;
    script.onerror = () => reject(new Error('Widget script failed to load'));
    document.head.appendChild(script);
    customElements.whenDefined('elevenlabs-convai').then(resolve);
    setTimeout(() => reject(new Error('Widget load timed out')), 15000);
  }).catch((err) => {
    widgetLoading = null; // allow a retry on the next visit
    throw err;
  });
  return widgetLoading;
}

/**
 * Home-page AI concierge: a branded introduction plus the ElevenLabs widget
 * (floating, bottom-right). "Chat with our concierge" opens the widget's
 * chat panel via its `elevenlabs-agent:expand` event.
 */
export default function AiConcierge() {
  const [status, setStatus] = useState('loading'); // loading | ready | error
  // The single-row "compact" widget covers less of the page on phones.
  const [variant] = useState(() => (window.matchMedia('(max-width: 767px)').matches ? 'compact' : 'full'));

  useEffect(() => {
    let active = true;
    const root = document.documentElement;
    root.classList.add('has-concierge');
    loadWidget().then(
      () => active && setStatus('ready'),
      () => active && setStatus('error'),
    );
    return () => {
      active = false;
      root.classList.remove('has-concierge');
    };
  }, []);

  const openChat = () => {
    document.dispatchEvent(new CustomEvent('elevenlabs-agent:expand', { detail: { action: 'expand' } }));
  };

  const phone = site.phones[0];

  return (
    <section className="section concierge" aria-labelledby="concierge-title">
      <div className="container concierge__grid">
        <div className="concierge__visual" data-reveal="fade">
          <div className="concierge__arch">
            <img
              src={AVATAR}
              alt="Illustration of a smiling woman in a wide-brimmed straw hat by the sea, representing our AI concierge"
              width="320"
              height="320"
              loading="lazy"
            />
          </div>
          <p className="concierge__badge" aria-hidden="true">
            <span className="concierge__dot" /> AI concierge
          </p>
        </div>

        <div className="concierge__text">
          <p className="kicker" data-reveal>
            AI concierge
          </p>
          <h2 id="concierge-title" data-reveal style={{ '--d': 1 }}>
            Questions? <em>Just ask.</em>
          </h2>
          <p className="lead" data-reveal style={{ '--d': 2 }}>
            Chat with our AI concierge by message or voice — or call reception to speak with our team.
          </p>

          <div className="concierge__actions" data-reveal style={{ '--d': 3 }}>
            <button type="button" className="btn btn--solid" onClick={openChat} disabled={status !== 'ready'}>
              <Icon name="chat" size={18} />
              {status === 'loading' ? 'Loading concierge…' : 'Chat with our concierge'}
            </button>
            <a className="btn" href={`tel:${phone.tel}`}>
              <Icon name="phone" size={18} /> Call {phone.display}
            </a>
          </div>

          <div role="status" aria-live="polite">
            {status === 'error' && (
              <p className="concierge__error">
                Our AI concierge couldn’t load right now. Please call us on{' '}
                <a href={`tel:${phone.tel}`}>{phone.display}</a> or email{' '}
                <a href={`mailto:${site.email}`}>{site.email}</a>.
              </p>
            )}
          </div>

          <p className="concierge__note" data-reveal style={{ '--d': 4 }}>
            You’ll be chatting with an AI assistant, not a member of our team, and it can make mistakes. Please
            confirm bookings, rates and policies with us directly. Conversations are recorded and processed by our AI
            provider, ElevenLabs, as described in the terms shown in the chat.
          </p>
        </div>
      </div>

      {status === 'ready' && (
        <elevenlabs-convai
          agent-id={site.aiAgentId}
          variant={variant}
          avatar-image-url={new URL(AVATAR, window.location.origin).href}
          action-text="Questions? Ask our concierge"
        />
      )}
    </section>
  );
}
