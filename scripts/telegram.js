const axios = require('axios');

/**
 * Отправляет сообщение в Telegram (в группу или конкретный топик)
 * @param {string} message - текст сообщения
 * @param {number|null} threadId - ID топика (message_thread_id). Если null — отправит в основную группу.
 */
async function sendTelegramMessage(message, threadId = 78) {
  const token = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
  const chatId = process.env.NEXT_PUBLIC_TELEGRAM_GROUP_CHAT_ID;

  if (!token || !chatId) {
    console.warn('Telegram env variables are missing');
    return;
  }

  try {
    const payload = {
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML',
    };

    if (threadId !== null && threadId !== undefined) {
      payload.message_thread_id = threadId;
    }

    await axios.post(
      `https://api.telegram.org/bot${token}/sendMessage`,
      payload
    );
  } catch (error) {
    console.error('Telegram notification failed:', error.message);
  }
}

module.exports = {
  sendTelegramMessage,
};