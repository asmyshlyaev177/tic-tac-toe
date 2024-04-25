import type { SquareType } from "./types";

export const isWinPattern = (board: SquareType[][]) => {
  const diag1: [[number, number], SquareType][] = [];
  const diag2: [[number, number], SquareType][] = [];
  let [diagMatch1, diagMatch2] = [false, false];

  for (let row = 0; row < board.length; row++) {
    const currentRow = board[row];
    const horMatch = currentRow.every((el) => el && el === currentRow[0]);
    if (horMatch) {
      return currentRow.map((_el, col) => [row, col]);
    }
    const vert: [[number, number], SquareType][] = [];

    for (let col = 0; col < currentRow.length; col++) {
      vert.push([[col, row], board[col][row]]);
      const vertMatch =
        vert.length === currentRow.length &&
        vert.every((el) => el[1] && el[1] === vert[0][1]);
      if (vertMatch) {
        return vert.map((el) => el[0]);
      }

      if (row === col) {
        diag1.push([[row, col], board[row][col]]);
      }
      if (row === currentRow.length - 1 - col) {
        diag2.push([[row, col], board[row][col]]);
      }
    }

    diagMatch1 =
      diag1.length === currentRow.length &&
      diag1.every((el) => el[1] && el[1] === diag1[0][1]);
    if (diagMatch1) {
      return diag1.map((el) => el[0]);
    }
    diagMatch2 =
      diag2.length === currentRow.length &&
      diag2.every((el) => el[1] && el[1] === diag2[0][1]);
    if (diagMatch2) {
      return diag2.map((el) => el[0]);
    }
  }

  return [];
};
