/**
 * Array-offset implementation of a queue.
 *
 * | Method         | Average Case | Worst Case |
 * | -------------- | ------------ | ---------- |
 * | isEmpty()      | O(1)         | O(1)       |
 * | peek()         | O(1)         | O(1)       |
 * | enqueue()      | O(1)         | O(n)       |
 * | dequeue(value) | O(1)         | O(1)       |
 *
 * @example Usage
 * ```ts
 * import { Queue } from "@justin/data-structures";
 * import { assertEquals } from "@std/assert";
 *
 * const queue = new Queue(1, 2, 3, 4, 5);
 * assertEquals(queue.size, 5);
 *
 * const actual: number[] = [];
 * while (!queue.isEmpty()) {
 *   actual.push(queue.dequeue()!);
 * }
 *
 * assertEquals(actual, [1, 2, 3, 4, 5]);
 * assertEquals(queue.size, 0);
 * ```
 *
 * @typeparam T The type of the values stored in the queue.
 */
export class Queue<T> {
  private offset = 0;
  private arr: T[] = [];

  /** Constructs the queue with an optional array */
  constructor(...vals: T[]) {
    this.arr.push(...vals);
  }

  /** Get the size of the queue */
  get size(): number {
    return this.arr.length - this.offset;
  }

  /** Check if the queue contains no elements. */
  isEmpty(): boolean {
    return this.size === 0;
  }

  /** Get the element at the front of the queue without removing it. */
  peek(): T {
    return this.arr[0];
  }

  /** Add element to the end of the queue. */
  enqueue(val: T): void {
    this.arr.push(val);
  }

  /** Remove and return the element from the front of the queue. */
  dequeue(): T | undefined {
    if (this.size === 0) return;

    if (this.offset > this.arr.length / 2) {
      this.arr.splice(0, this.offset);
      this.offset = 0;
    }

    return this.arr[this.offset++];
  }
}
