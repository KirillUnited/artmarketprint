'use client';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@heroui/modal";
import BrandButton from "./BrandButton";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";


export default function BrandModalOffer() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <BrandButton state='primary' className='flex-1 basis-52' onPress={onOpen}>ЗАКАЗАТЬ</BrandButton>
            <Modal backdrop="blur" isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
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
                                    <Button color='secondary' size='lg' radius='sm' variant='ghost' className='bg-brand-gradient text-fill-transparent font-semibold' onPress={onClose}>ОТМЕНА</Button>

                                    <BrandButton type="submit" state='primary' className='flex-1 basis-32'>ЗАКАЗАТЬ</BrandButton>
                                </ModalFooter>

                            </Form>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
