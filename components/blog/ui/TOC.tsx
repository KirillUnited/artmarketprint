'use client';
import {PortableTextBlock} from 'next-sanity';
import React from 'react';
import {Accordion, AccordionItem} from '@heroui/accordion';
import Link from 'next/link';

function slugify(text: string) {
	return text
		.toString()
		.toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/[^\w\-]+/g, '')
		.replace(/\-\-+/g, '-')
		.replace(/^-+/, '')
		.replace(/-+$/, '');
}

export default function TOC({body}: {body: PortableTextBlock[]}) {
	const headings = (body || [])
		.filter((block) => block._type === 'block' && block.style && /^h[1-6]$/.test(block.style) && block.children && block.children.length > 0)
		.map((block) => {
			const text = block.children.map((c: any) => c.text).join(' ');

			return {
				key: block._key,
				style: block.style,
				text,
				slug: slugify(text),
			};
		});

	if (headings.length === 0) {
		return null;
	}

	return (
		<nav className="mb-6">
			<Accordion className="mt-2 text-sm text-neutral-600 dark:text-neutral-300" variant="splitted">
				<AccordionItem as={'ul'} className="font-semibold text-neutral-700 dark:text-neutral-200" title={'Содержание статьи'}>
					{headings.map((h) => (
						<li key={h.key} className={'my-4'} style={{paddingLeft: typeof h.style === 'string' && /^h[1-6]$/.test(h.style) ? parseInt(h.style[1]) * 4 : 0}}>
							<Link className={'font-semibold hover:text-primary'} href={`#${h.slug}`}>
								{h.text}
							</Link>
						</li>
					))}
				</AccordionItem>
			</Accordion>
		</nav>
	);
}
