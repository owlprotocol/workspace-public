export interface Cache<K, V> {
    // Methods
    clear(): void;
    set(key: K, value: V): this;
    setpop(key: K, value: V): { evicted: boolean; key: K; value: V };
    get(key: K): V | undefined;
    peek(key: K): V | undefined;
    has(key: K): boolean;
    forEach(callback: (value: V, key: K, cache: this) => void, scope?: any): void;
    keys(): IterableIterator<K>;
    values(): IterableIterator<V>;
    entries(): IterableIterator<[K, V]>;
    [Symbol.iterator](): IterableIterator<[K, V]>;
    inspect(): any;
}

export interface CacheWithDelete<K, V> extends Cache<K, V> {
    delete(key: K): boolean;
    remove<T>(key: K, missing?: T): V | T;
}
