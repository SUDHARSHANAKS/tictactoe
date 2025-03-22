const cells = document.querySelectorAll('.cell');
const playerScoreDisplay = document.getElementById('player-score');
const computerScoreDisplay = document.getElementById('computer-score');
const resetButton = document.getElementById('reset');

let board = Array(9).fill(null);
let playerScore = 0;
let computerScore = 0;
let isPlayerTurn = true;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (board[index] || !isPlayerTurn) return;

    board[index] = 'X';
    cell.textContent = 'X';

    if (checkWin('X')) {
        playerScore++;
        playerScoreDisplay.textContent = playerScore;
        alert('You win!');
        resetBoard();
        return;
    }

    if (board.every(cell => cell !== null)) {
        alert('Draw!');
        resetBoard();
        return;
    }

    isPlayerTurn = false;
    setTimeout(computerMove, 500);
}

function computerMove() {
    let availableCells = board.map((val, idx) => val === null ? idx : null).filter(val => val !== null);
    let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];

    board[randomIndex] = 'O';
    cells[randomIndex].textContent = 'O';

    if (checkWin('O')) {
        computerScore++;
        computerScoreDisplay.textContent = computerScore;
        alert('Computer wins!');
        resetBoard();
        return;
    }

    if (board.every(cell => cell !== null)) {
        alert('Draw!');
        resetBoard();
        return;
    }

    isPlayerTurn = true;
}

function checkWin(player) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return board[index] === player;
        });
    });
}

function resetBoard() {
    board.fill(null);
    cells.forEach(cell => cell.textContent = '');
    isPlayerTurn = true;
}

function resetGame() {
    resetBoard();
    playerScore = 0;
    computerScore = 0;
    playerScoreDisplay.textContent = playerScore;
    computerScoreDisplay.textContent = computerScore;
}