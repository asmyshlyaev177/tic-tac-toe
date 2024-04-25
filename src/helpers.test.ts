import { describe, test, expect } from "vitest";

import { getWinPattern, isWinPattern } from "./helpers";
import { SquareType } from "./types";

// easier to read this way
const boardToArr = (val: string) =>
  val.replaceAll("\n", "").split(" ").filter(Boolean) as SquareType[];

describe("getWinPattern", () => {
  test("should return win pattern for board", () => {
    expect(
      getWinPattern(
        boardToArr(`
         x x x 
         a b c 
         d e f`)
      )
    ).toStrictEqual([0, 1, 2]);

    expect(
      getWinPattern(
        boardToArr(`
         o o o 
         a b c 
         d e f`)
      )
    ).toStrictEqual([0, 1, 2]);

    expect(
      getWinPattern(
        boardToArr(`
         a b c 
         x x x 
         d e f`)
      )
    ).toStrictEqual([3, 4, 5]);

    expect(
      getWinPattern(
        boardToArr(`
         a b c 
         d e f 
         x x x`)
      )
    ).toStrictEqual([6, 7, 8]);

    expect(
      getWinPattern(
        boardToArr(`
         x a b 
         x c d 
         x e f`)
      )
    ).toStrictEqual([0, 3, 6]);

    expect(
      getWinPattern(
        boardToArr(`
         a x b 
         c x d 
         e x f`)
      )
    ).toStrictEqual([1, 4, 7]);

    expect(
      getWinPattern(
        boardToArr(`
         a b x 
         c d x 
         e f x`)
      )
    ).toStrictEqual([2, 5, 8]);

    expect(
      getWinPattern(
        boardToArr(`
         x a b 
         c x d 
         e f x`)
      )
    ).toStrictEqual([0, 4, 8]);

    expect(
      getWinPattern(
        boardToArr(`
         a b x 
         c x d 
         x e f`)
      )
    ).toStrictEqual([2, 4, 6]);
  });

  test("whene is no win patterns returns undefined", () => {
    expect(
      getWinPattern(
        boardToArr(`
         x a z 
         a b c 
         d e f`)
      )
    ).toStrictEqual(undefined);
  });
});

describe("", () => {
  test("hor match", () => {
    expect(
      isWinPattern([
        ["x", "x", "x"],
        ["", "", ""],
        ["", "", ""],
      ])
    ).toEqual(true);
    expect(
      isWinPattern([
        ["", "", ""],
        ["x", "x", "x"],
        ["", "", ""],
      ])
    ).toEqual(true);

    expect(
      isWinPattern([
        ["", "", ""],
        ["", "", ""],
        ["x", "x", "x"],
      ])
    ).toEqual(true);
    expect(
      isWinPattern([
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
        ["x", "x", "x", "x"],
      ])
    ).toEqual(true);
    expect(
      isWinPattern([
        ["", "", ""],
        ["", "", ""],
        ["x", "x", ""],
      ])
    ).toEqual(false);
  });

  test("vert match", () => {
    expect(
      isWinPattern([
        ["x", "", ""],
        ["x", "", ""],
        ["x", "", ""],
      ])
    ).toEqual(true);
    expect(
      isWinPattern([
        ["", "x", ""],
        ["", "x", ""],
        ["", "x", ""],
      ])
    ).toEqual(true);

    expect(
      isWinPattern([
        ["", "", "x"],
        ["", "", "x"],
        ["", "", "x"],
      ])
    ).toEqual(true);
    expect(
      isWinPattern([
        ["", "", "x", ""],
        ["", "", "x", ""],
        ["", "", "x", ""],
        ["", "", "x", ""],
      ])
    ).toEqual(true);
    expect(
      isWinPattern([
        ["", "", "x"],
        ["", "", "x"],
        ["x", "x", ""],
      ])
    ).toEqual(false);
  });

  test("diag match", () => {
    expect(
      isWinPattern([
        ["x", "", ""],
        ["", "x", ""],
        ["", "", "x"],
      ])
    ).toEqual(true);
    expect(
      isWinPattern([
        ["", "", "x"],
        ["", "x", ""],
        ["x", "", ""],
      ])
    ).toEqual(true);
    expect(
      isWinPattern([
        ["", "", "", "x"],
        ["", "", "x", ""],
        ["", "x", "", ""],
        ["x", "", "", ""],
      ])
    ).toEqual(true);
    expect(
      isWinPattern([
        ["", "", ""],
        ["", "x", "x"],
        ["x", "x", ""],
      ])
    ).toEqual(false);
  });
});
