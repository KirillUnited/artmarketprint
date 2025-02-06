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
		});
}
