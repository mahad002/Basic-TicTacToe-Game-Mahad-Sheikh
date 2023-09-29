document.addEventListener("DOMContentLoaded", function () {
    const board = document.getElementById("board");
    const items = document.querySelectorAll(".item");
    const popup = document.getElementById("popup");
    const resultMessage = document.getElementById("result-message");
    document.querySelector(".game-restart-btn").addEventListener("click", restartGame);
    document.querySelector(".popup__restart-btn").addEventListener("click", newGame);

    let currentPlayer = "X";
    let isGameOver = false;

    // function restartGame() {
    //     items.forEach((item) => {
    //         item.textContent = "";
    //     });
    //     isGameOver = false;
    //     popup.classList.add("hide");
    //     currentPlayer = "X";
    // }

    function restartGame() {
        items.forEach((item) => {
            item.textContent = "";
        });
        isGameOver = false;
        popup.classList.add("hide");
        currentPlayer = "X";
        board.classList.remove("flip-board"); // Add this line to unflip the board
    }

    function newGame() {
        restartGame();
        popup.classList.add("hide");
    }
    
    items.forEach((item) => {
        item.addEventListener("click", handleCellClick);
    });

    function handleCellClick(event) {
        const cell = event.target;
        const cellIndex = cell.getAttribute("data-cell-index");

        if (!cell.textContent && !isGameOver) {
            cell.textContent = currentPlayer;
            checkWin();
            togglePlayer();
        }
    }

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
