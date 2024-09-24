const timeUnits = ["días", "horas", "minutos", "segundos"];
const months = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];
const clocks = [
  "🕐",
  "🕑",
  "🕒",
  "🕓",
  "🕔",
  "🕕",
  "🕖",
  "🕗",
  "🕘",
  "🕙",
  "🕚",
  "🕛",
];

let currentTickingIndex = 0;
let currentUnitIndex = +localStorage.getItem("units") ?? 3;
let newColor = "";
let timer = null;

// const START_DATE = new Date("2024-09-24 01:28:00");
const START_DATE = new Date("2024-09-25 00:00:00");
const TARGET_DATE = new Date("2024-11-08 00:00:00");

const $targetDate = document.getElementById("target-date");
const $remaining = document.getElementById("remaining");
const $units = document.getElementById("units");
const $progress = document.getElementById("progress-bar");
const $messageContainer = document.getElementById("message-container");
const $tickingClock = document.getElementById("ticking-clock");
const $root = document.querySelector(":root");

$targetDate.textContent = `${TARGET_DATE.getDate()} de ${months[TARGET_DATE.getMonth()]} de ${TARGET_DATE.getFullYear()}`;

const od = new Odometer({
  el: $remaining,
  duration: 500,
});

const colors = [
  "red",
  "pink",
  "purple",
  "indigo",
  "blue",
  "cyan",
  "jade",
  "green",
  "lime",
  "yellow",
  "pumpkin",
  "orange",
  "sand",
  "grey",
  "slate",
];

const updateUI = () => {
  $units.textContent = timeUnits[currentUnitIndex];
  $units.style.color = newColor;

  const today = new Date();
  const timeLeft = TARGET_DATE - today;

  let value;
  switch (timeUnits[currentUnitIndex]) {
    case "días":
      value = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));
      break;
    case "horas":
      value = Math.ceil(timeLeft / (1000 * 60 * 60));
      break;
    case "minutos":
      value = Math.ceil(timeLeft / (1000 * 60));
      break;
    case "segundos":
      value = Math.ceil(timeLeft / 1000);
      break;
  }
  $remaining.style.color = newColor;
  $remaining.textContent = value;

  $tickingClock.textContent = clocks[currentTickingIndex];
  currentTickingIndex = (currentTickingIndex + 1) % clocks.length;

  if (today > START_DATE) {
    $messageContainer.textContent = ``;
    $progress.style.width = `${((today - START_DATE) * 100) / (TARGET_DATE - START_DATE)}%`;
    $progress.style.backgroundColor = newColor;
  } else {
    $messageContainer.textContent = `...empezamos el ${START_DATE.getDate()} de ${months[START_DATE.getMonth()]}`;
  }
};

const updateUnits = (updateUnit) => {
  if (updateUnit) {
    currentUnitIndex = (currentUnitIndex + 1) % timeUnits.length;
    localStorage.setItem("units", currentUnitIndex);
  }
  const newIndex = Math.floor(Math.random() * colors.length);
  newColor = `var(--pico-color-${colors[newIndex]}-500)`;

  updateUI();
};

$remaining.addEventListener("click", updateUnits);
$units.addEventListener("click", updateUnits);
$progress.addEventListener("click", updateUnits);

timer = setInterval(updateUI, 1000);
document.addEventListener("DOMContentLoaded", () => {
  updateUnits(false);
});
