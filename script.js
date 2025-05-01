const cards = ["A", "A", "B", "B", "C", "C", "D", "D", "E", "E", "F", "F"];
let flippedCards = [];
let matchedPairs = 0;

// Shuffle the cards (Fisher-Yates algorithm)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Create the game board
function createBoard() {
  const gameBoard = document.getElementById("gameBoard");
  const shuffledCards = shuffle([...cards]);

  shuffledCards.forEach((card, index) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.dataset.value = card;
    cardElement.dataset.index = index;
    cardElement.addEventListener("click", flipCard);
    gameBoard.appendChild(cardElement);
  });
}

// Flip a card
function flipCard() {
  if (flippedCards.length < 2 && !this.classList.contains("flipped")) {
    this.classList.add("flipped");
    this.textContent = this.dataset.value;
    flippedCards.push(this);

    if (flippedCards.length === 2) {
      setTimeout(checkForMatch, 500);
    }
  }
}

// Check if two flipped cards match
function checkForMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.value === card2.dataset.value) {
    card1.classList.add("matched");
    card2.classList.add("matched");
    matchedPairs++;
    if (matchedPairs === cards.length / 2) {
      alert("You won!");
    }
  } else {
    card1.classList.remove("flipped");
    card2.classList.remove("flipped");
    card1.textContent = "";
    card2.textContent = "";
  }
  flippedCards = [];
}

// Initialize the game
createBoard();
