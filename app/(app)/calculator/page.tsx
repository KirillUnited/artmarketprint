import {PackageCalculator} from '@/components/shared/сalculator';
import {getPriceTable} from '@/components/shared/сalculator/lib/googleSheets';

export const metadata = {
	title: 'Калькулятор стоимости пакетов | ArtMarketPrint',
	description: 'Рассчитайте стоимость заказа пакетов с логотипом онлайн. Выберите параметры и получите расчет за несколько кликов.',
};

export default async function CalculatorPage() {
	const pvdPriceTable = await getPriceTable();

	console.log('Transformed Price Table:', pvdPriceTable);

	return (
		<main className="min-h-screen py-12 bg-gray-50">
			<div className="container mx-auto px-4">
				<h1 className="text-3xl font-bold text-center mb-2">{'Калькулятор стоимости пакетов ArtMarketPrint'}</h1>
				{<p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">{'Заполните параметры и получите расчет стоимости вашего заказа. Минимальный тираж - 100 штук.'}</p>}

				<PackageCalculator matrix={pvdPriceTable} />

				<div className="mt-12 max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-sm">
					<h2 className="text-xl font-semibold mb-4">Как работает калькулятор?</h2>
					<div className="grid md:grid-cols-3 gap-6">
						<div className="space-y-2">
							<div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">1</div>
							<h3 className="font-medium">Выберите параметры</h3>
							<p className="text-sm text-gray-600">Укажите материал, цвет, размер и другие характеристики пакетов</p>
						</div>
						<div className="space-y-2">
							<div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">2</div>
							<h3 className="font-medium">Получите расчет</h3>
							<p className="text-sm text-gray-600">Система автоматически рассчитает стоимость вашего заказа</p>
						</div>
						<div className="space-y-2">
							<div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">3</div>
							<h3 className="font-medium">Оформите заказ</h3>
							<p className="text-sm text-gray-600">Оставьте заявку и наш менеджер свяжется с вами для уточнения деталей</p>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
