import Link from 'next/link';

export type SearchErrorStateProps = {
	title?: string;
	description?: string;
};

export function SearchErrorState({
	title = 'Произошла ошибка при загрузке результатов поиска',
	description = 'Пожалуйста, попробуйте обновить страницу или повторить попытку позже.',
}: SearchErrorStateProps) {
	return (
		<div className="text-center py-10">
			<h2 className="text-2xl font-bold mb-4">{title}</h2>
			<p className="text-slate-500 mb-6">{description}</p>
			<Link href="/" className="bg-brand-gradient uppercase font-semibold">
				На главную
			</Link>
		</div>
	);
}

