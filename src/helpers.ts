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
  let horMatch , vertMatch, diagMatch

  for (let row = 0; row < board.length; row++) {
    horMatch =
      board[row] && board[row].every((el) => !!el && el === board[row][0]);

    const vert: string[] = [];
    const diag: string[] = []
    for (let col = 0; col < board[row].length; col++) {
      const square = board[row][col];
      vert.push(square);

      if (row === col) {
        diag.push(square)
      }
    }
    vertMatch = vert.every((el) => el && el === vert[0]);
    diagMatch = diag.every((el) => el && el === diag[0]);


  }

  console.log({horMatch, vertMatch, diagMatch })

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
