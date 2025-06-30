
const defaultStudents = [
  "김지애", "박지효", "배라은", "이해나", "임재인",
  "정나예", "최이쁨", "한지윤", "김유온", "김주빈",
  "김채우", "나하성", "명승주", "박채민", "신채담",
  "최서빈", "최여울", "하로아"
];

const STORAGE_KEY = "student_scores_v2";
const scores = JSON.parse(localStorage.getItem(STORAGE_KEY)) || defaultStudents.map(() => ({ 발표: 0, 경청: 0, 지도: 0 }));

function saveScores() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
}

function renderStudents() {
  const container = document.getElementById("app");
  container.innerHTML = "";
  const title = document.createElement("h2");
  title.textContent = "1학년 1반 참여도 기록";
  title.style.textAlign = "center";
  container.appendChild(title);

  const grid = document.createElement("div");
  grid.style.display = "grid";
  grid.style.gridTemplateColumns = "repeat(5, 1fr)";
  grid.style.gap = "8px";
  grid.style.marginTop = "12px";

  defaultStudents.forEach((name, index) => {
    const card = document.createElement("div");
    card.style.border = "1px solid #ccc";
    card.style.borderRadius = "12px";
    card.style.padding = "10px";
    card.style.backgroundColor = "#fff";
    card.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
    card.style.cursor = "pointer";
    card.style.textAlign = "center";

    const studentName = document.createElement("div");
    studentName.textContent = name;
    studentName.style.fontWeight = "bold";
    studentName.style.marginBottom = "6px";

    const stats = document.createElement("div");
    stats.innerHTML = \`
      <span style="color:#3b82f6;">발표: \${scores[index].발표}</span><br>
      <span style="color:#10b981;">경청: \${scores[index].경청}</span><br>
      <span style="color:#ef4444;">지도: \${scores[index].지도}</span>
    \`;

    card.appendChild(studentName);
    card.appendChild(stats);

    card.addEventListener("click", () => openPopup(index, card));
    grid.appendChild(card);
  });

  container.appendChild(grid);
}

function openPopup(index, anchorEl) {
  closePopup();

  const popup = document.createElement("div");
  popup.id = "popup";
  popup.style.position = "absolute";
  popup.style.backgroundColor = "#fff";
  popup.style.border = "1px solid #ccc";
  popup.style.borderRadius = "12px";
  popup.style.padding = "10px";
  popup.style.boxShadow = "0 2px 8px rgba(0,0,0,0.2)";
  popup.style.zIndex = "1000";

  const rect = anchorEl.getBoundingClientRect();
  popup.style.left = (rect.left + window.scrollX) + "px";
  popup.style.top = (rect.bottom + window.scrollY + 5) + "px";

  const nameEl = document.createElement("div");
  nameEl.textContent = defaultStudents[index];
  nameEl.style.fontWeight = "bold";
  nameEl.style.marginBottom = "8px";
  popup.appendChild(nameEl);

  ["발표", "경청", "지도"].forEach(type => {
    const btn = document.createElement("button");
    btn.textContent = type;
    btn.style.margin = "4px";
    btn.style.padding = "6px 10px";
    btn.style.border = "none";
    btn.style.borderRadius = "8px";
    btn.style.color = "#fff";
    btn.style.cursor = "pointer";

    if (type === "발표") btn.style.backgroundColor = "#3b82f6";
    if (type === "경청") btn.style.backgroundColor = "#10b981";
    if (type === "지도") btn.style.backgroundColor = "#ef4444";

    btn.addEventListener("click", () => {
      scores[index][type]++;
      saveScores();
      renderStudents();
      closePopup();
    });

    popup.appendChild(btn);
  });

  document.body.appendChild(popup);
}

function closePopup() {
  const existing = document.getElementById("popup");
  if (existing) {
    existing.remove();
  }
}

window.addEventListener("click", (e) => {
  if (!e.target.closest("#popup")) {
    closePopup();
  }
});

renderStudents();
