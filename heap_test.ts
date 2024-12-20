import { ascend, Heap } from "./heap.ts";
import { assertEquals } from "@std/assert";
import { BinaryHeap } from "jsr:@std/data-structures";

Deno.test("Heap: should handle duplicates", () => {
  const heap = new Heap(ascend, [3, 5, 4, 4, 3, 3, 2, 1, 2]);

  const actual = [];
  while (!heap.isEmpty()) {
    actual.push(heap.pop());
  }

  assertEquals(actual, [1, 2, 2, 3, 3, 3, 4, 4, 5]);
});

Deno.test("Heap: should handle single entry", () => {
  const heap = new Heap();
  heap.push(3);

  assertEquals(heap.pop(), 3);
  assertEquals(heap.length, 0);
});

Deno.test("Heap: should do nothing on empty array", () => {
  const heap = new Heap();

  assertEquals(heap.length, 0);
});

Deno.test("Heap: should handle large heap", () => {
  const testArr = Array<number>(100_000).fill(0).map(
    () => Math.floor(Math.random() * 100_000),
  );
  const expected = testArr.toSorted((a, b) => a - b);

  const heap = new Heap(ascend, testArr);
  const actual: number[] = [];
  while (!heap.isEmpty()) {
    actual.push(heap.pop()!);
  }

  assertEquals(actual, expected);
});

Deno.test("Heap: should insert and remove descending ordered list in ascending order", () => {
  const heap = new Heap<number>(ascend, [5, 4, 3, 2, 1]);

  const actual: number[] = [];
  while (!heap.isEmpty()) {
    actual.push(heap.pop()!);
  }

  assertEquals(actual, [1, 2, 3, 4, 5]);
});

// Deno's std library also has a binary heap
Deno.test("BinaryHeap: should insert and remove descending ordered list in ascending order", () => {
  const heap = new BinaryHeap<number>(ascend);
  heap.push(5, 4, 3, 2, 1);

  const actual: number[] = [];
  while (!heap.isEmpty()) {
    actual.push(heap.pop()!);
  }

  assertEquals(actual, [1, 2, 3, 4, 5]);
});
