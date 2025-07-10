/**
 * Conditionally includes values in an array using the spread operator. Supports both eager and lazy
 * evaluation.
 *
 * @example
 *   const items = [
 *     'a',
 *     ...iifArray(true, 'b', 'c'), // ['a', 'b', 'c']
 *   ]
 *
 * @example
 *   const safe = [...iifArray(user?.enabled, () => getExpensiveValue())]
 *
 * @template T
 * @param condition - If true, the values are included in the result.
 * @param values - One or more values or lazy functions that return values.
 * @returns An array of evaluated values or an empty array.
 */
export function iifArray<T>(condition: boolean, ...values: (T | (() => T))[]): T[] {
  return condition ? values.map((v) => (typeof v === 'function' ? (v as () => T)() : v)) : []
}

/**
 * Conditionally includes properties in an object using the spread operator. Supports both eager and
 * lazy evaluation.
 *
 * @example
 *   const obj = {
 *     id: 1,
 *     ...iifObject(true, { role: 'admin' }), // { role: 'admin' }
 *   }
 *
 * @example
 *   const safe = {
 *     ...iifObject(config?.enabled, () => ({ debug: true })),
 *   }
 *
 * @template T
 * @param condition - If true, the object is returned.
 * @param value - An object or a lazy function that returns an object.
 * @returns A shallow object or an empty object.
 */
export function iifObject<T extends object>(condition: boolean, value: T | (() => T)): Partial<T> {
  return condition ? (typeof value === 'function' ? (value as () => T)() : value) : {}
}
