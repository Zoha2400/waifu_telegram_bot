import express from 'express';

import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import pg from 'pg';

dotenv.config();

const TOKEN = process.env.TOKEN;
const DEFAULT_CHAT_ID = process.env.CHATID;
const TAG = '@waifu_mz_bot';

const bot = new TelegramBot(TOKEN, { polling: true });

bot.setMyCommands([
    { command: "/start", description: "It's not for you" },
]);


bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const chatTitle = msg.chat.title || '';
    const text = msg.text;
    const nameOfUser = msg.from.first_name || 'пользователь';

    if(chatId !== DEFAULT_CHAT_ID){
        await bot.sendMessage(chatId, 'I already have my boss! His tech channel - @hoichannel');
    }else{
        switch (text) {
            case "/start":
            case `/start${TAG}`:
                await bot.sendMessage(chatId, `Привет ${nameOfUser} в чате ${chatTitle} с айдишка ${chatId}!`);
                break;
        }
    }
});


const app = express();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});


app.listen(3001, () => {
    console.log('listening on http://localhost:3001');
})