'use server';
import axios from 'axios';

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
	const telegramBotToken =
		process.env.TELEGRAM_BOT_TOKEN ||
		process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
	const chatId =
		process.env.TELEGRAM_PVD_CHAT_ID ||
		process.env.NEXT_PUBLIC_TELEGRAM_PVD_CHAT_ID;

	if (!telegramBotToken || !chatId) {
		console.error('Calculator Telegram configuration is missing');
		return {ok: false, error: 'Не настроен сервис уведомлений'};
	}

	const baseUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;
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
		comment = 'Нет',
	} = data;

	const message =
		'📦 *Новый расчет упаковки*\n\n' +
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
		`💭 Комментарий: ${comment || '—'}`;

	try {
		const response = await axios.post(
			baseUrl,
			{
				chat_id: chatId,
				text: message,
				parse_mode: 'Markdown',
			},
			{
				timeout: 10000,
			},
		);

		return {ok: true, data: response.data};
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error('Error sending calculator details to Telegram:', {
				code: error.code,
				message: error.message,
				status: error.response?.status,
				statusText: error.response?.statusText,
			});

			if (error.code === 'ETIMEDOUT') {
				return {
					ok: false,
					error: 'Сервис уведомлений недоступен по таймауту. Повторите попытку позже.',
				};
			}
		} else {
			console.error('Error sending calculator details to Telegram:', error);
		}

		return {ok: false, error: 'Не удалось отправить сообщение'};
	}
}
