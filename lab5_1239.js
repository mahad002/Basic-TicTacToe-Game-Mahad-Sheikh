document.addEventListener("DOMContentLoaded", function () {
    const board = document.getElementById("board");
    const popup = document.getElementById("popup");
    const items = document.querySelectorAll(".item");
    const choices = document.querySelectorAll(".choice");
    const resultMessage = document.getElementById("result-message");
    document.querySelector(".game-restart-btn").addEventListener("click", restartGame);
    document.querySelector(".popup__restart-btn").addEventListener("click", newGame);

    // document.querySelector(".item").addEventListener("drag",allowDrop(),drag(),drop());

    let currentPlayer = "X";
let isGameOver = false;
let originalContent = "";
let moves = 0;

    items.forEach((item) => {
        item.addEventListener("dragstart", drag);
        item.addEventListener("dragover", allowDrop);
        item.addEventListener("drop", drop);
    });
    
    choices.forEach((choice) => {
        choice.addEventListener("dragstart", drag);
        choice.addEventListener("dragend", dragEnd);
        choice.addEventListener("dragover", allowDrop);
        choice.addEventListener("drop", drop);
    });

    function allowDrop(ev) {
        ev.preventDefault();
    }

    function drag(ev) {
        if (!isGameOver) {
            const cellContent = ev.target.textContent;
            if (cellContent === currentPlayer) {
                originalContent = cellContent; 
                ev.dataTransfer.setData("text", cellContent);
                ev.target.textContent = "";
                ev.target.setAttribute("data-cell-content", "");
            } else {
                ev.preventDefault(); 
            }
        } else {
            ev.preventDefault(); 
        }
    }
    
    function dragEnd(ev) {
        ev.target.style.display = "none";
    }

    let buttonsOnBoard = 0;

    function drop(ev) {
        ev.preventDefault();
        const data = ev.dataTransfer.getData("text");
        const targetCell = ev.target;
    
        if (targetCell.classList.contains("item") && !targetCell.textContent && !isGameOver) {
            if (data === currentPlayer) {
                targetCell.textContent = data;
                targetCell.setAttribute("data-cell-content", data);
                moves++;
    
                if (moves >= 3) {
                    allowDrag(); // Allow players to drag buttons
                }
    
                checkWin();
                togglePlayer();
            }
        } else {
            if (originalContent !== "") {
                ev.target.textContent = originalContent;
                originalContent = "";
            }
        }
    }
    
    
    function allowDrag() {
        items.forEach((item) => {
            item.setAttribute("draggable", true);
        });
    
        choices.forEach((choice) => {
            choice.setAttribute("draggable", true);
        });
    }

    
    function restartGame() {

        moves=0;
        items.forEach((item) => {
            item.textContent = "";
            item.setAttribute("data-cell-content", ""); // Clear the custom data attribute
            item.setAttribute("draggable", ""); // Remove the draggable feature
        });
    
        // Reset the choice buttons for Player 1 (X)
        document.querySelectorAll(".choice[id^='X']").forEach((choice) => {
            choice.textContent = "X";
            choice.style.display = "block";
            choice.setAttribute("draggable", true); // Re-enable draggable for choices
        });
    
        // Reset the choice buttons for Player 2 (O)
        document.querySelectorAll(".choice[id^='O']").forEach((choice) => {
            choice.textContent = "O";
            choice.style.display = "block";
            choice.setAttribute("draggable", true); // Re-enable draggable for choices
        });
    
        isGameOver = false;
        popup.classList.add("hide");
        currentPlayer = "X"; // Reset the current player to 'X' or your initial player
        board.classList.remove("flip-board");
    }
    
            
    function newGame() {
        restartGame();
        popup.classList.add("hide");
    }
    
    items.forEach((item) => {
        item.addEventListener("click", handleCellClick);
    });

    // function handleCellClick(event) {
    //     const cell = event.target;
    //     const cellIndex = cell.getAttribute("data-cell-index");

    //     if (!cell.textContent && !isGameOver) {
    //         cell.textContent = currentPlayer;
    //         checkWin();
    //         togglePlayer();
    //     }
    // }

    function togglePlayer() {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }

    function checkWin() {
        const winCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const combination of winCombinations) {
            const [a, b, c] = combination;

            if (
                items[a].textContent &&
                items[a].textContent === items[b].textContent &&
                items[a].textContent === items[c].textContent
            ) {
                isGameOver = true;
                resultMessage.textContent = `${currentPlayer} wins!`;
                popup.classList.remove("hide");
                board.classList.add("flip-board"); // Add this line to flip the board
                return;
            }
        }
        if ([...items].every((item) => item.textContent)) {
            isGameOver = true;
            resultMessage.textContent = "It's a draw!";
            popup.classList.remove("hide");
            board.classList.add("flip-board"); // Add this line to flip the board
        }
    }
});

document.querySelector(".popup__restart-btn").addEventListener("click", () => {
    newGame();
    board.classList.remove("flip-board"); // Add this line to unflip the board
});