import { PortableText, type PortableTextComponents } from '@portabletext/react';

export type ArticleHeading = { _key: string; slug: string; text: string };

/**
 * Принимает подготовленный в `page.tsx` список заголовков с уникальными slug-ами
 * (на случай коллизий типа "DTF печать" → "DTF печать" → "DTF печать")
 * и проставляет их как `id` на DOM-узлах заголовков.
 *
 * Матчинг идёт по уникальному `_key` Sanity-блока. Это гарантирует,
 * что два заголовка с одинаковым текстом получат **разные** `id`
 * (в `headings` slug-ы уже дедуплицированы через `dedupeSlugs`).
 *
 * Fallback по тексту оставлен на случай, если конкретная версия
 * @portabletext/react не пробрасывает `_key` в `value` — тогда
 * в консоли появится предупреждение, и id всё равно проставится.
 */
export default function ArticleBody({ body, headings = [] }: { body: any; headings?: ArticleHeading[] }) {
	const slugByKey = new Map(headings.map((h) => [h._key, h.slug]));
	const slugByText = new Map(headings.map((h) => [h.text, h.slug]));

	const renderHeading = (Tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6') =>
		// eslint-disable-next-line react/display-name
		({ children, value }: { children: any; value: any }) => {
			const text = (value?.children as Array<{ text?: string }> | undefined)
				?.map((c) => c?.text ?? '')
				.join(' ')
				.trim();

			let id: string | undefined;
			if (value?._key && slugByKey.has(value._key)) {
				id = slugByKey.get(value._key);
			} else if (text && slugByText.has(text)) {
				if (value?._key === undefined && typeof console !== 'undefined') {
					console.warn(
						'[ArticleBody] PortableText value._key is missing — falling back to text match. This may produce duplicate ids for repeated headings.',
					);
				}
				id = slugByText.get(text);
			}

			return (
				<Tag id={id} className="scroll-mt-32">
					{children}
				</Tag>
			);
		};

	const components: PortableTextComponents = {
		block: {
			h1: renderHeading('h1'),
			h2: renderHeading('h2'),
			h3: renderHeading('h3'),
			h4: renderHeading('h4'),
			h5: renderHeading('h5'),
			h6: renderHeading('h6'),
		},
	};

	return (
		<div className="prose dark:prose-invert max-w-none">
			<PortableText value={body} components={components} />
		</div>
	);
}
