'use client';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@heroui/modal';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';
import { Form } from '@heroui/form';

import BrandButton from './BrandButton';
import { CalendarIcon } from 'lucide-react';
import { sendOrder } from "@/lib/actions/order.actions";
import { useState } from 'react';
import { Alert } from '@heroui/alert';

export const ModalOfferForm = ({ onClose }: { onClose: () => void }) => {
	const [isPending, setIsPending] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		event.currentTarget.reset();

		try {
			const result = await sendOrder(formData);
			if (result.ok) {
				setIsPending(false);
				setShowAlert(true);
				// onClose();
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<Form
			// action={sendOrder}
			onSubmit={handleSubmit}
			validationBehavior="native">
			<ModalBody className="w-full">
				{
					true &&
					<Alert
						color='success'
						onClose={() => setShowAlert(false)}
						className="w-full text-white/80"
						variant='solid'
						title="Заявка отправлена"
						description="Спасибо за заявку! Мы свяжемся с Вами в ближайшее время."
					/>
				}
				<Input
					isRequired
					id="user_name"
					name="user_name"
					errorMessage="Пожалуйста, введите Ваше имя"
					label="Имя"
					placeholder="Напишите Ваше имя"
					variant="bordered"
					color='primary'
				/>
				<Input
					id="user_phone"
					name="user_phone"
					isRequired
					errorMessage="Пожалуйста, введите действительный номер телефона"
					label="Телефон"
					placeholder="Введите Ваш телефон"
					type="tel"
					variant="bordered"
					color='primary'
				/>
			</ModalBody>
			<ModalFooter className="w-full">
				<Button className="bg-brand-gradient text-fill-transparent font-semibold" color="secondary" radius="sm" size="lg" variant="ghost" onPress={onClose}>
					ОТМЕНА
				</Button>
				<BrandButton
					className="flex-1 basis-32"
					disabled={isPending}
					isLoading={isPending}
					spinner={
						<svg
							className="animate-spin h-5 w-5 text-current"
							fill="none"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<circle
								className="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								strokeWidth="4"
							/>
							<path
								className="opacity-75"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								fill="currentColor"
							/>
						</svg>
					} state="primary"
					type="submit">
					ОТПРАВИТЬ
				</BrandButton>
			</ModalFooter>
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
			<Modal backdrop="blur" isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange} className="bg-background">
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
			<Button className="leading-normal font-semibold" color="primary" variant="solid" radius='sm' onPress={onOpen}>
				<CalendarIcon size={18} />
				<span>ЗАКАЗАТЬ ЗВОНОК</span>
			</Button>
			<Modal backdrop="blur" isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange} className='bg-background'>
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
