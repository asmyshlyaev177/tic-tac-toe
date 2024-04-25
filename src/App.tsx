import React from "react";

import styles from "./styles.module.scss";
import { isWinPattern } from "./helpers";

import type { SquareType, Turn } from "./types";

function App() {
  const [board, setBoard] = React.useState<SquareType[][]>([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [turn, setTurn] = React.useState<Turn>(() => getRandomTurn());
  const timer = React.useRef(new Date().getTime());

  const reset = React.useCallback(() => {
    setBoard([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
    setTurn(getRandomTurn());
    timer.current = new Date().getTime();
  }, []);

  React.useEffect(() => {
    reset();
  }, [reset]);

  const winningPattern = isWinPattern(board);

  const winner =
    winningPattern &&
    board?.[winningPattern?.[0]?.[0]]?.[winningPattern?.[0]?.[1]];
  const isDraw = !winner && board.every((row) => row.every((col) => col));
  const [score, setScore] = React.useState<
    { id: number; winner: string; time: number }[]
  >([]);
  const result = winner || (isDraw && "Draw");

  const handleClick = (row: number, col: number) => {
    if (board[row][col]) {
      return false;
    }

    setBoard((b) => {
      const newBoard = [...b];
      newBoard[row][col] = turn;
      return newBoard;
    });
    setTurn((v) => (v === "x" ? "o" : "x"));
  };

  React.useEffect(() => {
    if (result) {
      setScore((val) => {
        const entry = {
          id: (val?.[0]?.id || 0) + 1,
          winner: result,
          time: (new Date().getTime() - timer.current) / 1000,
        };

        return [entry].concat(val);
      });
    }
  }, [result]);

  return (
    <div className={styles.container}>
      <div className={styles.containerInner}>
        <div className={styles.stats}>
          <div data-testid="turn">
            Turn: <b>{turn}</b>
          </div>
        </div>

        <div className={styles.board} data-testid="board">
          {result && (
            <div className={styles.overlay} onClick={reset} data-testid="reset">
              <div>
                <div data-testid="winner">
                  Winner: <b>{result}</b>
                </div>
                <div>Click to play again</div>
              </div>
            </div>
          )}
          {board.map((row, rowInd) =>
            row.map((col, colInd) => (
              <Square
                key={`${rowInd}${colInd}`}
                value={col}
                onMouseUp={() => handleClick(rowInd, colInd)}
                active={winningPattern?.some?.(
                  ([r, c]) => r === rowInd && c === colInd
                )}
                ind={`${rowInd}-${colInd}`}
              />
            ))
          )}
        </div>
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
          <div className="col" key="winner">
            <b>winner</b>
          </div>
          <div className="col" key="time">
            <b>time</b>
          </div>

          {score.map((val) => (
            <>
              <div key={`winner-${val.id}`} className="col">
                {val.winner.toUpperCase()}
              </div>
              <div key={`time-${val.id}`} className="col">
                {val.time.toFixed(2) + "s"}
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
  ind: string;
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
