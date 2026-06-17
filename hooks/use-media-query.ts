'use client';
import {useEffect, useState} from 'react';

/**
 * Reactive `window.matchMedia` hook. Returns `false` during SSR and on the
 * initial client render, then syncs to the actual viewport on mount. This
 * avoids hydration mismatches — the value is intentionally only meaningful
 * after the component has mounted.
 */
export function useMediaQuery(query: string): boolean {
	const [matches, setMatches] = useState<boolean>(false);

	useEffect(() => {
		const mql = window.matchMedia(query);
		const handleChange = () => setMatches(mql.matches);

		handleChange();
		mql.addEventListener('change', handleChange);
		return () => mql.removeEventListener('change', handleChange);
	}, [query]);

	return matches;
}
