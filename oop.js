
/*

/* Tried to set an object but it was not working as expected. So I used an arrays.
const cardValues = {
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  '10': 10,
  'J': 10,
  'Q': 10,
  'K': 10,
  'A': 11
};

// Another option that did not work as expected.
const deck = [
  '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '10C', 'JC', 'QC', 'KC', 'AC',
  '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '10S', 'JS', 'QS', 'KS', 'AS',
  '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '10D', 'JD', 'QD', 'KD', 'AD',
  '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '10H', 'JH', 'QH', 'KH', 'AH'
];

*/
// 3rd option after searching on line for a better way to handle the cards.
// Since the card values will never changed I used const. Seems no one uses var much.
let deck = [];
const suits = ['C', 'S', 'D', 'H']; 
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

// Create deck of cards
for (let suit of suits) {
  for (let value of values) {
    deck.push(value + suit);
  }
}

// Using Maths random function t shuffle the deck
function shuffleDeck() {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

// Function to deal the cards
function dealCard() {
  return deck.pop();
}

// Calculate the value of a hand
function calculateHandValue(hand) {
  let sum = 0;
  let numAces = 0;

  for (let card of hand) {
    const value = card.slice(0, -1); // Remove the suit from the card

    if (value === 'A') {
      sum += 11;
      numAces++;
    } else if (['K', 'Q', 'J'].includes(value)) {
      sum += 10;
    } else {
      sum += parseInt(value);
    }
  }

  // Aces converted to 1 if necessary. Aces can be counted as 1 or 11.
  while (sum > 21 && numAces > 0) {
    sum -= 10;
    numAces--;
  }

  return sum;
}

// Start the game
function startGame() {
  shuffleDeck();
  const playerHand = [dealCard(), dealCard()];

  // Check for blackjack
  if (calculateHandValue(playerHand) === 21) {
    alert('Blackjack! You win!!!');
    startGame();
    return;
  }

  while (true) {
    const message = `Your hand: ${playerHand.join(', ')}\nCurrent value: ${calculateHandValue(playerHand)}\n\nDo you want to hit or stand?`;
    const choice = prompt(message);

    if (choice.toLowerCase() === 'hit') {
      playerHand.push(dealCard());

      if (calculateHandValue(playerHand) > 21) {
        alert(`Bust! Your hand: ${playerHand.join(', ')}\nValue: ${calculateHandValue(playerHand)}`);
        startGame();
        return;
      }
    } else if (choice.toLowerCase() === 'stand') {
      alert(`You chose to stand. Your hand: ${playerHand.join(', ')}\nValue: ${calculateHandValue(playerHand)}`);
      startGame();
      return;
    }
  }
}

// Start the game initially
startGame();