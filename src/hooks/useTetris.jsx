import { useCallback, useEffect, useState } from "react";
import { EmptyCell, SHAPES } from "../type";
import { useInterval } from "./useInterval";
import {
  useTetrisBoard,
  hasCollisions,
  BOARD_HEIGHT,
  getEmptyBoard,
  getRandomBlock,
} from "./useTetrisBoard";

var TickSpeed;
(function (TickSpeed) {
  TickSpeed[(TickSpeed["Normal"] = 800)] = "Normal";
  TickSpeed[(TickSpeed["Sliding"] = 100)] = "Sliding";
  TickSpeed[(TickSpeed["Fast"] = 50)] = "Fast";
})(TickSpeed || (TickSpeed = {}));

export function useTetris() {
  const [score, setScore] = useState(0);
  const [upcomingBlocks, setUpcomingBlocks] = useState([]);
  const [isCommitting, setIsCommitting] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tickSpeed, setTickSpeed] = useState(null);
  const [level, setLevel] = useState(1);
  const [hasStarted, setHasStarted] = useState(false);

  const [
    { board, droppingRow, droppingColumn, droppingBlock, droppingShape },
    dispatchBoardState,
  ] = useTetrisBoard();

  const startGame = useCallback(() => {
    const startingBlocks = [
      getRandomBlock(),
      getRandomBlock(),
      getRandomBlock(),
    ];
    setScore(0);
    setUpcomingBlocks(startingBlocks);
    setLevel(1);
    setIsCommitting(false);
    setIsPlaying(true);
    setTickSpeed(TickSpeed.Normal);
    setHasStarted(true);
    dispatchBoardState({ type: "start" });
  }, [dispatchBoardState]);

  const commitPosition = useCallback(() => {
    if (!hasCollisions(board, droppingShape, droppingRow + 1, droppingColumn)) {
      setIsCommitting(false);
      setTickSpeed(TickSpeed.Normal);
      return;
    }

    const newBoard = structuredClone(board);
    addShapeToBoard(
      newBoard,
      droppingBlock,
      droppingShape,
      droppingRow,
      droppingColumn
    );

    let numCleared = 0;
    for (let row = BOARD_HEIGHT - 1; row >= 0; row--) {
      if (newBoard[row].every((entry) => entry !== EmptyCell.Empty)) {
        numCleared++;
        newBoard.splice(row, 1);
      }
    }

    const newUpcomingBlocks = structuredClone(upcomingBlocks);
    const newBlock = newUpcomingBlocks.pop();
    newUpcomingBlocks.unshift(getRandomBlock());

    if (hasCollisions(board, SHAPES[newBlock].shape, 0, 3)) {
      setIsPlaying(false);
      setTickSpeed(null);
    } else {
      setTickSpeed(TickSpeed.Normal);
    }
    setUpcomingBlocks(newUpcomingBlocks);
    setScore((prevScore) => {
      const newScore = prevScore + getPoints(numCleared);
      const newLevel = Math.floor(newScore / 1000) + 1;

      if (newLevel > level) {
        setLevel(newLevel);
      }
      return newScore;
    });

    dispatchBoardState({
      type: "commit",
      newBoard: [...getEmptyBoard(BOARD_HEIGHT - newBoard.length), ...newBoard],
      newBlock,
    });
    setIsCommitting(false);
  }, [
    board,
    dispatchBoardState,
    droppingBlock,
    droppingColumn,
    droppingRow,
    droppingShape,
    upcomingBlocks,
  ]);

  const gameTick = useCallback(() => {
    if (isCommitting) {
      commitPosition();
    } else if (
      hasCollisions(board, droppingShape, droppingRow + 1, droppingColumn)
    ) {
      setTickSpeed(TickSpeed.Sliding);
      setIsCommitting(true);
    } else {
      dispatchBoardState({ type: "drop" });
    }
  }, [
    board,
    commitPosition,
    dispatchBoardState,
    droppingColumn,
    droppingRow,
    droppingShape,
    isCommitting,
  ]);

  useInterval(() => {
    if (!isPlaying) {
      return;
    }
    gameTick();
  }, tickSpeed);

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    let isPressingLeft = false;
    let isPressingRight = false;
    let moveIntervalID;

    const updateMovementInterval = () => {
      clearInterval(moveIntervalID);
      dispatchBoardState({
        type: "move",
        isPressingLeft,
        isPressingRight,
      });
      moveIntervalID = setInterval(() => {
        dispatchBoardState({
          type: "move",
          isPressingLeft,
          isPressingRight,
        });
      }, 300);
    };

    const handleKeyDown = (event) => {
      if (event.repeat) {
        return;
      }

      if (event.key === "ArrowDown") {
        setTickSpeed(TickSpeed.Fast);
      }

      if (event.key === "ArrowUp") {
        dispatchBoardState({
          type: "move",
          isRotating: true,
        });
      }

      if (event.key === "ArrowLeft") {
        isPressingLeft = true;
        updateMovementInterval();
      }

      if (event.key === "ArrowRight") {
        isPressingRight = true;
        updateMovementInterval();
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === "ArrowDown") {
        setTickSpeed(TickSpeed.Normal);
      }

      if (event.key === "ArrowLeft") {
        isPressingLeft = false;
        updateMovementInterval();
      }

      if (event.key === "ArrowRight") {
        isPressingRight = false;
        updateMovementInterval();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
      clearInterval(moveIntervalID);
      setTickSpeed(TickSpeed.Normal);
    };
  }, [dispatchBoardState, isPlaying]);

  const renderedBoard = structuredClone(board);
  if (isPlaying) {
    addShapeToBoard(
      renderedBoard,
      droppingBlock,
      droppingShape,
      droppingRow,
      droppingColumn
    );
  }

  // Touch control handlers
  const moveLeft = useCallback(() => {
    if (isPlaying) {
      dispatchBoardState({ type: "move", isPressingLeft: true });
      setTimeout(
        () => dispatchBoardState({ type: "move", isPressingLeft: false }),
        100
      );
    }
  }, [isPlaying, dispatchBoardState]);

  const moveRight = useCallback(() => {
    if (isPlaying) {
      dispatchBoardState({ type: "move", isPressingRight: true });
      setTimeout(
        () => dispatchBoardState({ type: "move", isPressingRight: false }),
        100
      );
    }
  }, [isPlaying, dispatchBoardState]);

  const moveDown = useCallback(() => {
    if (isPlaying) {
      setTickSpeed(TickSpeed.Fast);
      setTimeout(() => setTickSpeed(TickSpeed.Normal), 100);
    }
  }, [isPlaying]);

  const rotate = useCallback(() => {
    if (isPlaying) {
      dispatchBoardState({ type: "move", isRotating: true });
    }
  }, [isPlaying, dispatchBoardState]);

  return {
    board: renderedBoard,
    startGame,
    isPlaying,
    score,
    level,
    upcomingBlocks,
    moveLeft,
    moveRight,
    moveDown,
    rotate,
    isGameOver: hasStarted && !isPlaying && tickSpeed === null,
  };
}

function getPoints(numCleared) {
  switch (numCleared) {
    case 0:
      return 0;
    case 1:
      return 100;
    case 2:
      return 300;
    case 3:
      return 500;
    case 4:
      return 800;
    default:
      throw new Error("Unexpected number of rows cleared");
  }
}

function addShapeToBoard(
  board,
  droppingBlock,
  droppingShape,
  droppingRow,
  droppingColumn
) {
  droppingShape
    .filter((row) => row.some((isSet) => isSet))
    .forEach((row, rowIndex) => {
      row.forEach((isSet, colIndex) => {
        if (isSet) {
          board[droppingRow + rowIndex][droppingColumn + colIndex] =
            droppingBlock;
        }
      });
    });
}
