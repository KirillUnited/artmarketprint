import Link from 'next/link';
import { Button } from '@heroui/button';
import { ArrowUpRightIcon } from 'lucide-react';
import { SanityDocument } from 'next-sanity';

import BrandCard from '../ui/BrandCard';

import { siteConfig } from '@/config/site';
import { getSanityDocuments } from '@/lib/getData';
import Section, { SectionDescription, SectionHeading, SectionSubtitle, SectionTitle } from '@/components/layout/Section';
import { getUrlFor } from '@/lib/getUrlFor';
import { Card, CardFooter, CardHeader } from '@heroui/card';
import { Image } from '@heroui/image';

const PROJECTS_QUERY = `*[_type == "completedProjects"]{
  title,
  subtitle,
  description,
  projects[]{
    title,
    shortDescription,
    "imageUrl": image.asset->url,
    altText,
    tags[]->{
      _id,
      title
    }
  }
}`;

export const ProjectsHeading = ({title, subtitle, description}: {title?: string; subtitle?: string; description?: string}) => (
	<div className="flex flex-wrap items-end justify-between gap-4">
		<SectionHeading>
			<SectionSubtitle>- {subtitle} -</SectionSubtitle>
			<SectionTitle>{title}</SectionTitle>
			<SectionDescription>{description}</SectionDescription>
		</SectionHeading>
		<Button
			as={Link}
			className="bg-brand-gradient text-fill-transparent font-semibold border-1 hidden lg:flex"
			color="secondary"
			href={'/'}
			radius="sm"
			size="md"
			target="_blank"
			variant="bordered"
		>
			<span className="leading-none">Все проекты</span>
			<ArrowUpRightIcon className="text-secondary" size={18} />
		</Button>
	</div>
);

export const ProjectList = ({ projectList }: { projectList: SanityDocument[] }) => (
	<ul className="grid grid-cols-[var(--grid-template-columns)] gap-8">
		{projectList.map((project: SanityDocument) => (
			<li key={project.title}>
				<Card radius='sm' isFooterBlurred as={Link} className="h-[300px] group" href={`/`}>
					<Image
						isZoomed
						removeWrapper
						alt={project.altText}
						className="z-0 w-full h-full object-cover"
						src={project.imageUrl}
						radius='sm'
					/>
					<CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100 transform translate-y-full group-hover:translate-y-0 transition-all duration-600">
						<div className="flex flex-col gap-4">
							<span className='text-tiny text-white/80 bg-primary rounded-small px-1 self-start leading-normal'>{project.tags[0].title}</span>
							<div className="flex flex-col gap-2">
								<h4 className="text-lg font-semibold text-white/80 line-clamp-2 leading-tight">{project.title}</h4>
								<p className="text-xs text-white/80 line-clamp-2">{project.shortDescription}</p>
							</div>
							<Button radius="sm" size="sm" color='secondary'>
								Подробнее
							</Button>
						</div>
					</CardFooter>
				</Card>
			</li>
		))}
	</ul>
);

export const Projects = async () => {
	const data = await getSanityDocuments(PROJECTS_QUERY);
	const { title, subtitle, description, projects } = data?.[0];

	return (
		<Section className="relative" id="projects">
			<ProjectsHeading title={title} subtitle={subtitle} description={description} />
			{projects && <ProjectList projectList={projects} />}
			<Button
				as={Link}
				className="bg-brand-gradient text-fill-transparent font-semibold border-1 lg:hidden flex"
				color="secondary"
				href={'/'}
				radius="sm"
				size="md"
				target="_blank"
				variant="bordered"
			>
				<span className="leading-none">Все проекты</span>
				<ArrowUpRightIcon className="text-secondary" size={18} />
			</Button>
		</Section>
	);
};
