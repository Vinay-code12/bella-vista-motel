import { useEffect, useRef } from 'react';
import Img from './Img.jsx';
import Icon from './Icon.jsx';
import './Lightbox.css';

/**
 * Modal photo viewer built on <dialog>: the browser makes the page behind it
 * inert and handles Escape. Arrow keys and swipes move between photos, and
 * focus returns to the opening control on close.
 */
export default function Lightbox({ images, index, onChange, onClose, label = 'Photo viewer' }) {
  const dialogRef = useRef(null);
  const returnFocusRef = useRef(null);
  const touchRef = useRef(null);
  const closeRef = useRef(null);
  const open = index !== null && index !== undefined;
  const count = images.length;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      returnFocusRef.current = document.activeElement;
      dialog.showModal();
      closeRef.current?.focus();
      document.documentElement.classList.add('menu-open');
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    const onDialogClose = () => {
      document.documentElement.classList.remove('menu-open');
      returnFocusRef.current?.focus?.();
      onClose();
    };
    dialog.addEventListener('close', onDialogClose);
    return () => dialog.removeEventListener('close', onDialogClose);
  }, [onClose]);

  if (!count) return null;

  const go = (step) => onChange((index + step + count) % count);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      go(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      go(-1);
    }
  };

  const onTouchStart = (e) => {
    const t = e.touches[0];
    touchRef.current = { x: t.clientX, y: t.clientY };
  };

  const onTouchEnd = (e) => {
    const start = touchRef.current;
    touchRef.current = null;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(t.clientY - start.y)) go(dx < 0 ? 1 : -1);
  };

  // Clicking the backdrop (anywhere outside the photo and controls) closes it.
  const onClick = (e) => {
    if (e.target === dialogRef.current || e.target.dataset.backdrop) dialogRef.current.close();
  };

  const current = open ? images[index] : null;

  return (
    <dialog
      ref={dialogRef}
      className="lightbox"
      aria-label={label}
      onKeyDown={onKeyDown}
      onClick={onClick}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {current && (
        <div className="lightbox__inner" data-backdrop="true">
          <div className="lightbox__top">
            <p className="lightbox__count" aria-live="polite">
              {index + 1} <span>/</span> {count}
            </p>
            <button type="button" className="lightbox__btn" onClick={() => dialogRef.current.close()} ref={closeRef}>
              <Icon name="close" size={24} />
              <span className="visually-hidden">Close</span>
            </button>
          </div>

          <figure className="lightbox__figure" data-backdrop="true">
            <Img key={current.src} name={current.src} alt={current.alt} sizes="(min-width: 1024px) 1024px, 100vw" priority />
          </figure>

          {count > 1 && (
            <div className="lightbox__nav">
              <button type="button" className="lightbox__btn" onClick={() => go(-1)}>
                <Icon name="prev" size={26} />
                <span className="visually-hidden">Previous photo</span>
              </button>
              <button type="button" className="lightbox__btn" onClick={() => go(1)}>
                <Icon name="next" size={26} />
                <span className="visually-hidden">Next photo</span>
              </button>
            </div>
          )}
        </div>
      )}
    </dialog>
  );
}
