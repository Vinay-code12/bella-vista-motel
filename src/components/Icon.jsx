// Minimal line icons (24×24, stroke = currentColor). Decorative by default.
const paths = {
  arrow: <path d="M4 12h15m-6-6 6 6-6 6" />,
  external: <path d="M8 16 17 7m-8 0h8v8" />,
  menu: <path d="M3 7h18M3 12h18M3 17h12" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  prev: <path d="m15 5-7 7 7 7" />,
  next: <path d="m9 5 7 7-7 7" />,
  expand: <path d="M4 9V4h5m6 0h5v5m0 6v5h-5m-6 0H4v-5" />,
  phone: (
    <path d="M5 4h3.5l1.5 4-2 1.5a11 11 0 0 0 6.5 6.5L16 14l4 1.5V19a1.5 1.5 0 0 1-1.6 1.5A16 16 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4Z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="m3.5 6 8.5 7 8.5-7" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  guests: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0M16 5.5a3 3 0 0 1 0 5.5m1.5 2.5a5.5 5.5 0 0 1 3 5.5" />
    </>
  ),
  bed: <path d="M3 18v-8m0 4h18v4m0-4v-2a3 3 0 0 0-3-3h-7v5M6.5 11.5a1.5 1.5 0 1 0 0-.01" />,
  note: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 8v5m0 3v.01" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  chat: <path d="M5 5.5h14a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1-1.5 1.5h-8L6.5 20v-3.5H5A1.5 1.5 0 0 1 3.5 15V7A1.5 1.5 0 0 1 5 5.5ZM8 10.5h8M8 13.5h5" />,
  fridge: (
    <>
      <rect x="6" y="3" width="12" height="18" rx="1.5" />
      <path d="M6 10h12M9 6v2m0 5v3" />
    </>
  ),
  toiletries: (
    <>
      <path d="M8 9h5v11H8zM9.5 9V6h2v3M9.5 6h4" />
      <path d="M15 13.5h4V20h-4zM16 13.5V12h2v1.5" />
    </>
  ),
  wifi: <path d="M3 9.5a13 13 0 0 1 18 0M6 13a8.5 8.5 0 0 1 12 0M9 16.4a4 4 0 0 1 6 0M12 19.5v.01" />,
  microwave: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="1.5" />
      <path d="M6 9h9v6H6zM18 9v.01M18 12v.01M18 15h.01" />
    </>
  ),
  dvd: (
    <>
      <rect x="3" y="8.5" width="18" height="7" rx="1" />
      <path d="M6 12h6m4 0h.01m2 0h.01" />
    </>
  ),
  iron: <path d="M4 15h13.5a2.5 2.5 0 0 0 2.5-2.5V7h-7a6 6 0 0 0-6 6M4 15v1.5h16V15M9 7V5.5h11" />,
  toaster: (
    <>
      <path d="M5 10a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v8H5z" />
      <path d="M9 7V4m6 3V4M5 18v2m14-2v2M19 12h2" />
    </>
  ),
  tv: (
    <>
      <rect x="3" y="4.5" width="18" height="12" rx="1" />
      <path d="M9 20h6m-3-3.5V20" />
    </>
  ),
};

export default function Icon({ name, size = 20, className, title }) {
  return (
    <svg
      className={`icon ${className ?? ''}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
    >
      {title && <title>{title}</title>}
      {paths[name]}
    </svg>
  );
}
