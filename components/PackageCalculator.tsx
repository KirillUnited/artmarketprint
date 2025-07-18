'use client';

import {useState, useEffect} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {Button} from "@heroui/button";

const PackageCalculator = () => {
	const [step, setStep] = useState(1);
	const [formData, setFormData] = useState({
		material: '',
		color: '',
		size: '',
		printColor: '',
		quantity: 1000, // Default quantity
	});

	const [price, setPrice] = useState(0);
	const [pricePerBag, setPricePerBag] = useState(0);

	// Mock data - in a real app, this would come from Sanity
	const materials = [
		{id: 'kraft', name: 'Крафт-бумага', price: 10},
		{id: 'white', name: 'Белая бумага', price: 12},
		{id: 'recycled', name: 'Переработанная бумага', price: 15},
	];

	const colors = [
		{id: 'natural', name: 'Натуральный', value: '#D2B48C'},
		{id: 'white', name: 'Белый', value: '#FFFFFF'},
		{id: 'black', name: 'Черный', value: '#000000'},
		{id: 'brown', name: 'Коричневый', value: '#8B4513'},
	];

	const sizes = [
		{id: 'small', name: 'Маленький (20x10x30 см)', multiplier: 1},
		{id: 'medium', name: 'Средний (30x15x40 см)', multiplier: 1.3},
		{id: 'large', name: 'Большой (40x20x50 см)', multiplier: 1.7},
	];

	const printOptions = [
		{id: '1-0', name: '1+0 (Одна краска с одной стороны)', multiplier: 1},
		{id: '1-1', name: '1+1 (Одна краска с двух сторон)', multiplier: 1.5},
		{id: '2-0', name: '2+0 (Две краски с одной стороны)', multiplier: 1.8},
		{id: '2-2', name: '2+2 (Две краски с двух сторон)', multiplier: 2.2},
	];

	const quantityDiscounts = [
		{min: 1000, discount: 0},
		{min: 2000, discount: 0.05},
		{min: 5000, discount: 0.1},
		{min: 10000, discount: 0.15},
	];

	// Calculate price whenever form data changes
	useEffect(() => {
		calculatePrice();
	}, [formData]);

	const calculatePrice = () => {
		const selectedMaterial = materials.find((m) => m.id === formData.material);
		if (!selectedMaterial) return;

		const selectedSize = sizes.find((s) => s.id === formData.size);
		const selectedPrint = printOptions.find((p) => p.id === formData.printColor);

		let basePrice = selectedMaterial.price;

		// Apply size multiplier if size is selected
		if (selectedSize) {
			basePrice *= selectedSize.multiplier;
		}

		// Apply print multiplier if print option is selected
		if (selectedPrint) {
			basePrice *= selectedPrint.multiplier;
		}

		// Apply quantity discount
		const quantity = formData.quantity || 1000;
		const discountTier = [...quantityDiscounts].sort((a, b) => b.min - a.min).find((tier) => quantity >= tier.min);

		const discount = discountTier ? discountTier.discount : 0;
		const priceAfterDiscount = basePrice * (1 - discount);

		setPrice(priceAfterDiscount * quantity);
		setPricePerBag(priceAfterDiscount);
	};

	const nextStep = () => setStep((prev) => Math.min(prev + 1, 6));
	const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

	const handleChange = (field: string, value: string | number) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const renderStep = () => {
		switch (step) {
			case 1:
				return (
					<div className="space-y-4">
						<h3 className="text-xl font-semibold mb-4">Материал пакета</h3>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							{materials.map((material) => (
								<button
									key={material.id}
									onClick={() => {
										handleChange('material', material.id);
										nextStep();
									}}
									className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-left"
								>
									<h4 className="font-medium">{material.name}</h4>
									<p className="text-sm text-gray-500">от {material.price} руб.</p>
								</button>
							))}
						</div>
					</div>
				);
			case 2:
				return (
					<div className="space-y-4">
						<h3 className="text-xl font-semibold mb-4">Цвет пакета</h3>
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
							{colors.map((color) => (
								<button
									key={color.id}
									onClick={() => {
										handleChange('color', color.id);
										nextStep();
									}}
									className="p-4 border rounded-lg hover:shadow-md transition-all flex flex-col items-center"
									style={{backgroundColor: color.value}}
								>
									<span className="mt-2 text-sm">{color.name}</span>
								</button>
							))}
						</div>
					</div>
				);
			case 3:
				return (
					<div className="space-y-4">
						<h3 className="text-xl font-semibold mb-4">Выберите размер пакета</h3>
						<div className="space-y-3">
							{sizes.map((size) => (
								<button
									key={size.id}
									onClick={() => {
										handleChange('size', size.id);
										nextStep();
									}}
									className="w-full p-4 border rounded-lg hover:bg-gray-50 transition-colors text-left"
								>
									{size.name}
								</button>
							))}
						</div>
					</div>
				);
			case 4:
				return (
					<div className="space-y-4">
						<h3 className="text-xl font-semibold mb-4">Цветность печати</h3>
						<div className="space-y-3">
							{printOptions.map((option) => (
								<button
									key={option.id}
									onClick={() => {
										handleChange('printColor', option.id);
										nextStep();
									}}
									className="w-full p-4 border rounded-lg hover:bg-gray-50 transition-colors text-left"
								>
									{option.name}
								</button>
							))}
						</div>
					</div>
				);
			case 5:
				return (
					<div className="space-y-6">
						<h3 className="text-xl font-semibold mb-4">Количество пакетов</h3>
						<p className="text-sm text-gray-600">* - примерная цена, может измениться в зависимости от объема заказа</p>
						<div className="space-y-4">
							<input type="range" min="1000" max="20000" step="100" value={formData.quantity} onChange={(e) => handleChange('quantity', parseInt(e.target.value))} className="w-full" />
							<div className="flex justify-between text-sm text-gray-500">
								<span>1 000 шт.</span>
								<span>20 000 шт.</span>
							</div>
							<div className="flex items-center justify-center space-x-2">
								<span className="text-2xl font-bold">{formData.quantity.toLocaleString()}</span>
								<span className="text-gray-500">шт.</span>
							</div>

							<div className="mt-8 p-4 bg-gray-50 rounded-lg">
								<div className="flex justify-between items-center">
									<span>Стоимость:</span>
									<span className="text-xl font-bold">{Math.round(price).toLocaleString()} Br</span>
								</div>
								<div className="text-sm text-gray-500 mt-1">за 1 пакет: {pricePerBag.toFixed(2)} Br</div>
							</div>

							<div className="mt-4">
								<h4 className="font-medium mb-2">Ваша скидка:</h4>
								<div className="w-full bg-gray-200 rounded-full h-2.5">
									<div className="bg-blue-600 h-2.5 rounded-full" style={{width: `${(formData.quantity / 20000) * 100}%`}}></div>
								</div>
								<div className="flex justify-between text-sm text-gray-500 mt-1">
									<span>0%</span>
									<span>15%</span>
								</div>
							</div>
						</div>
					</div>
				);
			case 6:
				return (
					<div className="text-center py-8">
						<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
							<svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
							</svg>
						</div>
						<h3 className="text-xl font-semibold mb-2">Готово!</h3>
						<p className="text-gray-600 mb-6">Мы получили ваш запрос и свяжемся с вами в ближайшее время для уточнения деталей.</p>
						<div className="bg-gray-50 p-4 rounded-lg text-left mb-6">
							<h4 className="font-medium mb-2">Детали заказа:</h4>
							<ul className="space-y-1 text-sm text-gray-600">
								<li>Материал: {materials.find((m) => m.id === formData.material)?.name || 'Не выбран'}</li>
								<li>Цвет: {colors.find((c) => c.id === formData.color)?.name || 'Не выбран'}</li>
								<li>Размер: {sizes.find((s) => s.id === formData.size)?.name || 'Не выбран'}</li>
								<li>Цветность: {printOptions.find((p) => p.id === formData.printColor)?.name || 'Не выбрана'}</li>
								<li>Количество: {formData.quantity.toLocaleString()} шт.</li>
								<li className="font-medium mt-2">Итого: {Math.round(price).toLocaleString()} Br</li>
							</ul>
						</div>
						<button onClick={() => setStep(1)} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
							Создать новый расчет
						</button>
					</div>
				);
			default:
				return null;
		}
	};

	return (
		<div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
			<h2 className="text-2xl font-bold text-center mb-8">Калькулятор стоимости пакетов</h2>

			{/* Progress bar */}
			{step < 6 && (
				<div className="mb-8">
					<div className="flex justify-between mb-2">
						{[1, 2, 3, 4, 5].map((stepNum) => (
							<div
								key={stepNum}
								className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                  ${step >= stepNum ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
							>
								{stepNum}
							</div>
						))}
					</div>
					<div className="w-full bg-gray-200 rounded-full h-2.5">
						<div className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" style={{width: `${((step - 1) / 4) * 100}%`}}></div>
					</div>
				</div>
			)}

			{/* Form content */}
			<div className="min-h-[400px]">
				<AnimatePresence mode="wait">
					<motion.div key={step} initial={{opacity: 0, x: 20}} animate={{opacity: 1, x: 0}} exit={{opacity: 0, x: -20}} transition={{duration: 0.3}}>
						{renderStep()}
					</motion.div>
				</AnimatePresence>
			</div>

			{/* Navigation buttons */}
			{step < 6 && (
				<div className="flex justify-between mt-8 pt-4 border-t">
					<button onClick={prevStep} disabled={step === 1} className={`px-4 py-2 rounded-lg ${step === 1 ? 'text-gray-400' : 'text-blue-600 hover:bg-blue-50'}`}>
						Назад
					</button>

					{step < 5 ? (
						<Button
							onPress={nextStep}
							disabled={(!formData.material && step === 1) || (!formData.color && step === 2) || (!formData.size && step === 3) || (!formData.printColor && step === 4)}
							color='primary'
						>
							Далее
						</Button>
					) : (
						<Button onPress={nextStep} color='success'>
							Отправить заявку
						</Button>
					)}
				</div>
			)}
		</div>
	);
};

export default PackageCalculator;
