## Pocha Project Naming Convention Guide

### 📌 General Principles

- **Consistency:** Follow a standardized naming pattern throughout the codebase.
- **Clarity:** Names should clearly convey the purpose of the component, variable, or function.
- **Predictability:** Team members should easily understand the structure and behavior based on the name alone.

---

### 📦 **Component Naming Rules**

#### ✅ Standard Naming

- **PascalCase** for all component names.
- Prefix components with `Pocha` only when necessary for clarity.
- **Examples:**
  - `PochaTabContent` (Clear project association)
  - `PochaOrderCard`
  - `TabSelector` (if it's more generic)

#### ✅ When to Use the `Pocha` Prefix

- When the component is **project-specific** or **domain-specific**.
- Avoid if the component is generic or reusable across different contexts.
- **Good Example:** `PochaTabSelector` (project-specific)
- **Avoid:** `Button`, `Modal` (common UI components)

---

### 🛠️ **Variable Naming Rules**

- Use **camelCase** for all variables and function names.
- **Boolean Variables:** Should start with `is`, `has`, or `can`.
  - ✅ `isLoading`, `hasError`, `canSubmit`
- **Descriptive Naming:** Avoid generic names like `data`, `info`.
  - ✅ `userOrders`, `pochaMenuItems`

---

### 📡 **Hook Naming Rules**

- **Prefix with `use`** for all React Hooks.
- Ensure the name clearly describes the purpose.
  - ✅ `usePochaOrders`, `useFetchMenu`

---

### 📑 **File & Folder Naming Rules**

- **Folder Structure:** Group related components together based on feature scope.
- **File Naming:** Use **PascalCase** for files (`PochaMenuDetail.tsx`).
- **Feature Separation:**
  - `pocha/components/`
  - `pocha/hooks/`
  - `pocha/types/`

---

### 🔧 **Function Naming Rules**

- **Action-Oriented:** Use verbs for functions performing actions.
- **Examples:**
  - ✅ `fetchPochaOrders`, `handleMenuClick`
- Avoid ambiguous names like `doSomething`.

---

### 📊 **State Naming Rules (useState, useReducer)**

- Use `[noun, setNoun]` for state variables.
- Use descriptive names for complex state.
  - ✅ `activeTab`, `setActiveTab`

---

### ✅ **Best Practices Summary:**

1. **Use the `Pocha` prefix for project-specific components.**
2. **Avoid generic naming when context is important.**
3. **Maintain clarity and consistency across the entire codebase.**

---

### 📌 **Review Process:**

- Ensure all PRs adhere to the naming convention.
- Use this guide as part of the **code review checklist**.
