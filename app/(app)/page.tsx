import Hero from '@/components/shared/Hero';
import {Benefits} from '@/components/shared/Benefits';
import About from '@/components/shared/About';
import {FAQ} from '@/components/shared/FAQ';
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
