'use server';
import axios from 'axios';

const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_PVD_CHAT_ID;
const BASE_URL = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;

export interface CalculatorFormData {
    material: string;
    color: string;
    size: string;
    printColor: string;
    quantity: number;
    price: number;
    pricePerBag: number;
    user_name: string;
    user_phone: string;
    comment?: string;
}

export async function sendCalculatorDetails(data: CalculatorFormData): Promise<any> {
    const {
        material,
        color,
        size,
        printColor,
        quantity,
        price,
        pricePerBag,
        user_name,
        user_phone,
        comment = 'Нет'
    } = data;

    const message = '📦 *Новый расчет упаковки*\n\n' +
        '*Детали заказа:*\n' +
        `🛍️ Материал: ${material}\n` +
        `🎨 Цвет: ${color}\n` +
        `📏 Размер: ${size}\n` +
        `🎨 Цвет печати: ${printColor}\n` +
        `🔢 Количество: ${quantity} шт.\n\n` +
        '*Стоимость:*\n' +
        `💰 Цена за штуку: ${pricePerBag.toFixed(2)} Br\n` +
        `💵 Итого: ${price.toFixed(2)} Br\n\n` +
        '*Контактная информация:*\n' +
        `👤 Имя: ${user_name}\n` +
        `📱 Телефон: ${user_phone}\n` +
        `💭 Комментарий: ${comment}`;

    try {
        const response = await axios.post(BASE_URL, {
            chat_id: chatId,
            text: message,
            parse_mode: 'Markdown'
        });

        console.log('Calculator details sent to Telegram:', response.data);

        return response.data;
    } catch (error) {
        console.error('Error sending calculator details to Telegram:', error);
        throw error;
    }
}