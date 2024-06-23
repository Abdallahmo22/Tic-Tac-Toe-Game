// get elements
const box = document.querySelector(".box");
const statusBar = document.querySelector(".status");
const board = document.querySelector(".board");

let currentPlayer = "X";
let originalStatusContent = statusbar.innerHTML; // Store the original content

const renderBoard = () => {
    board.innerHTML = "";
  // create elements
  var cell = [];
  for (let i = 0; i < 9; i++) {
    cell[i] = document.createElement("div");
    cell[i].setAttribute("id", "sq" + (i + 1));
    cell[i].setAttribute("class", "sqaure");

    cell[i].addEventListener("click", () => turn(i));

    board.appendChild(cell[i]);
  }
  console.log(cell);
};

function turn(index) {
  let txt = board.children[index];

  if (currentPlayer === "X" && txt.textContent === "") {
    txt.textContent = currentPlayer;
    currentPlayer = currentPlayer === "X" ? "O" : "X"; // Switch player
    statusBar.textContent = `Current Player: ${currentPlayer}`;
  } else if (currentPlayer === "O" && txt.textContent === "") {
    txt.textContent = currentPlayer;
    currentPlayer = currentPlayer === "O" ? "X" : "O"; // Switch player
    statusBar.textContent = `Current Player: ${currentPlayer}`;
  }

  winner();
}

function winner() {
    // Define winning patterns (indices of cells that form a win)
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6], // Diagonals
    ];

    // Check each winning pattern
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;

        if (
            board.children[a].textContent &&
            board.children[a].textContent === board.children[b].textContent &&
            board.children[a].textContent === board.children[c].textContent
        )
        {
            // Mark the winning cells with a 'win' class
            for (const index of pattern) {
                board.children[index].classList.add("win");
            }

            // Update statusBar with the winner
            statusBar.textContent = `Winner is ${board.children[a].textContent}`;

            let intervalId;
            intervalId = setInterval(() => {
                statusBar.textContent += ".";
            }, 1000);

            setTimeout(() => {
                clearInterval(intervalId);
                statusBar.textContent = "play again";
                renderBoard();
                location.reload()
            }, 3000);

            

            return true; // Return true to indicate a winner
        } 

    }

  

    // // If no winner is found after checking all patterns
    // statusBar.textContent = 'Oops, No one wins ):';

    // // Optional: Reset the board and start a new game
    // setTimeout(() => {
    //     statusBar.textContent = originalStatusContent; // Reset status content
    //     renderBoard();
    // }, 3000);

    return false;
}
// Initialize the game
renderBoard();
statusbar.innerHTML = originalStatusContent; // Reset status content




