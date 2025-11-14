import {OpenGraph} from 'next/dist/lib/metadata/types/opengraph-types';

/**
 * Represents a blog post object.
 */
export interface Post {
	_createdAt: string;
	_updatedAt: string;
	_rev: string;
	_type: string;
	_key: string;
	/** Unique post identifier */
	id: string;
	/** Post title */
	title: string;
	/** Slug for routing */
	slug: {
		current: string;
	};
	/** Short summary of the post */
	excerpt: string;
	/** Main content body */
	body: any;
	/** Main image URL */
	featuredImage: string;
	/** Author information */
	author?: Author;
	/** List of categories */
	categories?: Category[];
	/** Post publication date */
	publishDate: string;
	/** SEO meta fields */
	seo?: Seo;
	/** FAQ JSON-LD */
	faq?: string;
	/** estimated reading time (minutes) */
	readingTime: number;
}

/**
 * Represents a blog author.
 */
export interface Author {
	/** Author name */
	name: string;
	/** Author bio */
	bio?: string;
	/** Author image URL */
	image?: string;
}

/**
 * Represents a blog category.
 */
export interface Category {
	/** Category title */
	title: string;
	/** Category slug */
	slug: string;
	/** Category description */
	description?: string;
}

/**
 * SEO meta fields for a post.
 */
export interface Seo {
	/** Meta title */
	metaTitle?: string;
	/** Meta description */
	metaDesc?: string;
	/** SEO keywords */
	keywords?: string[];
	/** Open Graph meta fields */
	openGraph?: OpenGraph;
}
