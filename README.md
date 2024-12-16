# Data Structures

These data structures are created to fill some gaps in JavaScript's standard
library.

They are created for coding challenges, so they are simple, with easy to explain
code, have no dependencies, and are easy to copy/paste into an editor;

```ts
import { Heap } from "@justin/data-structures";
import { assertEquals } from "@std/assert";

const minHeap = new Heap([3, 5, 4, 4, 3, 3, 2, 1, 2]);

const actual = [];
while (!minHeap.isEmpty()) {
  actual.push(minHeap.pop());
}

assertEquals(actual, [1, 2, 2, 3, 3, 3, 4, 4, 5]);
```
