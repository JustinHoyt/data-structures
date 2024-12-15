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

// Default map behavior can also be achieved with plain objects
Deno.test("Plain object: should default for primitives", () => {
  const arr = [1, 2, 3, 3, 4, 5, 5, 5, 5, 6, 6, 6, 6, 6, 7, 7];

  // Use the nullish coalescing operator for primitives
  const idCounts: Record<string, number> = {};
  for (const num of arr.values()) {
    idCounts[num] = (idCounts[num] ?? 0) + 1;
  }
  assertEquals(idCounts[6], 5);
});

Deno.test("Plain object: should default for objects", () => {
  const arr = [1, 2, 3, 3, 4, 5, 5, 5, 5, 6, 6, 6, 6, 6, 7, 7];

  // Use the nullish coalescing assignment operator for objects
  const idLocations: Record<string, number[]> = {};
  for (const [i, num] of arr.entries()) {
    (idLocations[num] ??= []).push(i);
  }
  assertEquals(idLocations[3], [2, 3]);
});
