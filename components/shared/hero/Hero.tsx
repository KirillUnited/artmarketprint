import { getSanityDocuments } from '@/lib/getData';
import { HERO_QUERY } from '@/sanity/lib/queries';
import { HeroCarousel } from './HeroCarousel';

export async function Hero() {
	const data: any = await getSanityDocuments(HERO_QUERY);

	if (!data || data.length === 0) {
		console.warn("Нет данных о Hero");
		return null;
	}

	return <HeroCarousel items={data?.content?.slides} />;
}
