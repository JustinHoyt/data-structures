import { DefaultMap } from "./default_map.ts";
import { assertEquals } from "jsr:@std/assert";

Deno.test("should insert and update primitive values", () => {
  const arr = [6, 6, 6, 6, 6];

  const idCounts = new DefaultMap<number, number>(() => 0);
  for (const num of arr.values()) {
    idCounts.set(num, idCounts.get(num) + 1);
  }

  assertEquals(idCounts.get(6), 5);
  assertEquals(idCounts.get(100), 0);
});

Deno.test("should insert and update object values", () => {
  const arr = [1, 2, 3, 3, 4, 5, 5, 5, 5, 6, 6, 6, 6, 6, 7, 7];

  const idLocations = new DefaultMap<number, number[]>(() => []);
  for (const [i, num] of arr.entries()) {
    idLocations.get(num).push(i);
  }

  assertEquals(idLocations.get(6), [9, 10, 11, 12, 13]);
  assertEquals(idLocations.get(100), []);
});
