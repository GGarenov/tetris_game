export let Block;
(function (Block) {
  Block["I"] = "I";
  Block["J"] = "J";
  Block["L"] = "L";
  Block["O"] = "O";
  Block["S"] = "S";
  Block["T"] = "T";
  Block["Z"] = "Z";
})(Block || (Block = {}));

export let EmptyCell;
(function (EmptyCell) {
  EmptyCell["Empty"] = "Empty";
})(EmptyCell || (EmptyCell = {}));

export const SHAPES = {
  I: {
    shape: [
      [false, false, false, false],
      [false, false, false, false],
      [true, true, true, true],
      [false, false, false, false],
    ],
  },
  J: {
    shape: [
      [false, false, false],
      [true, false, false],
      [true, true, true],
    ],
  },
  L: {
    shape: [
      [false, false, false],
      [false, false, true],
      [true, true, true],
    ],
  },
  O: {
    shape: [
      [true, true],
      [true, true],
    ],
  },
  S: {
    shape: [
      [false, false, false],
      [false, true, true],
      [true, true, false],
    ],
  },
  T: {
    shape: [
      [false, false, false],
      [false, true, false],
      [true, true, true],
    ],
  },
  Z: {
    shape: [
      [false, false, false],
      [true, true, false],
      [false, true, true],
    ],
  },
};
