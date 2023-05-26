function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


function cardClick() {
  if (this.classList.contains("matched") || this.classList.contains("selected")) {
    return;
  }

  this.classList.add("selected");
  this.classList.remove("hidden");

  const selectedCards = document.querySelectorAll(".selected");

  if (selectedCards.length === 2) {
    const card1 = selectedCards[0];
    const card2 = selectedCards[1];

    if (card1.dataset.card === card2.dataset.card) {
      card1.classList.add("matched");
      card2.classList.add("matched");
      card1.classList.remove("selected");
      card2.classList.remove("selected");

      const allCards = document.querySelectorAll(".card");
      const allMatched = [...allCards].every(card => card.classList.contains("matched"));
      if (allMatched) {
        stopTimer();
      }
    } else {
      setTimeout(function () {
        card1.classList.add("hidden");
        card2.classList.add("hidden");
        card1.classList.remove("selected");
        card2.classList.remove("selected");
      }, 1000);
    }
  }
}


function startGame() {
  const cards = document.querySelectorAll(".card");
  cards.forEach(function (card) {
    card.classList.add("hidden");
    card.classList.remove("matched", "selected");
    card.addEventListener("click", cardClick);
  });

  const shuffledCards = shuffle(Array.from(cards));
  const tileGame = document.querySelector(".tile-game");
  shuffledCards.forEach(function (card) {
    tileGame.appendChild(card);
  });

  startTimer();
}

function startTimer() {
  let seconds = 0;
  const timerElement = document.getElementById("timer");
  let timer;

  function updateTimer() {
    seconds++;
    timerElement.textContent = seconds;
  }

  function stopTimer() {
    clearInterval(timer);
  }

  function resetTimer() {
    seconds = 0;
    timerElement.textContent = seconds;
  }

  timer = setInterval(updateTimer, 1000);

  const stopButton = document.getElementById("stop-button");
  stopButton.addEventListener("click", stopTimer);

  const startButton = document.getElementById("start-button");
  startButton.addEventListener("click", function () {
    stopTimer();
    resetTimer();
    startGame();
  });
}

const startButton = document.getElementById("start-button");
startButton.addEventListener("click", function () {
  startTimer();
  startGame();
});


window.onload = startTimer;