import Image from 'next/image';

import HeroImage from '../../../public/images/hero.png';
import HeroContent from './HeroContent';

export default function HeroSection() {
	return (
		<section className="section relative overflow-hidden">
			<div className="container">
				<div className="py-10 md:py-20 flex flex-row items-center">
					<HeroContent />
					<Image priority alt={'ArtMarketPrint'} className="w-2/3 h-full absolute right-0 top-0 object-cover" height={750} placeholder="blur" quality={85} src={HeroImage} width={930} />
				</div>
			</div>
		</section>
	);
}


