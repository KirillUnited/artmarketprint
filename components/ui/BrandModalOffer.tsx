'use client';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@heroui/modal';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';
import { Form } from '@heroui/form';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { Alert } from '@heroui/alert';

import BrandButton from './BrandButton';

import { sendOrder } from '@/lib/actions/order.actions';
import 'react-international-phone/style.css';

export const ModalOfferForm = ({ onClose }: { onClose: () => void }) => {
	const [isPending, setIsPending] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const phoneRegex = /^\+375[-\s]?\(?\d{2}\)?[-\s]?\d{3}[-\s]?\d{2}[-\s]?\d{2}$/;
	
	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);

		event.currentTarget.reset();

		setIsPending(true);

		try {
			const result = await sendOrder(formData);

			if (result.ok) {
				setIsPending(false);
				setShowAlert(true);
				setTimeout(() => {
					onClose();
				}, 3000);
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<Form
			// action={sendOrder}
			validationBehavior="native"
			onSubmit={handleSubmit}
		>
			{showAlert && (
				<ModalBody className="py-6">
					<Alert
						className="w-full text-white/80"
						color="success"
						description="Спасибо за заявку! Мы свяжемся с Вами в ближайшее время."
						title="Заявка отправлена"
						variant="solid"
						onClose={() => setShowAlert(false)}
					/>
				</ModalBody>
			)}
			{!showAlert && (
				<>
					<ModalBody className="w-full">
						<Input isRequired color="primary" errorMessage="Пожалуйста, введите Ваше имя" id="user_name" label="Имя" name="user_name" placeholder="Напишите Ваше имя" variant="bordered" />
						<Input
							isRequired
							color="primary"
							errorMessage="Пожалуйста, введите корректный номер в формате +375 (XX) XXX-XX-XX"
							id="user_phone"
							inputMode="tel"
							label="Телефон"
							name="user_phone"
							placeholder="+375 (99) 999-99-99"
							validate={(value) => {
								if (!value.match(phoneRegex)) return 'Пожалуйста, введите корректный номер в формате +375 XX XXX-XX-XX';
							}}
							variant="bordered"
						/>
						{/*<BasePhoneInput />*/}
					</ModalBody>
					<ModalFooter className="w-full">
						<Button className="bg-brand-gradient text-fill-transparent font-semibold" color="secondary" radius="sm" size="lg" variant="ghost" onPress={onClose}>
							ОТМЕНА
						</Button>
						<BrandButton
							className="flex-1 basis-32 uppercase"
							disabled={isPending}
							isLoading={isPending}
							spinner={
								<svg className="animate-spin h-5 w-5 text-current" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
									<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
									<path
										className="opacity-75"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										fill="currentColor"
									/>
								</svg>
							}
							state="primary"
							type="submit"
						>
							{isPending ? 'Отправка...' : 'ОТПРАВИТЬ'}
						</BrandButton>
					</ModalFooter>
				</>
			)}
		</Form>
	);
};

export default function BrandModalOffer() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	return (
		<>
			<BrandButton className="flex-1 basis-52" state="primary" onPress={onOpen}>
				ЗАКАЗАТЬ
			</BrandButton>
			<Modal backdrop="blur" className="bg-background" isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1 text-2xl">Заказать звонок</ModalHeader>
							<ModalOfferForm onClose={onClose} />
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}

export function HeroModalOffer() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	return (
		<>
			<Button className="leading-normal font-semibold" color="primary" radius='sm' variant="solid" onPress={onOpen}>
				<CalendarIcon size={18} />
				<span>ЗАКАЗАТЬ ЗВОНОК</span>
			</Button>
			<Modal backdrop="blur" className='bg-background' isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1 text-2xl">Заказать звонок</ModalHeader>
							<ModalOfferForm onClose={onClose} />
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
