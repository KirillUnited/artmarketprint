// Reusable header for blog listing & category pages
import { SectionHeading } from '@/components/layout/Section';

import PostCatsFilter from './ui/PostCats';
import { Category } from './lib/types';

interface BlogPageHeaderProps {
	title: string;
	categories: Category[];
	currentSlug?: string;
}

export default function BlogPageHeader({ title, categories, currentSlug = '' }: BlogPageHeaderProps) {
	return (
		<SectionHeading>
			<h1 className="text-3xl font-bold">{title}</h1>
			<PostCatsFilter categories={categories} currentSlug={currentSlug} />
		</SectionHeading>
	);
}
