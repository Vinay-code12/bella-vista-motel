import images from '../data/images.json';

/**
 * Responsive WebP image from the optimised manifest (see scripts/optimize-images.mjs).
 * Width/height attributes reserve space to avoid layout shift; `sizes` should
 * describe the rendered width so the browser never fetches more than needed.
 */
export default function Img({ name, alt, sizes = '100vw', priority = false, className, style, position }) {
  const meta = images[name];
  if (!meta) {
    if (import.meta.env.DEV) console.warn(`Img: unknown image "${name}"`);
    return <span className={`img-missing ${className ?? ''}`} role="img" aria-label={alt} />;
  }
  const largest = meta.widths[meta.widths.length - 1];
  return (
    <img
      src={`/images/${name}-${largest}.webp`}
      srcSet={meta.widths.map((w) => `/images/${name}-${w}.webp ${w}w`).join(', ')}
      sizes={sizes}
      width={meta.width}
      height={meta.height}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : undefined}
      className={className}
      style={{ backgroundColor: meta.color, objectPosition: position, ...style }}
    />
  );
}
