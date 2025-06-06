// Открытие/закрытие окон
const modals = document.querySelectorAll('.modal');
document.querySelectorAll('.main-btn').forEach(btn => {
  btn.onclick = () => {
    modals.forEach(m => m.style.display = 'none');
    if (btn.id === "profileBtn") document.getElementById('profileModal').style.display = 'flex';
    if (btn.id === "statsBtn") document.getElementById('statsModal').style.display = 'flex';
    if (btn.id === "teamBtn") document.getElementById('teamModal').style.display = 'flex';
  };
});
document.querySelectorAll('.close').forEach(close => {
  close.onclick = () => {
    document.getElementById(close.dataset.target).style.display = 'none';
  };
});

// Пример данных (заглушки)
const userProfile = {
  name: "Шевченко Антон",
  photo: "default-avatar.png",
  workStart: "2023-10-15",
  shifts: [
    "work", "off", "work", "done", "off", "work", "off"
  ],
  repaired: [4, 0, 5, 2, 0, 7, 0],
};

const team = [
  { category: "Техники", members: [
      { name: "Иванов Иван", online: true },
      { name: "Михайлов Михаил", online: false }
  ]},
  { category: "Кладовщики", members: [
      { name: "Петров Константин", online: true },
      { name: "Васильев Иван", online: false }
  ]},
  { category: "Электронщики", members: [
      { name: "Мухин Павел", online: true }
  ]},
  { category: "Тестировщик", members: [
      { name: "Соболев Владислав", online: false }
  ]},
  { category: "Бригадир", members: [
      { name: "Максимов Константин", online: true }
  ]},
];

// Мой профиль
function renderProfile() {
  document.getElementById('profileName').textContent = userProfile.name;
  document.getElementById('profilePhoto').src = userProfile.photo;
  document.getElementById('workStart').textContent = userProfile.workStart;

  // Стаж
  const start = new Date(userProfile.workStart);
  const now = new Date();
  const diff = Math.floor((now - start) / (24 * 3600 * 1000));
  document.getElementById('workDuration').innerHTML = `Стаж: <span>${diff}</span> дней`;

  // График смен
  const days = ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'];
  let html = '';
  for (let i = 0; i < 7; i++) {
    let cls = userProfile.shifts[i] === 'work' ? 'shift-work'
      : userProfile.shifts[i] === 'done' ? 'shift-done'
      : 'shift-off';
    html += `<div class="shift-cell ${cls}">${days[i]}<br>${userProfile.repaired[i] > 0 ? userProfile.repaired[i] : ''}</div>`;
  }
  document.getElementById('shiftTable').innerHTML = html;

  // Динамика ремонта
  let stats = '';
  for (let i = 0; i < 7; i++) {
    if (userProfile.repaired[i] > 0)
      stats += `${days[i]}: <b>${userProfile.repaired[i]}</b> самокатов<br>`;
  }
  document.getElementById('scooterStats').innerHTML = stats;
}

function renderTeam() {
  let html = '';
  let count = 0;
  for (const cat of team) {
    html += `<div class="team-category"><b>${cat.category} ${cat.members.length}</b><br>`;
    for (const mem of cat.members) {
      count++;
      html += `<div class="team-member">${mem.name} <span class="status-dot ${mem.online ? 'online' : 'offline'}"></span>${mem.online ? ' онлайн' : ' офлайн'}</div>`;
    }
    html += `</div>`;
  }
  document.getElementById('teamList').innerHTML = html;
  document.getElementById('teamCount').textContent = count;
}

renderProfile();
renderTeam();