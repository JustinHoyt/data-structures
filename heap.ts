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

  isEmpty() {
    return this.length === 0;
  }

  peek() {
    return this[0];
  }

  override push(num: T) {
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

  private heapifyUp() {
    this.currIdx = this.length - 1;
    while (this.hasParent && this.compare(this.curr, this.parent) < 0) {
      this.swapAndMoveTo(this.parentIdx);
    }
  }

  private heapifyDown() {
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

  private get leftIdx() {
    return 2 * this.currIdx + 1;
  }

  private get rightIdx() {
    return 2 * this.currIdx + 2;
  }

  private get parentIdx() {
    return Math.floor((this.currIdx - 1) / 2);
  }

  private get hasParent() {
    return this.currIdx > 0;
  }

  private get hasLeft() {
    return this.leftIdx < this.length;
  }

  private get hasRight() {
    return this.rightIdx < this.length;
  }

  private get parent() {
    return this[this.parentIdx];
  }

  private get curr() {
    return this[this.currIdx];
  }

  private get left() {
    return this[this.leftIdx];
  }

  private get right() {
    return this[this.rightIdx];
  }

  private swapAndMoveTo(swapIdx: number) {
    [this[this.currIdx], this[swapIdx]] = [this[swapIdx], this[this.currIdx]];
    this.currIdx = swapIdx;
  }
}
