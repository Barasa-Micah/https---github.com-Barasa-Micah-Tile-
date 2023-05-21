const startButton = document.getElementById("start-button");
const timerValueElement = document.getElementById("timer-value");

let timerInterval;
let timerValue = 0;

function startTimer() {
  timerInterval = setInterval(() => {
    timerValue++;
    timerValueElement.textContent = timerValue;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  timerValue = 0;
  timerValueElement.textContent = timerValue;
}

startButton.addEventListener('click', () => {
  startTimer();
});
