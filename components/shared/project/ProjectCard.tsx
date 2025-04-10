import { Card, CardFooter } from '@heroui/card';
import Link from 'next/link';
import { SanityDocument } from 'next-sanity';
import { Image } from '@heroui/image';
import NextImage from 'next/image';
import { Button } from '@heroui/button';
import clsx from 'clsx';
import { ArrowUpRightIcon } from 'lucide-react';

import { ProjectTagList } from './ProjectTagList';

import { getUrlFor } from '@/lib/utils';

export const ProjectCard = ({ project }: { project: SanityDocument }) => (
    <Card isFooterBlurred as={Link} className="h-full group relative min-h-56" href={`/projects/${project.currentSlug}`} radius="sm">
        <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-2">
            {project?.service_tags?.length > 0 && <ProjectTagList color='primary' tags={project.service_tags} />}
            {project?.category_tags?.length > 0 && <ProjectTagList color='secondary' tags={project.category_tags} />}
        </div>
        {(project.imageUrl || project.image) && <Image
            as={NextImage}
            removeWrapper
            alt={project.title}
            className="z-0 object-cover aspect-square w-full h-full"
            radius="sm"
            src={project.imageUrl ? project.imageUrl : getUrlFor(project.image)}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />}
        <CardFooter className={clsx(
            'absolute bg-black/40 bottom-0 w-full z-10 p-0',
        )}>
            <div className="flex flex-col gap-2 p-3 w-full">
                <div className="flex flex-col gap-2">
                    <p className="text-lg font-semibold text-white/80 line-clamp-2 leading-tight" title={project.title}>{project.title}</p>
                    <p
                        className={clsx(
                            'text-xs text-white/80',
                            'grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 overflow-hidden'
                        )}
                        title={project.shortDescription}>
                        <span className="line-clamp-4">{project.shortDescription}</span>
                    </p>
                </div>
                <Button as={'span'} className="group/button self-start" color="secondary" radius="sm" role="presentation" size="sm">
                    <span>Подробнее</span>
                    <ArrowUpRightIcon className="group-hover/button:translate-x-1 transition-transform" size={18} />
                </Button>
            </div>
        </CardFooter>
    </Card>
);