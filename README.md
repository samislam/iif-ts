# iif-ts

> 🧠 A tiny utility for conditional insertion into arrays and objects using the spread operator. Supports lazy evaluation.

---

## ✨ Features

- ✅ Drop-in use with `...spread`
- ✅ Supports arrays (`iifArray`) and objects (`iifObject`)
- ✅ Lazy evaluation with functions
- ✅ Zero runtime dependencies
- ✅ Fully typed with TypeScript

---

## 💾 Installation

```bash
pnpm add iif-ts
# or
npm install iif-ts
# or
yarn add iif-ts
```

## 🔧 Usage
### ➤ Arrays: iifArray
```ts
import { iifArray } from 'iif-ts'

const arr = [
  'a',
  ...iifArray(true, 'b', 'c')       // ['b', 'c']
]

const lazy = [
  ...iifArray(condition, () => computeHeavyValue())
]
```

### ➤ Objects: iifObject
```ts
import { iifObject } from 'iif-ts'

const obj = {
  name: 'Islam',
  ...iifObject(true, { role: 'admin' }) // adds "role" if true
}

const safe = {
  ...iifObject(user?.active, () => ({ token: user.token }))
}
```
## 📚 API
```ts
iifArray<T>(condition: boolean, ...values: (T | (() => T))[]): T[]
```
- condition – If true, the values are included.
- values – One or more values or lazy functions returning values.
- ✅ Returns an array or empty array.
```ts
iifObject<T>(condition: boolean, value: T | (() => T)): Partial<T>
```
- condition – If true, the object is returned.
- value – An object or a lazy function returning one.
- ✅ Returns an object or {}.

## 🛠 Example with JSX (React)
```ts
{...iifObject(isDev, { 'data-dev': true })}
{...iifArray(showTooltip, 'aria-label')}
```
## 🧪 Testing

This package is fully covered by TypeScript type checks. For full runtime tests, add your own test framework like Vitest or Jest.
## 📄 License

MIT © Islam Yamor

---

