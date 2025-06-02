import telebot

TOKEN = "8001816336:AAGl5CAJRkbZ3vHBTUS-3P5GebH5S8bfRzM"
bot = telebot.TeleBot(TOKEN)

# Удаляем Webhook перед запуском polling
bot.delete_webhook()

# Обработчик команды /start
@bot.message_handler(commands=['start'])
def start(message):
    keyboard = telebot.types.InlineKeyboardMarkup()
    web_app_url = "https://sixnyder6.github.io/telegram-web-app/"
    web_app = telebot.types.WebAppInfo(web_app_url)

    button = telebot.types.InlineKeyboardButton("🔗 Открыть Web App", web_app=web_app)
    keyboard.add(button)

    bot.send_message(message.chat.id, "Нажмите кнопку ниже, чтобы открыть Web App!", reply_markup=keyboard)

# Обработчик входящих данных из Web App
@bot.message_handler(content_types=['web_app_data'])
def handle_webapp_data(message):
    data = message.web_app_data.data  # Получаем JSON-данные
    bot.send_message(message.chat.id, f"🚀 Web App отправил: {data}")

bot.polling()
