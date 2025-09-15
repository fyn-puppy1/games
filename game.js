// 24 pairs for 48 cards, with a wide fruit & food variety!
const icons = [
    "🍎", "🍌", "🍇", "🍉", "🍒", "🍓", // fruits
    "🥝", "🍑", "🍍", "🍊", "🥥", "🍐",
    "🍪", "🍥", "🧆", "🍰", "🧁", "🍢", // desserts, snacks
    "🍫", "🍆", "🌽", "🍅", "🥕", "🥑", // veggies
    "🍄", "🍈", "🍋", "🍏", "🥭", "🍔", // more fruit & food
    "🍋", "🍏", "🍈", "🥭", "🍔", "🍟",
    "🍕", "🌭", "🌮", "🍿", "🍩", "🍭",
    "🍦", "🥨", "🍉", "🍇", "🍠", "🍤"
];

let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let matches = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createBoard() {
    const gameBoard = document.getElementById('memory-game');
    gameBoard.innerHTML = '';
    // Pick 24 unique icons, double to 48 cards, and shuffle
    let iconSelection = icons.slice(0, 24);
    let iconPairs = shuffle([...iconSelection, ...iconSelection]);
    cards = [];
    for (let i = 0; i < 48; i++) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.icon = iconPairs[i];
        card.dataset.index = i;

        card.innerHTML = `
            <div class="front">${iconPairs[i]}</div>
            <div class="back">?</div>
        `;
        card.addEventListener('click', flipCard);
        cards.push(card);
        gameBoard.appendChild(card);
    }
}

function flipCard(e) {
    if (lockBoard) return;
    const card = e.currentTarget;
    if (card.classList.contains('flipped') || card.classList.contains('matched')) return;
    card.classList.add('flipped');
    if (!firstCard) {
        firstCard = card;
        return;
    }
    if (firstCard === card) return; // double click same card
    secondCard = card;
    moves++;
    updateStats();

    if (firstCard.dataset.icon === secondCard.dataset.icon) {
        // Match
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matches++;
        updateStats();
        resetFlipped();
        if (matches === 24) {
            setTimeout(showGameOver, 800);
        }
    } else {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetFlipped();
        }, 900);
    }
}

function resetFlipped() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

function updateStats() {
    document.getElementById('moves').textContent = `Moves: ${moves}`;
    document.getElementById('matches').textContent = `Matches: ${matches}`;
}

function showGameOver() {
    document.getElementById('game-over').style.display = 'block';
    document.getElementById('final-moves').textContent = `You finished in ${moves} moves!`;
}

function restartGame() {
    moves = 0;
    matches = 0;
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    document.getElementById('game-over').style.display = 'none';
    updateStats();
    createBoard();
}

window.onload = () => {
    restartGame();
};
