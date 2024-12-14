export class DefaultMap<K, V> extends Map<K, V> {
  constructor(private init: () => V, vals?: Iterable<[K, V]>) {
    super(vals);
  }

  override get(key: K): V {
    return super.get(key) ?? super.set(key, this.init()).get(key);
  }
}

// Default map behavior can also be achieved with plain objects
if (import.meta.main) {
  const arr = [1, 2, 3, 3, 4, 5, 5, 5, 5, 6, 6, 6, 6, 6, 7, 7];

  // Use the nullish coalescing operator for primitives
  const idCounts: Record<string, number> = {};
  for (const num of arr.values()) {
    idCounts[num] = (idCounts[num] ?? 0) + 1;
  }
  console.log(idCounts);

  // Use the nullish coalescing assignment operator for objects
  const idLocations: Record<string, number[]> = {};
  for (const [i, num] of arr.entries()) {
    (idLocations[num] ??= []).push(i);
  }
  console.log(idLocations);
}
