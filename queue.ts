export class Queue<T> {
  private offset = 0;
  private arr: T[] = [];

  constructor(...vals: T[]) {
    this.arr.push(...vals);
  }

  get size() {
    return this.arr.length - this.offset;
  }

  isEmpty() {
    return this.size === 0;
  }

  peek() {
    return this.arr[0];
  }

  enqueue(val: T) {
    this.arr.push(val);
  }

  dequeue() {
    if (this.size === 0) return;

    if (this.offset > this.arr.length / 2) {
      this.arr.splice(0, this.offset);
      this.offset = 0;
    }

    return this.arr[this.offset++];
  }
}
