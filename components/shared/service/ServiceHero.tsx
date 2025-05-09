import Image from 'next/image'
import { MediaBlock } from '../media';
import BrandButton from '@/components/ui/BrandButton';
import Link from 'next/link';
import { ServiceHeroProps } from './service.props';

/**
 * A strongly typed function that renders a hero section for a service.
 *
 * @param {ServiceHeroProps} props - The props object with required properties.
 * @returns {JSX.Element} A JSX element that represents the hero section.
 */

export const ServiceHero: React.FC<ServiceHeroProps> = ({ title, description, mediaBlock, image, ...props }): JSX.Element => {
    return (
        <section
            className="py-12 md:py-24 relative after:absolute after:inset-0 after:bg-gradient-to-t after:from-black after:to-transparent overflow-hidden min-h-[calc(100vh-64px)] grid place-content-center">
            {/* Background service image */}
            {
                mediaBlock ?
                    <div className='absolute inset-0'>
                        <Image
                            alt={title}
                            className="absolute inset-0 object-cover w-full h-full blur"
                            height={1080}
                            src={`${image}`}
                            width={1920}
                        />
                        <MediaBlock
                            {...mediaBlock}
                        />
                    </div> :
                    <Image
                        priority
                        alt={title}
                        className="absolute inset-0 object-cover w-full h-full"
                        height={1080}
                        src={`${image}`}
                        width={1920}
                    />
            }
            {/* Hero content */}
            <div className="container flex flex-col gap-10 max-w-2xl relative z-10">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-background sm:text-5xl">
                        {title}
                    </h1>
                    <p className="mt-4 text-xl text-white text-balance">
                        {description}
                    </p>
                </div>

                <BrandButton as={Link} className={'self-center'} href={'#serviceDetails'} state="primary">Подробнее</BrandButton>
            </div>
        </section>
    )
}
