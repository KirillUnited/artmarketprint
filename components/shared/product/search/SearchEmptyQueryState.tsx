import {SectionTitle} from '@/components/layout/Section';

import {SearchTopActions} from './SearchTopActions';

export function SearchEmptyQueryState() {
	return (
		<div className="flex flex-col gap-6">
			<SectionTitle>Введите поисковый запрос</SectionTitle>
			<p className="text-slate-500">Укажите название товара, категорию или SKU, чтобы найти нужные позиции.</p>
			<SearchTopActions />
		</div>
	);
}

