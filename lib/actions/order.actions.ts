'use server';
import axios from 'axios';

export async function sendOrder(formData: FormData): Promise<any> {
  try {
    const telegramBotToken =
      process.env.TELEGRAM_BOT_TOKEN || process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID || process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

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
💬 Комментарий: ${comment || '—'}`;

    const response = await axios.post(
      BASE_URL,
      {
        chat_id: chatId,
        text: message,
      },
      {
        timeout: 10000,
      },
    );

    return { ok: true, data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('❌ Ошибка в sendOrder (Telegram API):', {
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
      console.error('❌ Ошибка в sendOrder:', error);
    }

    return { ok: false, error: 'Не удалось отправить сообщение' };
  }
}

const MAX_LAYOUT_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_LAYOUT_FILE_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];

export async function sendServiceOrderRequest(formData: FormData): Promise<any> {
  try {
    const telegramBotToken =
      process.env.TELEGRAM_BOT_TOKEN || process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID || process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

    if (!telegramBotToken || !chatId) {
      throw new Error('Telegram bot configuration is missing');
    }

    const service = formData.get('service_title') as string;
    const name = formData.get('user_name') as string;
    const phone = formData.get('user_phone') as string;
    const comment = formData.get('user_comment') as string;
    const file = formData.get('layout_file');
    const messageUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;
    const documentUrl = `https://api.telegram.org/bot${telegramBotToken}/sendDocument`;

    const message = `🛠️ Новая заявка по услуге:

📌 Услуга: ${service || 'Не указана'}
👤 Имя: ${name}
📱 Телефон: ${phone}
💬 Описание задачи: ${comment || '—'}
📎 Макет: ${file instanceof File && file.size > 0 ? file.name : 'не приложен'}`;

    if (file instanceof File && file.size > 0) {
      if (file.size > MAX_LAYOUT_FILE_SIZE) {
        return { ok: false, error: 'Файл макета должен быть не больше 5 МБ' };
      }

      if (!ALLOWED_LAYOUT_FILE_TYPES.includes(file.type)) {
        return { ok: false, error: 'Загрузите макет в формате PDF, JPG или PNG' };
      }
    }

    const messageResponse = await axios.post(
      messageUrl,
      {
        chat_id: chatId,
        text: message,
      },
      {
        timeout: 10000,
      },
    );

    if (file instanceof File && file.size > 0) {
      const arrayBuffer = await file.arrayBuffer();
      const layoutBuffer = Buffer.from(arrayBuffer);
      const tgForm = new FormData();

      tgForm.append('chat_id', chatId);
      tgForm.append('document', new Blob([layoutBuffer], { type: file.type }), file.name);
      tgForm.append('caption', `Макет к заявке по услуге: ${service || 'Не указана'}`);

      await axios.post(documentUrl, tgForm, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 15000,
      });
    }

    return { ok: true, data: messageResponse.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('❌ Ошибка в sendServiceOrderRequest (Telegram API):', {
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
      console.error('❌ Ошибка в sendServiceOrderRequest:', error);
    }

    return { ok: false, error: 'Не удалось отправить заявку' };
  }
}
