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
  const [score, setScore] = React.useState<{ id: number, winner: string; time: number }[]>(
    []
  );
  const result = winner || (isDraw && "Draw");

  const reset = React.useCallback(() => {
    setBoard(Array(9).fill(""));
    setTurn(getRandomTurn());
  }, []);

  const handleClick = (square: number) => {
    if (result) {
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
    if (result) {
      setScore((val) => {
        const entry = {id: (val?.[0]?.id || 0) + 1, winner: result, time: 0 };

        return [entry].concat(val);
      });
    }
  }, [result]);


  return (
    <div className={styles.container}>
      <div className={styles.stats}>
        <div data-testid="turn">Turn: {turn}</div>
        <div data-testid="winner">Winner: {winner}</div>
        <div data-testid="draw">Draw: {JSON.stringify(isDraw)}</div>
      </div>

      <div className={styles.board} data-testid="board">
        {board.map((value, ind) => (
          <Square
            key={ind}
            value={value}
            onMouseUp={() => handleClick(ind)}
            active={winningPattern?.includes?.(ind)}
            ind={ind}
          />
        ))}
      </div>

      <div>
        <div className={styles.wins}>
          <div>
            X wins:&nbsp;
            <b>{score.reduce((acc, val) => acc + +(val.winner === "x"), 0)}</b>
          </div>
          <div>
            O wins:&nbsp;
            <b>{score.reduce((acc, val) => acc + +(val.winner === "o"), 0)}</b>
          </div>
        </div>

        <section className={styles.log} data-testid="log">
          <div className="col" key="winner">winner</div>
          <div className="col" key="time">time</div>

          {score.map((val) => (
            <>
              <div key={`winner-${val.id}`} className="col">
                {val.winner.toUpperCase()}
              </div>
              <div key={`time-${val.id}`} className="col">
                {val.time}
              </div>
            </>
          ))}
        </section>
      </div>
    </div>
  );
}

const Square = ({
  value,
  onMouseUp,
  ind,
  active,
}: {
  value: SquareType;
  onMouseUp: () => void;
  ind: number;
  active: boolean;
}) => {
  return (
    <div
      className={`square ${styles.square} ${active ? styles.highlighted : ""}`}
      onMouseUp={onMouseUp}
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
