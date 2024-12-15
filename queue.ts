export class Queue<T> extends Array<T> {
  private offset = 0;

  get size() {
    return this.length - this.offset;
  }

  isEmpty() {
    return this.size === 0;
  }

  enqueue(val: T) {
    this.push(val);
  }

  dequeue() {
    if (this.size === 0) return;

    if (this.offset > this.length / 2) {
      this.splice(0, this.offset);
      this.offset = 0;
    }

    return this[this.offset++];
  }
}
