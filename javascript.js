let tg = window.Telegram.WebApp;
tg.expand(); // Разворачивает Web App на весь экран

document.getElementById("user").innerText = `Привет, ${tg.initDataUnsafe?.user?.first_name || "гость"}!`;

function sendData() {
    tg.sendData(JSON.stringify({ message: "Привет от Web App!" })); // Отправляем данные в бота
    tg.close(); // Закрываем Web App после отправки
}
