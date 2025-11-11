# 🧩 TypeScript Refactoring Guide

## 🎯 Purpose
The goal of this refactoring process is to **improve code quality, readability, and reliability** without changing the existing business logic or architecture.  
The main focus is on **adding type safety**, **following modern TypeScript best practices**, and **minimizing side effects**.

---

## 🧠 Core Principles

1. **Do not change structure or behavior** unless absolutely necessary.  
   → All modifications must be clean, reversible, and testable.

2. **Add strong typing** for every entity:
    - Component props
    - Function return types
    - API data models
    - React state & context
    - Hooks and custom utilities
    - External integrations

3. **Avoid legacy or unsafe patterns** (like `any`, untyped functions, implicit returns).

4. **Each refactoring commit must have a clear purpose**  
   _Example:_ `refactor: add explicit return type for ProductDetails`

---

## 🧩 General Typing Rules

| Area | ❌ Bad | ✅ Good |
|------|--------|---------|
| Props | `props: any` | `props: ProductCardProps` |
| Function return | omitted | `(): string` |
| API response | dynamic object | `interface Product { ... }` |
| useState | `useState(null)` | `useState<User \| null>(null)` |

---

## 📦 Component Typing (React)

```tsx
// ❌ Before
function ProductCard(props) {
  return <div>{props.title}</div>;
}

// ✅ After
interface ProductCardProps {
  title: string;
  price?: number;
}

export function ProductCard({ title, price }: ProductCardProps): JSX.Element {
  return (
    <div>
      <h3>{title}</h3>
      {price && <p>{price} ₽</p>}
    </div>
  );
}
```
## 🧩 Component Typing Guidelines

### Guidelines:
- Always type props with `interface` or `type`.
- Always specify the return type (`JSX.Element`, `React.ReactNode`).
- Use `forwardRef<HTMLDivElement, Props>` when passing refs.

---

## ⚙️ Function Typing

### ❌ Before
```ts
export const calculateDiscount = (price, percent) => price - price * percent / 100;
```
### ✅ After
```ts
export const calculateDiscount = (price: number, percent: number): number => {
  return price - (price * percent) / 100;
};
```

### Guidelines:
- Never use any — use generics or unknown if needed.
- Always declare explicit return types.
- For async functions, return Promise<Type>.

## 🧱 Interfaces and Type Aliases

### Recommendations:
- Use interface for data structures.
- Use type for unions, aliases, and utility types.

```ts
interface User {
id: string;
email: string;
name: string;
}

type UserRole = 'admin' | 'customer' | 'guest';
```
- Prefer `Record<string, Type>` over `{ [key: string]: Type }`.

## 🗒️ Use JSDoc for complex logic

```ts
/**
* Returns a filtered list of active orders.
* @param orders - full order list
* @returns only active orders
  */
  function getActiveOrders(orders: Order[]): Order[] {
  return orders.filter(o => o.status === 'active');
  }
```