import React from "react";

export default function TouchControls({
  onLeft,
  onRight,
  onDown,
  onRotate,
  disabled,
}) {
  return (
    <div className="touch-controls touch-controls-grid">
      <button
        className="touch-btn left"
        onClick={onLeft}
        disabled={disabled}
        aria-label="Left"
      >
        ◀️
      </button>
      <button
        className="touch-btn rotate"
        onClick={onRotate}
        disabled={disabled}
        aria-label="Rotate"
      >
        🔄
      </button>
      <button
        className="touch-btn down"
        onClick={onDown}
        disabled={disabled}
        aria-label="Down"
      >
        🔽
      </button>
      <button
        className="touch-btn right"
        onClick={onRight}
        disabled={disabled}
        aria-label="Right"
      >
        ▶️
      </button>
    </div>
  );
}
