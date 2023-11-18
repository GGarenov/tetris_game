import React, { useState } from "react";
import Board from "./components/Board";
import UpcomingBlocks from "./components/UpcomingBlocks";
import { useTetris } from "./hooks/useTetris.jsx";

function App() {
  const { board, startGame, isPlaying, score, level, upcomingBlocks } = useTetris();
  const [showUpcoming, setShowUpcoming] = useState(false);

  const handleNewGameClick = () => {
    startGame();
    setShowUpcoming(true);
  };

  return (
    <div className="app">
      <h1>Tetris</h1>
      <Board currentBoard={board} />
      <div className="controls">
        <h2>Score: {score}</h2>
        {showUpcoming && <h2>Upcoming:</h2>}
        {isPlaying ? (
          <>
            <UpcomingBlocks upcomingBlocks={upcomingBlocks} />
            <h2>Level: {level}</h2>
          </>
        ) : (
          <button className="button" onClick={handleNewGameClick}>
            New Game
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
