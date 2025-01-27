'use client';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@heroui/modal';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';
import { Form } from '@heroui/form';

import BrandButton from './BrandButton';


export default function BrandModalOffer() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <BrandButton className='flex-1 basis-52' state='primary' onPress={onOpen}>ЗАКАЗАТЬ</BrandButton>
            <Modal backdrop="blur" isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange} className='bg-background'>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Заявка</ModalHeader>

                            <Form validationBehavior="native">
                                <ModalBody className="w-full">
                                    <Input
                                        isRequired
                                        errorMessage="Пожалуйста, введите Ваше имя"
                                        label="Имя"
                                        placeholder="Напишите Ваше имя"
                                        variant="bordered"
                                    />
                                    <Input
                                        isRequired
                                        errorMessage="Пожалуйста, введите действительный номер телефона"
                                        label="Телефон"
                                        placeholder="Введите Ваш телефон"
                                        type="tel"
                                        variant="bordered"
                                    />
                                </ModalBody>
                                <ModalFooter className="w-full">
                                    <Button className='bg-brand-gradient text-fill-transparent font-semibold' color='secondary' radius='sm' size='lg' variant='ghost' onPress={onClose}>ОТМЕНА</Button>

                                    <BrandButton className='flex-1 basis-32' state='primary' type="submit">ЗАКАЗАТЬ</BrandButton>
                                </ModalFooter>

                            </Form>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
