import clsx from "clsx";

interface ProjectTagListProps {
    tags: { _id: string; title: string }[];
    color?: 'primary' | 'secondary';
}

export const ProjectTagList = ({ tags, color }: ProjectTagListProps) => {
	return (
		<ul className="flex flex-wrap gap-2 line-clamp-1">
			{tags?.map(({ _id, title }: { _id: string; title: string }, index) => (
				<li key={_id} className={clsx(
					"text-tiny rounded-small px-1 self-start leading-normal",
					{
						'bg-secondary text-white/80': color === 'secondary',
						'bg-primary text-white/80': color === 'primary',
					}
				)}>
					{title}
				</li>
			))}
		</ul>
	);
};