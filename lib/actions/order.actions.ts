'use server';
import axios from 'axios';

const telegramBotToken = '7986078877:AAEPLbAVZeslEVFv_aG8BP0spNu2zG2Y48k';
const chatId = '-1002402462338';
const BASE_URL = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;

export async function sendOrder(data: FormData) {
	const name = data.get('user_name') as string;
	const phone = data.get('user_phone') as string;
	const comment = data.get('user_comment') as string;
	const message = `Новый заказ: Имя: ${name} - Телефон: ${phone} - Комментарий: ${comment}`;

	axios
		.post(BASE_URL, {
			chat_id: chatId,
			text: message,
		})
		.then((response) => {
			console.log('Message sent to Telegram:', response.data);
		})
		.catch((error) => {
			console.error('Error sending message to Telegram:', error);
		});
}
