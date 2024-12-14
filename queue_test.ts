import { Queue } from "./queue.ts";
import { assertEquals } from "@std/assert";

Deno.test("should insert and remove ordered list in order", () => {
  const queue = new Queue(1, 2, 3, 4, 5);
  assertEquals(queue.length, 5);

  const actual = [];
  let next: number | undefined = 0;
  while ((next = queue.pop()) != null) {
    actual.push(next);
  }

  assertEquals(actual, [1, 2, 3, 4, 5]);
  assertEquals(queue.size, 0);
});

Deno.test("should handle single entry", () => {
  const queue = new Queue();
  queue.push(3);

  assertEquals(queue.pop(), 3);
  assertEquals(queue.size, 0);
});

Deno.test("should do nothing on empty array", () => {
  const queue = new Queue();

  assertEquals(queue.size, 0);
  assertEquals(queue.pop(), undefined);
});

Deno.test("should handle large queue", () => {
  const testArr = Array<number>(10_000).fill(0).map(
    () => Math.floor(Math.random() * 10_000),
  );

  const queue = new Queue(...testArr);
  const actual: number[] = [];
  let next: number | undefined = 0;
  while ((next = queue.pop()) != null) {
    actual.push(next);
  }

  assertEquals(actual, testArr);
});

Deno.test("dequeuing multiple times on an empty queue should not affect size", () => {
  const queue = new Queue();

  assertEquals(queue.pop(), undefined);
  assertEquals(queue.pop(), undefined);
  assertEquals(queue.size, 0);
});
