
const cards = document.querySelectorAll('.card');


let openCards = [];
let moves = 0

let matchedPairs = 0;


let timerInterval;
let time = 0;


let starRating = 3;

const movesElement = document.getElementById('move-step');
const starRatingElement = document.getElementById('Starrating');
const timerElement = document.getElementById('timer');

function handleCardClick() {
  if (this.classList.contains('matched') || this.classList.contains('open')) {
    return;
  }

  this.classList.add('open');

  openCards.push(this);

  
  if (openCards.length === 2) {
    cards.forEach(card => card.removeEventListener('click', handleCardClick));

    
    moves++;
    movesElement.textContent = moves;

    
    if (openCards[0].innerHTML === openCards[1].innerHTML) {
      openCards.forEach(card => card.classList.add("matched"));
      matchedPairs++;

      if (matchedPairs === 6) {
        clearInterval(timerInterval);


      }
    } else {
      
      setTimeout(() => {
        openCards.forEach(card => card.classList.remove("open"));
        openCards = [];
      }, 1000);
    }

    setTimeout(() => {
      cards.forEach(card => card.addEventListener("click", handleCardClick));
    }, 1000);
  }
}


function startGame() {
  const shuffledCards = Array.from(cards).sort(() => Math.random() - 0.5);

  
  openCards = [];
  moves = 0;
  matchedPairs = 0;
  starRating = 3;

  
  movesElement.textContent = moves;

  
  starRatingElement.textContent = "***";

  clearInterval(timerInterval);
  time = 0;
  timerElement.textContent = time;


  cards.forEach(card => {
    card.addEventListener("click", handleCardClick);
    card.classList.remove("open", "matched");
  });

  timerInterval = setInterval(() => {
    time++;
    timerElement.textContent = time;
  }, 1000);
}

const startButton = document.getElementById("start-button");
startButton.addEventListener("click", startGame);



(function shuffle() {
  boxes.forEach(box => {
    let randomPos = Math.floor(Math.random() * 12);
    box.style.order = randomPos;
  });
})();



