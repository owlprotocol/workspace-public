export type NumberBigintAsString<T> = T extends number
    ? string
    : T extends bigint
    ? string
    : T extends (infer R)[]
    ? NumberBigintAsString<R>[]
    : T extends Record<string, any>
    ? { [K in keyof T]: NumberBigintAsString<T[K]> }
    : T;
