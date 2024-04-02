const game = (function() {
    let board = ['', '', '', '', '', '', '', '', ''];
    let player1 = createPlayer("Rich", "X");
    let player2 = createPlayer("Jake", "O");
    let currentPlayer = player1;

    const boardLength = board.length;
    const divBoard = document.querySelector('.game-box');
    const display = document.querySelector('.display-results');
    const resetButton = document.querySelector('.reset-button');

    function createBoard() {
        divBoard.innerHTML = '';
        for (let i = 0; i < boardLength; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.textContent = board[i];
            divBoard.appendChild(cell);
        } 
    }

    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        addCellListeners();
        const cells = document.querySelectorAll('.cell');
        display.textContent = '';
        cells.forEach((cell, index) => {
            cell.textContent = board[index];
        });
    }

    function createPlayer(name, sign) {
        // Since I keep it as the same name, I can just leave it as {name, sign}
        return { name, sign };
    }

    function getPlayerName(playerNumber) {
        return prompt(`Enter the name for Player ${playerNumber}:`);
    }

    function initializePlayers() {
        const playerName1 = getPlayerName(1);
        const playerName2 = getPlayerName(2);
        player1 = createPlayer(playerName1 || "Player 1", "X");
        player2 = createPlayer(playerName2 || "Player 2", "O");
        currentPlayer = player1;
    }

    function checkForTie(board) {
        let isEmptyCell = false;
        for (const slot of board) {
            if (slot === '') {
                isEmptyCell = true;
            }
        }
        if (!isEmptyCell) {
            return true;
        }
        return false;
    }

    function checkWinner(board, playerName) {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if ((board[a] === "X" || board[a] === "O") && (board[a] === board[b] && board[b] === board[c])) {
                return true;
            }
        }
        return false;
    }

    function handleCellClick(event) {
        const clickedCell = event.target;
        const cellIndex = Array.from(clickedCell.parentNode.children).indexOf(clickedCell);
        if (board[cellIndex] !== "X" && board[cellIndex] !== "O") {
            board[cellIndex] = currentPlayer.sign;
            clickedCell.textContent = currentPlayer.sign;
            if (checkWinner(board, currentPlayer.name)) {
                removeCellListeners();
                display.textContent = currentPlayer.name + " wins!";
            } else if (checkForTie(board)) {
                display.textContent = "It's a tie!";
            }
            currentPlayer = (currentPlayer === player1) ? player2 : player1;
        }
    }
    
    function addCellListeners() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach((cell) => {
            cell.addEventListener('click', handleCellClick);
        });
        resetButton.addEventListener("click", resetBoard);
    }

    function removeCellListeners() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach((cell) => {
            cell.removeEventListener('click', handleCellClick);
        });
    }

    const startGame = () => {
        createBoard();
        initializePlayers();
        addCellListeners();
    }

    return {createBoard, resetBoard, initializePlayers, checkForTie, checkWinner,
            startGame};
})();

game.startGame();