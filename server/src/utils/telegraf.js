const config = require('../../config');

const { Telegraf } = require('telegraf');

async function sendMessage(messageData, selectorData) {

    if (!selectorData.telegramCheck) {
        console.log('Telegram notifications disabled. Skipping message sending.');
        return; 
    }
    return new Promise((resolve, reject) => {
        const bot = new Telegraf(config.TELEGRAF_API_KEY);

        const options = { disable_web_page_preview: true };

        bot.telegram.sendMessage(6343714122, messageData, options)
            .then(() => {
                console.log('Message sent successfully!');
                resolve('Message sent successfully!');
            })
            .catch((error) => {
                console.error('Error sending message:', error);
                reject(error);
            });
    });
}

module.exports = sendMessage;



