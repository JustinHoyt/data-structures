export class Queue<T> extends Array<T> {
  private offset = 0;

  get size() {
    return this.length - this.offset;
  }

  override pop() {
    if (this.size === 0) return;

    if (this.offset > this.length / 2) {
      this.splice(0, this.offset);
      this.offset = 0;
    }

    return this[this.offset++];
  }
}
