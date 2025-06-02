import telebot

TOKEN = "8001816336:AAGl5CAJRkbZ3vHBTUS-3P5GebH5S8bfRzM"
bot = telebot.TeleBot(TOKEN)


# Обработчик команды /start
@bot.message_handler(commands=['start'])
def start(message):
    keyboard = telebot.types.InlineKeyboardMarkup()

    # Замени ссылку на реальный URL твоего Telegram Web App
    web_app_url = "https://sixnyder6.github.io/telegram-web-app/"
    web_app = telebot.types.WebAppInfo(web_app_url)

    button = telebot.types.InlineKeyboardButton("Открыть Web App", web_app=web_app)
    keyboard.add(button)

    bot.send_message(message.chat.id, "Нажмите кнопку ниже, чтобы открыть Web App!", reply_markup=keyboard)


bot.polling()
