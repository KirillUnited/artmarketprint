import {HeroCarousel} from './HeroCarousel';

import {getSanityDocuments} from '@/lib/fetch-sanity-data';
import {HERO_QUERY} from '@/sanity/lib/queries';

export async function Hero({}) {
	const data: any = await getSanityDocuments(HERO_QUERY);

	if (!data || data.length === 0) {
		console.warn('Нет данных о Hero');

		return null;
	}

	return <HeroCarousel items={data?.content?.slides} />;
}
