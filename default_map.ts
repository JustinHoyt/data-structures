export class DefaultMap<K, V> extends Map<K, V> {
  constructor(private init: () => V, vals?: Iterable<[K, V]>) {
    super(vals);
  }

  override get(key: K): V {
    return super.get(key) ?? super.set(key, this.init()).get(key);
  }
}
