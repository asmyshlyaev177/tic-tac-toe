import { describe, test, expect } from "vitest";
import { render, act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "./App";

const getTurn = (getByTestId: ReturnType<typeof render>["getByTestId"]) =>
  getByTestId("turn").textContent?.match(/: ([o|x])/)?.[1];
const getWinner = (getByTestId: ReturnType<typeof render>["getByTestId"]) =>
  getByTestId("winner").textContent?.match(/: ([o|x])/)?.[1];
const getDraw = (getByTestId: ReturnType<typeof render>["getByTestId"]) =>
  getByTestId("draw").textContent?.match(/: (false|true)/)?.[1];

describe("Main app", () => {
  test("should render without errors", () => {
    expect(render(<App />).container.firstChild).toBeTruthy();
  });

  test("should place mark", async () => {
    const { getByTestId } = render(<App />);
    const turn = getTurn(getByTestId);
    const square = getByTestId("0");

    act(() => {
      userEvent.click(square);
    });

    await waitFor(() => expect(square.textContent).toEqual(turn));
  });

  test("should change turn", async () => {
    const { getByTestId } = render(<App />);
    const turn = getTurn(getByTestId);
    const square = getByTestId("0");

    act(() => {
      userEvent.click(square);
    });

    await waitFor(() => expect(square.textContent).toEqual(turn));
    const newTurn = getTurn(getByTestId);
    expect(newTurn).toEqual(turn === "o" ? "x" : "o");
  });

  test("should not allow to change marked square", async () => {
    const { getByTestId } = render(<App />);
    const turn = getTurn(getByTestId);
    const square = getByTestId("0");

    act(() => {
      userEvent.click(square);
    });

    await waitFor(() => expect(square.textContent).toEqual(turn));
    const newTurn = getTurn(getByTestId);
    expect(newTurn).toEqual(turn === "o" ? "x" : "o");

    act(() => {
      userEvent.click(square);
    });
    await new Promise((res) => setTimeout(res, 100));
    await waitFor(() => expect(square.textContent).toEqual(turn));
  });

  test("should win", async () => {
    const { getByTestId } = render(<App />);
    const turn = getTurn(getByTestId);

    act(() => {
      for (let i = 0; i <= 6; i++) userEvent.click(getByTestId(i));
    });

    await waitFor(() => expect(getByTestId(6).textContent).toEqual(turn));
    expect(getWinner(getByTestId)).toEqual(turn);
  });

  test("nobody wins(draw)", async () => {
    const { getByTestId } = render(<App />);

    act(() => {
      userEvent.click(getByTestId(0));
      userEvent.click(getByTestId(4));
      userEvent.click(getByTestId(8));
      userEvent.click(getByTestId(2));
      userEvent.click(getByTestId(1));
      userEvent.click(getByTestId(3));
      userEvent.click(getByTestId(5));
      userEvent.click(getByTestId(7));
      userEvent.click(getByTestId(6));
    });

    await waitFor(() => expect(getByTestId(6).textContent).toBeTruthy());

    expect(getWinner(getByTestId)).toEqual(undefined);
    expect(getDraw(getByTestId)).toEqual("true");
  });

  test("should reset game", async () => {
    const { getByTestId } = render(<App />);
    const turn = getTurn(getByTestId);

    act(() => {
      for (let i = 0; i <= 6; i++) userEvent.click(getByTestId(i));
    });

    await waitFor(() => expect(getByTestId(6).textContent).toEqual(turn));

    act(() => {
      userEvent.click(getByTestId(0));
    });

    await waitFor(() => expect(getByTestId(6).textContent).toEqual(""));
    await waitFor(() => expect(getByTestId(0).textContent).toEqual(""));
    expect(getWinner(getByTestId)).toEqual(undefined);

    // place 1 turn to be sure
    const newTurn = getTurn(getByTestId);
    const square = getByTestId("0");
    act(() => {
      userEvent.click(square);
    });
    await waitFor(() => expect(square.textContent).toEqual(newTurn));
  });
});
