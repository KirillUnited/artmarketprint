'use client';

import {useState, useEffect} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {Button} from '@heroui/button';
import Image from 'next/image';
import {Select, SelectItem} from '@heroui/select';
import {Form} from '@heroui/form';

import {sendCalculatorDetails} from './lib/messenger';

import {colors, materials, MIN_QUANTITY, printOptions, quantityDiscounts, sizes} from '@/components/shared/сalculator/mock-data';
import {calculatePVDPrice, getAvailableColors, getAvailableSizes} from '@/components/shared/сalculator/lib/utils';
import {UsernameInput, UserPhoneInput} from '@/components/ui/form';

const PackageCalculator = ({matrix = []}: {matrix?: any}) => {
	const [step, setStep] = useState(1);
	const [formData, setFormData] = useState({
		material: '',
		materialId: '',
		color: '',
		size: '',
		printColor: '',
		quantity: MIN_QUANTITY, // Default quantity
	});
	const [phoneValid, setPhoneValid] = useState(false);
	const [price, setPrice] = useState(0);
	const [pricePerBag, setPricePerBag] = useState(0);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [formMessage, setFormMessage] = useState<{type: 'success' | 'error'; message: string} | null>(null);

	// Reset color and size when material changes
	useEffect(() => {
		if (formData.materialId) {
			setFormData((prev) => ({
				...prev,
				color: '',
				size: '',
			}));
		}
	}, [formData.materialId]);

	// Calculate price whenever form data changes
	useEffect(() => {
		calculatePrice();
	}, [formData]);

	// Get available colors and sizes based on selected material
	const availableColors = formData.materialId ? getAvailableColors(formData.materialId) : [];
	const availableSizes = formData.materialId ? getAvailableSizes(formData.materialId) : [];

	const calculatePrice = () => {
		const selectedMaterial = materials.find((m) => m.id === formData.materialId);

		if (!selectedMaterial) return;

		const selectedSize = availableSizes.find((s) => s.name === formData.size);
		const selectedPrint = printOptions.find((p) => p.name === formData.printColor);

		let pricePerBagValue = 0;
		let totalPriceValue = 0;
		const quantity = formData.quantity || MIN_QUANTITY;

		// If it's a PVD material, use the price table
		if (selectedMaterial.id === 'pvd' && selectedSize && selectedPrint) {
			pricePerBagValue = calculatePVDPrice(matrix, selectedSize, selectedPrint, quantity);
			totalPriceValue = pricePerBagValue * quantity;

			console.log('Price per bag:', pricePerBagValue);
			console.log('Total price:', totalPriceValue);
			// // Extract size ID from the selected size
			// const sizeId = selectedSize.id;
			// // Extract print option ID from the selected print option
			// const printId = selectedPrint.id;
			//
			// // Find the price entry for the selected size
			// const priceEntry = pvdPriceTable.find((entry) => entry.size === sizeId);
			//
			// if (priceEntry && priceEntry.prices[printId]) {
			// 	// Determine if we should use the regular or discounted price based on quantity
			// 	const useDiscountedPrice = quantity >= 200;
			//
			// 	pricePerBagValue = useDiscountedPrice ? priceEntry.prices[printId].discounted : priceEntry.prices[printId].regular;
			//
			// 	// Calculate total price (price per bag * quantity)
			// 	totalPriceValue = (pricePerBagValue * quantity) / 1; // Price is per 100 packages
			// } else {
			// 	// Fallback to the old calculation method if price not found in table
			// 	let basePrice = selectedMaterial.price;
			//
			// 	// Apply size multiplier if size is selected
			// 	if (selectedSize) {
			// 		basePrice *= selectedSize.multiplier;
			// 	}
			//
			// 	// Apply print multiplier if print option is selected
			// 	if (selectedPrint) {
			// 		basePrice *= selectedPrint.multiplier;
			// 	}
			//
			// 	// Apply quantity discount
			// 	const discountTier = [...quantityDiscounts].sort((a, b) => b.min - a.min).find((tier) => quantity >= tier.min);
			// 	const discount = discountTier ? discountTier.discount : 0;
			//
			// 	pricePerBagValue = basePrice * (1 - discount);
			// 	totalPriceValue = pricePerBagValue * quantity;
			// }
		} else {
			// For other materials, use the original calculation method
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
			const discountTier = [...quantityDiscounts].sort((a, b) => b.min - a.min).find((tier) => quantity >= tier.min);
			const discount = discountTier ? discountTier.discount : 0;

			pricePerBagValue = basePrice * (1 - discount);
			totalPriceValue = pricePerBagValue * quantity;
		}

		setPrice(totalPriceValue);
		setPricePerBag(pricePerBagValue);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const form = e.currentTarget as HTMLFormElement;
		const _formData = new FormData(form);

		if (step === 5) {
			setIsSubmitting(true);
			setFormMessage(null);

			try {
				await sendCalculatorDetails({
					material: formData.material,
					color: formData.color,
					size: formData.size,
					printColor: formData.printColor,
					quantity: formData.quantity,
					price,
					pricePerBag,
					user_name: _formData.get('user_name') as string,
					user_phone: _formData.get('user_phone') as string,
					comment: _formData.get('user_comment')?.toString() || 'Нет',
				});

				setFormMessage({
					type: 'success',
					message: 'Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.',
				});
				form.reset();
				setFormData({
					material: '',
					materialId: '',
					color: '',
					size: '',
					printColor: '',
					quantity: MIN_QUANTITY,
				});
				setStep(step + 1);
			} catch (error) {
				setFormMessage({
					type: 'error',
					message: 'Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз.',
				});
			} finally {
				setIsSubmitting(false);
			}
		} else {
			setStep(step + 1);
		}
	};

	const nextStep = () => setStep((prev) => Math.min(prev + 1, 6));
	const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

	const handleChange = (field: string, value: string | number) => {
		setFormData((prev) => {
			// If changing material, also update materialId
			if (field === 'material') {
				const selectedMaterial = materials.find((m) => m.name === value);

				return {
					...prev,
					material: value as string,
					materialId: selectedMaterial?.id || '',
					// Reset color and size when material changes
					color: '',
					size: '',
				};
			}

			return {
				...prev,
				[field]: value,
			};
		});
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
									className="group flex flex-col gap-4 p-4 border rounded-lg hover:bg-primary hover:text-white transition-colors text-left"
									onClick={() => {
										handleChange('material', material.name);
										handleChange('materialId', material.id);
										nextStep();
									}}
								>
									<div className="flex flex-col">
										<h4 className="font-medium">{material.name}</h4>
										{/* <p className="text-sm text-gray-500 group-hover:text-white transition-colors">от {material.price} руб.</p> */}
									</div>
									{material.image && <Image alt={material.name} className="w-16 h-16 object-contain" height={100} quality={50} src={material.image} width={100} />}
								</button>
							))}
						</div>
					</div>
				);
			case 2:
				return (
					<div className="space-y-4">
						<h3 className="text-xl font-semibold mb-4">Цвет пакета</h3>
						{!formData.materialId ? (
							<div className="text-center py-8 text-gray-500">Пожалуйста, сначала выберите материал пакета</div>
						) : availableColors.length === 0 ? (
							<div className="text-center py-8 text-gray-500">Нет доступных цветов для выбранного материала</div>
						) : (
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
								{availableColors.map((color) => (
									<button
										key={color.id}
										className="p-4 border rounded-lg hover:shadow-md hover:bg-primary hover:text-white transition-all flex gap-4 items-center"
										title={color.name}
										onClick={() => {
											handleChange('color', color.name);
											nextStep();
										}}
									>
										<span className="block basis-8 shrink-0 w-8 h-8 border rounded-full" style={{backgroundColor: color.value}} />
										<span className="text-sm flex-1 line-clamp-1 truncate text-left">{color.name}</span>
									</button>
								))}
							</div>
						)}
					</div>
				);
			case 3:
				return (
					<div className="space-y-4">
						<h3 className="text-xl font-semibold mb-4">Выберите размер пакета</h3>
						{!formData.materialId ? (
							<div className="text-center py-8 text-gray-500">Пожалуйста, сначала выберите материал пакета</div>
						) : availableSizes.length === 0 ? (
							<div className="text-center py-8 text-gray-500">Нет доступных размеров для выбранного материала</div>
						) : (
							<div className="space-y-3">
								{availableSizes.map((size) => (
									<button
										key={size.id}
										className="w-full p-4 border rounded-lg hover:bg-primary hover:text-white transition-colors text-left"
										onClick={() => {
											handleChange('size', size.name);
											nextStep();
										}}
									>
										{size.name}
									</button>
								))}
							</div>
						)}
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
									className="w-full p-4 border rounded-lg hover:bg-primary hover:text-white transition-colors text-left"
									onClick={() => {
										handleChange('printColor', option.name);
										nextStep();
									}}
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
						<div className="space-y-6">
							<Select
								aria-label="Количество пакетов"
								classNames={{
									trigger: 'border-1 bg-background',
								}}
								defaultSelectedKeys={[`${MIN_QUANTITY}`]}
								radius="sm"
								scrollShadowProps={{
									isEnabled: false,
								}}
								value={formData.quantity}
								onChange={(e) => handleChange('quantity', parseInt(e.target.value))}
							>
								{Array.from({length: 19}).map((_, i) => (
									<SelectItem key={i * 50 + MIN_QUANTITY} textValue={String(i * 50 + MIN_QUANTITY)}>
										{i * 50 + MIN_QUANTITY} шт.
									</SelectItem>
								))}
							</Select>

							<div className="mt-8 p-4 bg-gray-50 rounded-lg">
								<div className="flex justify-between items-center">
									<span>Стоимость:</span>
									<span className="text-xl font-bold">{price.toFixed(2).toLocaleString()} Br</span>
								</div>
								<div className="text-sm text-gray-500 mt-1">за 1 пакет: {pricePerBag.toFixed(2)} Br</div>

								<p className="text-sm text-gray-600 mt-6">* - окончательную стоимость уточняйте у менеджера.</p>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
								<div className="bg-gray-50 p-4 rounded-lg text-left">
									<h4 className="font-medium mb-2">Детали заказа:</h4>
									<ul className="space-y-1 text-sm text-gray-600">
										<li>Материал: {materials.find((m) => m.name === formData.material)?.name || 'Не выбран'}</li>
										<li>Цвет: {colors.find((c) => c.name === formData.color)?.name || 'Не выбран'}</li>
										<li>Размер: {sizes.find((s) => s.name === formData.size)?.name || 'Не выбран'}</li>
										<li>Цветность: {printOptions.find((p) => p.name === formData.printColor)?.name || 'Не выбрана'}</li>
										<li>Количество: {formData.quantity.toLocaleString()} шт.</li>
										<li className="font-medium mt-2">Итого: {price.toFixed(2).toLocaleString()} Br</li>
									</ul>
								</div>

								<Form className="items-stretch" id="calc-order-form" validationBehavior="native" onSubmit={handleSubmit}>
									<h4 className="font-medium mb-4">Отправить выбранное в типографию</h4>
									<div className="flex flex-col gap-3">
										<UsernameInput />
										<UserPhoneInput validPhone={setPhoneValid} />
									</div>
								</Form>
							</div>
						</div>
					</div>
				);
			case 6:
				return (
					<div className="text-center py-8">
						<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
							<svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								<path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
							</svg>
						</div>
						<h3 className="text-xl font-semibold mb-2">Готово!</h3>
						<p className="text-gray-600 mb-6">Мы получили ваш запрос и свяжемся с вами в ближайшее время для уточнения деталей.</p>
						<Button color="primary" radius="sm" onPress={() => setStep(1)}>
							Создать новый расчет
						</Button>
					</div>
				);
			default:
				return null;
		}
	};

	return (
		<div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md items-stretch">
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
						<div className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" style={{width: `${((step - 1) / 4) * 100}%`}} />
					</div>
				</div>
			)}

			{/* Form content */}
			<div className="min-h-[400px]">
				<AnimatePresence mode="wait">
					<motion.div key={step} animate={{opacity: 1, x: 0}} exit={{opacity: 0, x: -20}} initial={{opacity: 0, x: 20}} transition={{duration: 0.3}}>
						{renderStep()}
					</motion.div>
				</AnimatePresence>
			</div>

			{/* Navigation buttons */}
			{step < 6 && (
				<div className="flex justify-between mt-8 pt-4 border-t">
					<button className={`px-4 py-2 rounded-lg ${step === 1 ? 'text-gray-400' : 'text-blue-600 hover:bg-blue-50'}`} disabled={step === 1} onClick={prevStep}>
						Назад
					</button>

					{step < 5 ? (
						<Button
							color="primary"
							isDisabled={(!formData.material && step === 1) || (!formData.color && step === 2) || (!formData.size && step === 3) || (!formData.printColor && step === 4)}
							radius="sm"
							type="button"
							onPress={nextStep}
						>
							Далее
						</Button>
					) : (
						<Button className="bg-brand-gradient" color="primary" form="calc-order-form" isDisabled={!phoneValid || isSubmitting} isLoading={isSubmitting} radius="sm" type="submit">
							Отправить заявку
						</Button>
					)}
				</div>
			)}
		</div>
	);
};

export default PackageCalculator;
