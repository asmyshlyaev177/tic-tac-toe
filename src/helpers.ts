import type { SquareType } from "./types";

type PosValue = [[row: number, col: number], SquareType];

export const isWinPattern = (board: SquareType[][]) => {
  const diagLeftToRight: PosValue[] = [];
  const diagRightToLeft: PosValue[] = [];
  let [diagMatch1, diagMatch2] = [false, false];

  for (let row = 0; row < board.length; row++) {
    const currentRow = board[row];
    const horMatch = currentRow.every((el) => el && el === currentRow[0]);
    if (horMatch) {
      return currentRow.map((_el, col) => [row, col]);
    }
    const vert: PosValue[] = [];

    for (let col = 0; col < currentRow.length; col++) {
      vert.push([[col, row], board[col][row]]);
      const vertMatch =
        vert.length === currentRow.length &&
        !!vert[0][1] &&
        vert.every((el) => el[1] === vert[0][1]);
      if (vertMatch) {
        return vert.map((el) => el[0]);
      }

      if (row === col) {
        diagLeftToRight.push([[row, col], board[row][col]]);
      }
      if (row === currentRow.length - 1 - col) {
        diagRightToLeft.push([[row, col], board[row][col]]);
      }
    }

    diagMatch1 =
      diagLeftToRight.length === currentRow.length &&
      !!diagLeftToRight[0][1] &&
      diagLeftToRight.every((el) => el[1] === diagLeftToRight[0][1]);
    if (diagMatch1) {
      return diagLeftToRight.map((el) => el[0]);
    }
    diagMatch2 =
      diagRightToLeft.length === currentRow.length &&
      !!diagRightToLeft[0][1] &&
      diagRightToLeft.every((el) => el[1] === diagRightToLeft[0][1]);
    if (diagMatch2) {
      return diagRightToLeft.map((el) => el[0]);
    }
  }

  return [];
};
