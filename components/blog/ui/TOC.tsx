'use client';
import {PortableTextBlock} from 'next-sanity';
import {Accordion, AccordionItem} from '@heroui/accordion';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import {useMediaQuery} from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';

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

const DESKTOP_QUERY = '(min-width: 80rem)';

export default function TOC({className, body}: {className?: string, body: PortableTextBlock[]}) {
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

	// Default to desktop-open (no media query during SSR), so SSR markup matches the first client render — no hydration mismatch.
	const [selectedKeys, setSelectedKeys] = useState<Set<string>>(() => new Set(['1']));
	const isDesktop = useMediaQuery(DESKTOP_QUERY);

	useEffect(() => {
		setSelectedKeys(isDesktop ? new Set(['1']) : new Set());
	}, [isDesktop]);

	if (headings.length === 0) {
		return null;
	}

	return (
		<nav className={cn('mb-6')}>
			<Accordion className={cn('mt-2 text-sm text-neutral-600 dark:text-neutral-300', className)} variant="splitted" selectedKeys={selectedKeys} onSelectionChange={(keys) => setSelectedKeys(keys as Set<string>)}>
				<AccordionItem key="1" as={'ul'} className="font-semibold text-neutral-700 dark:text-neutral-200" title={'Содержание статьи'}>
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
