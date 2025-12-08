'use server';
import axios from 'axios';

export async function sendOrder(formData: FormData): Promise<any> {
	try {
		const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
		const chatId = process.env.TELEGRAM_CHAT_ID;
		if (!telegramBotToken || !chatId) {
			throw new Error('Telegram bot configuration is missing');
		}
		const BASE_URL = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;
		const formId = formData.get('form_id') as string;
		const name = formData.get('user_name') as string;
		const phone = formData.get('user_phone') as string;
		const comment = formData.get('user_comment') as string;

		const message = `📝 Новый запрос (${formId || 'Консультация'}):

👤 Имя: ${name}
📱 Телефон: ${phone}
💬 Комментарий: ${comment}`;

		const response = await axios.post(BASE_URL, {
			chat_id: chatId,
			text: message,
		});

		return {ok: true, data: response.data};
	} catch (error) {
		console.error('❌ Ошибка в sendOrder:', error);

		return {ok: false, error: 'Не удалось отправить сообщение'};
	}
}
