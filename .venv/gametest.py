import telebot
import logging

TOKEN = "7875479927:AAHLi2odxR6TvWUk28fn0jhsoC1q-JYDDOM"
bot = telebot.TeleBot(TOKEN)

# Настроим логи для диагностики
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

logging.info("Запуск бота...")


# Обработчик команды /start
@bot.message_handler(commands=['start'])
def start(message):
    logging.info(f"Получена команда /start от {message.chat.id}")

    keyboard = telebot.types.InlineKeyboardMarkup()
    web_app_url = "https://sixnyder6.github.io/telegram-web-app/"
    web_app = telebot.types.WebAppInfo(web_app_url)

    button = telebot.types.InlineKeyboardButton("🔗 Открыть Web App", web_app=web_app)
    keyboard.add(button)

    bot.send_message(message.chat.id, "Нажмите кнопку ниже, чтобы открыть Web App!", reply_markup=keyboard)
    logging.info("Кнопка Web App отправлена")


# Обработчик входящих данных из Web App
@bot.message_handler(content_types=['web_app_data'])
def handle_webapp_data(message):
    data = message.web_app_data.data  # Получаем JSON-данные
    logging.info(f"Получены данные от Web App: {data}")

    bot.send_message(message.chat.id, f"🚀 Web App отправил: {data}")
    logging.info("Ответ отправлен пользователю")


bot.polling()
