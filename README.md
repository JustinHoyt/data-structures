# Data Structures

These data structures are created to fill some gaps in JavaScript's standard
library.

They are created for coding challenges with the following goals:

- Simplicity
- Readability
- Portability

These data structures are easy to copy and paste into an editor for coding
challenges in any coding environment. They are simple to use and only implement
essential functionality. They are also simple enough to write from scratch if
required.

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
