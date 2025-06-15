# iif

> A tiny utility function to conditionally insert elements into arrays or objects using the spread operator. Supports both eager and deferred evaluation.

---

## ✨ Features

- ✅ Use in array spreads: `...iif(condition, value)`
- ✅ Use in object spreads: `{ ...iif(condition, { key: value }) }`
- ✅ Supports lazy evaluation using functions
- ✅ TypeScript support with full inference

---

## 💾 Installation

```bash
pnpm add iif
# or
npm install iif
# or
yarn add iif

## 🔧 Usage
### ➤ Arrays

```ts
import iif from 'iif'

const result = [
  'a',
  ...iif(true, 'b', 'c'), // ['b', 'c'] gets inserted
  ...iif(false, 'd'),     // nothing inserted
]

const lazy = [
  ...iif(isEnabled, () => getExpensiveValue())
]
```

### ➤ Objects

```ts
const user = {
  id: 1,
  ...iif(true, { role: 'admin' }),
  ...iif(false, { debug: true })
}

const safe = {
  ...iif(deep?.enabled, () => ({ color: config.theme.color }))
}
```

# 🧠 API
```ts
function iif<T>(
  condition: boolean,
  ...values: (T | (() => T))[]
): T[] | Partial<T>
```

## Parameters:

    condition – Boolean value that determines whether to insert or skip the values.

    values – One or more values or functions that return values (for lazy evaluation).

## Returns:

    If used in array context: a filtered array of values.

    If used in object context: a shallow-merged object.

## ⚠️ Notes

    For object mode, only a single object (or function returning an object) should be passed.

    Functions are only executed if the condition is true.

## 📄 License

MIT © Islam Yamor