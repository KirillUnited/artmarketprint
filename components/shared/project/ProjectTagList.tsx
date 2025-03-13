import { Chip } from '@heroui/chip';
import clsx from 'clsx';

interface ProjectTagListProps {
    tags: { _id: string; title: string }[];
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'default';
}

export const ProjectTagList = ({ tags, color }: ProjectTagListProps) => {
	return (
		<ul className="flex flex-wrap gap-2 line-clamp-1">
			{tags?.map(({ _id, title }: { _id: string; title: string }, index) => (
				<li key={_id} className={clsx()}>
					<Chip color={color} radius="sm" size="sm">{title}</Chip>
				</li>
			))}
		</ul>
	);
};