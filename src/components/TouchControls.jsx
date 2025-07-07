import React from "react";

export default function TouchControls({
  onLeft,
  onRight,
  onDown,
  onRotate,
  disabled,
}) {
  return (
    <div className="touch-controls">
      <button
        className="touch-btn"
        onClick={onLeft}
        disabled={disabled}
        aria-label="Left"
      >
        ◀️
      </button>
      <button
        className="touch-btn"
        onClick={onDown}
        disabled={disabled}
        aria-label="Down"
      >
        🔽
      </button>
      <button
        className="touch-btn"
        onClick={onRight}
        disabled={disabled}
        aria-label="Right"
      >
        ▶️
      </button>
      <button
        className="touch-btn"
        onClick={onRotate}
        disabled={disabled}
        aria-label="Rotate"
      >
        🔄
      </button>
    </div>
  );
}
