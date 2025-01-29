import Hero from '@/components/shared/Hero';
import { Benefits } from '@/components/shared/Benefits';
import About from '@/components/shared/About';
import { FAQ } from '@/components/shared/FAQ';
import { Catalog } from '@/components/shared/Catalog';
import SocialWidget from '@/components/shared/SocialWidget';
import { Services } from '@/components/shared/Services';
import Contacts from '@/components/shared/Contacts';
import Script from 'next/script';

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
			<SocialWidget />
			{/* <Testimonials /> */}
			<Script
				src="https://static.elfsight.com/platform/platform.js"
				strategy="lazyOnload"
				async
			/>
			<div className="elfsight-app-7f56de0f-7490-4845-801c-cf32d1a5aeb1" data-elfsight-app-lazy/>
		</>
	);
}
