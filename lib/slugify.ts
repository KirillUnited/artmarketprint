/**
 * Транслитерация кириллицы → латиница (упрощённая ISO 9 / ГОСТ-7.79).
 * Только для генерации читабельных URL-slug — не для миграции БД.
 */
const CYRILLIC_MAP: Record<string, string> = {
	а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'yo', ж: 'zh', з: 'z',
	и: 'i', й: 'i', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r',
	с: 's', т: 't', у: 'u', ф: 'f', х: 'h', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'sch',
	ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya',
};

/**
 * Превращает произвольный текст в URL-friendly slug.
 *
 * Особенности:
 * - Транслитерирует кириллицу в латиницу.
 * - Эмодзи и спецсимволы выкидывает (для якорных ссылок в оглавлении статьи они не нужны).
 * - Никогда не возвращает пустую строку: если после нормализации ничего не осталось,
 *   возвращается fallback (`'section'`), чтобы якорь всегда был валидным.
 *
 * Используется и в TOC (для генерации списка заголовков), и в ArticleBody
 * (для простановки `id` на DOM-узлах заголовков). Чтобы id и href совпадали,
 * TOC дополнительно дедуплицирует slug-и суффиксами `-2`, `-3`… и те же значения
 * прокидывает в ArticleBody через prop.
 */
export function slugify(text: string, fallback = 'section'): string {
	const transliterated = text
		.toString()
		.toLowerCase()
		.split('')
		.map((ch) => (CYRILLIC_MAP[ch] !== undefined ? CYRILLIC_MAP[ch] : ch))
		.join('');

	const slug = transliterated
		.replace(/\s+/g, '-')
		.replace(/[^\w\-]+/g, '') // выкидываем эмодзи и спецсимволы (после транслитерации остаётся латиница + дефисы)
		.replace(/\-\-+/g, '-')
		.replace(/^-+/, '')
		.replace(/-+$/, '');

	return slug || fallback;
}

/**
 * Добавляет числовой суффикс при коллизиях.
 * `["dtf", "dtf", "dtf"]` → `["dtf", "dtf-2", "dtf-3"]`
 * Используется только в TOC при генерации списка заголовков.
 */
export function dedupeSlugs(slugs: string[]): string[] {
	const seen = new Map<string, number>();
	return slugs.map((slug) => {
		const count = seen.get(slug) ?? 0;
		seen.set(slug, count + 1);
		if (count === 0) return slug;
		return `${slug}-${count + 1}`;
	});
}
