'use server';
import axios from 'axios';

const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;
const BASE_URL = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;

export async function sendOrder(formData: FormData): Promise<any> {
	const formId = formData.get('form_id') as string;
	const name = formData.get('user_name') as string;
	const phone = formData.get('user_phone') as string;
	const comment = formData.get('user_comment') as string;
	const termsChecked = formData.get('layout_image_terms') as string;
	const message = `📝 Новый заказ для "${formId || '💬 Консультация'}":\n\n👤 Имя: ${name}\n📱 Телефон: ${phone}\n💭 Комментарий: ${comment}\n✅ Ознакомлен с требованиями к макету`;

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
	const email = formData.get('email') as string;
	const firstName = formData.get('first-name') as string;
	const lastName = formData.get('last-name') as string;
	const address = formData.get('address') as string;
	const city = formData.get('city') as string;
	const country = formData.get('country') as string;
	const postalCode = formData.get('postal-code') as string;
	const phone = formData.get('user_phone') as string;
	const items = JSON.parse(formData.get('items') as string);
	const requisites = formData.get('requisites') as string;
	const requisitesPdf = formData.get('requisites-pdf') as File;
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
${requisitesPdf ? '📄 Реквизиты (PDF): Прикреплен файл' : ''}

🛒 Товары:
${items.map((item: any) => `
- ${item.name}
  Номер: ${item.id}
  Цена: ${item.price} BYN
  Количество: ${item.quantity}
  Сумма: ${(item.price * item.quantity).toFixed(2)} BYN
`).join('\n')}

💰 Сумма заказа: ${(items.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0)).toFixed(2)} BYN

💬 Комментарий: ${comment}
`;

	// First, send the message
	const messageResponse = await axios.post(BASE_URL, {
		chat_id: chatId,
		text: message,
		parse_mode: 'HTML'
	});

	return messageResponse.data;
}

export async function sendProductCheckoutFile(formData: FormData): Promise<any> {
	const requisitesPdf = formData.get('requisites-pdf') as File;
	
	// If there's a PDF file, send it as a document
	if (requisitesPdf && requisitesPdf.size > 0 && chatId) {
		const pdfBuffer = Buffer.from(await requisitesPdf.arrayBuffer());
		const formData = new FormData();
		formData.append('chat_id', chatId);
		formData.append('document', new Blob([pdfBuffer]), requisitesPdf.name);

		await axios.post(`https://api.telegram.org/bot${telegramBotToken}/sendDocument`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
	}
}