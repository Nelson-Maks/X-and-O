        // Get the elements from the document
        const cells = document.querySelectorAll(".cell");
        const message = document.getElementById("message");
        const button = document.getElementById("button");

        // Define the variables for the game logic
        let board = ["", "", "", "", "", "", "", "", ""]; // The board array to store the moves
        let turn = "X"; // The turn variable to keep track of the current player
        let mode = "human"; // The mode variable to indicate the game mode (human or computer)
        let gameOver = false; // The gameOver variable to indicate the game status

        // Define the winning combinations as an array of arrays
        const wins = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        // Add event listeners to the cells
        cells.forEach(cell => {
            cell.addEventListener("click", () => {
                // Get the id of the clicked cell
                let id = cell.id;

                // Check if the cell is empty and the game is not over
                if (board[id] == "" && !gameOver) {
                    // Make a move
                    makeMove(id);

                    // Check for win or tie
                    checkResult();

                    // Switch turns
                    switchTurn();
                }
            });
        });

        // Add event listener to the button
        button.addEventListener("click", () => {
            // Toggle the game mode
            if (mode == "human") {
                mode = "computer";
                button.innerHTML = "Play with another person";
            } else {
                mode = "human";
                button.innerHTML = "Play against computer";
            }

            // Reset the game
            resetGame();
        });

        // Define a function to make a move
        function makeMove(id) {
            // Update the board array
            board[id] = turn;

            // Update the cell element
            cells[id].innerHTML = turn;
        }

        // Define a function to check the result
        function checkResult() {
            // Loop through the winning combinations
            for (let i = 0; i < wins.length; i++) {
                // Get the indices of the current combination
                let a = wins[i][0];
                let b = wins[i][1];
                let c = wins[i][2];

                // Check if the board has the same value at these indices
                if (board[a] != "" && board[a] == board[b] && board[b] == board[c]) {
                    // Update the message and the game status
                    message.innerHTML = turn + " wins!";
                    gameOver = true;
                    return; // Exit the function
                }
            }

            // Check if the board is full
            if (!board.includes("")) {
                // Update the message and the game status
                message.innerHTML = "It's a tie!";
                gameOver = true;
                return; // Exit the function
            }
        }

        // Define a function to switch turns
        function switchTurn() {
            // Check the game mode and the game status
            if (mode == "human" && !gameOver) {
                // Switch between X and O
                if (turn == "X") {
                    turn = "O";
                } else {
                    turn = "X";
                }

                // Update the message
                message.innerHTML = turn + "'s turn";
            }

            // Check the game mode and the game status
            if (mode == "computer" && !gameOver) {
                // Switch between X and O
                if (turn == "X") {
                    turn = "O";
                    // Call the computer move function
                    computerMove();
                } else {
                    turn = "X";
                }

                // Update the message
                message.innerHTML = turn + "'s turn";
            }
        }

        // Define a function to make a computer move
        function computerMove() {
            // Create an array to store the empty cells
            let emptyCells = [];

            // Loop through the board array
            for (let i = 0; i < board.length; i++) {
                // Check if the cell is empty
                if (board[i] == "") {
                    // Add the index to the empty cells array
                    emptyCells.push(i);
                }
            }

            // Get a random index from the empty cells array
            let randomIndex = Math.floor(Math.random() * emptyCells.length);
            let id = emptyCells[randomIndex];

            // Make a move
            makeMove(id);

            // Check for win or tie
            checkResult();

            // Switch turns
            switchTurn();
        }

        // Define a function to reset the game
        function resetGame() {
            // Reset the board array
            board = ["", "", "", "", "", "", "", "", ""];

            // Reset the cell elements
            cells.forEach(cell => {
                cell.innerHTML = "";
            });

            // Reset the turn variable
            turn = "X";

            // Reset the message
            message.innerHTML = turn + "'s turn";

            // Reset the game status
            gameOver = false;
        }