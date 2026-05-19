'use server';

import axios from 'axios';

const telegramBotToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;
const BASE_URL = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;

/* -----------------------------------------------------------
   1. Отправка текстового сообщения (всегда безопасно)
----------------------------------------------------------- */

export async function createProductCheckoutOrder(formData: FormData): Promise<any> {
	try {
		const email = formData.get('email') as string;
		const firstName = formData.get('first-name') as string;
		const lastName = formData.get('last-name') as string;
		const address = formData.get('address') as string;
		const city = formData.get('city') as string;
		const country = formData.get('country') as string;
		const postalCode = formData.get('postal-code') as string;
		const phone = formData.get('user_phone') as string;

		const itemsRaw = formData.get('items');
		let items: any[] = [];

		try {
			items = itemsRaw ? JSON.parse(itemsRaw as string) : [];
		} catch (e) {
			console.error('Ошибка парсинга items:', e);
		}

		const requisites = formData.get('requisites') as string;
		const comment = formData.get('comment') as string;

		const message = `
🛍️ Новый заказ товаров:

👤 Контактная информация:
Имя: ${firstName}
Фамилия: ${lastName}
Телефон: ${phone}
Адрес: ${address}
Город: ${city}
Страна: ${country}
Почтовый индекс: ${postalCode}
Email: ${email}

💳 Реквизиты: ${requisites}

🛒 Товары:
${items
	.map(
		(item: any) => `
- ${item.name}
  Номер: ${item.id}
  Цена: ${item.price} BYN
  Цвет: ${item.color}
  Размер: ${item.size}
  Количество: ${item.quantity}
  Сумма: ${(item.price * item.quantity).toFixed(2)} BYN
`,
	)
	.join('\n')}

💰 Сумма заказа: ${items.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0).toFixed(2)} BYN

💬 Комментарий: ${comment}
`;

		const messageResponse = await axios.post(BASE_URL, {
			chat_id: chatId,
			text: message,
			parse_mode: 'HTML',
		});

		return {ok: true, data: messageResponse.data};
	} catch (error) {
		console.error('❌ Ошибка в createProductCheckoutOrder:', error);

		return {ok: false, error: 'Ошибка отправки заказа'};
	}
}

/* -----------------------------------------------------------
   2. Отправка PDF-файла в Telegram (устойчивая, fail-safe)
----------------------------------------------------------- */

export async function sendProductCheckoutFile(formData: FormData): Promise<any> {
	try {
		const file = formData.get('requisites-pdf');

		// Защита №1 — PDF отсутствует
		if (!file) {
			console.log('ℹ Нет файла для отправки');

			return {ok: true, skipped: true};
		}

		// Защита №2 — Проверка на тип
		if (typeof (file as any).arrayBuffer !== 'function') {
			console.warn('⚠ requisites-pdf не имеет arrayBuffer()');

			return {ok: true, skipped: true};
		}

		// Защита №3 — Чтение в Buffer
		const arrayBuffer = await (file as File).arrayBuffer();
		const pdfBuffer = Buffer.from(arrayBuffer);

		// Формируем FormData для Telegram
		const tgForm = new FormData();

		tgForm.append('chat_id', chatId!);
		tgForm.append('document', new Blob([pdfBuffer]), (file as File).name);

		const res = await axios.post(`https://api.telegram.org/bot${telegramBotToken}/sendDocument`, tgForm, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});

		return {ok: true, data: res.data};
	} catch (error) {
		console.error('❌ Ошибка отправки PDF:', error);

		// Ошибка не должна ронять заказ → возвращаем ok:true
		return {ok: true, error: 'PDF не отправлен'};
	}
}
