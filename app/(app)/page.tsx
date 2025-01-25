import Hero from '@/components/shared/Hero';
import {Benefits} from '@/components/shared/Benefits';
import {Services} from '@/components/shared/Services';
import {Projects} from '@/components/shared/Projects';
import {About} from '@/components/shared/About';
import {FAQ} from '@/components/shared/FAQ';
import {Testimonials} from '@/components/shared/Testimonials';
import {Catalog} from '@/components/shared/Catalog';

export default function Home() {
	return (
		<>
			<Hero />
			<Benefits />
			{/* <Services /> */}
			<Catalog />
			{/* <Projects /> */}
			<About />
			<FAQ />
			{/* <Testimonials /> */}
		</>
	);
}
