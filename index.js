require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TOKEN;

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  main(msg);
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  let lists = 'lists';

  if (isMessageCheck(msg, lists)) {
    bot.sendMessage(chatId, 'Your lists', {
      reply_markup: {
        keyboard: [['Menu']]
      }
    });
  }

  if (isMessageCheck(msg)) {
    main(msg);
  }
});

main();

function main() {
  const rootCommands = [/\/start/, /\/stop/, /\/clear/, /\/get_list/];
  const rootAnswers = {
    lists: ['first', 'two'],
    hi: 'Hello',
    bye: '"Have a nice day '
  };
}

function isMessageCheck(msg, word) {
  return msg.text.toString().toLowerCase().includes(word);
}

function menu() {
  bot.sendMessage(msg.chat.id, 'What do you wnat to see ?', {
    reply_markup: {
      keyboard: [['Lists', 'Add a list'], ['Monthly Costs']]
    }
  });
}
