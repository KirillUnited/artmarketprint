'use client';

import {useState, useEffect} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {Button} from '@heroui/button';
import Image from 'next/image';
import {Select, SelectItem} from '@heroui/select';
import {Form} from '@heroui/form';

import {colors, materials, MIN_QUANTITY, printOptions, quantityDiscounts, sizes} from '@/components/shared/сalculator/mock-data';
import {calculatePVDPrice, getAvailableColors, getAvailableSizes} from '@/components/shared/сalculator/lib/utils';
import {UsernameInput, UserPhoneInput} from '@/components/ui/form';

import {sendCalculatorDetails} from './lib/messenger';

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
		const selectedColor = colors.find((c) => c.name === formData.color);

		let pricePerBagValue = 0;
		let totalPriceValue = 0;
		const quantity = formData.quantity || MIN_QUANTITY;

		// If it's a PVD material, use the price table
		if (selectedMaterial.id === 'pvd' && selectedSize && selectedPrint) {
			pricePerBagValue = calculatePVDPrice(matrix, selectedSize, selectedPrint, selectedColor, quantity);
			totalPriceValue = pricePerBagValue * quantity;
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
						<h3 className="mb-4 text-xl font-semibold">Материал пакета</h3>
						<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
							{materials.map((material) => (
								<button
									key={material.id}
									className="group hover:bg-primary flex flex-col gap-4 rounded-lg border p-4 text-left transition-colors hover:text-white"
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
									{material.image && <Image alt={material.name} className="h-16 w-16 object-contain" height={100} quality={50} src={material.image} width={100} />}
								</button>
							))}
						</div>
					</div>
				);
			case 2:
				return (
					<div className="space-y-4">
						<h3 className="mb-4 text-xl font-semibold">Цвет пакета</h3>
						{!formData.materialId ? (
							<div className="py-8 text-center text-gray-500">Пожалуйста, сначала выберите материал пакета</div>
						) : availableColors.length === 0 ? (
							<div className="py-8 text-center text-gray-500">Нет доступных цветов для выбранного материала</div>
						) : (
							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
								{availableColors.map((color) => (
									<button
										key={color.id}
										className="hover:bg-primary flex items-center gap-4 rounded-lg border p-4 transition-all hover:text-white hover:shadow-md"
										title={color.name}
										onClick={() => {
											handleChange('color', color.name);
											nextStep();
										}}
									>
										<span className="block h-8 w-8 shrink-0 basis-8 rounded-full border" style={{backgroundColor: color.value}} />
										<span className="line-clamp-1 flex-1 truncate text-left text-sm">{color.name}</span>
									</button>
								))}
							</div>
						)}
					</div>
				);
			case 3:
				return (
					<div className="space-y-4">
						<h3 className="mb-4 text-xl font-semibold">Выберите размер пакета</h3>
						{!formData.materialId ? (
							<div className="py-8 text-center text-gray-500">Пожалуйста, сначала выберите материал пакета</div>
						) : availableSizes.length === 0 ? (
							<div className="py-8 text-center text-gray-500">Нет доступных размеров для выбранного материала</div>
						) : (
							<div className="space-y-3">
								{availableSizes.map((size) => (
									<button
										key={size.id}
										className="hover:bg-primary w-full rounded-lg border p-4 text-left transition-colors hover:text-white"
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
						<h3 className="mb-4 text-xl font-semibold">Цветность печати</h3>
						<div className="space-y-3">
							{printOptions.map((option) => (
								<button
									key={option.id}
									className="hover:bg-primary w-full rounded-lg border p-4 text-left transition-colors hover:text-white"
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
						<h3 className="mb-4 text-xl font-semibold">Количество пакетов</h3>
						<div className="space-y-6">
							<Select
								aria-label="Количество пакетов"
								classNames={{
									trigger: 'border bg-background',
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

							<div className="mt-8 rounded-lg bg-gray-50 p-4">
								<div className="flex items-center justify-between">
									<span>Стоимость:</span>
									<span className="text-xl font-bold">{price.toFixed(2).toLocaleString()} Br</span>
								</div>
								<div className="mt-1 text-sm text-gray-500">за 1 пакет: {pricePerBag.toFixed(2)} Br</div>

								<p className="mt-6 text-sm text-gray-600">* - окончательную стоимость уточняйте у менеджера.</p>
							</div>
							<div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
								<div className="rounded-lg bg-gray-50 p-4 text-left">
									<h4 className="mb-2 font-medium">Детали заказа:</h4>
									<ul className="space-y-1 text-sm text-gray-600">
										<li>Материал: {materials.find((m) => m.name === formData.material)?.name || 'Не выбран'}</li>
										<li>Цвет: {colors.find((c) => c.name === formData.color)?.name || 'Не выбран'}</li>
										<li>Размер: {sizes.find((s) => s.name === formData.size)?.name || 'Не выбран'}</li>
										<li>Цветность: {printOptions.find((p) => p.name === formData.printColor)?.name || 'Не выбрана'}</li>
										<li>Количество: {formData.quantity.toLocaleString()} шт.</li>
										<li className="mt-2 font-medium">Итого: {price.toFixed(2).toLocaleString()} Br</li>
									</ul>
								</div>

								<Form className="items-stretch" id="calc-order-form" validationBehavior="native" onSubmit={handleSubmit}>
									<h4 className="mb-4 font-medium">Отправить выбранное в типографию</h4>
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
					<div className="py-8 text-center">
						<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
							<svg className="h-8 w-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								<path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
							</svg>
						</div>
						<h3 className="mb-2 text-xl font-semibold">Готово!</h3>
						<p className="mb-6 text-gray-600">Мы получили ваш запрос и свяжемся с вами в ближайшее время для уточнения деталей.</p>
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
		<div className="mx-auto w-full max-w-4xl items-stretch rounded-xl bg-white p-6 shadow-md">
			<h2 className="mb-8 text-center text-2xl font-bold">Калькулятор стоимости пакетов</h2>

			{/* Progress bar */}
			{step < 6 && (
				<div className="mb-8">
					<div className="mb-2 flex justify-between">
						{[1, 2, 3, 4, 5].map((stepNum) => (
							<div
								key={stepNum}
								className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${step >= stepNum ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
							>
								{stepNum}
							</div>
						))}
					</div>
					<div className="h-2.5 w-full rounded-full bg-gray-200">
						<div className="h-2.5 rounded-full bg-blue-600 transition-all duration-300" style={{width: `${((step - 1) / 4) * 100}%`}} />
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
				<div className="mt-8 flex justify-between border-t pt-4">
					<button className={`cursor-pointer rounded-lg border px-4 py-2 ${step === 1 ? 'text-gray-400' : 'text-blue-600 hover:bg-blue-50'}`} disabled={step === 1} onClick={prevStep}>
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
