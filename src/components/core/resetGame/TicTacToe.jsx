import { useState } from "react";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const winner = calculateWinner(board);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
      <div className="text-center bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-700">Tic-Tac-Toe</h1>
        
        {/* Game Board */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          {board.map((value, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              className={`w-24 h-24 text-4xl font-bold flex items-center justify-center border-4 rounded-md 
                ${value === "X" ? "text-blue-500" : "text-red-500"} 
                ${winner ? "cursor-not-allowed opacity-50" : "hover:bg-gray-100"}
                `}
            >
              {value}
            </button>
          ))}
        </div>

        {/* Status Message */}
        <div className="text-2xl font-semibold mb-4 text-gray-800">
          {winner
            ? `Winner: ${winner}`
            : board.every(Boolean)
            ? "It's a draw!"
            : `Next Player: ${isXNext ? "X" : "O"}`}
        </div>

        {/* Reset Button */}
        <button
          onClick={resetGame}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
        >
          Reset Game
        </button>
      </div>
    </div>
  );
};

// Calculate Winner Logic
const calculateWinner = (board = []) => {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

export default TicTacToe;
