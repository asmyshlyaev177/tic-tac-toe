import type { SquareType, WinPattern } from "./types";

// [[0 0 0], [0 0 0], [0 0 0]]
// row
// const board = [
//   [0, 0, 0],
//   [0, 0, 0],
//   [0, 0, 0],
// ];

// not finished
export const isWinPattern = (board: string[][]) => {
  let horMatch, vertMatch, diagMatch;
  const diag: string[] = [];

  for (let row = 0; row < board.length; row++) {
    horMatch = horMatch || board[row].every((el) => el && el === board[row][0]);

    const vert: string[] = [];

    for (let col = 0; col < board[row].length; col++) {
      const square = board[col][row];
      vert.push(square);

      console.log({ row, col, square });
      if (row === col) {
        diag.push(square);
      }
    }
    vertMatch = vertMatch || vert.every((el) => el && el === vert[0]);
    console.log({ diagMatch, diag });
    diagMatch =
      diagMatch ||
      (diag.length === board[row].length &&
        diag.every((el) => el && el === diag[0]));
  }

  return horMatch || vertMatch || diagMatch;
};

const winPatterns: WinPattern[] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const getWinPattern = (board: SquareType[]) =>
  winPatterns.reduce<WinPattern[]>((acc, squares) => {
    const filled = board[squares[0]];
    if (filled && squares.every((num) => board[num] === filled)) {
      acc.push(squares);
    }
    return acc;
  }, [])?.[0];
