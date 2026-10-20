import { useId, useRef, useState } from 'react';
import Icon from '../components/Icon.jsx';
import PageHero from '../components/PageHero.jsx';
import { site } from '../data/site.js';
import usePageMeta from '../hooks/usePageMeta.js';
import './Contact.css';

// Optional HTTPS endpoint accepting JSON { name, email, subject, message }.
// Without it the form hands the message to the visitor's email app.
const ENDPOINT = import.meta.env.VITE_ENQUIRY_ENDPOINT?.trim();
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const EMPTY = { name: '', email: '', subject: '', message: '' };

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Please enter your name.';
  if (!values.email.trim()) errors.email = 'Please enter your email address.';
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = 'Please enter a valid email address, like name@example.com.';
  if (!values.subject.trim()) errors.subject = 'Please enter a subject.';
  if (!values.message.trim()) errors.message = 'Please enter a message.';
  return errors;
}

function EnquiryForm() {
  const uid = useId();
  const formRef = useRef(null);
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error | handed-off

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    const found = validate(values);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      formRef.current.elements[firstInvalid]?.focus();
      return;
    }
    const payload = Object.fromEntries(Object.entries(values).map(([k, v]) => [k, v.trim()]));

    if (!ENDPOINT) {
      const body = `${payload.message}\n\n${payload.name}\n${payload.email}`;
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(payload.subject)}&body=${encodeURIComponent(body)}`;
      setStatus('handed-off');
      return;
    }

    setStatus('sending');
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus('sent');
      setValues(EMPTY);
    } catch {
      setStatus('error');
    } finally {
      clearTimeout(timer);
    }
  };

  const id = (name) => `${uid}-${name}`;
  const field = (name, label, props = {}) => {
    const { as: Tag = 'input', ...rest } = props;
    return (
      <div className="field">
        <label htmlFor={id(name)}>
          {label} <span aria-hidden="true">*</span>
        </label>
        <Tag
          id={id(name)}
          name={name}
          value={values[name]}
          onChange={onChange}
          required
          aria-invalid={errors[name] ? 'true' : undefined}
          aria-describedby={errors[name] ? id(`${name}-error`) : undefined}
          {...rest}
        />
        {errors[name] && (
          <p className="field__error" id={id(`${name}-error`)}>
            {errors[name]}
          </p>
        )}
      </div>
    );
  };

  return (
    <form ref={formRef} className="enquiry" onSubmit={onSubmit} noValidate aria-labelledby={id('title')}>
      <h2 id={id('title')}>
        Please fill the form to <em>email us</em>
      </h2>
      <p className="enquiry__required">
        All fields are required. <span aria-hidden="true">*</span>
      </p>

      <div className="enquiry__fields">
        {field('name', 'Name', { type: 'text', autoComplete: 'name', maxLength: 120 })}
        {field('email', 'Email Address', { type: 'email', autoComplete: 'email', inputMode: 'email', maxLength: 200 })}
        {field('subject', 'Subject', { type: 'text', maxLength: 200 })}
        {field('message', 'Message', { as: 'textarea', rows: 6, maxLength: 5000 })}
      </div>

      <div className="enquiry__actions">
        <button type="submit" className="btn btn--solid" disabled={status === 'sending'} aria-disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : ENDPOINT ? 'Send' : 'Send via email app'}
          <Icon name="arrow" size={18} />
        </button>
        {!ENDPOINT && (
          <p className="enquiry__hint">
            This opens your email app with your message addressed to{' '}
            <a href={`mailto:${site.email}`}>{site.email}</a>, ready to send.
          </p>
        )}
      </div>

      <div className="enquiry__status" role="status" aria-live="polite">
        {status === 'sent' && <p className="is-success">Thank you — your message has been sent. We’ll be in touch soon.</p>}
        {status === 'handed-off' && (
          <p>
            Your email app should now be open with your message. Please press send there. If nothing opened, email us
            directly at <a href={`mailto:${site.email}`}>{site.email}</a> or call{' '}
            <a href={`tel:${site.phones[0].tel}`}>{site.phones[0].display}</a>.
          </p>
        )}
      </div>
      <div role="alert">
        {status === 'error' && (
          <p className="enquiry__error">
            Sorry, your message couldn’t be sent. Please try again, email us at{' '}
            <a href={`mailto:${site.email}`}>{site.email}</a> or call{' '}
            <a href={`tel:${site.phones[0].tel}`}>{site.phones[0].display}</a>.
          </p>
        )}
      </div>
    </form>
  );
}

export default function Contact() {
  usePageMeta(
    'Contact Us',
    'Contact Bella Vista Motel, 5 Central Coast Highway Kariong NSW 2250. Phone +61 2 4340 1108, email bellavistamotel@bigpond.com. Business hours, map and directions.',
  );

  return (
    <>
      <PageHero
        title="Contact us"
        crumb="Contact Us"
        kicker="Kariong · NSW 2250"
        intro="Call, email or send us a message — and find directions to the motel below."
        image={{ name: 'exterior-courtyard', alt: 'Motel building and driveway beneath the Bella Vista Motel sign', position: '40% 50%' }}
      >
        <div className="contact-quick">
          <a className="btn btn--solid" href={`tel:${site.phones[0].tel}`}>
            <Icon name="phone" size={18} /> Call us
          </a>
          <a className="btn" href={`mailto:${site.email}`}>
            <Icon name="mail" size={18} /> Email us
          </a>
        </div>
      </PageHero>

      <section className="container" aria-label="Contact details">
        <div className="contact-cards">
          <article className="contact-card" data-reveal>
            <Icon name="pin" size={26} />
            <h2>Location</h2>
            <address>{site.address.full}</address>
            <a className="link-arrow" href={site.map.directions} target="_blank" rel="noopener noreferrer">
              Get directions <Icon name="external" size={16} />
              <span className="visually-hidden"> (opens Google Maps in a new tab)</span>
            </a>
          </article>
          <article className="contact-card" data-reveal style={{ '--d': 1 }}>
            <Icon name="phone" size={26} />
            <h2>Phone</h2>
            <ul role="list">
              {site.phones.map((p) => (
                <li key={p.tel}>
                  <a href={`tel:${p.tel}`}>{p.display}</a>
                </li>
              ))}
            </ul>
          </article>
          <article className="contact-card" data-reveal style={{ '--d': 2 }}>
            <Icon name="mail" size={26} />
            <h2>Email</h2>
            <a className="contact-card__email" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </article>
          <article className="contact-card" data-reveal style={{ '--d': 3 }}>
            <Icon name="clock" size={26} />
            <h2>Our Business Hours</h2>
            <dl>
              {site.hours.map((h) => (
                <div key={h.days}>
                  <dt>{h.days}</dt>
                  <dd>{h.time}</dd>
                </div>
              ))}
            </dl>
          </article>
        </div>
      </section>

      <section className="section contact-main" aria-label="Map and enquiry form">
        <div className="container contact-main__grid">
          <div className="contact-map" data-reveal="fade">
            <div className="contact-map__frame">
              <iframe
                src={site.map.embed}
                title="Map showing Bella Vista Motel at 5 Central Coast Highway, Kariong"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <div className="contact-map__links">
              <a className="btn btn--solid" href={site.map.directions} target="_blank" rel="noopener noreferrer">
                Get directions <Icon name="external" size={16} />
                <span className="visually-hidden"> (opens Google Maps in a new tab)</span>
              </a>
              <a className="btn" href={site.map.view} target="_blank" rel="noopener noreferrer">
                Open in Google Maps <Icon name="external" size={16} />
                <span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
          <EnquiryForm />
        </div>
      </section>
    </>
  );
}
