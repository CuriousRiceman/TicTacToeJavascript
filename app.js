// Modules are created as an IIFE (immediately invoked function expression) with a function inside
// Think of factory functions as constructors that can be reused over and over again
const game = (function() {

    // Private functions and variables
    let board = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let player1 = null;
    let player2 = null;

    const boardLength = board.length;
    const divBoard = document.querySelector(".game-box");

    // Note: Arrow functions context is global (window), regular functions context is inherited from surrounding scope (based on object that called it)
    function createBoard() {
        divBoard.innerHTML = '';
        for (let i = 0; i < boardLength; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.textContent = board[i];
            divBoard.appendChild(cell);
        } 
    }

    // Arrow function is defined within module so 'game' is its context
    // Arrow functions in javascript are similar to static methods in Java, independent of state of a particular object but used at a higher level (javascript - global, java - class)
    const resetBoard = () => {
        board = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    }

    // Can definitely just use arrow functions but I'll use both for fun
    function createPlayer(name, sign) {
        // Since I keep it as the same name, I can just leave it as {name, sign}
        return { name, sign };
    }

    function checkForTie(board) {
        for (const slot of board) {
            if (slot !== 'X' && slot !== 'O') {
                return false;
            }
        }
        console.log("Tie!");
        return true;
    }

    function checkWinner(board, playerName) {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];
        // Iterate over each winning combination
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] === board[b] && board[b] === board[c]) {
                console.log(playerName + " wins!");
                return true;
            }
        }
        return false;
    }

    /* 
        Something I learned, parseInt(userInput) if not an int, will result in NaN which is falsy, however, NaN does not equal to false if using strict inequality (===)
        This is because NaN is of type number, and false is of type boolean, however, !NaN === !NaN AND !!NaN === !!NaN results in TRUE,
        The first ! operator converts NaN to tthe boolean equivalent which is false, and second ! operator makes it true.

        Note: != (not equal operator) performs TYPE coercion and !== (strict inequality) does NOT perform type coercion
        1 != '1' -> false (1 is equal to '1' after type coercion)
        1 != true -> false (1 is equal to true after type coercion)
        1 !== '1' -> true (1 is not equal to '1' without type coercion)
        1 !== true -> true (1 is not equal to true)
    */
    function playerMove(playerName, playerSign) {
        const cells = document.querySelectorAll('.cell');
        cells.forEach((cell, index) => {
            cell.addEventListener('click', () => {
                // Check if the cell is empty before allowing a move
                if (board[index] !== "X" && board[index] !== "O") {
                    board[index] = currentPlayer.sign;
                    // Check for a winner or tie after each move
                    if (checkWinner(board, currentPlayer.name)) {
                        console.log(currentPlayer.name + " wins!");
                    } else if (checkForTie(board)) {
                        console.log("It's a tie!");
                    } else {
                        // Switch to the other player after the move
                        currentPlayer = (currentPlayer === player1) ? player2 : player1;
                    }
                }
            });
        });
    }
    
    // Driver for console game only
    const startGame = () => {
        player1 = createPlayer("Rich", "X");
        player2 = createPlayer("Jake", "O");
        let currentPlayer = player1;
        for (let i = 0; i < 9; i++) {
            playerMove(currentPlayer.name, currentPlayer.sign);
            if (checkWinner(board, currentPlayer.name)) {
                getBoard();
                break;
            } else if (checkForTie(board)) {
                getBoard();
                break;
            }
            currentPlayer = (currentPlayer === player1) ? player2 : player1;
            console.log("hi");
        }
    }

    // Public interface
    return {createBoard, resetBoard, createPlayer, checkWinner, checkForTie,
             playerMove, startGame};
})(); /* Can pass an argument to it */

game.createBoard();