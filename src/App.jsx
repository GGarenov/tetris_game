import React, { useState } from "react";
import Board from "./components/Board";
import UpcomingBlocks from "./components/UpcomingBlocks";
import { useTetris } from "./hooks/useTetris";

function App() {
  const { board, startGame, isPlaying, score, upcomingBlocks } = useTetris();
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
          <UpcomingBlocks upcomingBlocks={upcomingBlocks} />
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
