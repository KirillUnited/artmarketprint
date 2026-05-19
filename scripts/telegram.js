const axios = require('axios');

async function sendTelegramMessage(message) {
  const token = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
  const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;
  
  if (!token || !chatId) {
    console.warn('Telegram env variables are missing');
    return;
  }

  try {
    await axios.post(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
      }
    );
  } catch (error) {
    console.error('Telegram notification failed:', error.message);
  }
}

module.exports = {
  sendTelegramMessage,
};