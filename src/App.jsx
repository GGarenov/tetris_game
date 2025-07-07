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

      {showUpcoming && isPlaying && (
        <div className="upcoming-mobile">
          <h2>Upcoming:</h2>
          <UpcomingBlocks upcomingBlocks={upcomingBlocks} />
        </div>
      )}
      <Board currentBoard={board} />

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

            {showUpcoming && isPlaying && (
              <div className="upcoming-desktop">
                <h2>Upcoming:</h2>
                <UpcomingBlocks upcomingBlocks={upcomingBlocks} />
              </div>
            )}
            {isPlaying && <h2>Level: {level}</h2>}
            {!isPlaying && (
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
