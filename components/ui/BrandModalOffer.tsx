'use client';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@heroui/modal';
import { Button } from '@heroui/button';
import { Form } from '@heroui/form';
import { CalendarIcon } from 'lucide-react';

import BrandButton from './BrandButton';

import 'react-international-phone/style.css';
import { UsernameInput, UserPhoneInput } from './form';

import useForm from '@/hooks/useForm';
import 'react-international-phone/style.css';
import React from 'react';

export const ModalOfferForm = ({ onClose }: { onClose?: () => void }) => {
	const {
		isPending,
		inputValue,
		handlePhoneValueChange,
		inputRef,
		country,
		setCountry,
		countries,
		validPhone,
		handleSubmit,
	} = useForm(onClose || (() => { }));
	const [phoneValid, setPhoneValid] = React.useState(false);

	return (
		<Form
			// action={sendOrder}
			validationBehavior="native"
			onSubmit={handleSubmit}
		>

			<ModalBody className="w-full">
				<UsernameInput />

				<UserPhoneInput countries={countries} country={country} handlePhoneValueChange={handlePhoneValueChange} inputRef={inputRef} inputValue={inputValue} setCountry={setCountry} validPhone={setPhoneValid} />

			</ModalBody>
			<ModalFooter className="w-full">
				<Button className="bg-brand-gradient text-fill-transparent font-semibold" color="secondary" radius="sm" size="md" variant="ghost" onPress={onClose}>
					ОТМЕНА
				</Button>
				<BrandButton
					className="flex-1 basis-32 uppercase disabled:cursor-not-allowed pointer-events-auto"
					isDisabled={!phoneValid || isPending}
					isLoading={isPending}
					size='md'
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
		</Form>
	);
};

export default function BrandModalOffer({buttonLabel, icon }: {buttonLabel?: string, icon?: React.ReactNode }) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	return (
		<>
			<BrandButton className="grow min-w-fit uppercase" size='md' state="primary" onPress={onOpen}>
				{icon}
				<span>{buttonLabel || 'ЗАКАЗАТЬ'}</span>
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
			<BrandButton className="leading-normal font-semibold group" radius='sm' size={'md'} state="primary" variant="solid" onPress={onOpen}>
				<CalendarIcon className={'group-hover:scale-110 transition-transform'} size={18} />
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
