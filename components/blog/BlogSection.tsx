import {JSX} from 'react';
import {clsx} from 'clsx';

import styles from './styles.module.css';

import Section, {SectionButton, SectionDescription, SectionHeading, SectionSubtitle, SectionTitle} from '@/components/layout/Section';
import {getAllPosts} from '@/components/blog/lib/fetch-data';
import {PostListingCarousel} from '@/components/blog';

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
		<header className={clsx(styles.BlogHeader, className)}>
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
			<PostListingCarousel posts={posts} />
			<SectionButton className="self-start" href={'/blog'} label="Все статьи" />
		</Section>
	);
};
