import { useEffect } from 'react';

const SUFFIX = 'Bella Vista Motel';

/** Sets the document title and meta description for a route. */
export default function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title ? `${title} | ${SUFFIX}` : `${SUFFIX} | Kariong, NSW Central Coast`;
    if (description) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    }
  }, [title, description]);
}
