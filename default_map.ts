/**
 * Default map implementation that is a thin wrapper around es6 maps.
 *
 * | Method         | Average Case | Worst Case |
 * | -------------- | ------------ | ---------- |
 * | get()          | O(1)         | O(n)       |
 * | set()          | O(1)         | O(n)       |
 *
 * @example Usage
 * ```ts
 * import { DefaultMap } from "@justin/data-structures";
 * import { assertEquals } from "@std/assert";
 *
 * const arr = [1, 2, 3, 3, 4, 5, 5, 5, 5, 6, 6, 6, 6, 6, 7, 7];
 *
 * const idLocations = new DefaultMap<number, number[]>(() => []);
 * for (const [i, num] of arr.entries()) {
 *   idLocations.get(num).push(i);
 * }
 *
 * assertEquals(idLocations.get(6), [9, 10, 11, 12, 13]);
 * assertEquals(idLocations.get(100), []);
 * ```
 *
 * @typeparam T The type of the values stored in the DefaultMap.
 */
export class DefaultMap<K, V> extends Map<K, V> {
  /**
   * Construct a DefaultMap.
   *
   * @param	init A default value factory
   * @param vals An iterable used to initialize the DefaultMap.
   */
  constructor(private init: () => V, vals?: Iterable<[K, V]>) {
    super(vals);
  }

  /**
   * Get the value associated with the key or initialize the key with the default value factory
   */
  override get(key: K): V {
    return super.get(key) ?? super.set(key, this.init()).get(key);
  }
}
