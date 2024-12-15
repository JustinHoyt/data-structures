import { MinHeap } from "./min_heap.ts";
import { assertEquals } from "@std/assert";
import { ascend, BinaryHeap } from "jsr:@std/data-structures";

Deno.test("MinHeap: should handle duplicates", () => {
  const heap = new MinHeap([3, 5, 4, 4, 3, 3, 2, 1, 2]);

  const actual = [];
  let next: number | undefined = 0;
  while ((next = heap.pop()) != null) {
    actual.push(next);
  }

  assertEquals(actual, [1, 2, 2, 3, 3, 3, 4, 4, 5]);
});

Deno.test("MinHeap: should handle single entry", () => {
  const heap = new MinHeap([3]);

  assertEquals(heap.pop(), 3);
  assertEquals(heap.length, 0);
});

Deno.test("MinHeap: should do nothing on empty array", () => {
  const heap = new MinHeap([]);

  assertEquals(heap.length, 0);
});

Deno.test("MinHeap: should handle large heap", () => {
  const testArr = Array<number>(100_000).fill(0).map(
    () => Math.floor(Math.random() * 100_000),
  );
  const expected = testArr.toSorted((a, b) => a - b);

  const heap = new MinHeap(testArr);
  const actual: number[] = [];
  let next: number | undefined = 0;
  while ((next = heap.pop()) != null) {
    actual.push(next);
  }

  assertEquals(actual, expected);
});

// Deno's std library also has a binary heap
Deno.test("BinaryHeap: should insert and remove descending ordered list in ascending order", () => {
  const heap = new BinaryHeap<number>(ascend);
  heap.push(5, 4, 3, 2, 1);

  const actual = [];
  while (!heap.isEmpty()) {
    actual.push(heap.pop());
  }

  assertEquals(actual, [1, 2, 3, 4, 5]);
});
