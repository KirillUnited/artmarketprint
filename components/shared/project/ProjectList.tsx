import { SanityDocument } from 'next-sanity';
import clsx from 'clsx';

import { ProjectCard } from './ProjectCard';

export const ProjectList = ({ projectList, bentoGrid = true, className }: { projectList: SanityDocument[]; bentoGrid?: boolean; className?: string }) => {
    if (!Array.isArray(projectList) || projectList.length === 0) return <p className="text-center text-gray-500 mt-4">Пока нет выполненных проектов.</p>;

    return (
        <ul
            className={clsx(
                ' gap-8',
                {
                    ['grid grid-cols-[var(--grid-template-columns)]']: !bentoGrid,
                    ['flex flex-col md:grid bento-grid-template [--row-height:320px]']: bentoGrid,
                },
                className,
            )}
        >
            {projectList.map((project: SanityDocument) => (
                <li key={project._id}>
                    <ProjectCard project={project} />
                </li>
            ))}
        </ul>
    );
};