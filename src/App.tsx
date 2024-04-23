import React from "react";

import styles from "./styles.module.scss";
import { getWinPattern } from "./helpers";

import type { SquareType, Turn } from "./types";

function App() {
  const [board, setBoard] = React.useState<SquareType[]>(Array(9).fill(""));
  const [turn, setTurn] = React.useState<Turn>(() => getRandomTurn());

  const winningPattern = getWinPattern(board);

  const winner = board?.[winningPattern?.[0]];
  const isDraw = !winner && board.every((el) => !!el);
  const [score, setScore] = React.useState({ x: 0, o: 0, draw: 0 });

  const reset = React.useCallback(() => {
    setBoard(Array(9).fill(""));
    setTurn(getRandomTurn());
  }, []);

  const shouldReset = winner || isDraw;

  const handleClick = (square: number) => {
    if (shouldReset) {
      reset();
    }
    if (board[square]) {
      return false;
    }

    setBoard((b) => {
      const newBoard = [...b];
      newBoard[square] = turn;
      return newBoard;
    });
    setTurn((v) => (v === "x" ? "o" : "x"));
  };

  React.useEffect(() => {
    setScore((val) => {
      const newValue = { ...val };

      if (isDraw) {
        newValue.draw++;
      } else if (winner) {
        newValue[winner]++;
      }
      return newValue;
    });
  }, [isDraw, winner]);

  return (
    <div>
      <div data-testid="turn">Turn: {turn}</div>
      <div data-testid="winner">Winner: {winner}</div>
      <div data-testid="draw">Draw: {JSON.stringify(isDraw)}</div>

      <div data-testid="score">Score: {JSON.stringify(score)}</div>

      <div className={styles.board} data-testid="board">
        {board.map((value, ind) => (
          <Square
            key={ind}
            value={value}
            onClick={() => handleClick(ind)}
            active={winningPattern?.includes?.(ind)}
            ind={ind}
          />
        ))}
      </div>
    </div>
  );
}

const Square = ({
  value,
  onClick,
  ind,
  active,
}: {
  value: SquareType;
  onClick: () => void;
  ind: number;
  active: boolean;
}) => {
  return (
    <div
      className={`square ${styles.square} ${active ? styles.highlighted : ""}`}
      onClick={onClick}
      data-testid={ind}
      data-highlighted={active}
    >
      {value}
    </div>
  );
};

// winning in tic-tac-toe depends on who place first move, so first turn is randomized
const getRandomTurn = () =>
  (["o", "x"] as Turn[])[Math.floor(Math.random() * 2)];

export default App;
