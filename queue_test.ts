import { Queue } from "./queue.ts";
import { assertEquals } from "@std/assert";

Deno.test("should insert and remove ordered list in order", () => {
  const queue = new Queue(1, 2, 3, 4, 5);
  assertEquals(queue.size, 5);

  const actual: number[] = [];
  while (!queue.isEmpty()) {
    actual.push(queue.dequeue()!);
  }

  assertEquals(actual, [1, 2, 3, 4, 5]);
  assertEquals(queue.size, 0);
});

Deno.test("should handle single entry", () => {
  const queue = new Queue();
  queue.enqueue(3);

  assertEquals(queue.dequeue(), 3);
  assertEquals(queue.size, 0);
});

Deno.test("should do nothing on empty array", () => {
  const queue = new Queue();

  assertEquals(queue.size, 0);
  assertEquals(queue.dequeue(), undefined);
});

Deno.test("should handle large queue", () => {
  const testArr = Array<number>(10_000).fill(0).map(
    () => Math.floor(Math.random() * 10_000),
  );

  const queue = new Queue(...testArr);
  const actual: number[] = [];
  while (!queue.isEmpty()) {
    actual.push(queue.dequeue()!);
  }

  assertEquals(actual, testArr);
});

Deno.test("dequeuing multiple times on an empty queue should not affect size", () => {
  const queue = new Queue();

  assertEquals(queue.dequeue(), undefined);
  assertEquals(queue.dequeue(), undefined);
  assertEquals(queue.size, 0);
});
