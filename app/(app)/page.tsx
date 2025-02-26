import { Benefits } from '@/components/shared/Benefits';
import About from '@/components/shared/About';
import { FAQSection } from '@/components/shared/faq';
import { Catalog } from '@/components/shared/Catalog';
import { Services } from '@/components/shared/Services';
import ContactUs, { MapFrame } from '@/components/shared/ContactUs';
import {InstagramFeedSection} from '@/components/shared/InstagramFeed';
import {Projects} from '@/components/shared/Projects';
import { ProductSection } from '@/components/shared/product/ProductSection';
import { Hero } from '@/components/shared/hero/Hero';
import {getSanityDocuments} from "@/lib/fetch-sanity-data";
import {HOME_PAGE_QUERY} from "@/sanity/lib/page.query";

export default async function Home() {
	const {homePage} = await getSanityDocuments(HOME_PAGE_QUERY);

	if (!Array.isArray(homePage?.content) || homePage.length === 0) {
		console.warn("Нет данных о главной странице");

		return null;
	}

	return (
		<>
			<Hero />
			<Benefits />
			<Services />
			<Catalog />
			<ProductSection />
			<About />
			<Projects />
			<InstagramFeedSection id="instagram" />
			<FAQSection className="bg-[#F1F4FA]" />
			<ContactUs className="bg-background" id="contacts" />
			<MapFrame />
			{/* <Testimonials /> */}
			{/*<Script*/}
			{/*	async*/}
			{/*	src="https://static.elfsight.com/platform/platform.js"*/}
			{/*	strategy="lazyOnload"*/}
			{/*/>*/}
			{/*<div data-elfsight-app-lazy className="elfsight-app-7f56de0f-7490-4845-801c-cf32d1a5aeb1"/>*/}
		</>
	);
}
