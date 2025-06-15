/**
 * Conditionally inserts elements into arrays or properties into objects.
 *
 * Can be used in two modes:
 *
 * ### Array Mode
 * - Returns an array of items if `condition` is true, otherwise an empty array.
 * - Use with spread operator: `...iif(cond, val)`
 *
 * @example
 * const items = [
 *   'a',
 *   ...iif(true, 'b', 'c')  // ['a', 'b', 'c']
 * ];
 *
 * @example
 * // Safe lazy evaluation
 * const arr = [
 *   'a',
 *   ...iif(condition, () => computeSomething())
 * ];
 *
 *
 * ### Object Mode
 * - Returns a partial object if `condition` is true, otherwise an empty object.
 * - Only supports one object (or function returning object).
 * - Use with spread operator: `{ ...iif(cond, { key: val }) }`
 *
 * @example
 * const obj = {
 *   name: 'John',
 *   ...iif(true, { role: 'admin' }) // { name: 'John', role: 'admin' }
 * };
 *
 * @example
 * // Safe object property access
 * const obj = {
 *   ...iif(condition, () => ({ deep: nested?.value }))
 * };
 *
 * @param condition - Boolean to decide whether to include values or not
 * @param values - Values or functions that return values (deferred evaluation)
 * @returns Array of elements or partial object based on context
 */
export default function iif<T>(condition: boolean, ...values: (T | (() => T))[]): T[] | Partial<T> {
  if (!condition) {
    return values.length === 1 && typeof values[0] === 'object' && !Array.isArray(values[0])
      ? {}
      : []
  }

  // Determine if we're returning an object or array
  const firstValue = values[0]

  if (
    values.length === 1 &&
    (typeof firstValue === 'object' || typeof firstValue === 'function') &&
    !Array.isArray(typeof firstValue === 'function' ? firstValue() : firstValue)
  ) {
    // Object mode
    return Object.assign(
      {},
      ...values.map((v) =>
        typeof v === 'function' ? (v as () => Partial<T>)() : (v as Partial<T>)
      )
    )
  }

  // Array mode
  return values.map((v) => (typeof v === 'function' ? (v as () => T)() : v))
}
