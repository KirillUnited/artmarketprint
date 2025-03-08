import { ProjectTagList } from '@/components/shared/project';
import { Image} from '@heroui/image';
import { Card, CardFooter } from '@heroui/card';
import { Link } from '@heroui/link';
import { getUrlFor } from '@/lib/utils';
import clsx from 'clsx';
import { Button } from '@heroui/button';
import { ArrowUpRightIcon } from 'lucide-react';

export default function ServiceListItems({ services }: any) {
    return (
        <ul className="grid grid-cols-[var(--grid-template-columns)] gap-8">
            {services?.map((service: any) => (
                <li key={service.title}>
                    <Card isFooterBlurred as={Link} className="h-full group relative" href={`/services/${service.currentSlug}`} radius="sm">
                        <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-2">
                            {service?.service_tags?.length > 0 && <ProjectTagList tags={service.service_tags} color='primary' />}
                            {service?.category_tags?.length > 0 && <ProjectTagList tags={service.category_tags} color='secondary' />}
                        </div>
                        <Image removeWrapper isZoomed alt={service.altText} className="z-0 w-full h-full object-cover aspect-square" radius="sm" src={service.imageUrl ? service.imageUrl : getUrlFor(service.image)} width={220} />
                        <CardFooter className={clsx(
                            "absolute bg-black/40 bottom-0 w-full z-10 p-0",
                        )}>
                            <div className="flex flex-col gap-2 p-3 w-full">
                                <div className="flex flex-col gap-2">
                                    <h4 title={service.title} className="text-lg font-semibold text-white/80 line-clamp-2 leading-tight">{service.title}</h4>
                                    <p
                                        title={service.shortDescription}
                                        className={clsx(
                                            "text-xs text-white/80",
                                            "grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 overflow-hidden"
                                        )}>
                                        <span className="line-clamp-4">{service.shortDescription}</span>
                                    </p>
                                </div>
                                <Button as={'span'} className="group/button self-start" color="secondary" role="presentation" radius="sm" size="sm">
                                    <span>Подробнее</span>
                                    <ArrowUpRightIcon className="group-hover/button:translate-x-1 transition-transform" size={18} />
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                </li>
            ))}
        </ul>
    )
}
