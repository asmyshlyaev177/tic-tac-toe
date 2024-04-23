import type { SquareType, WinPattern } from "./types";

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
