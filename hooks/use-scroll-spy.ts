'use client';
import { useEffect, useState } from 'react';

export type UseScrollSpyOptions = {
	/** Отступ сверху в пикселях — обычно высота sticky-шапки. */
	topOffset?: number;
	/** Сколько процентов высоты viewport отсекать снизу для зоны «активности». */
	bottomOffsetPct?: number;
};

/**
 * Определяет, какой из заголовков сейчас находится у верхней границы viewport.
 *
 * Стратегия: один IntersectionObserver на массив id; активным считается самый
 * верхний из тех, что в данный момент пересекают зону `[topOffset, viewport-bottom * (1 - bottomOffsetPct/100)]`.
 *
 * SSR-безопасно: возвращает `null` до монтирования, поэтому первый клиентский
 * рендер совпадает с серверным и hydration mismatch не возникает.
 */
export function useScrollSpy(
	slugs: string[],
	{ topOffset = 128, bottomOffsetPct = 60 }: UseScrollSpyOptions = {},
): string | null {
	const [activeSlug, setActiveSlug] = useState<string | null>(null);

	useEffect(() => {
		if (typeof window === 'undefined' || slugs.length === 0) return;

		const elements = slugs
			.map((slug) => document.getElementById(slug))
			.filter((el): el is HTMLElement => el !== null);

		if (elements.length === 0) return;

		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((e) => e.isIntersecting)
					.map((e) => e.target as HTMLElement);

				if (visible.length === 0) return;

				const topmost = visible.reduce((a, b) =>
					a.getBoundingClientRect().top < b.getBoundingClientRect().top ? a : b,
				);
				setActiveSlug(topmost.id);
			},
			{
				rootMargin: `-${topOffset}px 0px -${bottomOffsetPct}% 0px`,
				threshold: [0, 1],
			},
		);

		elements.forEach((el) => observer.observe(el));
		return () => observer.disconnect();
	}, [slugs, topOffset, bottomOffsetPct]);

	return activeSlug;
}
