import {Button} from '@heroui/button';
import {Card, CardBody, CardFooter, CardHeader} from '@heroui/card';
import {PanelRightOpenIcon, SearchXIcon, ShoppingCart} from 'lucide-react';
import Link from 'next/link';

import {FeaturedProducts} from '@/components/shared/product/FeaturedProducts';

export type SearchNotFoundStateProps = {
	query: string;
};

export function SearchNotFoundState({query}: SearchNotFoundStateProps) {
	return (
		<div className="flex flex-col items-center gap-8">
			<Card className="lg:flex-row gap-8 self-stretch items-center p-4 w-fit mx-auto">
				<div>
					<CardHeader>
						<p className="text-3xl font-bold">{'Товар не найден'}</p>
					</CardHeader>
					<CardBody className="prose text-balance text-slate-500 block">
						<p>
							К сожалению, мы не нашли товаров по запросу <span className="font-bold">&quot;{query}&quot;</span>
						</p>
						<p>Рекомендуем:</p>
						<ul>
							<li>Проверьте правильность написания запроса</li>
							<li>Попробуйте использовать другие ключевые слова</li>
							<li>
								Проверьте наличие товара в{' '}
								<Link className="text-primary" href="/products/categories/all">
									каталоге
								</Link>
							</li>
						</ul>
					</CardBody>
					<CardFooter className="gap-4 lg:flex-row flex-col items-stretch">
						<Link href="/products/categories/all">
							<Button className="uppercase font-semibold" color="primary" radius="sm" variant="ghost">
								<SearchXIcon className="w-6 h-6" />
								<span>Очистить поиск</span>
							</Button>
						</Link>
						<Link href="/">
							<Button className="bg-brand-gradient uppercase font-semibold" color="primary" radius="sm">
								<PanelRightOpenIcon className="w-6 h-6" />
								На главную
							</Button>
						</Link>
					</CardFooter>
				</div>

				<ShoppingCart className="hidden lg:block m-4" size={320} />
			</Card>
			<div className="mt-10">
				<FeaturedProducts />
			</div>
		</div>
	);
}

