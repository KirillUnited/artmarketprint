'use client';
import { Accordion, AccordionItem } from '@heroui/accordion';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useScrollSpy } from '@/hooks/use-scroll-spy';
import { cn } from '@/lib/utils';

const DESKTOP_QUERY = '(min-width: 80rem)';

export type Heading = { key: string; style: string; text: string; slug: string };

export default function TOC({ className, headings }: { className?: string; headings: Heading[] }) {

	const slugs = useMemo(() => headings.map((h) => h.slug), [headings]);
	const activeSlug = useScrollSpy(slugs);

	// Default to desktop-open (no media query during SSR), so SSR markup matches the first client render — no hydration mismatch.
	const [selectedKeys, setSelectedKeys] = useState<Set<string>>(() => new Set(['1']));
	const isDesktop = useMediaQuery(DESKTOP_QUERY);

	useEffect(() => {
		setSelectedKeys(isDesktop ? new Set(['1']) : new Set());
	}, [isDesktop]);

	const handleClick = useCallback(
		(e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
			e.preventDefault();
			const el = document.getElementById(slug);
			if (!el) return;
			const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
			el.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
			history.replaceState(null, '', `#${slug}`);
			// На мобильных сворачиваем аккордеон через 300мс, чтобы успела начаться прокрутка
			if (!isDesktop) {
				setTimeout(() => setSelectedKeys(new Set()), 300);
			}
		},
		[isDesktop],
	);

	if (headings.length === 0) {
		return null;
	}

	return (
		<nav>
			<Accordion
				className={cn('text-sm text-neutral-600 dark:text-neutral-300 px-0', className)}
				variant="splitted"
				selectedKeys={selectedKeys}
				onSelectionChange={(keys) => setSelectedKeys(keys as Set<string>)}
			>
				<AccordionItem
					key="1"
					as={'ul'}
					className="font-semibold text-neutral-700 dark:text-neutral-200"
					title={'Содержание статьи'}
				>
					{headings.map((h) => {
						const isActive = activeSlug === h.slug;
						const levelPadding = typeof h.style === 'string' && /^h[1-6]$/.test(h.style) ? parseInt(h.style[1]) * 4 : 0;
						return (
							<li
								key={h.key}
								className={cn(
									'my-4 border-l-2 pl-3 transition-colors duration-200',
									isActive
										? 'border-primary text-primary'
										: 'border-transparent hover:border-neutral-300 dark:hover:border-neutral-600',
								)}
								style={{ paddingLeft: `calc(${levelPadding}px + 0.75rem)` }}
							>
								<Link
									className="font-semibold hover:text-primary"
									href={`#${h.slug}`}
									aria-current={isActive ? 'location' : undefined}
									onClick={(e) => handleClick(e, h.slug)}
								>
									{h.text}
								</Link>
							</li>
						);
					})}
				</AccordionItem>
			</Accordion>
		</nav>
	);
}
