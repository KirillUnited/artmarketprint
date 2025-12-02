import React from 'react';

import {sanityFetch} from '@/sanity/lib/sanityFetch';
import {POSTS_BY_CATEGORY_QUERY} from '@/components/blog/lib/queries';

export interface Props {
	category: string;
}

export default async function BlogCategoryPage({params}: {params: Promise<Props>}) {
	const {category} = await params;
	const posts: any = await sanityFetch({query: POSTS_BY_CATEGORY_QUERY, params: {slug: category}});

	console.log(posts);

	return <div>CategoryPage</div>;
}
