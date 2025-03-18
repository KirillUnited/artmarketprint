'use server';
import axios from 'axios';

const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;
const BASE_URL = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;

export async function sendOrder(formData: FormData): Promise<any> {
	const name = formData.get('user_name') as string;
	const phone = formData.get('user_phone') as string;
	const comment = formData.get('user_comment') as string;
	const message = `Новый заказ: Имя: ${name} - Телефон: ${phone} - Комментарий: ${comment}`;

	return await axios
		.post(BASE_URL, {
			chat_id: chatId,
			text: message,
		})
		.then((response) => {
			console.log('Message sent to Telegram:', response.data);
			return response.data;
		})
		.catch((error) => {
			console.error('Error sending message to Telegram:', error);
			throw error;
		});
}

export async function createProductCheckoutOrder(formData: FormData): Promise<any> {
	const email = formData.get('email-address') as string;
	const firstName = formData.get('first-name') as string;
	const lastName = formData.get('last-name') as string;
	const address = formData.get('address') as string;
	const city = formData.get('city') as string;
	const country = formData.get('country') as string;
	const postalCode = formData.get('postal-code') as string;
	const phone = formData.get('phone') as string;
	const items = JSON.parse(formData.get('items') as string);

	const message = `
🛍️ Новый заказ товаров:

👤 Контактная информация:
Email: ${email}
Телефон: ${phone}

📦 Информация о доставке:
Имя: ${firstName}
Фамилия: ${lastName}
Адрес: ${address}
Город: ${city}
Страна: ${country}
Почтовый индекс: ${postalCode}

🛒 Товары:
${items.map((item: any) => `
- ${item.name}
  Цена: ${item.price} BYN
  Количество: ${item.quantity}
`).join('\n')}
`;

	return await axios
		.post(BASE_URL, {
			chat_id: chatId,
			text: message,
			parse_mode: 'HTML'
		})
		.then((response) => {
			console.log('Order sent to Telegram:', response.data);
			return response.data;
		})
		.catch((error) => {
			console.error('Error sending order to Telegram:', error);
			throw error;
		});
}
