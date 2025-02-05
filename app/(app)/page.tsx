import Script from 'next/script';

import Hero from '@/components/shared/Hero';
import { Benefits } from '@/components/shared/Benefits';
import About from '@/components/shared/About';
import { FAQ } from '@/components/shared/FAQ';
import { Catalog } from '@/components/shared/Catalog';
import { Services } from '@/components/shared/Services';
import Contacts from '@/components/shared/Contacts';
import {InstagramFeedSection} from '@/components/shared/InstagramFeed';

export default function Home() {
	return (
		<>
			<Hero />
			<Benefits />
			<Services />
			<Catalog />
			{/* <Projects /> */}
			<About />
			<FAQ />
			<Contacts />
			<InstagramFeedSection/>
			{/* <Testimonials /> */}
			<Script
				async
				src="https://static.elfsight.com/platform/platform.js"
				strategy="lazyOnload"
			/>
			<div data-elfsight-app-lazy className="elfsight-app-7f56de0f-7490-4845-801c-cf32d1a5aeb1"/>
		</>
	);
}
