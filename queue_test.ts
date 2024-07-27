import { Queue } from "./queue.ts";
import { describe, expect, it } from "bun:test";

describe("Queue", () => {
  it("should insert and remove ordered list in order", () => {
    const queue = new Queue(1, 2, 3, 4, 5);
    expect(queue.length).toEqual(5);

    const actual = [];
    let next: number | undefined = 0;
    while ((next = queue.pop()) != null) {
      actual.push(next);
    }

    expect(actual).toEqual([1, 2, 3, 4, 5]);
    expect(queue.size).toEqual(0);
  });

  it("should handle single entry", () => {
    const queue = new Queue();
    queue.push(3);

    expect(queue.pop()).toEqual(3);
    expect(queue.size).toEqual(0);
  });

  it("should do nothing on empty array", () => {
    const queue = new Queue();

    expect(queue.size).toEqual(0);
    expect(queue.pop()).toBeUndefined();
  });

  it("should handle large queue", () => {
    const testArr = Array<number>(10_000).fill(0).map(
      () => Math.floor(Math.random() * 10_000),
    );

    const queue = new Queue(...testArr);
    const actual: number[] = [];
    let next: number | undefined = 0;
    while ((next = queue.pop()) != null) {
      actual.push(next);
    }

    expect(actual).toEqual(testArr);
  });

  it("dequeuing multiple times on an empty queue should not affect size", () => {
    const queue = new Queue();

    expect(queue.pop()).toBeUndefined();
    expect(queue.pop()).toBeUndefined();
    expect(queue.size).toEqual(0);
  });
});
