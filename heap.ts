export class Heap<T> extends Array<T> {
  private currIdx = 0;

  constructor(
    heap: T[] = [],
    private compare: (a: T, b: T) => number = (a, b) =>
      a < b ? -1 : a > b ? 1 : 0,
  ) {
    super();
    heap.forEach((x) => this.push(x));
  }

  isEmpty(): boolean {
    return this.length === 0;
  }

  peek(): T {
    return this[0];
  }

  override push(num: T): number {
    super.push(num);
    this.heapifyUp();
    return this.length;
  }

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
