let players = [];
let currentPlayerIndex = 0;
let moves = 0;
let timerInterval;
let totalSeconds = 0;
let matchedCards = [];
let allCards = [];
let openCards = [];
let lockBoard = false;

document.getElementById('player-mode').addEventListener('change', function () {
    document.getElementById('player2-container').style.display = this.value === '2' ? 'block' : 'none';
});

document.getElementById('start-game').addEventListener('click', initPlayers);
document.getElementById('stop-game').addEventListener('click', showResults);
document.getElementById('restart-game').addEventListener('click', initPlayers);
document.getElementById('reset-settings').addEventListener('click', resetSettings);

function initPlayers() {
    players = [
        { name: document.getElementById('player1-name').value, moves: 0, time: 0 }
    ];
    if (document.getElementById('player-mode').value === '2') {
        players.push({ name: document.getElementById('player2-name').value, moves: 0, time: 0 });
    }
    currentPlayerIndex = 0;
    startGame();
}

function startGame() {
    moves = 0;
    matchedCards = [];
    openCards = [];
    lockBoard = false;

    document.getElementById('results').style.display = 'none';
    document.querySelector('.game-board').style.display = 'block';

    const rows = +document.getElementById('rows').value;
    const cols = +document.getElementById('columns').value;
    const difficulty = document.getElementById('difficulty').value;

    const totalCards = rows * cols;
    allCards = generateCards(totalCards);

    const gameBoard = document.getElementById('game-board-container');
    gameBoard.style.gridTemplateColumns = `repeat(${cols}, 100px)`;
    gameBoard.innerHTML = '';
    allCards.forEach(card => gameBoard.appendChild(card.element));

    totalSeconds = difficulty === 'easy' ? 180 : difficulty === 'normal' ? 120 : 60;
    updateTimer();
    startTimer();

    document.getElementById('current-player').textContent = `Гравець: ${players[currentPlayerIndex].name}`;
    document.getElementById('move-counter').textContent = 'Ходи: 0';
}

function generateCards(totalCards) {
    const images = [
        "img/bear.png", "img/capybara.png", "img/cat.png", "img/dog.png",
        "img/elephant.png", "img/fox.png", "img/giraffe.png", "img/hamster.png",
        "img/hedgehog.png", "img/monkey.png", "img/lion.png", "img/owl.png",
        "img/raccoon.png", "img/panda.png", "img/sheep.png", "img/tiger.png",
        "img/frog.png", "img/deer.png"
    ];
    const selectedImages = [];
    for (let i = 0; i < totalCards / 2; i++) {
        selectedImages.push(images[i % images.length]);
    }
    const cardValues = [...selectedImages, ...selectedImages];
    shuffle(cardValues);

    return cardValues.map(src => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.dataset.value = src;
        div.addEventListener('click', () => flipCard(div));
        return { element: div, value: src, matched: false };
    });
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function flipCard(card) {
    if (lockBoard || card.classList.contains('open') || card.classList.contains('matched')) return;

    card.classList.add('open');
    const img = document.createElement('img');
    img.src = card.dataset.value;
    card.appendChild(img);
    openCards.push(card);

    if (openCards.length === 2) {
        lockBoard = true;
        moves++;
        document.getElementById('move-counter').textContent = `Ходи: ${moves}`;
        setTimeout(checkMatch, 800);
    }
}

function checkMatch() {
    const [card1, card2] = openCards;
    if (card1.dataset.value === card2.dataset.value) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards.push(card1, card2);
    } else {
        card1.classList.remove('open');
        card1.innerHTML = '';
        card2.classList.remove('open');
        card2.innerHTML = '';
    }
    openCards = [];
    lockBoard = false;

    if (matchedCards.length === allCards.length) {
        endRound();
    }
}

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        totalSeconds--;
        updateTimer();
        if (totalSeconds <= 0) {
            clearInterval(timerInterval);
            endRound();
        }
    }, 1000);
}

function updateTimer() {
    const min = Math.floor(totalSeconds / 60);
    const sec = totalSeconds % 60;
    document.getElementById('timer').textContent = `Таймер: ${min}:${sec.toString().padStart(2, '0')}`;
}

function endRound() {
    clearInterval(timerInterval);
    players[currentPlayerIndex].moves = moves;
    players[currentPlayerIndex].time = totalSeconds;

    currentPlayerIndex++;
    if (currentPlayerIndex < players.length) {
        startGame();
    } else {
        showResults();
    }
}

function showResults() {
    clearInterval(timerInterval);
    document.querySelector('.game-board').style.display = 'none';

    const resultsBlock = document.getElementById('results');
    resultsBlock.style.display = 'block';

    let content = '';
    players.forEach(p => {
        const timeFormatted = `${Math.floor(p.time / 60)}:${(p.time % 60).toString().padStart(2, '0')}`;
        content += `<p>${p.name}: ходів — ${p.moves}, залишок часу — ${timeFormatted}</p>`;
    });

    if (players.length === 2) {
        let winnerText;
        if (players[0].moves < players[1].moves) {
            winnerText = `Переможець: ${players[0].name}`;
        } else if (players[1].moves < players[0].moves) {
            winnerText = `Переможець: ${players[1].name}`;
        } else {
            winnerText = 'Нічия!';
        }
        content += `<div class="winner">${winnerText}</div>`;
    }

    resultsBlock.querySelector('#results-content').innerHTML = content;
}


function resetSettings() {
    document.getElementById('player1-name').value = "Гравець 1";
    document.getElementById('player2-name').value = "Гравець 2";
    document.getElementById('rounds').value = "1";
    document.getElementById('rows').value = "4";
    document.getElementById('columns').value = "4";
    document.getElementById('difficulty').value = "normal";
    document.getElementById('player-mode').value = "1";
    document.getElementById('player2-container').style.display = 'none';
}
