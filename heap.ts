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

  heapifyUp() {
    this.currIdx = this.length - 1;
    while (this.hasParent && this.compare(this.curr, this.parent) < 0) {
      this.swapAndMoveTo(this.parentIdx);
    }
  }

  heapifyDown() {
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

  get leftIdx() {
    return 2 * this.currIdx + 1;
  }

  get rightIdx() {
    return 2 * this.currIdx + 2;
  }

  get parentIdx() {
    return Math.floor((this.currIdx - 1) / 2);
  }

  get hasParent() {
    return this.currIdx > 0;
  }

  get hasLeft() {
    return this.leftIdx < this.length;
  }

  get hasRight() {
    return this.rightIdx < this.length;
  }

  get hasLeftAndRight() {
    return this.hasLeft && this.hasRight;
  }

  get parent() {
    return this[this.parentIdx];
  }

  get curr() {
    return this[this.currIdx];
  }

  get left() {
    return this[this.leftIdx];
  }

  get right() {
    return this[this.rightIdx];
  }

  swapAndMoveTo(swapIdx: number) {
    [this[this.currIdx], this[swapIdx]] = [this[swapIdx], this[this.currIdx]];
    this.currIdx = swapIdx;
  }
}
