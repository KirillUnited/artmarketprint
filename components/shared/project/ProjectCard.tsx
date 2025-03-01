import { Card, CardFooter } from "@heroui/card";
import Link from "next/link";
import { ProjectTagList } from "./ProjectTagList";
import { SanityDocument } from "next-sanity";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";

export const ProjectCard = ({ project }: { project: SanityDocument }) => (
    <Card isFooterBlurred as={Link} className="h-full group relative" href={`/projects/${project.currentSlug}`} radius="sm">
        <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-2">
            {project?.service_tags?.length > 0 && <ProjectTagList tags={project.service_tags} color='primary' />}
            {project?.category_tags?.length > 0 && <ProjectTagList tags={project.category_tags} color='secondary' />}
        </div>
        <Image removeWrapper alt={project.altText} className="z-0 w-full h-full object-cover" radius="sm" src={project.imageUrl} />
        <CardFooter className="absolute bg-black/40 bottom-0 w-full z-10 max-h-0 overflow-hidden group-hover:max-h-full transition-all duration-700 p-0">
            <div className="flex flex-col gap-4 p-3 w-full">
                <div className="flex flex-col gap-2">
                    <h4 className="text-lg font-semibold text-white/80 line-clamp-2 leading-tight">{project.title}</h4>
                    <p className="text-xs text-white/80">{project.shortDescription}</p>
                </div>
                <Button as={'div'} color="secondary" role="presentation" radius="sm" size="sm">
                    Подробнее
                </Button>
            </div>
        </CardFooter>
    </Card>
);