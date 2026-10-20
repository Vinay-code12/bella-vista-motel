import { useId, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GUEST_LIMITS,
  addDays,
  bookPageHref,
  defaultStay,
  recallStay,
  rememberStay,
  today,
  validateStay,
} from '../lib/booking.js';
import Icon from './Icon.jsx';
import './BookingPanel.css';

const range = ({ min, max }) => Array.from({ length: max - min + 1 }, (_, i) => min + i);

/**
 * Date and guest picker. It never reserves anything itself. By default a valid
 * search continues to the local /book/ page (carrying the stay and `room`);
 * the /book/ page passes `onValidSubmit` to hand off to the booking provider.
 */
export default function BookingPanel({
  variant = 'inline',
  title = 'Check availability',
  id: formId,
  room,
  initialStay,
  onStayChange,
  onValidSubmit,
  hideSubmit = false,
  footnote = 'Live rates and availability are confirmed on the next step.',
}) {
  const uid = useId();
  const navigate = useNavigate();
  const [stay, setStay] = useState(() => initialStay ?? recallStay() ?? defaultStay());
  const [errors, setErrors] = useState({});

  const update = (field) => (e) => {
    const value = field === 'adults' || field === 'children' ? Number(e.target.value) : e.target.value;
    const next = { ...stay, [field]: value };
    // Keep check-out after check-in when the arrival date moves.
    if (field === 'checkIn' && value && (!next.checkOut || next.checkOut <= value)) {
      next.checkOut = addDays(value, 1);
    }
    setStay(next);
    rememberStay(next);
    onStayChange?.(next);
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const found = validateStay(stay);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      e.currentTarget.elements[firstInvalid]?.focus();
      return;
    }
    rememberStay(stay);
    if (onValidSubmit) onValidSubmit(stay);
    else navigate(bookPageHref({ stay, room }));
  };

  const id = (name) => `${uid}-${name}`;
  const fieldProps = (name) => ({
    id: id(name),
    name,
    'aria-invalid': errors[name] ? 'true' : undefined,
    'aria-describedby': errors[name] ? id(`${name}-error`) : undefined,
  });
  const errorText = (name) =>
    errors[name] ? (
      <p className="booking__error" id={id(`${name}-error`)}>
        {errors[name]}
      </p>
    ) : null;

  return (
    <form
      id={formId}
      className={`booking booking--${variant}`}
      onSubmit={onSubmit}
      noValidate
      aria-labelledby={id('title')}
    >
      <h2 className="booking__title" id={id('title')}>
        {title}
      </h2>

      <div className="booking__fields">
        <div className="booking__field">
          <label htmlFor={id('checkIn')}>Check-in</label>
          <input type="date" min={today()} value={stay.checkIn} onChange={update('checkIn')} required {...fieldProps('checkIn')} />
          {errorText('checkIn')}
        </div>
        <div className="booking__field">
          <label htmlFor={id('checkOut')}>Check-out</label>
          <input
            type="date"
            min={addDays(stay.checkIn || today(), 1)}
            value={stay.checkOut}
            onChange={update('checkOut')}
            required
            {...fieldProps('checkOut')}
          />
          {errorText('checkOut')}
        </div>
        <div className="booking__field booking__field--small">
          <label htmlFor={id('adults')}>Adults</label>
          <select value={stay.adults} onChange={update('adults')} {...fieldProps('adults')}>
            {range(GUEST_LIMITS.adults).map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          {errorText('adults')}
        </div>
        <div className="booking__field booking__field--small">
          <label htmlFor={id('children')}>Children</label>
          <select value={stay.children} onChange={update('children')} {...fieldProps('children')}>
            {range(GUEST_LIMITS.children).map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          {errorText('children')}
        </div>
        {!hideSubmit && (
          <button type="submit" className="btn btn--solid booking__submit">
            Check availability <Icon name="arrow" size={18} />
          </button>
        )}
      </div>

      {footnote && <p className="booking__meta">{footnote}</p>}
    </form>
  );
}
