import Image from 'next/image';
import HeroContent from './HeroContent';

export default function HeroSection(props: any) {
	const { title, subtitle, description, orientation, imageUrl } = props;

	return (
		<section className="section relative overflow-hidden">
			<div className="container">
				<div className="py-10 md:py-20 flex flex-row items-center">
					<HeroContent title={title} description={description} subtitle={subtitle} />
					<Image alt={'ArtMarketPrint'} className="w-2/3 h-full absolute right-0 top-0 object-cover" height={750} quality={85} src={imageUrl} width={930} />
				</div>
			</div>
		</section>
	);
}