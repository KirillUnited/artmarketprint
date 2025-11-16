import {JSX} from 'react';

import styles from './styles.module.css';

import Section, {SectionButton, SectionDescription, SectionHeading, SectionSubtitle, SectionTitle} from '@/components/layout/Section';
import {PostListing} from '@/components/blog/index';
import {getAllPosts} from '@/components/blog/lib/fetch-data';
import {cn} from '@/lib/utils';

interface BlogHeaderProps {
	title?: string;
	subtitle?: string;
	description?: string;
	className?: string;
}

/**
 * Renders the header for the blog section, including title, subtitle, and description.
 * @param {{title: string, subtitle: string, description: string, className: string}} props - The props object with required properties.
 * @returns {JSX.Element} A JSX element that represents the header.
 */
export const BlogHeader = ({title = '', subtitle = '', description = '', className = ''}: BlogHeaderProps): JSX.Element => {
	return (
		<header className={cn(styles.BlogHeader, className)}>
			<SectionHeading>
				{subtitle && <SectionSubtitle>{subtitle}</SectionSubtitle>}
				{title && <SectionTitle>{title}</SectionTitle>}
				{description && <SectionDescription>{description}</SectionDescription>}
			</SectionHeading>
		</header>
	);
};
export const BlogSection = async () => {
	const posts = await getAllPosts();

	if (!Array.isArray(posts) || posts.length === 0) return null;

	return (
		<Section className="relative" id="blog">
			<BlogHeader description="Читайте актуальные новости и статьи о современной печати и тенденциях рынка." subtitle="Новости и статьи" title="Блог" />
			<PostListing posts={posts} />
			<SectionButton className="self-start" href={'/blog'} label="Все статьи" />
		</Section>
	);
};
