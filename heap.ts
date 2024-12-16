/**
 * Compares values in ascending order using JavaScript's built in comparison.
 */
export function ascend<T>(a: T, b: T): -1 | 0 | 1 {
  return a < b ? -1 : a > b ? 1 : 0;
}

/**
 * Compares values in descending order using JavaScript's built in comparison.
 */
export function descend<T>(a: T, b: T): -1 | 0 | 1 {
  return a > b ? -1 : a < b ? 1 : 0;
}

/**
 * A heap queue with a compare function to specify priority.
 *
 * Implemented as an extension of an Array for simplicity. Similar in spirit to
 * how heapq uses an array in python.
 *
 * Comparison defaults to ascending order.
 *
 * | Method      | Average Case | Worst Case |
 * | ----------- | ------------ | ---------- |
 * | isEmpty()   | O(1)         | O(1)       |
 * | peek()      | O(1)         | O(1)       |
 * | pop()       | O(log n)     | O(log n)   |
 * | push(value) | O(log n)     | O(log n)   |
 *
 * @example Usage
 * ```ts
 * import {
 *   ascend,
 *   descend,
 *   Heap,
 * } from "@justin/data-structures";
 * import { assertEquals } from "@std/assert";
 *
 * const maxHeap = new Heap<number>(descend);
 * maxHeap.push(4, 1, 3, 5, 2);
 * assertEquals(maxHeap.peek(), 5);
 * assertEquals(maxHeap.pop(), 5);
 *
 * const minHeap = new Heap<number>();
 * minHeap.push(4, 1, 3, 5, 2);
 * assertEquals(minHeap.peek(), 1);
 * assertEquals(minHeap.pop(), 1);
 *
 * const words = new Heap<string>((a, b) => descend(a.length, b.length));
 * words.push("truck", "car", "helicopter", "tank");
 * assertEquals(words.peek(), "helicopter");
 * assertEquals(words.pop(), "helicopter");
 * assertEquals(words.peek(), "truck");
 * ```
 * @typeparam T The type of the values stored in the Heap.
 */
export class Heap<T> extends Array<T> {
  private currIdx = 0;

  /**
   * Construct a Heap.
   *
   * @param	compare A sorting comparator. defaults to ascending order.
   * @param heap An array used to initialize the heap.
   */
  constructor(
    private compare: (a: T, b: T) => number = ascend,
    heap: T[] = [],
  ) {
    super();
    heap.forEach((x) => this.push(x));
  }

  /** Check if the heap contains no elements. */
  isEmpty(): boolean {
    return this.length === 0;
  }

  /** Get the highest priority element without removing it. */
  peek(): T {
    return this[0];
  }

  /** Add an element to the heap and return the new length of the heap. */
  override push(num: T): number {
    super.push(num);
    this.heapifyUp();
    return this.length;
  }

  /** Remove and return the highest priority element from the heap. */
  override pop(): T | undefined {
    if (this.length === 0) return;

    const top = this[0];
    this[0] = this.at(-1)!;
    super.pop();
    this.heapifyDown();
    return top;
  }

  private heapifyUp(): void {
    this.currIdx = this.length - 1;
    while (this.hasParent && this.compare(this.curr, this.parent) < 0) {
      this.swapAndMoveTo(this.parentIdx);
    }
  }

  private heapifyDown(): void {
    this.currIdx = 0;
    while (
      (this.hasLeft && this.compare(this.curr, this.left) > 0) ||
      (this.hasRight && this.compare(this.curr, this.right) > 0)
    ) {
      if (this.hasRight && this.compare(this.right, this.left) < 0) {
        this.swapAndMoveTo(this.rightIdx);
      } else {
        this.swapAndMoveTo(this.leftIdx);
      }
    }
  }

  private get leftIdx(): number {
    return 2 * this.currIdx + 1;
  }

  private get rightIdx(): number {
    return 2 * this.currIdx + 2;
  }

  private get parentIdx(): number {
    return Math.floor((this.currIdx - 1) / 2);
  }

  private get hasParent(): boolean {
    return this.currIdx > 0;
  }

  private get hasLeft(): boolean {
    return this.leftIdx < this.length;
  }

  private get hasRight(): boolean {
    return this.rightIdx < this.length;
  }

  private get parent(): T {
    return this[this.parentIdx];
  }

  private get curr(): T {
    return this[this.currIdx];
  }

  private get left(): T {
    return this[this.leftIdx];
  }

  private get right(): T {
    return this[this.rightIdx];
  }

  private swapAndMoveTo(swapIdx: number): void {
    [this[this.currIdx], this[swapIdx]] = [this[swapIdx], this[this.currIdx]];
    this.currIdx = swapIdx;
  }
}
