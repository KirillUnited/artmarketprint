'use client';

import { createProductCheckoutOrder, sendProductCheckoutFile } from "@/lib/actions/order.actions";
import useBasketStore from "@/store/store";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from 'sonner';

export function useCartForm() {
    const [isPending, setIsPending] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const items = useBasketStore((state) => state.items);
    const router = useRouter();

    // Handle PDF file upload
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setIsLoading(true); // Show loading UI

            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                toast.error('Ошибка загрузки файла', {
                    description: 'Размер файла не должен превышать 5MB',
                });
                setIsLoading(false); // Hide loading UI
                return;
            }
            if (file.type !== 'application/pdf') {
                toast.error('Ошибка загрузки файла', {
                    description: 'Поддерживается только формат PDF',
                });
                setIsLoading(false); // Hide loading UI
                return;
            }

            // Simulate file upload process
            setTimeout(() => {
                setIsLoading(false); // Hide loading UI after upload
                toast.success('Файл успешно загружен');
            }, 2000); // Simulate 2 seconds upload time
        }
    };

    async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);

        // Add cart items to form data
        const cartItems = items.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            total: item.price * item.quantity
        }));
        formData.append('items', JSON.stringify(cartItems));

        setIsPending(true);

        try {
            // Execute both operations concurrently
            const [orderResult, attachResult] = await Promise.all([
                createProductCheckoutOrder(formData),
                sendProductCheckoutFile(formData)
            ]);

            if (orderResult.ok) {
                router.push('/success');
            }
        } catch (error) {
            console.error('Order processing error:', error);
            toast.warning('Ошибка отправки заказа', {
                description: 'Пожалуйста, попробуйте еще раз позже.',
            });
        } finally {
            setIsPending(false);
        }
    }
    return {
        isPending,
        isLoading,
        setIsLoading,
        handleFileChange,
        handleSubmit
    };
}