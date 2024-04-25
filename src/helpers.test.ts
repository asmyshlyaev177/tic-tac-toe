import { describe, test, expect } from "vitest";

import {  isWinPattern } from "./helpers";

describe("isWinPattern", () => {
  test("hor match", () => {
    expect(
      isWinPattern([
        ["x", "x", "x"],
        ["", "", ""],
        ["", "", ""],
      ])
    ).toStrictEqual([
      [0, 0],
      [0, 1],
      [0, 2],
    ]);
    expect(
      isWinPattern([
        ["", "", ""],
        ["x", "x", "x"],
        ["", "", ""],
      ])
    ).toStrictEqual([
      [1, 0],
      [1, 1],
      [1, 2],
    ]);

    expect(
      isWinPattern([
        ["", "", ""],
        ["", "", ""],
        ["x", "x", "x"],
      ])
    ).toStrictEqual([
      [2, 0],
      [2, 1],
      [2, 2],
    ]);
    expect(
      isWinPattern([
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
        ["x", "x", "x", "x"],
      ])
    ).toStrictEqual([
      [3, 0],
      [3, 1],
      [3, 2],
      [3, 3],
    ]);
    expect(
      isWinPattern([
        ["x", "x"],
        ["", ""],
      ])
    ).toStrictEqual([
      [0, 0],
      [0, 1],
    ]);
    expect(
      isWinPattern([
        ["", ""],
        ["x", "x"],
      ])
    ).toStrictEqual([
      [1, 0],
      [1, 1],
    ]);
    expect(
      isWinPattern([
        ["", "", ""],
        ["", "", ""],
        ["x", "x", ""],
      ])
    ).toEqual([]);
    expect(
      isWinPattern([
        ["", ""],
        ["x", ""],
      ])
    ).toEqual([]);
  });

  test("vert match", () => {
    expect(
      isWinPattern([
        ["x", "", ""],
        ["x", "", ""],
        ["x", "", ""],
      ])
    ).toStrictEqual([
      [0, 0],
      [1, 0],
      [2, 0],
    ]);
    expect(
      isWinPattern([
        ["", "x", ""],
        ["", "x", ""],
        ["", "x", ""],
      ])
    ).toStrictEqual([
      [0, 1],
      [1, 1],
      [2, 1],
    ]);

    expect(
      isWinPattern([
        ["", "", "x"],
        ["", "", "x"],
        ["", "", "x"],
      ])
    ).toStrictEqual([
      [0, 2],
      [1, 2],
      [2, 2],
    ]);
    expect(
      isWinPattern([
        ["", "", "x", ""],
        ["", "", "x", ""],
        ["", "", "x", ""],
        ["", "", "x", ""],
      ])
    ).toStrictEqual([
      [0, 2],
      [1, 2],
      [2, 2],
      [3, 2],
    ]);
    expect(
      isWinPattern([
        ["x", ""],
        ["x", ""],
      ])
    ).toStrictEqual([
      [0, 0],
      [1, 0],
    ]);
    expect(
      isWinPattern([
        ["", "x"],
        ["", "x"],
      ])
    ).toStrictEqual([
      [0, 1],
      [1, 1],
    ]);
    expect(
      isWinPattern([
        ["", "", "x"],
        ["", "", "x"],
        ["x", "x", ""],
      ])
    ).toEqual([]);
  });

  test("diag match", () => {
    expect(
      isWinPattern([
        ["x", "", ""],
        ["", "x", ""],
        ["", "", "x"],
      ])
    ).toStrictEqual([
      [0, 0],
      [1, 1],
      [2, 2],
    ]);
    expect(
      isWinPattern([
        ["", "", "x"],
        ["", "x", ""],
        ["x", "", ""],
      ])
    ).toStrictEqual([
      [0, 2],
      [1, 1],
      [2, 0],
    ]);
    expect(
      isWinPattern([
        ["", "", "", "x"],
        ["", "", "x", ""],
        ["", "x", "", ""],
        ["x", "", "", ""],
      ])
    ).toStrictEqual([
      [0, 3],
      [1, 2],
      [2, 1],
      [3, 0],
    ]);
    expect(
      isWinPattern([
        ["", "x"],
        ["x", ""],
      ])
    ).toStrictEqual([
      [0, 1],
      [1, 0],
    ]);
    expect(
      isWinPattern([
        ["x", ""],
        ["", "x"],
      ])
    ).toStrictEqual([
      [0, 0],
      [1, 1],
    ]);
    expect(
      isWinPattern([
        ["", "", ""],
        ["", "x", "x"],
        ["x", "x", ""],
      ])
    ).toEqual([]);
  });
});
