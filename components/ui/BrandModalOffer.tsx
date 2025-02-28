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
import { OrderForm } from './form';
import useForm from '@/hooks/useForm';
import { Select, SelectItem } from '@heroui/select';
import { FlagImage, parseCountry } from 'react-international-phone';
import { PhoneNumberUtil } from 'google-libphonenumber';

const phoneUtil = PhoneNumberUtil.getInstance();

export const ModalOfferForm = ({ onClose }: { onClose: () => void }) => {
	const {
		isPending,
		showAlert,
		inputValue,
		handlePhoneValueChange,
		inputRef,
		country,
		setCountry,
		countries,
		validPhone,
		handleSubmit,
		setShowAlert
	} = useForm(phoneUtil, onClose);

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
						<Input
							isRequired
							color="primary"
							errorMessage="Пожалуйста, введите Ваше имя"
							id='user_name'
							label="Имя"
							labelPlacement='outside'
							name='user_name'
							placeholder="Напишите Ваше имя"
							radius='sm'
							variant="bordered"
						/>
						<Input
							value={inputValue}
							onChange={handlePhoneValueChange}
							type="tel"
							ref={inputRef}
							aria-label={'Телефон'}
							isRequired
							color="primary"
							errorMessage="Пожалуйста, введите действительный номер телефона"
							id='user_phone'
							label="Телефон"
							labelPlacement='outside'
							name='user_phone'
							radius='sm'
							variant="bordered"
							validate={(value) => {
								if (!validPhone) return 'Пожалуйста, введите корректный номер в формате +375 XX XXX-XX-XX';
							}}
							placeholder='+375 (__) ___-__-__'
							startContent={
								<Select
									selectedKeys={[country.iso2]}
									onChange={(e) => setCountry(e.target.value)}
									className="w-16"
									startContent={<FlagImage iso2={country.iso2} />}
									aria-label="Select country"
									classNames={{
										popoverContent: 'w-60',
										value: 'hidden',
										listbox: 'w-60',
										trigger: 'bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent px-0',
									}}
								>
									{countries.map((c) => {
										const country = parseCountry(c);

										return (
											<SelectItem
												key={country.iso2}
												textValue={country.name}
											>
												<div className="flex items-center gap-2">
													<FlagImage iso2={country.iso2} />
													<span>{country.name}</span>
													<span className='font-light text-gray-600'>+{country.dialCode}</span>
												</div>
											</SelectItem>
										);
									})}
								</Select>
							}
						/>
					</ModalBody>
					<ModalFooter className="w-full">
						<Button className="bg-brand-gradient text-fill-transparent font-semibold" color="secondary" radius="sm" size="md" variant="ghost" onPress={onClose}>
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
							size='md'
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
			<BrandButton className="flex-1 min-w-fit" state="primary" onPress={onOpen}>
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
			<BrandButton className="leading-normal font-semibold group" state="primary" radius='sm' variant="solid" onPress={onOpen} size={'md'}>
				<CalendarIcon size={18} className={'group-hover:scale-110 transition-transform'} />
				<span>ЗАКАЗАТЬ ЗВОНОК</span>
			</BrandButton>
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
