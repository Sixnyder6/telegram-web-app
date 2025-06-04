let tg = window.Telegram.WebApp;
tg.expand(); // Разворачивает Web App на весь экран

document.getElementById("user").innerText = `Привет, ${tg.initDataUnsafe?.user?.first_name || "гость"}!`;

function sendData() {
    tg.sendData(JSON.stringify({ message: "Привет от Web App!" })); // Отправляем данные в бота
    tg.close(); // Закрываем Web App после отправки
}

// Функция для отображения профиля
function showProfile() {
    let userData = tg.initDataUnsafe?.user;
    if (userData) {
        document.getElementById("profile-name").innerText = `Имя: ${userData.first_name}`;
        document.getElementById("profile-photo").src = userData.photo_url || "default-avatar.png";
        document.getElementById("profile-status").innerText = "Статус: Активен";
    } else {
        document.getElementById("profile-name").innerText = "Имя: Гость";
        document.getElementById("profile-photo").src = "default-avatar.png";
        document.getElementById("profile-status").innerText = "Статус: Не авторизован";
    }
}

// Добавляем обработчик клика на кнопку "Мой профиль"
document.getElementById("profile-button").addEventListener("click", showProfile);
