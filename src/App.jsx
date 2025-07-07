import React, { useState } from "react";
import Board from "./components/Board";
import UpcomingBlocks from "./components/UpcomingBlocks";
import TouchControls from "./components/TouchControls";
import { useTetris } from "./hooks/useTetris.jsx";

function App() {
  const {
    board,
    startGame,
    isPlaying,
    isGameOver,
    score,
    level,
    upcomingBlocks,
    moveLeft,
    moveRight,
    moveDown,
    rotate,
  } = useTetris();
  const [showUpcoming, setShowUpcoming] = useState(false);

  const handleNewGameClick = () => {
    startGame();
    setShowUpcoming(true);
  };

  return (
    <div className="app">
      <h1>Tetris</h1>
      <Board currentBoard={board} />
      {/* Show touch controls only when playing and on small screens */}
      <div className="mobile-controls">
        <TouchControls
          onLeft={moveLeft}
          onRight={moveRight}
          onDown={moveDown}
          onRotate={rotate}
          disabled={!isPlaying || isGameOver}
        />
      </div>
      <div className="controls">
        {isGameOver ? (
          <>
            <h1>Game Over</h1>
            <h2>Score: {score}</h2>
            <h2>Level: {level}</h2>
            <button className="button" onClick={handleNewGameClick}>
              New Game
            </button>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}

export default App;
