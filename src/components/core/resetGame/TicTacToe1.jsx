import { useState, useEffect } from "react";
import swal from "sweetalert";

const TicTacToe = () => {
  // Define the dimensions of the board
  const rows = 6;
  const cols = 5;
  const totalBoxes = rows * cols;

  // Board and turn state
  const [board, setBoard] = useState(Array(totalBoxes).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  // Score state
  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);
  const [draws, setDraws] = useState(0);

  // Winner detection
  const winner = calculateWinner(board, rows, cols);

  // Handle click on grid
  const handleClick = (index) => {
    if (board[index] || winner) return; // Do nothing if there's already a value or if the game is over

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  // Update scores and reset board
  const resetGame = () => {
    if (winner === "X") {
      setXWins(xWins + 1);
      swal("Game Over!", "Winner: Player X", "success", {
        buttons: ["Play Again", "OK"],
      }).then((willPlayAgain) => {
        if (willPlayAgain) {
          resetBoard();
        }
      });
    } else if (winner === "O") {
      setOWins(oWins + 1);
      swal("Game Over!", "Winner: Player O", "success", {
        buttons: ["Play Again", "OK"],
      }).then((willPlayAgain) => {
        if (willPlayAgain) {
          resetBoard();
        }
      });
    } else if (!winner && board.every(Boolean)) {
      setDraws(draws + 1); // It's a draw if the board is full and no winner
      swal("Game Over!", "It's a draw!", "info", {
        buttons: ["Play Again", "OK"],
      }).then((willPlayAgain) => {
        if (willPlayAgain) {
          resetBoard();
        }
      });
    } else {
      resetBoard();
    }
  };

  // Reset the board
  const resetBoard = () => {
    setBoard(Array(totalBoxes).fill(null)); // Reset the board
    setIsXNext(true); // Set turn to X
  };

  // Effect for checking game status
  useEffect(() => {
    if (winner || (board.every(Boolean) && !winner)) {
      resetGame(); // This will show the alert when the game ends
    }
  }, [winner, board]);

  return (
    <div className="min-h-screen  bg-purple-800 flex items-center justify-center">
      <div className="text-center bg-purple-400 shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-700">Tic-Tac-Toe</h1>

        {/* Score Display */}
        <div className="mb-6 text-lg text-gray-800 flex justify-around">
          <div>
            <span className="font-bold text-blue-500">Player X: </span>{xWins}
          </div>
          <div>
            <span className="font-bold text-red-500">Player O: </span>{oWins}
          </div>
          <div>
            <span className="font-bold text-gray-600">Draws: </span>{draws}
          </div>
        </div>

        {/* Game Board */}
        <div className="grid grid-cols-5 gap-4 mb-4" style={{ gridTemplateRows: `repeat(${rows}, 1fr)` }}>
          {board.map((value, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              className={`w-16 h-16 text-4xl font-bold flex items-center justify-center border-4 rounded-md 
                ${value === "X" ? "text-blue-500" : "text-red-500"} 
                ${winner ? "cursor-not-allowed opacity-50" : "hover:bg-gray-100"}
                `}
            >
              {value}
            </button>
          ))}
        </div>

        {/* Status Message */}
        <div className="text-xl font-semibold mb-4 text-gray-800">
          {winner
            ? `Winner: ${winner}`
            : board.every(Boolean)
            ? "It's a draw!"
            : `Next Player: ${isXNext ? "X" : "O"}`}
        </div>

        {/* Reset Button */}
        <button
          onClick={resetGame}
          className="bg-blue-500 text-white px-1 py-1 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
        >
          {winner || board.every(Boolean) ? "Play Again" : "Reset Game"}
        </button>
      </div>
    </div>
  );
};

// Calculate Winner Logic
const calculateWinner = (board = [], rows, cols) => {
  const winningCombos = [];

  // Horizontal and Vertical Checks
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      // Horizontal
      if (j + 3 < cols) {
        winningCombos.push([i * cols + j, i * cols + j + 1, i * cols + j + 2, i * cols + j + 3]);
      }
      // Vertical
      if (i + 3 < rows) {
        winningCombos.push([i * cols + j, (i + 1) * cols + j, (i + 2) * cols + j, (i + 3) * cols + j]);
      }
      // Diagonal Down-Right
      if (i + 3 < rows && j + 3 < cols) {
        winningCombos.push([i * cols + j, (i + 1) * cols + j + 1, (i + 2) * cols + j + 2, (i + 3) * cols + j + 3]);
      }
      // Diagonal Down-Left
      if (i + 3 < rows && j - 3 >= 0) {
        winningCombos.push([i * cols + j, (i + 1) * cols + j - 1, (i + 2) * cols + j - 2, (i + 3) * cols + j - 3]);
      }
    }
  }

  // Check for a winner in the winning combinations
  for (let combo of winningCombos) {
    const [a, b, c, d] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c] && board[a] === board[d]) {
      return board[a];
    }
  }
  return null;
};

export default TicTacToe;
