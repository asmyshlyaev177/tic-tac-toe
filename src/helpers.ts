import type { SquareType, WinPattern } from "./types";

// const board = [
//   [0, 0, 0],
//   [0, 0, 0],
//   [0, 0, 0],
// ];

export const isWinPattern = (board: string[][]) => {
  const diag1: string[] = [];
  const diag2: string[] = [];
  let [diagMatch1, diagMatch2] = [false, false];

  for (let row = 0; row < board.length; row++) {
    const currentRow = board[row];
    const horMatch = currentRow.every((el) => el && el === currentRow[0]);
    if (horMatch) {
      return true;
    }
    const vert: string[] = [];

    for (let col = 0; col < currentRow.length; col++) {
      const square = board[col][row];
      vert.push(square);
      const vertMatch =
        vert.length === currentRow.length &&
        vert.every((el) => el && el === vert[0]);
      if (vertMatch) {
        return true;
      }

      if (row === col) {
        diag1.push(square);
      }
      if (row === currentRow.length - 1 - col) {
        diag2.push(square);
      }
    }

    diagMatch1 =
      diag1.length === currentRow.length &&
      diag1.every((el) => el && el === diag1[0]);
    diagMatch2 =
      diag2.length === currentRow.length &&
      diag2.every((el) => el && el === diag2[0]);
  }

  return diagMatch1 || diagMatch2;
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
