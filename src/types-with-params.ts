export type TypesWithParams<T> = T extends { params: unknown } ? T : never
