export class Queue<T> {
  private offset = 0;
  private arr: T[] = [];

  constructor(...vals: T[]) {
    this.arr.push(...vals);
  }

  get size(): number {
    return this.arr.length - this.offset;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  peek(): T {
    return this.arr[0];
  }

  enqueue(val: T): void {
    this.arr.push(val);
  }

  dequeue(): T | undefined {
    if (this.size === 0) return;

    if (this.offset > this.arr.length / 2) {
      this.arr.splice(0, this.offset);
      this.offset = 0;
    }

    return this.arr[this.offset++];
  }
}
